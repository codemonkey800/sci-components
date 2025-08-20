# ButtonDropdown

## Overview

The ButtonDropdown component is a specialized button that indicates the presence of a dropdown menu or additional options. It extends the standard Button component by automatically adding a chevron-down icon to indicate expandable functionality. This component is ideal for triggering menus, showing additional actions, or revealing hierarchical content in scientific applications.

## Installation & Import

```tsx
import { ButtonDropdown } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `ReactNode` | Conditional | - | The content of the component. Required for rounded/square styles, not used for icon style |
| disabled | `boolean` | - | `false` | If `true`, the component is disabled |
| onClick | `MouseEventHandler<HTMLButtonElement>` | - | - | Click event handler for the button |
| className | `string` | - | - | Standard React className prop |
| style | `CSSProperties` | - | - | Standard React style prop |
| id | `string` | - | - | Standard React id prop |

### SDS-Specific Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| sdsStyle | `"rounded" \| "square" \| "icon"` | ✓ | - | Visual style variant of the button dropdown |
| sdsType | `"primary" \| "secondary" \| "tertiary" \| "destructive"` | ✓ | - | Type/variant of the button dropdown |
| sdsSize | `"small" \| "medium" \| "large"` | - | `"medium"` | Size of the button (only applies to icon style) |
| icon | `keyof IconNameToSizes \| ReactElement` | Conditional | - | The icon to display. Required for icon style, optional for rounded/square styles |
| sdsIconProps | `Partial<IconProps>` | - | - | Additional props to pass to the Icon component |

## Usage Examples

### Basic Usage

```tsx
import React, { useState } from 'react';
import { ButtonDropdown, Menu, MenuItem } from '@czi-sds/components';

function MyComponent() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonDropdown
        sdsStyle="rounded"
        sdsType="primary"
        onClick={handleClick}
      >
        Download Options
      </ButtonDropdown>
      
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Download CSV</MenuItem>
        <MenuItem onClick={handleClose}>Download PDF</MenuItem>
        <MenuItem onClick={handleClose}>Download JSON</MenuItem>
      </Menu>
    </>
  );
}
```

### Advanced Usage

```tsx
import React, { useState } from 'react';
import { ButtonDropdown, Menu, MenuItem, Icon } from '@czi-sds/components';

function AdvancedExample() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAction, setSelectedAction] = useState('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuAction = (action: string) => {
    setSelectedAction(action);
    setAnchorEl(null);
    // Perform action
    console.log(`Selected action: ${action}`);
  };

  return (
    <>
      <ButtonDropdown
        sdsStyle="square"
        sdsType="secondary"
        icon="Settings"
        onClick={handleClick}
        disabled={false}
      >
        Actions
      </ButtonDropdown>
      
      <ButtonDropdown
        sdsStyle="icon"
        sdsType="tertiary"
        icon="MoreHoriz"
        sdsSize="medium"
        onClick={handleClick}
      />

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => handleMenuAction('edit')}>
          <Icon sdsIcon="Edit" sdsSize="s" />
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('duplicate')}>
          <Icon sdsIcon="Copy" sdsSize="s" />
          Duplicate
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('delete')}>
          <Icon sdsIcon="Trash" sdsSize="s" />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}
```

### With Theme Integration

```tsx
import React, { useState } from 'react';
import { ButtonDropdown, getColors, getSpaces } from '@czi-sds/components';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    return `
      background-color: ${colors?.gray[100]};
      padding: ${spaces?.l}px;
      border-radius: 8px;
      display: flex;
      gap: ${spaces?.m}px;
    `;
  }}
`;

function ThemedExample() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <StyledContainer>
      <ButtonDropdown
        sdsStyle="rounded"
        sdsType="primary"
        icon="Download"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        Export Data
      </ButtonDropdown>
      
      <ButtonDropdown
        sdsStyle="icon"
        sdsType="secondary"
        icon="Filter"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      />
    </StyledContainer>
  );
}
```

## Variations

### Style Variations

- **rounded**: Standard button with rounded corners and chevron indicator
- **square**: Button with sharp corners and chevron indicator for modern interfaces
- **icon**: Icon-only button with dropdown indicator (uses ButtonIcon internally)

### Type Variations

- **primary**: High emphasis dropdown actions (contained style)
- **secondary**: Medium emphasis dropdown actions (outlined style)  
- **tertiary**: Low emphasis dropdown actions (text style)
- **destructive**: Dangerous dropdown actions with warning styling

### Size Variations (Icon Style Only)

- **small**: Compact dropdown button for dense interfaces
- **medium**: Standard size for most use cases
- **large**: Larger size for emphasis or touch interfaces

## Component States

- **Default**: Normal interactive state with hover effects
- **Disabled**: Non-interactive state with reduced opacity
- **Open**: Visual indication when associated dropdown is expanded (handled externally)

## Best Practices

### When to Use

- Use when you need to show multiple related actions that can be grouped under one button
- Ideal for export options, contextual menus, and action groups
- Perfect for space-constrained interfaces where multiple actions need to be accessible
- Use icon style for toolbar buttons with dropdown functionality

### When Not to Use

- Don't use for single actions - use regular Button instead
- Avoid for primary navigation - consider NavigationHeader or Tabs instead
- Don't use when immediate action is expected without additional choices

### Accessibility Guidelines

- Component includes proper ARIA attributes for dropdown buttons
- Supports keyboard navigation (Enter/Space to open, Escape to close)
- Works with screen readers to announce dropdown availability
- Maintains focus management between button and associated menu
- Chevron icon is purely decorative and hidden from screen readers

### Design Guidelines

- Always pair with Menu or similar dropdown component
- Maintain consistent spacing using theme tokens
- Use semantic icons that clearly communicate the action group
- Ensure sufficient contrast for all button states
- Position dropdown menus appropriately relative to the button

## Related Components

- **Button** - Use for single actions without dropdown functionality
- **Menu** - Essential companion component for dropdown content
- **MenuItem** - Individual options within dropdown menus
- **ButtonIcon** - Alternative for icon-only actions without dropdown

## Migration Notes

- **Required Props**: Both `sdsStyle` and `sdsType` are required in the current version
- **Icon Integration**: Icon style uses ButtonIcon component internally
- **Minimal Style**: Minimal style is not supported for dropdown buttons (shows warning)

## API Reference

- [Storybook Stories](https://main--61e7b0c7c7b2df00213dc295.chromatic.com/?path=/story/components-buttons-buttondropdown) - Interactive examples and testing
- [Material UI Menu](https://mui.com/material-ui/react-menu/) - Companion dropdown component documentation
- [Design Tokens](https://zeroheight.com/2e0e8f7fc/p/6138ce-design-tokens) - Available theme tokens and values