# Dropdown

## Overview

The Dropdown component provides a complete dropdown solution that combines an InputDropdown trigger with a DropdownMenu for selecting options. It supports both single and multiple selections, optional search functionality, and customizable button actions. Built on the Autocomplete foundation, it offers a more complete interface for dropdown selection compared to the standalone InputDropdown component.

Key features include single and multi-column option layouts, search functionality with auto-focus, customizable action buttons, controlled and uncontrolled modes, and full accessibility support.

## Installation & Import

```tsx
import { Dropdown } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| label | `ReactNode` | ✓ | - | Label content for the dropdown trigger |
| options | `AutocompleteSingleColumnOption<T>[] \| AutocompleteMultiColumnOption<T>[]` | - | - | Array of selectable options |
| value | `any` | - | - | Current selected value(s) |
| onChange | `function` | - | - | Callback fired when selection changes |
| onClose | `function` | - | - | Callback fired when dropdown closes |
| open | `boolean` | - | - | Controls whether dropdown is open (controlled mode) |
| disabled | `boolean` | - | `false` | If true, disables the dropdown |
| multiple | `boolean` | - | `false` | Allows multiple selections |
| search | `boolean` | - | `false` | Enables search functionality |
| isSearchAutoFocus | `boolean` | - | `false` | Auto-focus search input when opened |
| loading | `boolean` | - | `false` | Shows loading state |
| buttons | `boolean` | - | `false` | Shows action buttons (Apply/Cancel) |
| buttonPosition | `"left" \| "right"` | - | `"right"` | Position of action buttons |
| closeOnBlur | `boolean` | - | `true` | Close dropdown when clicking outside |
| isTriggerChangeOnOptionClick | `boolean` | - | `true` | Trigger onChange immediately on option click |
| size | `"small" \| "medium"` | - | `"medium"` | Size of the dropdown |
| fullWidth | `boolean` | - | `false` | Take full width of container |
| title | `ReactNode` | - | - | Title displayed in dropdown header |
| DropdownMenuProps | `object` | - | - | Props passed to underlying DropdownMenu |
| InputDropdownProps | `object` | - | - | Props passed to underlying InputDropdown |
| InputDropdownComponent | `any` | - | - | Custom component for dropdown trigger |
| id | `string` | - | - | HTML id attribute |
| className | `string` | - | - | CSS class name |
| style | `CSSProperties` | - | - | Inline styles |
| onClick | `function` | - | - | Click handler for the dropdown |

## Usage Examples

### Basic Dropdown

```tsx
import React, { useState } from 'react';
import { Dropdown } from '@czi-sds/components';

const basicOptions = [
  { name: 'Option 1', value: '1' },
  { name: 'Option 2', value: '2' },
  { name: 'Option 3', value: '3' },
  { name: 'Option 4', value: '4' },
];

function BasicDropdown() {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (event: any, newValue: any) => {
    setSelectedValue(newValue);
  };

  return (
    <div style={{ width: '300px' }}>
      <Dropdown
        label="Select an option"
        options={basicOptions}
        value={selectedValue}
        onChange={handleChange}
      />
      
      {selectedValue && (
        <p style={{ marginTop: '12px', fontSize: '14px' }}>
          Selected: {selectedValue.name}
        </p>
      )}
    </div>
  );
}
```

### Dropdown with Search

```tsx
import React, { useState } from 'react';
import { Dropdown } from '@czi-sds/components';

const searchableOptions = [
  { name: 'Apple', category: 'Fruit', color: 'Red' },
  { name: 'Banana', category: 'Fruit', color: 'Yellow' },
  { name: 'Cherry', category: 'Fruit', color: 'Red' },
  { name: 'Date', category: 'Fruit', color: 'Brown' },
  { name: 'Elderberry', category: 'Fruit', color: 'Purple' },
  { name: 'Fig', category: 'Fruit', color: 'Purple' },
  { name: 'Grape', category: 'Fruit', color: 'Green' },
];

