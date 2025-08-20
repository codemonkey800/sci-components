# Autocomplete

## Overview

The Autocomplete component is a searchable dropdown input that provides auto-suggestions as users type. It supports both single and multiple selections, and can be configured with single-column or multi-column layouts. Built on Material-UI's Autocomplete component, it integrates seamlessly with the Science Design System's design tokens and styling.

The component is ideal for scenarios where users need to select from a large list of options, search through datasets, or filter content dynamically. It provides an enhanced user experience with keyboard navigation, accessibility features, and flexible customization options.

## Installation & Import

```tsx
import { Autocomplete } from '@czi-sds/components';
```

## Props

### Core Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `options` | `SDSAutocompleteOptions<T, Multiple, DisableClearable, FreeSolo>` | ✓ | - | Array of options for single-column or multi-column configuration |
| `onChange` | `SDSAutocompleteOnChange<T, Multiple, DisableClearable, FreeSolo>` | - | - | Callback fired when the value changes |
| `value` | `SDSAutocompleteValue<T, Multiple, DisableClearable, FreeSolo>` | - | - | The value of the autocomplete |
| `label` | `string` | - | - | Label text displayed above the input field |
| `multiple` | `boolean` | - | `false` | If true, allows multiple selections |
| `search` | `boolean` | - | `true` | If true, enables search functionality |

### Styling Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `intent` | `"default" \| "negative" \| "notice" \| "positive"` | - | `"default"` | Visual intent/state of the input field |
| `className` | `string` | - | - | CSS class name for custom styling |
| `style` | `CSSProperties` | - | - | Inline styles object |

### Behavior Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `keepSearchOnSelect` | `boolean` | - | `false` | If true, keeps search term after selection |
| `groupBy` | `(option: T) => string` | - | - | Function to group options by category |
| `onClickAway` | `(event?: MouseEvent \| TouchEvent, reason?: AutocompleteCloseReason) => void` | - | - | Callback when clicking outside the component |
| `onClick` | `(event?: TouchEvent \| MouseEvent) => void` | - | - | Callback when clicking the component |

### Display Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `count` | `number` | - | - | Optional count badge displayed in the input |
| `icon` | `ReactElement` | - | - | Optional icon displayed in the input |
| `PopperBaseProps` | `Partial<PopperProps>` | - | - | Props passed to the underlying Popper component |

## Usage Examples

### Basic Single-Column Autocomplete

```tsx
import React, { useState } from 'react';
import { Autocomplete } from '@czi-sds/components';

const basicOptions = [
  { name: 'Apple', section: 'Fruits' },
  { name: 'Banana', section: 'Fruits' },
  { name: 'Carrot', section: 'Vegetables' },
  { name: 'Lettuce', section: 'Vegetables' },
];

function BasicAutocomplete() {
  const [value, setValue] = useState(null);

  return (
    <Autocomplete
      label="Select a food item"
      options={basicOptions}
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      search={true}
    />
  );
}
```

### Multiple Selection with Groups

```tsx
import React, { useState } from 'react';
import { Autocomplete } from '@czi-sds/components';

const groupedOptions = [
  { name: 'Red Apple', section: 'Fruits', count: 25 },
  { name: 'Green Apple', section: 'Fruits', count: 15 },
  { name: 'Banana', section: 'Fruits', count: 30 },
  { name: 'Carrot', section: 'Vegetables', count: 20 },
  { name: 'Broccoli', section: 'Vegetables', count: 12 },
];

function MultipleSelectionExample() {
  const [selectedValues, setSelectedValues] = useState([]);

  return (
    <Autocomplete
      label="Select multiple items"
      options={groupedOptions}
      value={selectedValues}
      multiple={true}
      keepSearchOnSelect={true}
      groupBy={(option) => option.section}
      onChange={(event, newValue) => setSelectedValues(newValue)}
      search={true}
    />
  );
}
```

### Multi-Column Autocomplete

```tsx
import React, { useState } from 'react';
import { Autocomplete } from '@czi-sds/components';

const multiColumnOptions = [
  {
    name: 'Column 1',
    options: [
      { name: 'Option 1A' },
      { name: 'Option 1B' },
    ],
    width: 200,
    icon: <SearchIcon />
  },
  {
    name: 'Column 2', 
    options: [
      { name: 'Option 2A' },
      { name: 'Option 2B' },
    ],
    width: 150
  }
];

function MultiColumnExample() {
  const [value, setValue] = useState({});

  return (
    <Autocomplete
      label="Multi-column selection"
      options={multiColumnOptions}
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      search={true}
    />
  );
}
```

### With Intent States

