# MenuItem

## Overview

The MenuItem component represents individual selectable options within a Menu component. It provides a consistent interface for menu actions, supports icons, keyboard navigation, and various states including selection, disabled states, and multi-select functionality. MenuItem components are designed to work seamlessly within Menu containers while offering flexible content and interaction patterns.

## Installation & Import

```tsx
import { MenuItem } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `ReactNode` | - | - | The content of the component |
| disabled | `boolean` | - | `false` | If true, the component is disabled |
| value | `string \| number \| readonly string[]` | - | - | The value of the menu item |
| icon | `any` | - | - | Icon element to display |
| column | `ReactNode` | - | - | Additional column content |
| isMultiSelect | `boolean` | - | - | Enable multi-select behavior with checkboxes |
| sdsIcon | `any` | - | - | ⚠️ **Deprecated**: Use `icon` instead |
| sdsIconProps | `IconProps<IconName>` | - | - | Props for SDS icon configuration |
| onClick | `function` | - | - | Callback fired when the menu item is clicked |

### SDS-Specific Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| sdsStyle | `"determinate" \| "indeterminate"` | - | - | Visual style variant of the component |
| sdsType | `"action" \| "default"` | - | - | Type/variant of the component |

## Usage Examples

### Basic Usage

```tsx
import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@czi-sds/components';

function BasicMenuItemExample() {
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
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        <MenuItem onClick={() => handleMenuItemClick('profile')}>
          View Profile
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('settings')}>
          Settings
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('logout')}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
```

### With Icons and SDS Styling

```tsx
import React, { useState } from 'react';
import { Menu, MenuItem, Button, Icon } from '@czi-sds/components';

function IconMenuItemExample() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: string) => {
    console.log(`Action: ${action}`);
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleClick} sdsType="primary">
        Actions
      </Button>
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        <MenuItem 
          onClick={() => handleAction('edit')}
          icon={<Icon sdsIcon="Edit" sdsSize="s" />}
          sdsType="action"
        >
          Edit Item
        </MenuItem>
        <MenuItem 
          onClick={() => handleAction('copy')}
          icon={<Icon sdsIcon="Copy" sdsSize="s" />}
          sdsType="action"
        >
          Copy
        </MenuItem>
        <MenuItem 
          onClick={() => handleAction('delete')}
          icon={<Icon sdsIcon="TrashCan" sdsSize="s" />}
          sdsType="action"
          disabled
        >
          Delete (Unavailable)
        </MenuItem>
      </Menu>
    </div>
  );
}
```

### Multi-Select MenuItems

```tsx
import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@czi-sds/components';