function SearchableDropdown() {
  const [selectedFruit, setSelectedFruit] = useState(null);

  return (
    <div style={{ width: '350px' }}>
      <Dropdown
        label="Search fruits"
        options={searchableOptions}
        value={selectedFruit}
        onChange={(event, newValue) => setSelectedFruit(newValue)}
        search={true}
        isSearchAutoFocus={true}
        title="Select a Fruit"
      />
      
      {selectedFruit && (
        <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Selected Fruit:</h4>
          <p style={{ margin: '4px 0' }}>Name: {selectedFruit.name}</p>
          <p style={{ margin: '4px 0' }}>Category: {selectedFruit.category}</p>
          <p style={{ margin: '4px 0' }}>Color: {selectedFruit.color}</p>
        </div>
      )}
    </div>
  );
}
```

### Multiple Selection with Action Buttons

```tsx
import React, { useState } from 'react';
import { Dropdown } from '@czi-sds/components';

const analysisOptions = [
  { name: 'Quality Control', id: 'qc', description: 'Basic quality assessment' },
  { name: 'Differential Expression', id: 'de', description: 'Gene expression analysis' },
  { name: 'Pathway Analysis', id: 'pathway', description: 'Functional enrichment' },
  { name: 'Clustering', id: 'cluster', description: 'Cell type identification' },
  { name: 'Trajectory Analysis', id: 'trajectory', description: 'Developmental trajectories' },
  { name: 'Integration', id: 'integration', description: 'Batch correction' },
];

