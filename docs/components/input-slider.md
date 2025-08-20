# InputSlider

## Overview

The InputSlider component provides an interactive slider control for selecting numeric values or ranges. Built on Material UI's Slider component, it offers both single-value and range selection modes with customizable styling, value labels, and marks. The slider is ideal for settings, filters, parameter adjustments, and any interface where users need to select values from a continuous range.

Key features include single and range value selection, customizable min/max bounds, step increments, visual marks, value label display options, and full accessibility support for keyboard and screen reader users.

## Installation & Import

```tsx
import { InputSlider } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| value | `number \| number[]` | - | - | Controlled value(s) of the slider. Array for range slider |
| defaultValue | `number \| number[]` | - | - | Default uncontrolled value(s) of the slider |
| onChange | `(event: Event, value: number \| number[], activeThumb: number) => void` | - | - | Callback fired when the slider value changes |
| min | `number` | - | `0` | The minimum allowed value |
| max | `number` | - | `100` | The maximum allowed value |
| step | `number` | - | `1` | The granularity with which the slider can step |
| marks | `boolean \| Mark[]` | - | `false` | Marks indicate predetermined values. Can be boolean or array of mark objects |
| valueLabelDisplay | `"auto" \| "off" \| "on"` | - | `"off"` | Controls when the value label is displayed |
| size | `"small" \| "medium"` | - | `"medium"` | The size of the slider |
| disabled | `boolean` | - | `false` | If true, the slider is disabled |
| color | `"primary" \| "secondary" \| "error" \| "info" \| "success" \| "warning"` | - | `"primary"` | The color of the component |
| name | `string` | - | - | Name attribute of the hidden input element |
| aria-label | `string` | - | - | ARIA label for the slider |
| getAriaLabel | `(index: number) => string` | - | - | Function to get ARIA label for range slider thumbs |
| id | `string` | - | - | The id of the slider element |
| onClick | `function` | - | - | Click event handler |
| className | `string` | - | - | CSS class name for custom styling |
| style | `CSSProperties` | - | - | Inline styles object |

## Usage Examples

### Basic Single Value Slider

```tsx
import React, { useState } from 'react';
import { InputSlider } from '@czi-sds/components';

function BasicSlider() {
  const [value, setValue] = useState<number>(30);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <div style={{ width: '300px', padding: '20px' }}>
      <h3>Temperature: {value}°C</h3>
      <InputSlider
        value={value}
        onChange={handleChange}
        min={0}
        max={100}
        step={1}
        valueLabelDisplay="auto"
        aria-label="Temperature slider"
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
        <span>0°C</span>
        <span>100°C</span>
      </div>
    </div>
  );
}
```

### Range Slider

```tsx
import React, { useState } from 'react';
import { InputSlider } from '@czi-sds/components';

function RangeSlider() {
  const [ageRange, setAgeRange] = useState<number[]>([20, 65]);

  const handleAgeChange = (event: Event, newValue: number | number[]) => {
    setAgeRange(newValue as number[]);
  };

  return (
    <div style={{ width: '400px', padding: '20px' }}>
      <h3>Age Range: {ageRange[0]} - {ageRange[1]} years</h3>
      <InputSlider
        value={ageRange}
        onChange={handleAgeChange}
        min={0}
        max={100}
        step={1}
        valueLabelDisplay="on"
        getAriaLabel={(index) => index === 0 ? 'Minimum age' : 'Maximum age'}
      />
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        fontSize: '12px', 
        color: '#666',
        marginTop: '8px'
      }}>
        <span>0 years</span>
        <span>100 years</span>
      </div>
      <p style={{ fontSize: '14px', color: '#666' }}>
        Selected: {ageRange[1] - ageRange[0]} year range
      </p>
    </div>
  );
}
```

### Slider with Custom Marks

```tsx
import React, { useState } from 'react';
import { InputSlider } from '@czi-sds/components';

const qualityMarks = [
  { value: 0, label: 'Low' },
  { value: 25, label: 'Fair' },
  { value: 50, label: 'Good' },
  { value: 75, label: 'High' },
  { value: 100, label: 'Excellent' }
];

function MarkedSlider() {
  const [quality, setQuality] = useState<number>(50);

  const handleQualityChange = (event: Event, newValue: number | number[]) => {
    setQuality(newValue as number);
  };

  const getQualityLabel = (value: number): string => {
    const mark = qualityMarks.find(mark => mark.value === value);
    return mark ? mark.label : `${value}%`;
  };

  return (
    <div style={{ width: '400px', padding: '20px' }}>
      <h3>Data Quality: {getQualityLabel(quality)} ({quality}%)</h3>
      <InputSlider
        value={quality}
        onChange={handleQualityChange}
        min={0}
        max={100}
        step={25}
        marks={qualityMarks}
        valueLabelDisplay="auto"
        aria-label="Data quality slider"
      />
    </div>
  );
}
```

### Different Step Sizes

```tsx
import React, { useState } from 'react';
import { InputSlider } from '@czi-sds/components';

