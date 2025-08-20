# InputCheckbox

## Overview

The InputCheckbox component provides a styled checkbox input for boolean selections and multi-option forms. Built on Material-UI's Checkbox component, it integrates seamlessly with the Science Design System's design tokens and supports various visual states including checked, unchecked, and indeterminate states.

This component is ideal for forms requiring boolean selections, multi-select lists, terms of service agreements, and any interface where users need to toggle options on or off. It provides clear visual feedback and supports accessibility features for screen readers and keyboard navigation.

## Installation & Import

```tsx
import { InputCheckbox } from '@czi-sds/components';
```

## Props

### Core Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `label` | `ReactNode` | - | - | Label text displayed next to the checkbox |
| `caption` | `string` | - | - | Additional description text displayed below the label |
| `stage` | `"checked" \| "unchecked" \| "indeterminate"` | - | - | Controlled state of the checkbox |
| `value` | `unknown` | - | - | The value of the component when used in forms |
| `name` | `string` | - | - | Name attribute of the input element |

### Event Handlers

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `onChange` | `(event: ChangeEvent<HTMLInputElement>) => void` | - | - | Callback fired when the checkbox state changes |
| `onClick` | `(event: MouseEvent) => void` | - | - | Callback fired when the checkbox is clicked |

### Styling Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `intent` | `"default" \| "negative" \| "notice" \| "positive"` | - | `"default"` | Visual intent/state of the checkbox |
| `size` | `"small" \| "medium" \| "large"` | - | `"medium"` | Size variant of the checkbox |
| `disabled` | `boolean` | - | `false` | If true, disables the checkbox |
| `className` | `string` | - | - | CSS class name for custom styling |
| `style` | `CSSProperties` | - | - | Inline styles object |

### Customization Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `checkboxProps` | `Partial<CheckboxProps>` | - | - | Additional props passed to the underlying MUI Checkbox |
| `icon` | `ReactNode` | - | `<CheckBoxOutlineBlankIcon />` | Custom icon for the unchecked state |
| `id` | `string` | - | - | ID attribute of the input element |

## Usage Examples

### Basic Checkbox

```tsx
import React, { useState } from 'react';
import { InputCheckbox } from '@czi-sds/components';

function BasicCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <InputCheckbox
      label="Accept terms and conditions"
      stage={checked ? "checked" : "unchecked"}
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
}
```

### With Caption

```tsx
import React, { useState } from 'react';
import { InputCheckbox } from '@czi-sds/components';

function CheckboxWithCaption() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <InputCheckbox
      label="Subscribe to newsletter"
      caption="Receive weekly updates about new features and research"
      stage={subscribed ? "checked" : "unchecked"}
      onChange={(event) => setSubscribed(event.target.checked)}
    />
  );
}
```

### Indeterminate State

```tsx
import React, { useState } from 'react';
import { InputCheckbox } from '@czi-sds/components';

function IndeterminateExample() {
  const [parent, setParent] = useState(false);
  const [childOne, setChildOne] = useState(false);
  const [childTwo, setChildTwo] = useState(false);

  const isIndeterminate = childOne !== childTwo;
  const isParentChecked = childOne && childTwo;

  const handleParentChange = (event) => {
    const newValue = event.target.checked;
    setParent(newValue);
    setChildOne(newValue);
    setChildTwo(newValue);
  };

  const getParentStage = () => {
    if (isIndeterminate) return "indeterminate";
    return isParentChecked ? "checked" : "unchecked";
  };

  return (
    <div>
      <InputCheckbox
        label="All items"
        stage={getParentStage()}
        onChange={handleParentChange}
      />
      <div style={{ marginLeft: '20px' }}>
        <InputCheckbox
          label="Item 1"
          stage={childOne ? "checked" : "unchecked"}
          onChange={(event) => setChildOne(event.target.checked)}
        />
        <InputCheckbox
          label="Item 2"
          stage={childTwo ? "checked" : "unchecked"}
          onChange={(event) => setChildTwo(event.target.checked)}
        />
      </div>
    </div>
  );
}
```

### Intent States

```tsx
import React, { useState } from 'react';
import { InputCheckbox } from '@czi-sds/components';

function IntentExample() {
  const [values, setValues] = useState({
    default: false,
    positive: true,
    notice: false,
    negative: false,
  });

  const handleChange = (key) => (event) => {
    setValues(prev => ({
      ...prev,
      [key]: event.target.checked
    }));
  };

  return (
    <div>
      <InputCheckbox
        label="Default state"
        intent="default"
        stage={values.default ? "checked" : "unchecked"}
        onChange={handleChange('default')}
      />
      
      <InputCheckbox
        label="Success confirmation"
        caption="This option is recommended"
        intent="positive"
        stage={values.positive ? "checked" : "unchecked"}
        onChange={handleChange('positive')}
      />
      
      <InputCheckbox
        label="Warning option"
        caption="Use with caution"
        intent="notice"
        stage={values.notice ? "checked" : "unchecked"}
        onChange={handleChange('notice')}
      />
      
      <InputCheckbox
        label="Error state"
        caption="This option has validation errors"
        intent="negative"
        stage={values.negative ? "checked" : "unchecked"}
        onChange={handleChange('negative')}
      />
    </div>
  );
}
```

### Form Integration

