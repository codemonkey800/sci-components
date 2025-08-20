# InputRadio

## Overview

The InputRadio component provides a radio button input for single selection from a group of mutually exclusive options. Built on Material UI's Radio component, it offers customizable styling through intent colors, optional captions for additional context, and proper accessibility features. Radio buttons are ideal for forms where users must choose exactly one option from a predefined set of choices.

## Installation & Import

```tsx
import { InputRadio } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| label | `ReactNode` | - | - | The main label text or element for the radio button |
| value | `string` | - | - | The value of the component used in form submission |
| name | `string` | - | - | Name attribute grouping related radio buttons |
| caption | `string` | - | - | Additional descriptive text shown below the label |
| intent | `"default" \| "negative" \| "notice" \| "positive"` | - | `"default"` | Visual intent/theme for styling the radio button |
| stage | `"checked" \| "unchecked"` | - | - | Controlled state of the radio button |
| disabled | `boolean` | - | `false` | If true, disables the radio button |
| size | `"small" \| "medium"` | - | `"medium"` | Size of the radio button |
| id | `string` | - | - | The id of the input element |
| onChange | `function` | - | - | Callback fired when the state is changed |
| onClick | `function` | - | - | Callback fired when the radio button is clicked |
| radioProps | `Partial<RadioProps>` | - | - | Additional props passed to the underlying MUI Radio |
| icon | `ReactNode` | - | `<RadioButtonIcon />` | The icon to display when unchecked |
| className | `string` | - | - | CSS class name for the component |
| style | `CSSProperties` | - | - | Inline styles for the component |

## Usage Examples

### Basic Radio Group

```tsx
import React, { useState } from 'react';
import { InputRadio } from '@czi-sds/components';

function BasicRadioGroup() {
  const [selectedValue, setSelectedValue] = useState('option1');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <InputRadio
        label="Option 1"
        value="option1"
        name="basic-group"
        checked={selectedValue === 'option1'}
        onChange={handleChange}
      />
      <InputRadio
        label="Option 2"
        value="option2"
        name="basic-group"
        checked={selectedValue === 'option2'}
        onChange={handleChange}
      />
      <InputRadio
        label="Option 3"
        value="option3"
        name="basic-group"
        checked={selectedValue === 'option3'}
        onChange={handleChange}
      />
    </div>
  );
}
```

### With Captions

```tsx
import React, { useState } from 'react';
import { InputRadio } from '@czi-sds/components';

function RadioGroupWithCaptions() {
  const [analysisMethod, setAnalysisMethod] = useState('rna-seq');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnalysisMethod(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3>Select Analysis Method</h3>
      
      <InputRadio
        label="RNA Sequencing"
        caption="Comprehensive transcriptomic analysis with high sensitivity"
        value="rna-seq"
        name="analysis-method"
        checked={analysisMethod === 'rna-seq'}
        onChange={handleChange}
      />
      
      <InputRadio
        label="Microarray Analysis"
        caption="Cost-effective method for known gene expression profiling"
        value="microarray"
        name="analysis-method"
        checked={analysisMethod === 'microarray'}
        onChange={handleChange}
      />
      
      <InputRadio
        label="qPCR Validation"
        caption="Quantitative validation of specific gene targets"
        value="qpcr"
        name="analysis-method"
        checked={analysisMethod === 'qpcr'}
        onChange={handleChange}
      />
    </div>
  );
}
```

### Controlled States

```tsx
import React, { useState } from 'react';
import { InputRadio, Button } from '@czi-sds/components';

function ControlledRadioStates() {
  const [radioState, setRadioState] = useState<'checked' | 'unchecked'>('unchecked');

  const toggleState = () => {
    setRadioState(radioState === 'checked' ? 'unchecked' : 'checked');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <InputRadio
        label="Controlled radio button"
        caption={`Current state: ${radioState}`}
        value="controlled"
        name="controlled-group"
        stage={radioState}
        onChange={(event) => {
          setRadioState(event.target.checked ? 'checked' : 'unchecked');
        }}
      />
      
      <Button onClick={toggleState} sdsStyle="rounded" sdsType="secondary">
        Toggle State
      </Button>
    </div>
  );
}
```

### Intent Colors

```tsx
import React, { useState } from 'react';
import { InputRadio } from '@czi-sds/components';