function SteppedSliders() {
  const [smallStep, setSmallStep] = useState<number>(2.5);
  const [largeStep, setLargeStep] = useState<number>(50);

  return (
    <div style={{ width: '400px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <h4>Fine Control (step: 0.1)</h4>
        <p>pH Level: {smallStep.toFixed(1)}</p>
        <InputSlider
          value={smallStep}
          onChange={(event, newValue) => setSmallStep(newValue as number)}
          min={0}
          max={14}
          step={0.1}
          valueLabelDisplay="auto"
          aria-label="pH level slider"
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
          <span>0.0</span>
          <span>14.0</span>
        </div>
      </div>

      <div>
        <h4>Coarse Control (step: 10)</h4>
        <p>Sample Size: {largeStep}</p>
        <InputSlider
          value={largeStep}
          onChange={(event, newValue) => setLargeStep(newValue as number)}
          min={10}
          max={500}
          step={10}
          marks={true}
          valueLabelDisplay="auto"
          aria-label="Sample size slider"
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
          <span>10</span>
          <span>500</span>
        </div>
      </div>
    </div>
  );
}
```

### Size Variations

```tsx
import React, { useState } from 'react';
import { InputSlider } from '@czi-sds/components';

function SizeVariations() {
  const [smallValue, setSmallValue] = useState<number>(25);
  const [mediumValue, setMediumValue] = useState<number>(75);

  return (
    <div style={{ width: '400px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <h4>Small Size</h4>
        <p>Confidence: {smallValue}%</p>
        <InputSlider
          value={smallValue}
          onChange={(event, newValue) => setSmallValue(newValue as number)}
          min={0}
          max={100}
          size="small"
          valueLabelDisplay="auto"
          aria-label="Small slider"
        />
      </div>

      <div>
        <h4>Medium Size (Default)</h4>
        <p>Accuracy: {mediumValue}%</p>
        <InputSlider
          value={mediumValue}
          onChange={(event, newValue) => setMediumValue(newValue as number)}
          min={0}
          max={100}
          size="medium"
          valueLabelDisplay="auto"
          aria-label="Medium slider"
        />
      </div>
    </div>
  );
}
```

### Color Variations

```tsx
import React, { useState } from 'react';
import { InputSlider } from '@czi-sds/components';

function ColorVariations() {
  const [values, setValues] = useState({
    primary: 30,
    secondary: 50,
    success: 75,
    warning: 60,
    error: 25
  });

  const handleChange = (key: keyof typeof values) => (event: Event, newValue: number | number[]) => {
    setValues(prev => ({ ...prev, [key]: newValue as number }));
  };

  return (
    <div style={{ width: '400px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h4>Primary</h4>
        <InputSlider
          value={values.primary}
          onChange={handleChange('primary')}
          color="primary"
          valueLabelDisplay="auto"
          aria-label="Primary slider"
        />
      </div>

      <div>
        <h4>Secondary</h4>
        <InputSlider
          value={values.secondary}
          onChange={handleChange('secondary')}
          color="secondary"
          valueLabelDisplay="auto"
          aria-label="Secondary slider"
        />
      </div>

      <div>
        <h4>Success</h4>
        <InputSlider
          value={values.success}
          onChange={handleChange('success')}
          color="success"
          valueLabelDisplay="auto"
          aria-label="Success slider"
        />
      </div>

      <div>
        <h4>Warning</h4>
        <InputSlider
          value={values.warning}
          onChange={handleChange('warning')}
          color="warning"
          valueLabelDisplay="auto"
          aria-label="Warning slider"
        />
      </div>

      <div>
        <h4>Error</h4>
        <InputSlider
          value={values.error}
          onChange={handleChange('error')}
          color="error"
          valueLabelDisplay="auto"
          aria-label="Error slider"
        />
      </div>
    </div>
  );
}
```

### Scientific Parameters Slider

```tsx
import React, { useState } from 'react';
import { InputSlider } from '@czi-sds/components';

interface ExperimentParameters {
  temperature: number;
  pressure: number[];
  concentration: number;
  duration: number;
}

function ScientificSliders() {
  const [params, setParams] = useState<ExperimentParameters>({
    temperature: 37,
    pressure: [0.8, 1.2],
    concentration: 0.5,
    duration: 120
  });

  const tempMarks = [
    { value: 4, label: '4°C' },
    { value: 25, label: 'RT' },
    { value: 37, label: '37°C' },
    { value: 95, label: '95°C' }
  ];

  const updateParam = (key: keyof ExperimentParameters) => 
    (event: Event, newValue: number | number[]) => {
      setParams(prev => ({ ...prev, [key]: newValue }));
    };

  return (
    <div style={{ width: '500px', padding: '20px' }}>
      <h3>Experiment Parameters</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '20px' }}>
        {/* Temperature */}
        <div>
          <h4>Temperature: {params.temperature}°C</h4>
          <InputSlider
            value={params.temperature}
            onChange={updateParam('temperature')}
            min={4}
            max={95}
            marks={tempMarks}
            valueLabelDisplay="auto"
            color="error"
            aria-label="Temperature control"
          />
        </div>

        {/* Pressure Range */}
        <div>
          <h4>Pressure Range: {params.pressure[0]} - {params.pressure[1]} atm</h4>
          <InputSlider
            value={params.pressure}
            onChange={updateParam('pressure')}
            min={0}
            max={2}
            step={0.1}
            valueLabelDisplay="on"
            color="primary"
            getAriaLabel={(index) => index === 0 ? 'Minimum pressure' : 'Maximum pressure'}
          />
        </div>

        {/* Concentration */}
        <div>
          <h4>Concentration: {params.concentration} M</h4>
          <InputSlider
            value={params.concentration}
            onChange={updateParam('concentration')}
            min={0}
            max={2}
            step={0.05}
            valueLabelDisplay="auto"
            color="success"
            aria-label="Concentration control"
          />
        </div>

        {/* Duration */}
        <div>
          <h4>Duration: {params.duration} minutes</h4>
          <InputSlider
            value={params.duration}
            onChange={updateParam('duration')}
            min={1}
            max={480}
            step={1}
            marks={[
              { value: 1, label: '1min' },
              { value: 60, label: '1h' },
              { value: 240, label: '4h' },
              { value: 480, label: '8h' }
            ]}
            valueLabelDisplay="auto"
            color="warning"
            aria-label="Duration control"
          />
        </div>
      </div>

      {/* Summary */}
      <div style={{ 
        marginTop: '30px', 
        padding: '16px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '8px' 
      }}>
        <h4>Parameter Summary</h4>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Temperature: {params.temperature}°C</li>
          <li>Pressure: {params.pressure[0]} - {params.pressure[1]} atm</li>
          <li>Concentration: {params.concentration} M</li>
          <li>Duration: {params.duration} minutes</li>
        </ul>
      </div>
    </div>
  );
}
```

### Disabled State

```tsx
import React, { useState } from 'react';
import { InputSlider, Button } from '@czi-sds/components';

function DisabledSlider() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [value, setValue] = useState<number>(50);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <div style={{ width: '400px', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Button 
          onClick={() => setIsEnabled(!isEnabled)}
          sdsStyle="rounded"
          sdsType={isEnabled ? "primary" : "secondary"}
        >
          {isEnabled ? "Disable" : "Enable"} Slider
        </Button>
      </div>

      <h3>Analysis Threshold: {value}%</h3>
      <InputSlider
        value={value}
        onChange={handleChange}
        min={0}
        max={100}
        step={5}
        marks={true}
        disabled={!isEnabled}
        valueLabelDisplay="auto"
        aria-label="Analysis threshold slider"
      />

      <p style={{ fontSize: '14px', color: '#666', marginTop: '12px' }}>
        {isEnabled 
          ? "Adjust the threshold by moving the slider"
          : "Enable the slider to adjust the threshold"
        }
      </p>
    </div>
  );
}
```

### With Theme Integration

```tsx
import React, { useState } from 'react';
import { InputSlider, getColors, getSpaces } from '@czi-sds/components';
import styled from '@emotion/styled';

const SliderSection = styled.div`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    
    return `
      background-color: ${colors?.gray[100]};
      padding: ${spaces?.l}px;
      border-radius: 12px;
      border: 1px solid ${colors?.gray[300]};
      margin-bottom: ${spaces?.l}px;
    `;
  }}
`;

const ValueDisplay = styled.div`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    
    return `
      background-color: ${colors?.common.white};
      padding: ${spaces?.m}px;
      border-radius: 8px;
      border: 1px solid ${colors?.gray[300]};
      font-family: 'Monaco', 'Courier New', monospace;
      color: ${colors?.gray[800]};
      text-align: center;
    `;
  }}
`;

function ThemedSliders() {
  const [resolution, setResolution] = useState<number>(1024);
  const [qualityRange, setQualityRange] = useState<number[]>([70, 95]);

  const resolutionOptions = [
    { value: 256, label: '256p' },
    { value: 512, label: '512p' },
    { value: 1024, label: '1K' },
    { value: 2048, label: '2K' },
    { value: 4096, label: '4K' }
  ];

  return (
    <div style={{ width: '500px' }}>
      <h2>Image Processing Configuration</h2>
      
      <SliderSection>
        <h3>Output Resolution</h3>
        <ValueDisplay>
          {resolution}x{resolution} pixels
        </ValueDisplay>
        <InputSlider
          value={resolution}
          onChange={(event, newValue) => setResolution(newValue as number)}
          min={256}
          max={4096}
          step={null}
          marks={resolutionOptions}
          valueLabelDisplay="auto"
          color="primary"
          aria-label="Output resolution"
        />
      </SliderSection>

      <SliderSection>
        <h3>Quality Range</h3>
        <ValueDisplay>
          {qualityRange[0]}% - {qualityRange[1]}%
        </ValueDisplay>
        <InputSlider
          value={qualityRange}
          onChange={(event, newValue) => setQualityRange(newValue as number[])}
          min={0}
          max={100}
          step={5}
          valueLabelDisplay="on"
          color="success"
          getAriaLabel={(index) => 
            index === 0 ? 'Minimum quality' : 'Maximum quality'
          }
        />
      </SliderSection>
    </div>
  );
}
```

## Variations

### Value Types

- **Single Value**: Default mode for selecting one numeric value
- **Range**: Array mode for selecting minimum and maximum values

### Size Variations

- **small**: Compact size for dense interfaces
- **medium**: Standard size for most use cases (default)

### Value Label Display

- **off**: No value labels displayed (default)
- **on**: Value labels always visible
- **auto**: Value labels shown only when thumb is active

### Color Variations

- **primary**: Default blue color scheme
- **secondary**: Alternative color scheme
- **success**: Green color for positive values
- **warning**: Orange/yellow color for caution
- **error**: Red color for critical values
- **info**: Blue color for informational values

## Component States

- **Default**: Interactive state ready for user input
- **Active**: State when user is dragging the thumb
- **Focused**: Keyboard focus state with visible focus ring
- **Disabled**: Non-interactive state when `disabled={true}`
- **Hover**: Visual feedback when hovering over the slider

## Best Practices

### When to Use

- Use for selecting numeric values from a continuous range
- Ideal for settings, filters, and parameter adjustments
- Perfect for scientific applications requiring precise value control
- Recommended when users need immediate visual feedback of value changes

### When Not to Use

- Avoid for discrete selections from a small set (use InputRadio instead)
- Don't use for text input (use InputText instead)
- Consider InputDropdown for predefined numeric options
- Avoid for boolean choices (use InputToggle instead)

### Accessibility Guidelines

- Always provide meaningful `aria-label` or `getAriaLabel` for screen readers
- Component supports full keyboard navigation (Arrow keys, Home, End, Page Up/Down)
- Value changes are announced to assistive technologies
- Focus management is handled automatically for range sliders
- Ensure sufficient color contrast for visual indicators

### UX Guidelines

- Provide clear labeling to indicate what the slider controls
- Show current values prominently, either through labels or value display
- Use appropriate step sizes for the data being controlled
- Consider adding visual marks for important values or common settings
- Provide immediate feedback for value changes

### Design Guidelines

- Use consistent slider sizing across related controls
- Choose appropriate color coding to convey meaning (error = red, success = green)
- Maintain adequate spacing around sliders for touch interaction
- Consider the range and precision needed for your specific use case
- Group related sliders logically in your interface

## Related Components

- **InputText** - Use for direct numeric input when precise values are needed
- **InputDropdown** - Use for selecting from predefined numeric options
- **InputRadio** - Use for selecting from discrete numeric choices
- **Button** - Use in combination with sliders for reset/apply functionality

## Migration Notes

### From Legacy Slider Components

- **Value Handling**: Range sliders now use arrays consistently
- **ARIA Support**: Improved accessibility with automatic ARIA label generation
- **Styling**: Updated to use SDS design tokens and theme integration

### Breaking Changes

- `orientation` prop is now fixed to "horizontal"
- Range slider value structure standardized as number arrays
- Improved keyboard navigation behavior

## API Reference

- [Storybook Stories](https://main--64ad2577a2c26e0097ff24a6.chromatic.com/?path=/story/components-inputs-inputslider--default) - Interactive examples and testing
- [Material UI Slider](https://mui.com/material-ui/react-slider/) - Underlying MUI component documentation
- [Design Tokens](https://zeroheight.com/2a1e5182b/p/6145b2-design-tokens) - Available theme tokens and values