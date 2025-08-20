# Button

## Overview

The Button component is a fundamental interactive element that triggers actions when clicked. It extends Material-UI's Button component with Science Design System styling and provides multiple visual styles (rounded, square, minimal, icon) and types (primary, secondary, tertiary, destructive) to support different use cases and interaction patterns throughout scientific applications.

## Installation & Import

```tsx
import { Button } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `ReactNode` | Conditional | - | The content of the component. Required for all styles except "icon" |
| disabled | `boolean` | - | `false` | If `true`, the component is disabled |
| onClick | `MouseEventHandler<HTMLButtonElement>` | - | - | Click event handler |
| fullWidth | `boolean` | - | `false` | If `true`, the button will take up the full width of its container |
| href | `string` | - | - | The URL to link to when the button is clicked. If defined, an `a` element will be used as the root node |
| target | `HTMLAttributeAnchorTarget` | - | - | The target attribute for links (_blank, _self, etc.) |
| className | `string` | - | - | Standard React className prop |
| style | `CSSProperties` | - | - | Standard React style prop |
| id | `string` | - | - | Standard React id prop |

### SDS-Specific Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| sdsStyle | `"rounded" \| "square" \| "minimal" \| "icon"` | ✓ | - | Visual style variant of the button |
| sdsType | `"primary" \| "secondary" \| "tertiary" \| "destructive"` | - | `"primary"` | Type/variant of the button |
| sdsSize | `"small" \| "medium" \| "large"` | - | `"medium"` | Size of the button (only applies to icon style) |
| isAllCaps | `boolean` | - | `true` for minimal, `false` for others | Whether text should be displayed in all caps |

### Icon-Specific Props (when sdsStyle="icon")

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| icon | `keyof IconNameToSizes \| ReactElement` | ✓ | - | The icon to display (icon name or custom SVG element) |
| sdsIconProps | `Partial<IconProps>` | - | - | Additional props to pass to the Icon component |

## Usage Examples

### Basic Usage

```tsx
import React from 'react';
import { Button } from '@czi-sds/components';

function MyComponent() {
  return (
    <Button
      sdsStyle="rounded"
      sdsType="primary"
      onClick={() => console.log('clicked')}
    >
      Click Me
    </Button>
  );
}
```

### Advanced Usage

```tsx
import React, { useState } from 'react';
import { Button } from '@czi-sds/components';

function AdvancedExample() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitForm();
    } catch (error) {
      console.error('Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        sdsStyle="rounded"
        sdsType="primary"
        disabled={loading}
        fullWidth
        onClick={handleSubmit}
      >
        {loading ? 'Submitting...' : 'Submit Form'}
      </Button>
      
      <Button
        sdsStyle="minimal"
        sdsType="secondary"
        onClick={() => console.log('cancel')}
      >
        Cancel
      </Button>
      
      <Button
        sdsStyle="icon"
        sdsType="tertiary"
        icon="Settings"
        onClick={() => console.log('settings')}
      />
    </>
  );
}
```

### With Theme Integration

```tsx
import React from 'react';
import { Button, getColors } from '@czi-sds/components';
import styled from '@emotion/styled';

const CustomWrapper = styled.div`
  ${(props) => {
    const colors = getColors(props);
    return `
      background-color: ${colors?.primary[100]};
      padding: 16px;
      border-radius: 8px;
    `;
  }}
`;

function ThemedExample() {
  return (
    <CustomWrapper>
      <Button
        sdsStyle="rounded"
        sdsType="primary"
        onClick={() => console.log('themed button')}
      >
        Themed Button
      </Button>
    </CustomWrapper>
  );
}
```

## Variations

### Style Variations

- **rounded**: Standard button with rounded corners for most use cases
- **square**: Button with sharp corners for modern, geometric interfaces
- **minimal**: Text-only button with minimal visual weight for subtle actions
- **icon**: Icon-only button for compact interfaces and toolbar actions

### Type Variations

- **primary**: High emphasis actions (contained style)
- **secondary**: Medium emphasis actions (outlined style)
- **tertiary**: Low emphasis actions (text style)
- **destructive**: Dangerous or irreversible actions (contained, warning colors)

### Size Variations (Icon Style Only)

- **small**: Compact size for dense interfaces
- **medium**: Standard size for most use cases
- **large**: Larger size for emphasis or touch interfaces

## Component States

- **Default**: Normal interactive state with hover and focus effects
- **Disabled**: Non-interactive state with reduced opacity
- **Loading**: Can be implemented by disabling button and changing text content

## Best Practices

### When to Use

- Use **rounded** buttons for primary actions and standard interfaces
- Use **square** buttons for modern, geometric design systems
- Use **minimal** buttons for secondary actions that shouldn't compete with primary actions
- Use **icon** buttons for toolbar actions and when space is limited
- Use **destructive** type for dangerous actions like delete, remove, or permanent changes

### When Not to Use

- Avoid using destructive buttons for non-destructive actions
- Don't use icon buttons without providing accessible labels or tooltips
- Avoid minimal buttons for critical actions that need visual emphasis

### Accessibility Guidelines

- All buttons include proper ARIA attributes for screen readers
- Supports keyboard navigation with Enter and Space keys
- Maintains proper focus management and visual focus indicators
- Icon buttons should include `aria-label` or be wrapped with proper labeling
- Color contrast meets WCAG AA guidelines for all button states

### Design Guidelines

- Follow spacing guidelines using theme tokens (8px grid system)
- Maintain consistent typography using font mixins from the design system
- Use semantic colors from the theme palette
- Ensure sufficient touch target size (minimum 44x44px for mobile)
- Group related buttons logically with appropriate spacing

## Related Components

- **ButtonDropdown** - Use for actions that reveal additional options
- **ButtonIcon** - Dedicated icon button component with more customization
- **ButtonToggle** - Use for toggle/switch actions
- **Link** - Use for navigation actions instead of buttons

## Migration Notes

- **Breaking Changes**: `sdsStyle` prop is required in the latest version
- **Icon Integration**: Icon buttons now use the ButtonIcon component internally
- **Type System**: Button types are now strictly typed based on the style chosen

## API Reference

- [Storybook Stories](https://main--61e7b0c7c7b2df00213dc295.chromatic.com/?path=/story/components-buttons-button) - Interactive examples and testing
- [Material UI Button](https://mui.com/material-ui/react-button/) - Underlying MUI component documentation
- [Design Tokens](https://zeroheight.com/2e0e8f7fc/p/6138ce-design-tokens) - Available theme tokens and values