```tsx
import React, { useState } from 'react';
import { Autocomplete } from '@czi-sds/components';

const options = [
  { name: 'Valid Option', details: 'This is a valid choice' },
  { name: 'Another Option', details: 'This is also valid' },
];

function IntentExample() {
  const [value, setValue] = useState(null);
  const [hasError, setHasError] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Example validation
    setHasError(!newValue);
  };

  return (
    <div>
      <Autocomplete
        label="Required field"
        options={options}
        value={value}
        onChange={handleChange}
        intent={hasError ? "negative" : "default"}
        search={true}
      />
      {hasError && <p style={{ color: 'red' }}>Please select an option</p>}
    </div>
  );
}
```

### Advanced with Custom Rendering

```tsx
import React, { useState } from 'react';
import { Autocomplete } from '@czi-sds/components';

const advancedOptions = [
  {
    name: 'John Doe',
    details: 'Software Engineer',
    icon: 'person',
    count: 5
  },
  {
    name: 'Jane Smith', 
    details: 'Product Manager',
    icon: 'person',
    count: 12
  }
];

function AdvancedExample() {
  const [value, setValue] = useState(null);

  const handleClickAway = () => {
    console.log('Autocomplete closed');
  };

  return (
    <Autocomplete
      label="Select a team member"
      options={advancedOptions}
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      onClickAway={handleClickAway}
      search={true}
      keepSearchOnSelect={false}
      PopperBaseProps={{
        placement: 'bottom-start',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 4],
            },
          },
        ],
      }}
    />
  );
}
```

## Variations

### Single Column vs Multi-Column

- **Single Column**: Standard dropdown with a single list of options
- **Multi-Column**: Advanced layout with multiple columns of options for complex data selection

### Selection Types

- **Single Selection**: Default behavior allowing one option to be selected
- **Multiple Selection**: Enable with `multiple={true}` to allow multiple option selection

### Search Behavior  

- **Search Enabled**: Users can type to filter options (default)
- **Search Disabled**: Dropdown functions as a simple select without filtering

## Component States

### Intent States

- **Default**: Standard appearance with neutral styling
- **Negative**: Error state with red accent colors for validation failures
- **Notice**: Warning state with orange accent colors for important information
- **Positive**: Success state with green accent colors for confirmed selections

### Interactive States

- **Default**: Normal interactive state ready for user input
- **Focused**: Active state when component receives focus
- **Open**: Expanded state showing available options
- **Loading**: Processing state while options are being loaded
- **Disabled**: Non-interactive state preventing user interaction

## Best Practices

### When to Use

- Use for selecting from large datasets (>10 options) where search functionality aids discovery
- Ideal for user/entity selection interfaces (users, projects, tags, etc.)
- Recommended when options have additional metadata (counts, descriptions, categories)
- Perfect for scenarios requiring multiple selections from categorized data

### When Not to Use  

- Avoid for simple binary choices - use InputToggle or InputCheckbox instead
- Don't use for small option sets (<5 items) - consider InputRadio or InputDropdown
- Avoid for highly structured data entry - consider custom form components instead

### Accessibility Guidelines

- Component includes comprehensive ARIA attributes for screen readers
- Supports full keyboard navigation with arrow keys, Enter, and Escape
- Maintains proper focus management when opening/closing dropdown
- Color contrast meets WCAG AA guidelines across all intent states
- Announces selection changes and option counts to assistive technologies

### Performance Guidelines

- Use `keepSearchOnSelect={false}` for better performance with large datasets
- Implement virtualization for extremely large option lists (>1000 items)
- Consider debouncing external data fetching when options come from API calls
- Group related options to improve search performance and user experience

### Design Guidelines

- Maintain consistent spacing using SDS spacing tokens
- Use semantic colors from the theme palette for intent states
- Follow typography hierarchy using SDS font mixins
- Keep option text concise while providing sufficient context through details

## Related Components

- **InputDropdown** - Use for simple selection from small, static option lists
- **InputSearch** - Use when you need search functionality without selection
- **MenuSelect** - Use for action-based menus rather than data selection
- **DropdownMenu** - Use for command/action menus instead of data input

## Migration Notes

### From Legacy Autocomplete Components

- **API Changes**: New `options` prop structure supports both single and multi-column layouts
- **Event Handling**: `onChange` signature includes reason and details parameters for better event handling
- **Styling**: Intent-based styling replaces individual style props for better consistency

### Breaking Changes in v2.x

- Multi-column options now require structured option objects with `name` and `options` properties
- `groupBy` prop disabled for multi-column mode to avoid conflicts
- Value structure differs between single-column and multi-column modes

## API Reference

- [Storybook Stories](https://main--61e887d0928073003a395016.chromatic.com/?path=/story/components-dropdowns-autocomplete) - Interactive examples and testing
- [Material UI Autocomplete](https://mui.com/material-ui/react-autocomplete/) - Underlying MUI component documentation
- [Design Tokens](https://zeroheight.com/2a1e5182b/p/6162b6-design-tokens) - Available theme tokens and styling options