function MultiSelectDropdown() {
  const [selectedAnalyses, setSelectedAnalyses] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event: any, newValue: any[]) => {
    setSelectedAnalyses(newValue);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div style={{ width: '400px' }}>
      <Dropdown
        label="Analysis Pipeline"
        options={analysisOptions}
        value={selectedAnalyses}
        onChange={handleChange}
        onClose={handleClose}
        open={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        multiple={true}
        search={true}
        buttons={true}
        buttonPosition="right"
        title="Select Analysis Methods"
        closeOnBlur={false}
      />
      
      <div style={{ marginTop: '16px' }}>
        <h4>Selected Analyses ({selectedAnalyses.length}):</h4>
        {selectedAnalyses.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>No analyses selected</p>
        ) : (
          <ul style={{ paddingLeft: '20px' }}>
            {selectedAnalyses.map((analysis) => (
              <li key={analysis.id} style={{ marginBottom: '8px' }}>
                <strong>{analysis.name}</strong>
                <br />
                <span style={{ fontSize: '12px', color: '#666' }}>
                  {analysis.description}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
```

### Controlled Dropdown

```tsx
import React, { useState } from 'react';
import { Dropdown, Button } from '@czi-sds/components';

const priorities = [
  { name: 'Low', value: 'low', color: 'green' },
  { name: 'Medium', value: 'medium', color: 'orange' },
  { name: 'High', value: 'high', color: 'red' },
  { name: 'Critical', value: 'critical', color: 'darkred' },
];

function ControlledDropdown() {
  const [priority, setPriority] = useState(priorities[1]); // Default to Medium
  const [isOpen, setIsOpen] = useState(false);

  const handlePriorityChange = (event: any, newValue: any) => {
    setPriority(newValue);
    setIsOpen(false); // Close dropdown after selection
  };

  const resetPriority = () => {
    setPriority(priorities[1]); // Reset to Medium
  };

  return (
    <div style={{ width: '300px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
        <Button onClick={resetPriority} sdsStyle="minimal" sdsType="secondary">
          Reset
        </Button>
        <Button 
          onClick={() => setIsOpen(!isOpen)} 
          sdsStyle="rounded" 
          sdsType="primary"
        >
          {isOpen ? 'Close' : 'Open'} Dropdown
        </Button>
      </div>

      <Dropdown
        label="Task Priority"
        options={priorities}
        value={priority}
        onChange={handlePriorityChange}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Set Priority Level"
      />
      
      <div style={{ 
        marginTop: '16px', 
        padding: '12px', 
        backgroundColor: '#f9f9f9',
        borderRadius: '4px',
        borderLeft: `4px solid ${priority.color}`
      }}>
        <h4 style={{ margin: '0 0 8px 0' }}>Current Priority</h4>
        <p style={{ margin: 0, color: priority.color, fontWeight: 'bold' }}>
          {priority.name}
        </p>
      </div>
    </div>
  );
}
```

### Loading State

```tsx
import React, { useState, useEffect } from 'react';
import { Dropdown } from '@czi-sds/components';

function LoadingDropdown() {
  const [options, setOptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  // Simulate API call
  useEffect(() => {
    const loadOptions = async () => {
      setIsLoading(true);
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockOptions = [
        { name: 'Dataset A', id: 'a', samples: 150 },
        { name: 'Dataset B', id: 'b', samples: 203 },
        { name: 'Dataset C', id: 'c', samples: 89 },
        { name: 'Dataset D', id: 'd', samples: 456 },
      ];
      
      setOptions(mockOptions);
      setIsLoading(false);
    };

    loadOptions();
  }, []);

  const handleReload = () => {
    setOptions([]);
    setSelectedOption(null);
    // Restart the loading process
    setIsLoading(true);
    setTimeout(() => {
      setOptions([
        { name: 'Updated Dataset A', id: 'a', samples: 175 },
        { name: 'Updated Dataset B', id: 'b', samples: 234 },
      ]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div style={{ width: '350px' }}>
      <div style={{ marginBottom: '16px' }}>
        <button 
          onClick={handleReload} 
          disabled={isLoading}
          style={{
            padding: '8px 16px',
            backgroundColor: isLoading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Loading...' : 'Reload Data'}
        </button>
      </div>

      <Dropdown
        label="Available Datasets"
        options={options}
        value={selectedOption}
        onChange={(event, newValue) => setSelectedOption(newValue)}
        loading={isLoading}
        disabled={isLoading}
        search={!isLoading}
        title={isLoading ? 'Loading datasets...' : 'Select Dataset'}
      />
      
      {selectedOption && (
        <div style={{ marginTop: '12px', fontSize: '14px' }}>
          <p><strong>Selected:</strong> {selectedOption.name}</p>
          <p><strong>Samples:</strong> {selectedOption.samples}</p>
        </div>
      )}
    </div>
  );
}
```

### Size Variations

```tsx
import React, { useState } from 'react';
import { Dropdown } from '@czi-sds/components';

const sizeOptions = [
  { name: 'Small Size Option', value: 'small' },
  { name: 'Medium Size Option', value: 'medium' },
  { name: 'Large Size Option', value: 'large' },
];

function SizeVariations() {
  const [smallValue, setSmallValue] = useState(null);
  const [mediumValue, setMediumValue] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '350px' }}>
      <div>
        <h4>Small Size</h4>
        <Dropdown
          label="Small dropdown"
          options={sizeOptions}
          value={smallValue}
          onChange={(event, newValue) => setSmallValue(newValue)}
          size="small"
        />
      </div>

      <div>
        <h4>Medium Size (Default)</h4>
        <Dropdown
          label="Medium dropdown"
          options={sizeOptions}
          value={mediumValue}
          onChange={(event, newValue) => setMediumValue(newValue)}
          size="medium"
        />
      </div>
    </div>
  );
}
```

### Disabled State

```tsx
import React, { useState } from 'react';
import { Dropdown, Button } from '@czi-sds/components';

const statusOptions = [
  { name: 'Active', status: 'active' },
  { name: 'Pending', status: 'pending' },
  { name: 'Inactive', status: 'inactive' },
];

function DisabledDropdown() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [status, setStatus] = useState(statusOptions[0]);

  return (
    <div style={{ width: '300px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Button 
          onClick={() => setIsEnabled(!isEnabled)}
          sdsStyle="rounded"
          sdsType={isEnabled ? "primary" : "secondary"}
        >
          {isEnabled ? 'Disable' : 'Enable'} Dropdown
        </Button>
      </div>

      <Dropdown
        label="Status Selection"
        options={statusOptions}
        value={status}
        onChange={(event, newValue) => setStatus(newValue)}
        disabled={!isEnabled}
        title={isEnabled ? "Select Status" : "Dropdown Disabled"}
      />

      <p style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
        Current status: {status.name} 
        {!isEnabled && ' (dropdown is disabled)'}
      </p>
    </div>
  );
}
```

### Custom Styling and Props

```tsx
import React, { useState } from 'react';
import { Dropdown } from '@czi-sds/components';

const customOptions = [
  { name: 'Custom Option A', id: 1, category: 'Type 1' },
  { name: 'Custom Option B', id: 2, category: 'Type 2' },
  { name: 'Custom Option C', id: 3, category: 'Type 1' },
];

function CustomizedDropdown() {
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <div style={{ width: '400px' }}>
      <Dropdown
        label="Customized Dropdown"
        options={customOptions}
        value={selectedValue}
        onChange={(event, newValue) => setSelectedValue(newValue)}
        search={true}
        fullWidth={true}
        title="Custom Styled Dropdown"
        style={{
          border: '2px solid #007bff',
          borderRadius: '8px'
        }}
        className="custom-dropdown"
        DropdownMenuProps={{
          style: {
            maxHeight: '200px'
          }
        }}
        InputDropdownProps={{
          sdsStyle: 'rounded',
          intent: 'positive'
        }}
      />
      
      {selectedValue && (
        <div style={{ 
          marginTop: '12px', 
          padding: '12px',
          border: '1px solid #28a745',
          borderRadius: '4px',
          backgroundColor: '#d4edda'
        }}>
          <strong>Selection Details:</strong>
          <br />
          ID: {selectedValue.id}
          <br />
          Name: {selectedValue.name}
          <br />
          Category: {selectedValue.category}
        </div>
      )}
    </div>
  );
}
```

## Variations

### Button Configurations

- **No Buttons**: Default mode with immediate selection
- **With Buttons**: Apply/Cancel buttons for confirming selections
- **Button Position**: Left or right alignment of action buttons

### Selection Modes

- **Single Selection**: Select one option (default)
- **Multiple Selection**: Select multiple options with checkboxes

### Search Options

- **No Search**: Simple selection without filtering
- **With Search**: Filter options by typing
- **Auto-focus Search**: Automatically focus search input when opened

## Component States

- **Closed**: Dropdown is collapsed, showing selected value
- **Open**: Dropdown is expanded showing options
- **Loading**: Shows loading indicator while fetching options
- **Disabled**: Non-interactive state when disabled
- **Empty**: No options available to select

## Best Practices

### When to Use

- Use for selecting from medium-sized lists (5-50 options)
- Ideal for forms requiring single or multiple selections
- Perfect when you need search functionality with selection
- Recommended when action buttons are needed for confirmation

### When Not to Use

- Avoid for very large datasets (use Autocomplete instead)
- Don't use for simple binary choices (use InputToggle instead)
- Consider InputRadio for small sets (2-5 options)
- Avoid for navigation (use MenuSelect instead)

### Accessibility Guidelines

- Component includes comprehensive ARIA attributes
- Supports full keyboard navigation (Tab, Arrow keys, Enter, Escape)
- Screen readers announce dropdown state and selected options
- Focus management is handled automatically
- Search functionality is accessible to assistive technologies

### UX Guidelines

- Provide clear labels that describe what users are selecting
- Use search functionality for lists with 10+ options
- Consider loading states for asynchronously loaded options
- Use action buttons when selection changes need confirmation
- Provide immediate feedback for selection changes

### Design Guidelines

- Use consistent dropdown sizing across related interfaces
- Provide helpful titles or headers for complex dropdown content
- Consider the available space when choosing between sizes
- Group related options logically when possible
- Maintain visual consistency with other form elements

## Related Components

- **Autocomplete** - Use for large datasets with advanced search
- **InputDropdown** - Use for simple dropdown presentation only
- **DropdownMenu** - Use for action menus rather than selection
- **MenuSelect** - Use for navigation or command menus
- **InputRadio** - Use for small sets of mutually exclusive options

## Migration Notes

### From Legacy Dropdown Components

- **Props Structure**: Updated to use consistent naming with other SDS components
- **Option Format**: Now uses standardized option object structure
- **Event Handling**: Improved onChange signature with event and reason parameters

### Breaking Changes

- Button configuration now uses boolean `buttons` prop instead of separate props
- Search functionality must be explicitly enabled with `search` prop
- Updated styling system uses SDS design tokens

## API Reference

- [Storybook Stories](https://main--64ad2577a2c26e0097ff24a6.chromatic.com/?path=/story/components-dropdowns-dropdown--default) - Interactive examples and testing
- [Material UI Autocomplete](https://mui.com/material-ui/react-autocomplete/) - Underlying MUI component documentation
- [Design Tokens](https://zeroheight.com/2a1e5182b/p/6145b2-design-tokens) - Available theme tokens and values