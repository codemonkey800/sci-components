# Menu

## Overview

The Menu component provides a container for displaying a list of menu options in a popup overlay. It's typically used with MenuItem components to create dropdown menus, context menus, and other overlay-based navigation elements. The Menu component handles positioning, backdrop interactions, and keyboard navigation while providing a flexible container for menu content.

## Installation & Import

```tsx
import { Menu } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| open | `boolean` | ✓ | - | If true, the component is shown |
| children | `ReactNode` | - | - | Menu contents, normally `MenuItem`s |
| onClose | `"backdropClick" \| "escapeKeyDown"` | - | - | Callback fired when the component requests to be closed |
| variant | `"menu" \| "selectedMenu"` | - | `"selectedMenu"` | The variant to use. Use `menu` to prevent selected items from impacting the initial focus |

## Usage Examples

### Basic Usage

```tsx
import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@czi-sds/components';

function BasicMenuExample() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action: string) => {
    console.log(`Selected: ${action}`);
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleClick}>
        Open Menu
      </Button>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        <MenuItem onClick={() => handleMenuItemClick('edit')}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('duplicate')}>
          Duplicate
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('delete')}>
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
```

### Context Menu

```tsx
import React, { useState } from 'react';
import { Menu, MenuItem } from '@czi-sds/components';

interface ContextMenuState {
  mouseX: number;
  mouseY: number;
  open: boolean;
}

function ContextMenuExample() {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    mouseX: 0,
    mouseY: 0,
    open: false,
  });

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
      open: true,
    });
  };

  const handleClose = () => {
    setContextMenu({ ...contextMenu, open: false });
  };

  const handleAction = (action: string) => {
    console.log(`Context menu action: ${action}`);
    handleClose();
  };

  return (
    <div>
      <div
        onContextMenu={handleContextMenu}
        style={{
          width: 300,
          height: 200,
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed #ccc',
        }}
      >
        Right-click me for context menu
      </div>
      <Menu
        open={contextMenu.open}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{
          top: contextMenu.mouseY,
          left: contextMenu.mouseX,
        }}
      >
        <MenuItem onClick={() => handleAction('copy')}>
          Copy
        </MenuItem>
        <MenuItem onClick={() => handleAction('paste')}>
          Paste
        </MenuItem>
        <MenuItem disabled>
          Cut
        </MenuItem>
      </Menu>
    </div>
  );
}
```

### Menu with Icons and Nested Structure

```tsx
import React, { useState } from 'react';
import { Menu, MenuItem, Button, Icon } from '@czi-sds/components';

function IconMenuExample() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = (action: string) => {
    console.log(`Action: ${action}`);
    handleClose();
  };

  return (
    <div>
      <Button 
        onClick={handleClick}
        sdsType="primary"
        sdsStyle="rounded"
      >
        File Menu
      </Button>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        <MenuItem 
          onClick={() => handleMenuAction('new')}
          icon={<Icon sdsIcon="Plus" sdsSize="s" />}
        >
          New File
        </MenuItem>
        <MenuItem 
          onClick={() => handleMenuAction('open')}
          icon={<Icon sdsIcon="Open" sdsSize="s" />}
        >
          Open
        </MenuItem>
        <MenuItem 
          onClick={() => handleMenuAction('save')}
          icon={<Icon sdsIcon="Save" sdsSize="s" />}
        >
          Save
        </MenuItem>
        <MenuItem 
          onClick={() => handleMenuAction('download')}
          icon={<Icon sdsIcon="Download" sdsSize="s" />}
        >
          Download
        </MenuItem>
      </Menu>
    </div>
  );
}
```

### Multi-Select Menu

```tsx
import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@czi-sds/components';