function MultiSelectMenuItemExample() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['published']);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filters = [
    { value: 'published', label: 'Published Papers' },
    { value: 'preprint', label: 'Preprints' },
    { value: 'peer-reviewed', label: 'Peer Reviewed' },
    { value: 'open-access', label: 'Open Access' },
  ];

  return (
    <div>
      <Button onClick={handleClick}>
        Filters ({selectedFilters.length} selected)
      </Button>
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl} variant="menu">
        {filters.map((filter) => (
          <MenuItem
            key={filter.value}
            isMultiSelect
            selected={selectedFilters.includes(filter.value)}
            onClick={() => handleToggleFilter(filter.value)}
            value={filter.value}
          >
            {filter.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
```

### MenuItems with Additional Columns

```tsx
import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@czi-sds/components';

function ColumnMenuItemExample() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectDataset = (dataset: string) => {
    console.log(`Selected dataset: ${dataset}`);
    handleClose();
  };

  const datasets = [
    { id: '1', name: 'COVID-19 Research', size: '2.3 GB', lastModified: '2 days ago' },
    { id: '2', name: 'Cancer Genomics', size: '4.7 GB', lastModified: '1 week ago' },
    { id: '3', name: 'Neural Networks', size: '1.2 GB', lastModified: '3 days ago' },
  ];

  return (
    <div>
      <Button onClick={handleClick}>
        Select Dataset
      </Button>
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        {datasets.map((dataset) => (
          <MenuItem
            key={dataset.id}
            onClick={() => handleSelectDataset(dataset.name)}
            column={
              <div style={{ textAlign: 'right', fontSize: '12px', opacity: 0.7 }}>
                <div>{dataset.size}</div>
                <div>{dataset.lastModified}</div>
              </div>
            }
          >
            {dataset.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
```

### Determinate vs Indeterminate Styles

```tsx
import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@czi-sds/components';

function StyleVariantMenuItemExample() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [processingItems, setProcessingItems] = useState<string[]>(['item2']);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProcess = (itemId: string) => {
    setProcessingItems(prev => [...prev, itemId]);
    // Simulate processing
    setTimeout(() => {
      setProcessingItems(prev => prev.filter(id => id !== itemId));
    }, 2000);
    handleClose();
  };

  const items = [
    { id: 'item1', label: 'Process Dataset A' },
    { id: 'item2', label: 'Process Dataset B' },
    { id: 'item3', label: 'Process Dataset C' },
  ];

  return (
    <div>
      <Button onClick={handleClick}>
        Processing Queue
      </Button>
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        {items.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => handleProcess(item.id)}
            sdsStyle={processingItems.includes(item.id) ? "indeterminate" : "determinate"}
            disabled={processingItems.includes(item.id)}
          >
            {item.label} {processingItems.includes(item.id) && '(Processing...)'}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
```

### With Value and Advanced Selection

```tsx
import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@czi-sds/components';

function ValueMenuItemExample() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedValue, setSelectedValue] = useState<string>('option2');
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectValue = (value: string) => {
    setSelectedValue(value);
    handleClose();
  };

  const options = [
    { value: 'option1', label: 'Show All Data' },
    { value: 'option2', label: 'Show Filtered Data' },
    { value: 'option3', label: 'Show Summary Only' },
  ];

  return (
    <div>
      <Button onClick={handleClick}>
        Display Mode: {options.find(o => o.value === selectedValue)?.label}
      </Button>
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            selected={selectedValue === option.value}
            onClick={() => handleSelectValue(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
```

### Complex MenuItem Content

```tsx
import React, { useState } from 'react';
import { Menu, MenuItem, Button, Icon } from '@czi-sds/components';

function ComplexMenuItemExample() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectFile = (fileName: string) => {
    console.log(`Selected file: ${fileName}`);
    handleClose();
  };

  const recentFiles = [
    {
      name: 'experiment_data.csv',
      path: '/datasets/experiment_data.csv',
      size: '2.3 MB',
      modified: '2 hours ago',
      type: 'csv'
    },
    {
      name: 'analysis_results.json',
      path: '/results/analysis_results.json',
      size: '456 KB',
      modified: '1 day ago',
      type: 'json'
    },
    {
      name: 'research_paper.pdf',
      path: '/documents/research_paper.pdf',
      size: '1.8 MB',
      modified: '3 days ago',
      type: 'pdf'
    },
  ];

  return (
    <div>
      <Button onClick={handleClick}>
        Recent Files
      </Button>
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        {recentFiles.map((file, index) => (
          <MenuItem
            key={index}
            onClick={() => handleSelectFile(file.name)}
            icon={<Icon sdsIcon="Document" sdsSize="s" />}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ fontWeight: 'medium' }}>{file.name}</div>
              <div style={{ fontSize: '12px', opacity: 0.7, display: 'flex', gap: '12px' }}>
                <span>{file.size}</span>
                <span>•</span>
                <span>{file.modified}</span>
              </div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
```

## Variations

### Type Variations

- **default**: Standard menu item appearance
- **action**: Enhanced styling for action-oriented items

### Style Variations

- **determinate**: Clear, defined appearance for completed or stable states
- **indeterminate**: Visual indication of ongoing processes or uncertain states

## Component States

- **Default**: Normal interactive state
- **Hover**: Enhanced appearance on mouse hover
- **Selected**: Visually distinct state for selected items
- **Disabled**: Non-interactive state with reduced opacity
- **Focus**: Keyboard focus state with proper visual indicators
- **Multi-Select**: Checkbox-enabled state for multiple selections

## Best Practices

### When to Use

- Create individual options within Menu components
- Build dropdown navigation or action menus
- Implement selection interfaces with single or multiple options
- Display contextual actions for specific items
- Create settings or configuration option lists

### When Not to Use

- As standalone interactive elements (use Button instead)
- For primary navigation (use dedicated navigation components)
- When all options should be visible simultaneously
- In forms where other input types are more appropriate

### Accessibility Guidelines

- MenuItem automatically inherits keyboard navigation from parent Menu
- Supports Enter and Space keys for selection
- Proper ARIA attributes for screen readers
- Focus management handles navigation between items
- Selected and disabled states are announced to assistive technologies
- Multi-select items include proper checkbox semantics

### Design Guidelines

- Maintain consistent spacing and typography within menu groups
- Use icons sparingly and ensure they add meaningful context
- Group related items and consider separators for organization
- Ensure adequate touch targets for mobile interfaces
- Align content consistently across menu items

### Content Guidelines

- Use clear, concise labels that describe the action or option
- Maintain parallel structure in menu item text
- Consider keyboard shortcuts for frequently used actions
- Group related functionality logically
- Provide visual feedback for dangerous or irreversible actions

## Related Components

- **Menu** - Container component for MenuItem elements
- **Button** - For standalone actions outside of menus
- **Icon** - For adding visual context to menu items
- **Dropdown** - Alternative component for select-style interactions

## Migration Notes

### Deprecated Props

- **sdsIcon**: Use `icon` prop instead for better consistency
- The `sdsIcon` prop will be removed in a future major version

#### Before (Deprecated)
```tsx
<MenuItem sdsIcon="Edit">
  Edit Item
</MenuItem>
```

#### After (Recommended)
```tsx
<MenuItem icon={<Icon sdsIcon="Edit" sdsSize="s" />}>
  Edit Item
</MenuItem>
```

## API Reference

- [Menu Component](menu.md) - Parent container component documentation
- [Icon Component](icon.md) - For adding icons to menu items
- [Storybook Stories](link-to-storybook) - Interactive examples and testing
- [Material UI MenuItem](https://mui.com/material-ui/react-menu/#menuitem) - Underlying MUI component documentation
- [Design Tokens](../design-tokens.md) - Available theme tokens and values