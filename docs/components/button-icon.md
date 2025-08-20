# ButtonIcon

## Overview

The ButtonIcon component is a specialized icon-only button designed for compact interfaces and toolbar actions. It extends Material-UI's IconButton component with Science Design System styling. **Note: This component is deprecated and will be removed in the next major version.** Please use `Button` with `sdsStyle="icon"` instead for new implementations.

## Installation & Import

```tsx
import { ButtonIcon } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| icon | `keyof IconNameToSizes \| ReactElement` | ✓ | - | The icon to display (icon name or custom SVG element) |
| disabled | `boolean` | - | `false` | If `true`, the component is disabled |
| onClick | `MouseEventHandler<HTMLButtonElement>` | - | - | Click event handler |
| className | `string` | - | - | Standard React className prop |
| style | `CSSProperties` | - | - | Standard React style prop |
| id | `string` | - | - | Standard React id prop |
| children | `ReactNode` | - | - | Content to display (typically not used for icon buttons) |

### SDS-Specific Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| sdsSize | `"small" \| "medium" \| "large"` | - | `"large"` | Size of the button |
| sdsType | `"primary" \| "secondary" \| "tertiary"` | - | `"primary"` | Type/variant of the button |
| sdsIconProps | `Partial<IconProps>` | - | - | Additional props to pass to the Icon component |

### Deprecated Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| sdsIcon | `keyof IconNameToSizes \| ReactElement` | - | - | **Deprecated:** Use `icon` prop instead |

## Usage Examples

### Basic Usage (Deprecated - Use Button Instead)

```tsx
import React from 'react';
import { ButtonIcon } from '@czi-sds/components';

function MyComponent() {
  return (
    <ButtonIcon
      icon="Settings"
      sdsType="primary"
      sdsSize="large"
      aria-label="Settings"
      onClick={() => console.log('Settings clicked')}
    />
  );
}
```

### Recommended Migration to Button

```tsx
import React from 'react';
import { Button } from '@czi-sds/components';

function MigratedComponent() {
  return (
    <Button
      sdsStyle="icon"
      sdsType="primary"
      sdsSize="large"
      icon="Settings"
      aria-label="Settings"
      onClick={() => console.log('Settings clicked')}
    />
  );
}
```

### Advanced Usage with Custom Icons

```tsx
import React from 'react';
import { ButtonIcon } from '@czi-sds/components';

// Custom SVG component
const CustomIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

function CustomIconExample() {
  return (
    <ButtonIcon
      icon={<CustomIcon />}
      sdsType="secondary"
      sdsSize="medium"
      aria-label="Custom star icon"
      onClick={() => console.log('Custom icon clicked')}
    />
  );
}
```

### With Theme Integration

```tsx
import React from 'react';
import { ButtonIcon, getColors } from '@czi-sds/components';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  ${(props) => {
    const colors = getColors(props);
    return `
      background-color: ${colors?.gray[100]};
      padding: 8px;
      border-radius: 4px;
      display: inline-block;
    `;
  }}
`;

function ThemedExample() {
  return (
    <StyledContainer>
      <ButtonIcon
        icon="Edit"
        sdsType="tertiary"
        sdsSize="medium"
        aria-label="Edit item"
        onClick={() => console.log('Edit clicked')}
      />
    </StyledContainer>
  );
}
```

## Variations

### Type Variations

- **primary**: High emphasis with solid background (default)
- **secondary**: Medium emphasis with outlined appearance
- **tertiary**: Low emphasis with minimal visual weight

### Size Variations

- **small**: Compact size for dense interfaces (maps to "s" icon size)
- **medium**: Standard size for most use cases (maps to "l" icon size)
- **large**: Larger size for emphasis or touch interfaces (maps to "xl" icon size)

## Component States

- **Default**: Normal interactive state with hover and focus effects
- **Disabled**: Non-interactive state with reduced opacity
- **Focus**: Keyboard focus state with visible focus ring
- **Active**: Pressed state with visual feedback

## Best Practices

### When to Use (Migration Context)

- **Legacy Support**: Only use for maintaining existing implementations during migration
- **Icon Actions**: Previously ideal for toolbar actions and compact interfaces
- **Secondary Actions**: Good for supplementary actions that don't need text labels

### When Not to Use

- **New Implementations**: Use `Button` with `sdsStyle="icon"` instead
- **Primary Actions**: Avoid for main actions that benefit from text labels
- **Complex Actions**: Don't use for actions that need additional context

### Accessibility Guidelines

- **Always include `aria-label`** or `aria-labelledby` for screen readers
- Supports keyboard navigation with Enter and Space keys
- Maintains proper focus management and visual focus indicators
- Ensure sufficient color contrast for all button states
- Minimum touch target size of 44x44px for mobile interfaces

### Migration Guidelines

- Replace `ButtonIcon` with `Button` and `sdsStyle="icon"`
- Update `sdsIcon` prop to `icon` prop
- Maintain the same `sdsType` and `sdsSize` values
- Keep all accessibility attributes unchanged

## Related Components

- **Button** - Modern replacement with `sdsStyle="icon"`
- **ButtonDropdown** - For icon buttons with dropdown functionality
- **Icon** - Standalone icon component used internally
- **ButtonToggle** - For toggle/switch icon actions

## Migration Notes

- **Deprecated Component**: This component is deprecated and will be removed in the next major version
- **Replacement Path**: Use `Button` with `sdsStyle="icon"` for all new implementations
- **Breaking Changes**: The `sdsIcon` prop is deprecated in favor of `icon`
- **Size Mapping**: Component sizes map to different icon sizes (small→s, medium→l, large→xl)

### Migration Examples

```tsx
// OLD (deprecated)
<ButtonIcon
  sdsIcon="Settings"
  sdsType="primary"
  sdsSize="large"
  aria-label="Settings"
/>

// NEW (recommended)
<Button
  sdsStyle="icon"
  icon="Settings"
  sdsType="primary"
  sdsSize="large"
  aria-label="Settings"
/>
```

## API Reference

- [Storybook Stories](https://main--61e7b0c7c7b2df00213dc295.chromatic.com/?path=/story/deprecated-buttonicon-deprecated) - Interactive examples and testing (Deprecated section)
- [Material UI IconButton](https://mui.com/material-ui/react-button/#icon-buttons) - Underlying MUI component documentation
- [Button Component](./button.md) - Recommended replacement component