function MultiSelectMenuExample() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['option1']);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleOption = (option: string) => {
    setSelectedOptions(prev => 
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const options = [
    { value: 'option1', label: 'Show Metadata' },
    { value: 'option2', label: 'Show Thumbnails' },
    { value: 'option3', label: 'Show Details' },
    { value: 'option4', label: 'Show Timeline' },
  ];

  return (
    <div>
      <Button onClick={handleClick}>
        View Options ({selectedOptions.length})
      </Button>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        variant="menu" // Prevents focus management for multi-select
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            isMultiSelect
            selected={selectedOptions.includes(option.value)}
            onClick={() => handleToggleOption(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
```

### Menu with Keyboard Navigation

```tsx
import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@czi-sds/components';

function KeyboardMenuExample() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (reason?: string) => {
    console.log(`Menu closed due to: ${reason}`);
    setAnchorEl(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick(event as any);
    }
  };

  const actions = [
    { id: 'search', label: 'Search Data', shortcut: 'Ctrl+F' },
    { id: 'filter', label: 'Apply Filters', shortcut: 'Ctrl+Shift+F' },
    { id: 'sort', label: 'Sort Results', shortcut: 'Ctrl+S' },
    { id: 'export', label: 'Export Data', shortcut: 'Ctrl+E' },
  ];

  return (
    <div>
      <Button 
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        Actions Menu (Try keyboard navigation)
      </Button>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        {actions.map((action) => (
          <MenuItem
            key={action.id}
            onClick={() => {
              console.log(`Action: ${action.id}`);
              handleClose('itemClick');
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span>{action.label}</span>
              <span style={{ opacity: 0.6, fontSize: '12px', marginLeft: '24px' }}>
                {action.shortcut}
              </span>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
```

### Menu with Theme Integration

```tsx
import React, { useState } from 'react';
import { Menu, MenuItem, Button, getColors } from '@czi-sds/components';
import styled from '@emotion/styled';

const ThemedMenuContainer = styled.div`
  ${(props) => {
    const colors = getColors(props);
    return `
      padding: 20px;
      background-color: ${colors?.gray[50]};
      border-radius: 8px;
    `;
  }}
`;

function ThemedMenuExample() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemedMenuContainer>
      <Button onClick={handleClick} sdsType="primary">
        Themed Menu
      </Button>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        <MenuItem onClick={handleClose}>
          Option 1
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Option 2
        </MenuItem>
        <MenuItem disabled>
          Disabled Option
        </MenuItem>
      </Menu>
    </ThemedMenuContainer>
  );
}
```

## Variations

### Variant Variations

- **selectedMenu** (default): Standard menu behavior with focus management for selected items
- **menu**: Alternative behavior that prevents selected items from affecting initial focus

## Component States

- **Closed**: Menu is hidden and not interactive
- **Open**: Menu is visible and interactive with keyboard navigation support
- **Opening**: Brief transition state when menu is appearing
- **Closing**: Brief transition state when menu is disappearing

## Best Practices

### When to Use

- Create dropdown menus for navigation or actions
- Implement context menus for right-click interactions
- Build selection menus with multiple options
- Display overflow actions when space is limited
- Create settings or configuration menus

### When Not to Use

- For simple binary choices (use Toggle or Checkbox instead)
- When all options should be visible (consider using Button groups)
- For primary navigation (use dedicated navigation components)
- In mobile interfaces where native patterns are more appropriate

### Accessibility Guidelines

- Menu automatically manages focus and keyboard navigation
- Supports Arrow keys for navigation, Enter/Space for selection, and Escape to close
- Proper ARIA attributes are applied for screen reader support
- Focus is returned to the trigger element when menu closes
- Supports both mouse and keyboard interactions seamlessly

### Design Guidelines

- Position menus to avoid viewport edges when possible
- Maintain consistent menu styling across your application
- Group related menu items logically
- Use separators or grouping for long menu lists
- Ensure adequate touch targets for mobile interfaces

### Interaction Patterns

- **Click/Tap**: Opens menu and selects items
- **Keyboard Navigation**: Arrow keys navigate, Enter selects, Escape closes
- **Backdrop Click**: Closes menu when clicking outside
- **Focus Management**: Proper focus flow for accessibility

## Related Components

- **MenuItem** - Individual menu option components (used within Menu)
- **Button** - Often used as menu triggers
- **Dropdown** - Alternative component for select-style interactions
- **NavigationHeader** - For primary navigation menus

## API Reference

- [MenuItem Component](menu-item.md) - Individual menu item documentation
- [Storybook Stories](link-to-storybook) - Interactive examples and testing
- [Material UI Menu](https://mui.com/material-ui/react-menu/) - Underlying MUI component documentation
- [Design Tokens](../design-tokens.md) - Available theme tokens and values