function IntentRadioButtons() {
  const [selectedPriority, setSelectedPriority] = useState('medium');

  const handlePriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPriority(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3>Task Priority</h3>
      
      <InputRadio
        label="High Priority"
        caption="Urgent tasks requiring immediate attention"
        value="high"
        name="priority"
        intent="negative"
        checked={selectedPriority === 'high'}
        onChange={handlePriorityChange}
      />
      
      <InputRadio
        label="Medium Priority"
        caption="Standard tasks with normal timeline"
        value="medium"
        name="priority"
        intent="notice"
        checked={selectedPriority === 'medium'}
        onChange={handlePriorityChange}
      />
      
      <InputRadio
        label="Low Priority"
        caption="Tasks that can be completed when time allows"
        value="low"
        name="priority"
        intent="positive"
        checked={selectedPriority === 'low'}
        onChange={handlePriorityChange}
      />
      
      <InputRadio
        label="No Priority Set"
        caption="Default state for new tasks"
        value="none"
        name="priority"
        intent="default"
        checked={selectedPriority === 'none'}
        onChange={handlePriorityChange}
      />
    </div>
  );
}
```

### Size Variations

```tsx
import React, { useState } from 'react';
import { InputRadio } from '@czi-sds/components';

function SizedRadioButtons() {
  const [compactSelection, setCompactSelection] = useState('small');
  const [standardSelection, setStandardSelection] = useState('medium');

  return (
    <div style={{ display: 'flex', gap: '48px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h4>Compact Size</h4>
        <InputRadio
          label="Small Option 1"
          value="small1"
          name="compact-group"
          size="small"
          checked={compactSelection === 'small1'}
          onChange={(e) => setCompactSelection(e.target.value)}
        />
        <InputRadio
          label="Small Option 2"
          value="small2"
          name="compact-group"
          size="small"
          checked={compactSelection === 'small2'}
          onChange={(e) => setCompactSelection(e.target.value)}
        />
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h4>Standard Size</h4>
        <InputRadio
          label="Medium Option 1"
          value="medium1"
          name="standard-group"
          size="medium"
          checked={standardSelection === 'medium1'}
          onChange={(e) => setStandardSelection(e.target.value)}
        />
        <InputRadio
          label="Medium Option 2"
          value="medium2"
          name="standard-group"
          size="medium"
          checked={standardSelection === 'medium2'}
          onChange={(e) => setStandardSelection(e.target.value)}
        />
      </div>
    </div>
  );
}
```

### Disabled States

```tsx
import React from 'react';
import { InputRadio } from '@czi-sds/components';

function DisabledRadioButtons() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3>Experiment Settings</h3>
      
      <InputRadio
        label="Automatic Processing"
        caption="Process samples automatically upon completion"
        value="auto"
        name="processing"
        checked={true}
        disabled={true}
      />
      
      <InputRadio
        label="Manual Processing"
        caption="Require manual review before processing"
        value="manual"
        name="processing"
        checked={false}
        disabled={true}
      />
      
      <InputRadio
        label="Batch Processing"
        caption="Currently unavailable - coming soon"
        value="batch"
        name="processing"
        checked={false}
        disabled={true}
        intent="notice"
      />
    </div>
  );
}
```

### Form Integration with react-hook-form

```tsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputRadio, Button } from '@czi-sds/components';

interface FormData {
  experimentType: string;
  dataFormat: string;
  analysisLevel: string;
}

