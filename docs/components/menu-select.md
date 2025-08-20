# MenuSelect

## Overview

The MenuSelect component provides a specialized menu interface designed for navigation, command selection, and hierarchical option selection. Unlike dropdown components focused on data selection, MenuSelect is optimized for user interface navigation and action execution. It supports search functionality, multiple selection modes, and can be used both as a standalone menu or integrated into larger navigation systems.

Key features include navigation-optimized option handling, search with filtering, single and multiple selection modes, loading states, and full accessibility support for menu navigation patterns.

## Installation & Import

```tsx
import { MenuSelect } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| options | `DefaultMenuSelectOption[]` | - | - | Array of selectable menu options |
| value | `string \| DefaultMenuSelectOption \| DefaultMenuSelectOption[]` | - | - | Current selected value(s) |
| onChange | `function` | - | - | Callback fired when selection changes |
| onClose | `function` | - | - | Callback fired when menu closes |
| open | `boolean` | - | - | Controls whether menu is open (controlled mode) |
| multiple | `boolean` | - | `false` | Allow multiple selections |
| search | `boolean` | - | `false` | Enable search functionality |
| keepSearchOnSelect | `boolean` | - | `false` | Keep search term after selection |
| renderInput | `ReactNode` | - | - | Custom render function for search input |
| disabled | `boolean` | - | `false` | If true, disables the menu |
| loading | `boolean` | - | `false` | Shows loading state |
| size | `"small" \| "medium"` | - | `"medium"` | Size of the menu |
| fullWidth | `boolean` | - | `false` | Take full width of container |
| InputBaseProps | `Partial<InputSearchProps>` | - | - | Props for search input |
| id | `string` | - | - | HTML id attribute |
| className | `string` | - | - | CSS class name |
| style | `CSSProperties` | - | - | Inline styles |
| onClick | `function` | - | - | Click handler for the menu |

## Usage Examples

### Basic Navigation Menu

```tsx
import React, { useState } from 'react';
import { MenuSelect, Button } from '@czi-sds/components';

const navigationOptions = [
  { name: 'Dashboard', value: 'dashboard', icon: '📊' },
  { name: 'Projects', value: 'projects', icon: '📁' },
  { name: 'Data Analysis', value: 'analysis', icon: '🔬' },
  { name: 'Reports', value: 'reports', icon: '📋' },
  { name: 'Settings', value: 'settings', icon: '⚙️' },
];

function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleNavigation = (event: any, option: any) => {
    setCurrentPage(option.value);
    setIsOpen(false);
    console.log('Navigating to:', option.name);
  };

  const getCurrentPageName = () => {
    return navigationOptions.find(opt => opt.value === currentPage)?.name || 'Dashboard';
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          sdsStyle="rounded"
          sdsType="primary"
        >
          Navigate to... ({getCurrentPageName()})
        </Button>
      </div>

      <MenuSelect
        open={isOpen}
        options={navigationOptions}
        value={currentPage}
        onChange={handleNavigation}
        onClose={() => setIsOpen(false)}
      />

      <div style={{ 
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <h2>Current Page: {getCurrentPageName()}</h2>
        <p>Content for the {getCurrentPageName().toLowerCase()} page would appear here.</p>
      </div>
    </div>
  );
}
```

### Searchable Command Menu

```tsx
import React, { useState } from 'react';
import { MenuSelect } from '@czi-sds/components';

const commands = [
  { name: 'New Project', value: 'new-project', description: 'Create a new research project', shortcut: 'Ctrl+N' },
  { name: 'Import Data', value: 'import', description: 'Import dataset from file', shortcut: 'Ctrl+I' },
  { name: 'Export Results', value: 'export', description: 'Export analysis results', shortcut: 'Ctrl+E' },
  { name: 'Run Analysis', value: 'analyze', description: 'Execute selected analysis pipeline', shortcut: 'F5' },
  { name: 'Generate Report', value: 'report', description: 'Create comprehensive report', shortcut: 'Ctrl+R' },
  { name: 'Share Project', value: 'share', description: 'Share project with collaborators', shortcut: 'Ctrl+Shift+S' },
  { name: 'Clone Project', value: 'clone', description: 'Create a copy of current project', shortcut: 'Ctrl+D' },
  { name: 'Archive Project', value: 'archive', description: 'Move project to archive', shortcut: 'Ctrl+Shift+A' },
];

function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [lastCommand, setLastCommand] = useState<any>(null);

  const handleCommand = (event: any, command: any) => {
    setLastCommand(command);
    setIsOpen(false);
    console.log('Executing command:', command.name);
  };

  // Listen for keyboard shortcut to open menu
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
      }
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        padding: '16px',
        backgroundColor: '#f0f8ff',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3>Command Palette</h3>
        <p>Press <kbd>Ctrl+K</kbd> to open the command menu</p>
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Open Commands
        </button>
      </div>

      <MenuSelect
        open={isOpen}
        options={commands}
        onChange={handleCommand}
        onClose={() => setIsOpen(false)}
        search={true}
        keepSearchOnSelect={false}
        fullWidth={true}
        InputBaseProps={{
          placeholder: "Type a command...",
          autoFocus: true
        }}
      />

      {lastCommand && (
        <div style={{ 
          marginTop: '20px',
          padding: '16px',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '4px'
        }}>
          <h4>Command Executed:</h4>
          <p><strong>{lastCommand.name}</strong></p>
          <p>{lastCommand.description}</p>
          <p><em>Shortcut: {lastCommand.shortcut}</em></p>
        </div>
      )}
    </div>
  );
}
```

### Multiple Selection Menu

```tsx
import React, { useState } from 'react';
import { MenuSelect, Button } from '@czi-sds/components';