```tsx
import React, { useState } from 'react';
import { InputCheckbox } from '@czi-sds/components';

function FormExample() {
  const [formData, setFormData] = useState({
    notifications: false,
    marketing: false,
    required: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    const value = event.target.checked;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear errors when field is updated
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.required) {
      newErrors.required = 'This field is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    console.log('Form submitted:', formData);
  };

  return (
    <form>
      <InputCheckbox
        name="notifications"
        label="Email notifications"
        caption="Receive important updates via email"
        stage={formData.notifications ? "checked" : "unchecked"}
        onChange={handleChange('notifications')}
      />
      
      <InputCheckbox
        name="marketing"
        label="Marketing communications"
        caption="Receive promotional emails and offers"
        stage={formData.marketing ? "checked" : "unchecked"}
        onChange={handleChange('marketing')}
      />
      
      <InputCheckbox
        name="required"
        label="I agree to the terms of service"
        caption="Required to create an account"
        intent={errors.required ? "negative" : "default"}
        stage={formData.required ? "checked" : "unchecked"}
        onChange={handleChange('required')}
      />
      
      {errors.required && (
        <p style={{ color: 'red', fontSize: '14px' }}>{errors.required}</p>
      )}
      
      <button type="button" onClick={handleSubmit}>
        Submit Form
      </button>
    </form>
  );
}
```

### Size Variations

```tsx
import React, { useState } from 'react';
import { InputCheckbox } from '@czi-sds/components';

function SizeExample() {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <InputCheckbox
        label="Small checkbox"
        size="small"
        stage={checked ? "checked" : "unchecked"}
        onChange={(event) => setChecked(event.target.checked)}
      />
      
      <InputCheckbox
        label="Medium checkbox (default)"
        size="medium"
        stage={checked ? "checked" : "unchecked"}
        onChange={(event) => setChecked(event.target.checked)}
      />
      
      <InputCheckbox
        label="Large checkbox"
        size="large"
        stage={checked ? "checked" : "unchecked"}
        onChange={(event) => setChecked(event.target.checked)}
      />
    </div>
  );
}
```

## Variations

### Stage Variations

- **Unchecked**: Default state, checkbox is not selected
- **Checked**: Selected state, checkbox shows checkmark
- **Indeterminate**: Partial selection state, useful for parent/child relationships

### Size Variations

- **Small**: Compact size for dense interfaces or secondary options
- **Medium**: Standard size for most form applications (default)
- **Large**: Larger size for primary actions or accessibility needs

### Intent Variations

- **Default**: Standard neutral appearance
- **Positive**: Success or recommended state with green accent
- **Notice**: Warning or important state with orange accent
- **Negative**: Error or validation failure state with red accent

## Component States

### Interactive States

- **Default**: Normal interactive state ready for user input
- **Focused**: Active state when checkbox receives keyboard focus
- **Hovered**: Visual feedback when user hovers over the component
- **Disabled**: Non-interactive state preventing user interaction

### Visual States

- **Unchecked**: Empty checkbox showing only border
- **Checked**: Filled checkbox with checkmark icon
- **Indeterminate**: Filled checkbox with minus icon for partial selection

## Best Practices

### When to Use

- Use for boolean choices where users can select multiple options
- Ideal for consent forms, terms of service agreements, and preferences
- Perfect for filter interfaces where multiple criteria can be applied
- Recommended for parent-child selection hierarchies with indeterminate states

### When Not to Use

- Avoid for single-choice scenarios - use InputRadio instead
- Don't use for primary actions - use Button components instead
- Avoid for toggle functionality - use InputToggle for on/off states
- Don't use without labels - checkboxes need clear context

### Accessibility Guidelines

- Always provide meaningful labels that describe what the checkbox controls
- Use captions to provide additional context when necessary
- Ensure adequate color contrast for all visual states
- Support keyboard navigation with Tab and Space key interactions
- Use proper ARIA attributes for screen reader compatibility

### UX Guidelines

- Group related checkboxes together logically
- Use consistent labeling patterns throughout your interface
- Provide clear feedback for validation errors with intent states
- Consider using indeterminate state for hierarchical selections
- Place checkboxes to the left of their labels following common conventions

### Design Guidelines

- Maintain consistent spacing using SDS spacing tokens
- Use semantic colors from the theme palette for intent states
- Follow typography hierarchy for labels and captions
- Ensure touch targets meet minimum size requirements (44px)

## Related Components

- **InputRadio** - Use for single-choice selection from multiple options
- **InputToggle** - Use for on/off states and settings toggles
- **Button** - Use for primary actions and form submissions
- **InputDropdown** - Use when space is limited and you have many options

## Migration Notes

### From Legacy Checkbox Components

- **Prop Changes**: `stage` prop replaces separate `checked` and `indeterminate` props
- **Intent System**: Replace individual color props with `intent` for consistent theming
- **Label Structure**: Labels now support ReactNode for rich content including icons

### Breaking Changes in v2.x

- `stage` prop is now the preferred way to control checkbox state
- `checkboxProps` allows passing additional MUI props for advanced customization
- Default icons updated to use SDS icon system

## API Reference

- [Storybook Stories](https://main--61e887d0928073003a395016.chromatic.com/?path=/story/components-inputs-inputcheckbox) - Interactive examples and testing
- [Material UI Checkbox](https://mui.com/material-ui/react-checkbox/) - Underlying MUI component documentation
- [Design Tokens](https://zeroheight.com/2a1e5182b/p/6162b6-design-tokens) - Available theme tokens and styling options