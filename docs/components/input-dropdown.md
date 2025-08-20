# InputDropdown

## Overview

The InputDropdown component provides a non-interactive dropdown display element that shows selected values, labels, and metadata. Unlike the Autocomplete component, InputDropdown is purely presentational and requires external click handling to trigger dropdown functionality. It supports multiple visual styles (square, rounded, minimal), different types (label/value display modes), and various states to accommodate different UI patterns in forms and data display interfaces.

## Installation & Import

```tsx
import { InputDropdown } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| label | `ReactNode` | ✓ | - | The main label text or element for the dropdown |
| onClick | `function` | ✓ | - | Click handler to open dropdown or trigger action |
| sdsStyle | `"minimal" \| "square" \| "rounded"` | - | `"square"` | Visual style variant of the component |
| sdsType | `"label" \| "value"` | - | `"label"` | Display mode - shows label or selected value |
| intent | `"default" \| "negative" \| "notice" \| "positive"` | - | `"default"` | Visual intent/theme for styling |
| state | `"default" \| "open"` | - | `"default"` | Visual state of the dropdown |
| disabled | `boolean` | - | `false` | If true, disables the dropdown |
| multiple | `boolean` | - | `false` | If true, indicates multiple selection mode |
| value | `ReactNode` | - | - | The selected value to display |
| details | `ReactNode` | - | - | Additional details or description text |
| counter | `ReactNode` | - | - | Counter for multiple selections or items |
| width | `number` | - | - | Fixed width in pixels |
| shouldTruncateMinimalDetails | `boolean` | - | - | If true, truncates details in minimal style |
| shouldPutAColonAfterLabel | `boolean` | - | `true` | If true, adds colon after label when appropriate |
| className | `string` | - | - | CSS class name for the component |
| style | `CSSProperties` | - | - | Inline styles for the component |

## Usage Examples

### Basic Usage

```tsx
import React, { useState } from 'react';
import { InputDropdown } from '@czi-sds/components';

function BasicDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <InputDropdown
      label="Select Option"
      value={selectedValue || "Choose an option"}
      onClick={() => setIsOpen(!isOpen)}
      state={isOpen ? "open" : "default"}
      sdsStyle="square"
      sdsType="label"
    />
  );
}
```

### Different Visual Styles

```tsx
import React from 'react';
import { InputDropdown } from '@czi-sds/components';

function StyleVariations() {
  const handleClick = () => {
    console.log('Dropdown clicked');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <InputDropdown
        label="Square Style"
        value="Selected Value"
        onClick={handleClick}
        sdsStyle="square"
      />
      <InputDropdown
        label="Rounded Style"
        value="Selected Value"
        onClick={handleClick}
        sdsStyle="rounded"
      />
      <InputDropdown
        label="Minimal Style"
        value="Selected Value"
        onClick={handleClick}
        sdsStyle="minimal"
      />
    </div>
  );
}
```

### Label vs Value Types

```tsx
import React, { useState } from 'react';
import { InputDropdown } from '@czi-sds/components';

function TypeVariations() {
  const [selectedItem] = useState({
    name: 'Homo sapiens',
    description: 'Human genome reference'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <InputDropdown
        label="Organism"
        value={selectedItem.name}
        details={selectedItem.description}
        onClick={() => console.log('Open organism selector')}
        sdsType="label"
      />
      <InputDropdown
        label="Selected Organism"
        value={selectedItem.name}
        details={selectedItem.description}
        onClick={() => console.log('Open organism selector')}
        sdsType="value"
      />
    </div>
  );
}
```

### Multiple Selection with Counter

```tsx
import React, { useState } from 'react';
import { InputDropdown } from '@czi-sds/components';

function MultipleSelection() {
  const [selectedItems, setSelectedItems] = useState([
    'Gene Set A',
    'Gene Set B',
    'Gene Set C'
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <InputDropdown
        label="Gene Sets"
        multiple={true}
        counter={selectedItems.length}
        onClick={() => console.log('Open multi-select')}
        sdsStyle="square"
      />
      <InputDropdown
        label="Selected Gene Sets"
        value={`${selectedItems.length} sets selected`}
        details="Click to modify selection"
        onClick={() => console.log('Open multi-select')}
        sdsType="value"
        sdsStyle="rounded"
      />
    </div>
  );
}
```

### Intent Colors

```tsx
import React from 'react';
import { InputDropdown } from '@czi-sds/components';

function IntentVariations() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <InputDropdown
        label="Default Selection"
        value="Normal state"
        onClick={() => console.log('Default clicked')}
        intent="default"
      />
      <InputDropdown
        label="Success Selection"
        value="Valid selection"
        onClick={() => console.log('Success clicked')}
        intent="positive"
      />
      <InputDropdown
        label="Warning Selection"
        value="Needs attention"
        onClick={() => console.log('Warning clicked')}
        intent="notice"
      />
      <InputDropdown
        label="Error Selection"
        value="Invalid selection"
        onClick={() => console.log('Error clicked')}
        intent="negative"
      />
    </div>
  );
}
```

### Minimal Style with Details

```tsx
import React, { useState } from 'react';
import { InputDropdown } from '@czi-sds/components';