const filterOptions = [
  { name: 'Completed', value: 'completed', category: 'Status' },
  { name: 'In Progress', value: 'in-progress', category: 'Status' },
  { name: 'Pending', value: 'pending', category: 'Status' },
  { name: 'High Priority', value: 'high', category: 'Priority' },
  { name: 'Medium Priority', value: 'medium', category: 'Priority' },
  { name: 'Low Priority', value: 'low', category: 'Priority' },
  { name: 'This Week', value: 'this-week', category: 'Time' },
  { name: 'This Month', value: 'this-month', category: 'Time' },
  { name: 'Overdue', value: 'overdue', category: 'Time' },
];

function MultiSelectMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<any[]>([]);

  const handleFilterChange = (event: any, newFilters: any[]) => {
    setSelectedFilters(newFilters || []);
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const getFiltersByCategory = (category: string) => {
    return selectedFilters.filter(filter => filter.category === category);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          sdsStyle="rounded"
          sdsType="primary"
        >
          Apply Filters ({selectedFilters.length})
        </Button>
        
        <Button
          onClick={clearFilters}
          sdsStyle="minimal"
          sdsType="secondary"
          disabled={selectedFilters.length === 0}
        >
          Clear All
        </Button>
      </div>

      <MenuSelect
        open={isOpen}
        options={filterOptions}
        value={selectedFilters}
        onChange={handleFilterChange}
        onClose={() => setIsOpen(false)}
        multiple={true}
        search={true}
        keepSearchOnSelect={true}
        fullWidth={true}
      />

      <div style={{ marginTop: '20px' }}>
        <h3>Active Filters:</h3>
        
        {selectedFilters.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>No filters applied</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Status', 'Priority', 'Time'].map(category => {
              const categoryFilters = getFiltersByCategory(category);
              if (categoryFilters.length === 0) return null;
              
              return (
                <div key={category} style={{
                  padding: '12px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                  border: '1px solid #dee2e6'
                }}>
                  <strong>{category}:</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                    {categoryFilters.map(filter => (
                      <span
                        key={filter.value}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          borderRadius: '12px',
                          fontSize: '12px'
                        }}
                      >
                        {filter.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
```

### Loading and Error States

```tsx
import React, { useState, useEffect } from 'react';
import { MenuSelect, Button } from '@czi-sds/components';

function LoadingMenuSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const loadMenuItems = async () => {
    setIsLoading(true);
    setOptions([]);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockOptions = [
        { name: 'Server 1 (Online)', value: 'server1', status: 'online' },
        { name: 'Server 2 (Maintenance)', value: 'server2', status: 'maintenance' },
        { name: 'Server 3 (Online)', value: 'server3', status: 'online' },
        { name: 'Server 4 (Offline)', value: 'server4', status: 'offline' },
      ];
      
      setOptions(mockOptions);
    } catch (error) {
      console.error('Failed to load servers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && options.length === 0) {
      loadMenuItems();
    }
  }, [isOpen, options.length]);

  const handleSelection = (event: any, option: any) => {
    setSelectedItem(option);
    setIsOpen(false);
  };

  const handleRefresh = () => {
    setOptions([]);
    setSelectedItem(null);
    if (isOpen) {
      loadMenuItems();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          sdsStyle="rounded"
          sdsType="primary"
          disabled={isLoading}
        >
          {isLoading ? 'Loading Servers...' : 'Select Server'}
        </Button>
        
        <Button
          onClick={handleRefresh}
          sdsStyle="minimal"
          sdsType="secondary"
          disabled={isLoading}
        >
          Refresh
        </Button>
      </div>

      <MenuSelect
        open={isOpen}
        options={options}
        value={selectedItem}
        onChange={handleSelection}
        onClose={() => setIsOpen(false)}
        loading={isLoading}
        search={!isLoading}
        InputBaseProps={{
          placeholder: isLoading ? "Loading servers..." : "Search servers...",
        }}
      />

      {selectedItem && (
        <div style={{ 
          marginTop: '16px',
          padding: '16px',
          backgroundColor: selectedItem.status === 'online' ? '#d4edda' : 
                           selectedItem.status === 'maintenance' ? '#fff3cd' : '#f8d7da',
          borderRadius: '4px'
        }}>
          <h4>Selected Server:</h4>
          <p><strong>Name:</strong> {selectedItem.name}</p>
          <p><strong>Status:</strong> {selectedItem.status}</p>
        </div>
      )}
    </div>
  );
}
```

### Size Variations

```tsx
import React, { useState } from 'react';
import { MenuSelect, Button } from '@czi-sds/components';

const quickActions = [
  { name: 'Quick Action 1', value: 'action1' },
  { name: 'Quick Action 2', value: 'action2' },
  { name: 'Quick Action 3', value: 'action3' },
];

function SizeVariations() {
  const [smallOpen, setSmallOpen] = useState(false);
  const [mediumOpen, setMediumOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<any>(null);

  const handleActionSelect = (event: any, action: any) => {
    setSelectedAction(action);
    setSmallOpen(false);
    setMediumOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      <div>
        <h4>Small Size</h4>
        <Button
          onClick={() => setSmallOpen(!smallOpen)}
          sdsStyle="rounded"
          sdsType="secondary"
          size="small"
        >
          Small Menu
        </Button>
        
        <MenuSelect
          open={smallOpen}
          options={quickActions}
          onChange={handleActionSelect}
          onClose={() => setSmallOpen(false)}
          size="small"
        />
      </div>

      <div>
        <h4>Medium Size (Default)</h4>
        <Button
          onClick={() => setMediumOpen(!mediumOpen)}
          sdsStyle="rounded"
          sdsType="primary"
        >
          Medium Menu
        </Button>
        
        <MenuSelect
          open={mediumOpen}
          options={quickActions}
          onChange={handleActionSelect}
          onClose={() => setMediumOpen(false)}
          size="medium"
        />
      </div>

      {selectedAction && (
        <div style={{ padding: '12px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
          <strong>Last selected:</strong> {selectedAction.name}
        </div>
      )}
    </div>
  );
}
```

### Disabled State

```tsx
import React, { useState } from 'react';
import { MenuSelect, Button } from '@czi-sds/components';

const userActions = [
  { name: 'Edit Profile', value: 'edit' },
  { name: 'Change Password', value: 'password' },
  { name: 'Logout', value: 'logout' },
];

function DisabledMenuSelect() {
  const [isMenuEnabled, setIsMenuEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<any>(null);

  const handleActionSelect = (event: any, action: any) => {
    setSelectedAction(action);
    setIsOpen(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={isMenuEnabled}
            onChange={(e) => {
              setIsMenuEnabled(e.target.checked);
              if (!e.target.checked) {
                setIsOpen(false);
              }
            }}
          />
          Enable user menu
        </label>
      </div>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        sdsStyle="rounded"
        sdsType={isMenuEnabled ? "primary" : "secondary"}
        disabled={!isMenuEnabled}
      >
        User Menu {isMenuEnabled ? '' : '(Disabled)'}
      </Button>

      <MenuSelect
        open={isOpen}
        options={userActions}
        onChange={handleActionSelect}
        onClose={() => setIsOpen(false)}
        disabled={!isMenuEnabled}
      />

      <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
        {!isMenuEnabled && <p>Menu is disabled - check the box above to enable it</p>}
        {selectedAction && isMenuEnabled && (
          <p><strong>Selected action:</strong> {selectedAction.name}</p>
        )}
      </div>
    </div>
  );
}
```

### Custom Input Rendering

```tsx
import React, { useState } from 'react';
import { MenuSelect } from '@czi-sds/components';

const toolCategories = [
  { name: 'Data Import', value: 'import', category: 'Data' },
  { name: 'Data Export', value: 'export', category: 'Data' },
  { name: 'Statistical Analysis', value: 'stats', category: 'Analysis' },
  { name: 'Machine Learning', value: 'ml', category: 'Analysis' },
  { name: 'Data Visualization', value: 'viz', category: 'Visualization' },
  { name: 'Reporting', value: 'report', category: 'Output' },
];

function CustomInputMenuSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<any>(null);

  const handleToolSelect = (event: any, tool: any) => {
    setSelectedTool(tool);
    setIsOpen(false);
  };

  const customSearchInput = (params: any) => (
    <div style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
      <input
        {...params.inputProps}
        placeholder="🔍 Search tools and features..."
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '2px solid #007bff',
          borderRadius: '20px',
          fontSize: '14px',
          outline: 'none'
        }}
      />
    </div>
  );

  return (
    <div style={{ padding: '20px' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '12px 20px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        🛠️ Open Tool Selector
      </button>

      <MenuSelect
        open={isOpen}
        options={toolCategories}
        onChange={handleToolSelect}
        onClose={() => setIsOpen(false)}
        search={true}
        renderInput={customSearchInput}
        fullWidth={true}
      />

      {selectedTool && (
        <div style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h4>🎯 Selected Tool:</h4>
          <p><strong>Name:</strong> {selectedTool.name}</p>
          <p><strong>Category:</strong> {selectedTool.category}</p>
        </div>
      )}
    </div>
  );
}
```

## Variations

### Selection Modes

- **Single Selection**: Select one option from the menu (default)
- **Multiple Selection**: Select multiple options with checkboxes

### Search Options

- **No Search**: Simple selection without filtering capability
- **With Search**: Filter options by typing to narrow down choices
- **Keep Search**: Maintain search term after making selections

### Size Variations

- **small**: Compact size for dense interfaces or secondary menus
- **medium**: Standard size for most menu applications (default)

## Component States

- **Closed**: Menu is hidden and not interactive
- **Open**: Menu is visible and ready for interaction
- **Loading**: Shows loading indicator while fetching options
- **Searching**: Active search state with filtered options
- **Disabled**: Non-interactive state when disabled

## Best Practices

### When to Use

- Use for navigation menus and command selection interfaces
- Ideal for context menus and action selection
- Perfect for filtering and categorization interfaces
- Recommended for hierarchical menu structures

### When Not to Use

- Avoid for form data selection (use Dropdown instead)
- Don't use for simple binary choices (use InputToggle instead)
- Consider Button for single actions without menu context

### Accessibility Guidelines

- Component includes comprehensive ARIA attributes for menu navigation
- Supports full keyboard navigation (Tab, Arrow keys, Enter, Escape)
- Screen readers announce menu state, selected options, and available actions
- Focus management handles menu opening and closing transitions
- Search functionality is accessible to assistive technologies

### UX Guidelines

- Provide clear visual feedback for menu state and selected items
- Use search functionality for menus with 10+ options
- Group related options logically when possible
- Consider loading states for asynchronously loaded menu items
- Provide immediate feedback for menu actions and selections

### Design Guidelines

- Maintain consistent menu styling across your application
- Use appropriate sizing based on menu importance and available space
- Consider visual hierarchy for complex menu structures
- Ensure adequate spacing and contrast for all menu elements
- Test menu behavior across different screen sizes and input methods

## Related Components

- **Dropdown** - Use for form-based data selection with integrated trigger
- **DropdownMenu** - Use for positioned menus with custom anchoring
- **Autocomplete** - Use for large datasets with advanced search capabilities
- **Button** - Often used to trigger menu selection interfaces

## Migration Notes

### From Legacy Menu Components

- **Selection Handling**: Updated onChange signature includes event and reason parameters
- **Search Integration**: Improved search functionality with customizable input rendering
- **Accessibility**: Enhanced ARIA support and keyboard navigation

### Breaking Changes

- Multiple selection now returns arrays consistently
- Updated styling system uses SDS design tokens
- Improved focus management requires proper menu state handling

## API Reference

- [Storybook Stories](https://main--64ad2577a2c26e0097ff24a6.chromatic.com/?path=/story/components-dropdowns-menuselect--default) - Interactive examples and testing
- [Material UI Autocomplete](https://mui.com/material-ui/react-autocomplete/) - Underlying MUI component documentation
- [Design Tokens](https://zeroheight.com/2a1e5182b/p/6145b2-design-tokens) - Available theme tokens and values