function RadioForm() {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      experimentType: '',
      dataFormat: 'fastq',
      analysisLevel: 'basic'
    }
  });

  const watchedValues = watch();

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Experiment Type - Required Field */}
        <div>
          <h3>Experiment Type *</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Controller
              name="experimentType"
              control={control}
              rules={{ required: 'Please select an experiment type' }}
              render={({ field }) => (
                <InputRadio
                  label="Single-cell RNA-seq"
                  caption="Individual cell transcriptomic profiling"
                  value="scrna-seq"
                  name="experimentType"
                  intent={errors.experimentType ? 'negative' : 'default'}
                  {...field}
                  checked={field.value === 'scrna-seq'}
                />
              )}
            />
            <Controller
              name="experimentType"
              control={control}
              render={({ field }) => (
                <InputRadio
                  label="Bulk RNA-seq"
                  caption="Population-level gene expression analysis"
                  value="bulk-rna-seq"
                  name="experimentType"
                  intent={errors.experimentType ? 'negative' : 'default'}
                  {...field}
                  checked={field.value === 'bulk-rna-seq'}
                />
              )}
            />
          </div>
          {errors.experimentType && (
            <p style={{ color: 'red', marginTop: '8px' }}>
              {errors.experimentType.message}
            </p>
          )}
        </div>

        {/* Data Format */}
        <div>
          <h3>Data Format</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Controller
              name="dataFormat"
              control={control}
              render={({ field }) => (
                <InputRadio
                  label="FASTQ"
                  caption="Raw sequencing reads"
                  value="fastq"
                  name="dataFormat"
                  {...field}
                  checked={field.value === 'fastq'}
                />
              )}
            />
            <Controller
              name="dataFormat"
              control={control}
              render={({ field }) => (
                <InputRadio
                  label="BAM/SAM"
                  caption="Aligned sequencing data"
                  value="bam"
                  name="dataFormat"
                  {...field}
                  checked={field.value === 'bam'}
                />
              )}
            />
          </div>
        </div>

        {/* Analysis Level */}
        <div>
          <h3>Analysis Depth</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Controller
              name="analysisLevel"
              control={control}
              render={({ field }) => (
                <InputRadio
                  label="Basic Analysis"
                  caption="Quality control and gene expression quantification"
                  value="basic"
                  name="analysisLevel"
                  intent="positive"
                  {...field}
                  checked={field.value === 'basic'}
                />
              )}
            />
            <Controller
              name="analysisLevel"
              control={control}
              render={({ field }) => (
                <InputRadio
                  label="Advanced Analysis"
                  caption="Includes pathway analysis and functional enrichment"
                  value="advanced"
                  name="analysisLevel"
                  intent="notice"
                  {...field}
                  checked={field.value === 'advanced'}
                />
              )}
            />
          </div>
        </div>

        {/* Form Summary */}
        <div style={{ 
          padding: '16px', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '8px' 
        }}>
          <h4>Current Selection:</h4>
          <p>Experiment: {watchedValues.experimentType || 'Not selected'}</p>
          <p>Format: {watchedValues.dataFormat}</p>
          <p>Analysis: {watchedValues.analysisLevel}</p>
        </div>

        <Button type="submit" sdsStyle="rounded" sdsType="primary">
          Create Experiment
        </Button>
      </div>
    </form>
  );
}
```

### With Theme Integration

```tsx
import React, { useState } from 'react';
import { InputRadio, getColors } from '@czi-sds/components';
import styled from '@emotion/styled';

const RadioSection = styled.div`
  ${(props) => {
    const colors = getColors(props);
    return `
      background-color: ${colors?.gray[100]};
      padding: 24px;
      border-radius: 12px;
      border: 1px solid ${colors?.gray[300]};
      display: flex;
      flex-direction: column;
      gap: 16px;
    `;
  }}
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

function ThemedRadioButtons() {
  const [sequencingPlatform, setSequencingPlatform] = useState('illumina');
  const [readLength, setReadLength] = useState('150bp');

  const handlePlatformChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSequencingPlatform(event.target.value);
  };

  const handleReadLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReadLength(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <RadioSection>
        <h3>Sequencing Platform</h3>
        <RadioGroup>
          <InputRadio
            label="Illumina"
            caption="High-throughput, cost-effective sequencing"
            value="illumina"
            name="platform"
            checked={sequencingPlatform === 'illumina'}
            onChange={handlePlatformChange}
            intent="positive"
          />
          <InputRadio
            label="Oxford Nanopore"
            caption="Long-read sequencing for complex regions"
            value="nanopore"
            name="platform"
            checked={sequencingPlatform === 'nanopore'}
            onChange={handlePlatformChange}
            intent="notice"
          />
          <InputRadio
            label="PacBio"
            caption="Ultra-long reads with high accuracy"
            value="pacbio"
            name="platform"
            checked={sequencingPlatform === 'pacbio'}
            onChange={handlePlatformChange}
            intent="default"
          />
        </RadioGroup>
      </RadioSection>

      <RadioSection>
        <h3>Read Length Configuration</h3>
        <RadioGroup>
          <InputRadio
            label="75bp Paired-End"
            caption="Cost-effective for gene expression analysis"
            value="75bp"
            name="read-length"
            checked={readLength === '75bp'}
            onChange={handleReadLengthChange}
          />
          <InputRadio
            label="150bp Paired-End"
            caption="Standard configuration for most applications"
            value="150bp"
            name="read-length"
            checked={readLength === '150bp'}
            onChange={handleReadLengthChange}
          />
          <InputRadio
            label="300bp Paired-End"
            caption="Extended reads for complex transcript analysis"
            value="300bp"
            name="read-length"
            checked={readLength === '300bp'}
            onChange={handleReadLengthChange}
          />
        </RadioGroup>
      </RadioSection>
    </div>
  );
}
```