function MinimalWithDetails() {
  const [selectedExperiment] = useState({
    name: 'RNA-seq Analysis #42',
    status: 'Processing',
    samples: 128
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <InputDropdown
        label="Current Experiment"
        value={selectedExperiment.name}
        details={`Status: ${selectedExperiment.status} | Samples: ${selectedExperiment.samples}`}
        onClick={() => console.log('Select experiment')}
        sdsStyle="minimal"
        sdsType="value"
      />
      
      <InputDropdown
        label="Experiment"
        details={`${selectedExperiment.name} - ${selectedExperiment.status}`}
        onClick={() => console.log('Select experiment')}
        sdsStyle="minimal"
        sdsType="label"
        shouldTruncateMinimalDetails={true}
      />
    </div>
  );
}
```

### Controlled State with Real Dropdown

```tsx
import React, { useState } from 'react';
import { InputDropdown } from '@czi-sds/components';

const options = [
  { id: 1, name: 'Option 1', description: 'First option' },
  { id: 2, name: 'Option 2', description: 'Second option' },
  { id: 3, name: 'Option 3', description: 'Third option' },
];

function ControlledDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <InputDropdown
        label="Select an option"
        value={selectedOption ? selectedOption.name : 'Choose...'}
        details={selectedOption?.description}
        onClick={() => setIsOpen(!isOpen)}
        state={isOpen ? "open" : "default"}
        sdsType={selectedOption ? "value" : "label"}
      />
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 1000,
          marginTop: '4px'
        }}>
          {options.map(option => (
            <div
              key={option.id}
              onClick={() => handleSelect(option)}
              style={{
                padding: '12px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
            >
              <div style={{ fontWeight: 'medium' }}>{option.name}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>{option.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Fixed Width and Custom Styling

```tsx
import React from 'react';
import { InputDropdown } from '@czi-sds/components';

function CustomStyling() {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <InputDropdown
        label="Fixed Width"
        value="200px wide"
        onClick={() => console.log('Fixed width clicked')}
        width={200}
      />
      
      <InputDropdown
        label="Custom Styled"
        value="Custom appearance"
        onClick={() => console.log('Custom styled clicked')}
        style={{
          border: '2px dashed #007bff',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa'
        }}
        className="custom-dropdown"
      />
    </div>
  );
}
```

### Disabled State

```tsx
import React from 'react';
import { InputDropdown } from '@czi-sds/components';

function DisabledDropdown() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <InputDropdown
        label="Disabled Dropdown"
        value="Cannot interact"
        onClick={() => console.log('This should not fire')}
        disabled={true}
      />
      
      <InputDropdown
        label="Loading State"
        value="Please wait..."
        onClick={() => console.log('Loading')}
        disabled={true}
        intent="notice"
      />
    </div>
  );
}
```

### With Theme Integration

```tsx
import React, { useState } from 'react';
import { InputDropdown, getColors } from '@czi-sds/components';
import styled from '@emotion/styled';

const DropdownContainer = styled.div`
  ${(props) => {
    const colors = getColors(props);
    return `
      background-color: ${colors?.gray[100]};
      padding: 24px;
      border-radius: 8px;
      border: 1px solid ${colors?.gray[300]};
      display: flex;
      flex-direction: column;
      gap: 16px;
    `;
  }}
`;

function ThemedDropdowns() {
  const [analysisType, setAnalysisType] = useState('RNA Sequencing');
  const [sampleCount, setSampleCount] = useState(45);

  return (
    <DropdownContainer>
      <h3>Analysis Configuration</h3>
      
      <InputDropdown
        label="Analysis Type"
        value={analysisType}
        details="Primary analysis method for this experiment"
        onClick={() => console.log('Select analysis type')}
        sdsStyle="rounded"
        intent="positive"
      />
      
      <InputDropdown
        label="Sample Count"
        value={`${sampleCount} samples`}
        details="Total number of biological samples"
        onClick={() => console.log('Adjust sample count')}
        sdsStyle="square"
        sdsType="value"
      />
    </DropdownContainer>
  );
}
```

## Variations

### SDS Style Variations

- **square**: Default rectangular appearance with sharp corners
- **rounded**: Rounded corners for softer visual appearance  
- **minimal**: Clean, borderless design with minimal visual weight

### SDS Type Variations

- **label**: Shows the label with optional colon, value appears in details area
- **value**: Shows selected value as primary text, details show additional info

### Intent Variations

- **default**: Standard neutral appearance
- **positive**: Green accent for success states or confirmed selections
- **notice**: Yellow/orange accent for warnings or items needing attention
- **negative**: Red accent for errors or invalid selections

### State Variations

- **default**: Normal closed state
- **open**: Visual indication that dropdown is expanded

## Component States

- **Default**: Normal interactive state ready for clicks
- **Open**: Visual state showing dropdown is expanded
- **Disabled**: Non-interactive state when `disabled={true}`
- **Empty**: No value selected, shows label only
- **Selected**: Value is selected and displayed
- **Multiple**: Multiple items selected with counter

## Best Practices

### When to Use

- Use as a presentational layer for dropdown interfaces
- Ideal for showing selected values before implementing full dropdown logic
- Perfect for form fields that need dropdown-style appearance
- Recommended for custom dropdown implementations with external state management

### When Not to Use

- Avoid for fully interactive dropdowns (use Autocomplete instead)
- Don't use for simple buttons or navigation (use Button instead)
- Consider other input components for different interaction patterns

### Accessibility Guidelines

- Component includes proper ARIA labels and roles
- Supports keyboard navigation when combined with proper event handlers
- Click target is sufficiently large for touch interactions
- Visual states are clearly distinguishable
- Text contrast meets WCAG guidelines
- Should be paired with proper dropdown implementation for full accessibility

### Design Guidelines

- Use consistent styling across related dropdowns
- Match `sdsStyle` with your overall design system approach
- Use intent colors meaningfully to convey state or importance
- Provide clear labels and helpful details text
- Maintain consistent spacing and alignment in forms

### Implementation Guidelines

- Always provide meaningful `onClick` handlers
- Use controlled state management for `open/closed` states
- Implement proper keyboard event handling for full dropdown functionality
- Consider loading and error states in your implementation
- Test with screen readers when implementing full dropdown behavior

## Related Components

- **Autocomplete** - Use for full-featured searchable dropdowns
- **MenuSelect** - Use for menu-style selection interfaces
- **Button** - Use for action triggers rather than value display
- **DropdownMenu** - Use for action-oriented dropdown menus

## Migration Notes

### From Legacy Dropdown Components

- **New SDS Props**: Use `sdsStyle` and `sdsType` instead of old styling props
- **Intent System**: Replace color/theme props with `intent` prop
- **Click Handling**: Now requires explicit `onClick` handler implementation

### Breaking Changes

- Component is now purely presentational - dropdown logic must be implemented separately
- Styling system updated to use SDS design tokens
- Event handling simplified to single `onClick` callback

## API Reference

- [Storybook Stories](https://main--64ad2577a2c26e0097ff24a6.chromatic.com/?path=/story/components-inputs-inputdropdown--default) - Interactive examples and testing
- [Material UI Button](https://mui.com/material-ui/react-button/) - Underlying MUI component documentation
- [Design Tokens](https://zeroheight.com/2a1e5182b/p/6145b2-design-tokens) - Available theme tokens and values