## Variations

### Intent Variations

- **default**: Standard neutral appearance
- **positive**: Green accent for recommended or successful options
- **notice**: Yellow/orange accent for options requiring attention or consideration
- **negative**: Red accent for options with risks or indicating problems

### Size Variations

- **small**: Compact size for dense interfaces or secondary options
- **medium**: Standard size for most use cases and optimal touch targets

### State Variations

- **unchecked**: Default unselected state
- **checked**: Selected state with filled radio button

## Component States

- **Default**: Interactive state ready for selection
- **Checked**: Selected state with filled radio indicator
- **Unchecked**: Unselected state with empty radio outline
- **Disabled**: Non-interactive state when `disabled={true}`
- **Focus**: Keyboard focus state with visible focus ring

## Best Practices

### When to Use

- Use for mutually exclusive single selections from 2-7 options
- Ideal for settings, preferences, and configuration forms
- Perfect for required choices where one option must be selected
- Recommended when all available options should be visible simultaneously

### When Not to Use

- Avoid for more than 7 options (consider InputDropdown instead)
- Don't use for multiple selections (use InputCheckbox instead)
- Avoid for binary on/off choices (use InputToggle instead)
- Don't use for actions or navigation (use Button instead)

### Accessibility Guidelines

- Component includes proper ARIA attributes and roles
- Radio buttons with the same `name` are grouped for screen readers
- Labels and captions are properly associated with radio inputs
- Supports full keyboard navigation (Arrow keys within group, Tab between groups)
- Focus states are clearly visible for keyboard users
- Screen readers announce group context and selection state

### Form Integration

- Always use the same `name` attribute for related radio buttons
- Provide unique `value` attributes for each option
- Works seamlessly with form libraries like react-hook-form
- Supports controlled and uncontrolled usage patterns
- Properly handles form validation and error states

### Design Guidelines

- Group related options visually with consistent spacing
- Use clear, concise labels that describe each option
- Provide helpful captions for complex or technical options
- Use intent colors meaningfully to convey option characteristics
- Maintain consistent radio button sizing within groups
- Ensure sufficient spacing for touch targets (minimum 44px)

## Related Components

- **InputCheckbox** - Use for multiple selections or boolean choices
- **InputToggle** - Use for immediate binary switches
- **InputDropdown** - Use for single selection from many options
- **Autocomplete** - Use for searchable single selections

## Migration Notes

### From Legacy Radio Components

- **Intent System**: Replace old color/theme props with `intent` prop
- **Stage Control**: Use `stage` prop for controlled state management
- **Caption Support**: New `caption` prop provides built-in additional context

### Breaking Changes

- `color` prop replaced with `intent` system
- Updated styling system requires theme provider
- Improved accessibility requires proper `name` and `value` attributes

## API Reference

- [Storybook Stories](https://main--64ad2577a2c26e0097ff24a6.chromatic.com/?path=/story/components-inputs-inputradio--default) - Interactive examples and testing
- [Material UI Radio](https://mui.com/material-ui/react-radio-button/) - Underlying MUI component documentation
- [Design Tokens](https://zeroheight.com/2a1e5182b/p/6145b2-design-tokens) - Available theme tokens and values