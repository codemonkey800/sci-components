# DropdownMenu

## Overview

The DropdownMenu component provides a floating menu interface that appears anchored to a specific element on the page. Unlike the Dropdown component which includes its own trigger, DropdownMenu is designed to be used with external triggers and offers more advanced positioning and customization options. It supports search functionality, grouping, multi-column layouts, and custom headers.

Key features include flexible positioning with PopperJS, customizable header sections, search with auto-focus, click-away handling, multi-column support, and full accessibility support.

## Installation & Import

```tsx
import { DropdownMenu } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| anchorEl | `HTMLElement` | ✓ | - | Element to which the menu is anchored |
| open | `boolean` | - | `false` | Controls whether the menu is visible |
| options | `AutocompleteOption[]` | - | - | Array of selectable options |
| title | `ReactNode` | - | - | Title displayed in the menu header |
| label | `string` | - | - | Accessible label for the menu |
| search | `boolean` | - | `false` | Enables search functionality |
| isSearchAutoFocus | `boolean` | - | `false` | Auto-focus search input when opened |
| keepSearchOnSelect | `boolean` | - | `false` | Keep search term after selection |
| multiple | `boolean` | - | `false` | Allow multiple selections |
| groupBy | `function` | - | - | Function to group options |
| width | `string \| number` | - | - | Fixed width for the menu |
| onClickAway | `function` | - | - | Callback when clicking outside the menu |
| onInputChange | `function` | - | - | Callback when search input changes |
| onChange | `function` | - | - | Callback when selection changes |
| renderInput | `function` | - | - | Custom render function for search input |
| headerComponentSlot | `Element` | - | - | Custom component for header area |
| PopperComponent | `ReactNode` | - | - | Custom popper component |
| PaperComponent | `ReactNode` | - | - | Custom paper component |
| PopperPlacement | `PopperPlacement` | - | `"bottom-start"` | Positioning of the menu relative to anchor |
| PopperBaseProps | `Partial<PopperProps>` | - | - | Props passed to underlying Popper |
| ClickAwayListenerProps | `Partial<ClickAwayListenerProps>` | - | - | Props for click-away handling |
| InputBaseProps | `Partial<InputSearchProps>` | - | - | Props for search input |
| count | `number` | - | - | Display count badge |
| icon | `ReactElement` | - | - | Icon in the menu header |
| isMultiColumn | `boolean` | - | `false` | Enable multi-column layout |
| className | `string` | - | - | CSS class name |
| style | `CSSProperties` | - | - | Inline styles |

## Usage Examples

### Basic Menu with Trigger

```tsx
import React, { useState, useRef } from 'react';
import { DropdownMenu, Button } from '@czi-sds/components';

const menuOptions = [
  { name: 'Edit', id: 'edit' },
  { name: 'Copy', id: 'copy' },
  { name: 'Delete', id: 'delete' },
  { name: 'Archive', id: 'archive' },
];

function BasicDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleMenuClick = (event: any, option: any) => {
    setSelectedOption(option);
    setIsOpen(false);
    console.log('Menu action:', option.name);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button
        ref={anchorRef}
        onClick={() => setIsOpen(!isOpen)}
        sdsStyle="rounded"
        sdsType="secondary"
      >
        Actions
      </Button>

      <DropdownMenu
        anchorEl={anchorRef.current}
        open={isOpen}
        options={menuOptions}
        title="Available Actions"
        onChange={handleMenuClick}
        onClickAway={() => setIsOpen(false)}
      />

      {selectedOption && (
        <p style={{ marginTop: '16px' }}>
          Last action: {selectedOption.name}
        </p>
      )}
    </div>
  );
}
```

### Menu with Search Functionality

```tsx
import React, { useState, useRef } from 'react';
import { DropdownMenu, Button } from '@czi-sds/components';

const scientificTools = [
  { name: 'BLAST Search', id: 'blast', category: 'Bioinformatics' },
  { name: 'Phylogenetic Tree', id: 'phylo', category: 'Analysis' },
  { name: 'Protein Structure', id: 'protein', category: 'Visualization' },
  { name: 'Gene Ontology', id: 'go', category: 'Annotation' },
  { name: 'Pathway Analysis', id: 'pathway', category: 'Analysis' },
  { name: 'Sequence Alignment', id: 'align', category: 'Bioinformatics' },
  { name: 'Statistical Analysis', id: 'stats', category: 'Analysis' },
  { name: 'Data Visualization', id: 'viz', category: 'Visualization' },
];

function SearchableDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToolSelect = (event: any, tool: any) => {
    setSelectedTool(tool);
    setIsOpen(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button
        ref={anchorRef}
        onClick={() => setIsOpen(!isOpen)}
        sdsStyle="rounded"
        sdsType="primary"
      >
        Select Analysis Tool
      </Button>

      <DropdownMenu
        anchorEl={anchorRef.current}
        open={isOpen}
        options={scientificTools}
        title="Analysis Tools"
        search={true}
        isSearchAutoFocus={true}
        groupBy={(option) => option.category}
        onChange={handleToolSelect}
        onClickAway={() => setIsOpen(false)}
        width={300}
      />

      {selectedTool && (
        <div style={{ 
          marginTop: '16px', 
          padding: '12px', 
          backgroundColor: '#f0f8ff',
          borderRadius: '4px' 
        }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Selected Tool:</h4>
          <p style={{ margin: 0 }}>
            <strong>{selectedTool.name}</strong> ({selectedTool.category})
          </p>
        </div>
      )}
    </div>
  );
}
```

### Multiple Selection Menu

```tsx
import React, { useState, useRef } from 'react';
import { DropdownMenu, Button } from '@czi-sds/components';

const dataTypes = [
  { name: 'RNA-seq', id: 'rna', description: 'RNA sequencing data' },
  { name: 'DNA-seq', id: 'dna', description: 'DNA sequencing data' },
  { name: 'ChIP-seq', id: 'chip', description: 'Chromatin immunoprecipitation' },
  { name: 'ATAC-seq', id: 'atac', description: 'Chromatin accessibility' },
  { name: 'Proteomics', id: 'protein', description: 'Protein expression data' },
  { name: 'Metabolomics', id: 'metabolite', description: 'Metabolite measurements' },
];

function MultiSelectDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<any[]>([]);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleSelectionChange = (event: any, newValue: any[]) => {
    setSelectedTypes(newValue || []);
  };

  const clearSelections = () => {
    setSelectedTypes([]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Button
          ref={anchorRef}
          onClick={() => setIsOpen(!isOpen)}
          sdsStyle="rounded"
          sdsType="primary"
        >
          Select Data Types ({selectedTypes.length})
        </Button>
        
        <Button
          onClick={clearSelections}
          sdsStyle="minimal"
          sdsType="secondary"
          disabled={selectedTypes.length === 0}
        >
          Clear All
        </Button>
      </div>

      <DropdownMenu
        anchorEl={anchorRef.current}
        open={isOpen}
        options={dataTypes}
        title="Data Type Selection"
        multiple={true}
        search={true}
        keepSearchOnSelect={true}
        value={selectedTypes}
        onChange={handleSelectionChange}
        onClickAway={() => setIsOpen(false)}
        width={350}
        count={selectedTypes.length}
      />

      {selectedTypes.length > 0 && (
        <div style={{ 
          marginTop: '16px',
          padding: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}>
          <h4>Selected Data Types:</h4>
          <ul style={{ paddingLeft: '20px' }}>
            {selectedTypes.map(type => (
              <li key={type.id} style={{ marginBottom: '4px' }}>
                <strong>{type.name}</strong> - {type.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

### Menu with Custom Header

```tsx
import React, { useState, useRef } from 'react';
import { DropdownMenu, Button } from '@czi-sds/components';

const recentProjects = [
  { name: 'Cancer Research Project', id: 'cancer', modified: '2 hours ago' },
  { name: 'Immunology Study', id: 'immuno', modified: '1 day ago' },
  { name: 'Genomics Analysis', id: 'genomics', modified: '3 days ago' },
  { name: 'Drug Discovery', id: 'drug', modified: '1 week ago' },
];

function CustomHeaderDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleProjectSelect = (event: any, project: any) => {
    setSelectedProject(project);
    setIsOpen(false);
  };

  const customHeader = (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 16px',
      borderBottom: '1px solid #eee',
      backgroundColor: '#f8f9fa'
    }}>
      <span style={{ fontWeight: 'bold' }}>Recent Projects</span>
      <span style={{ fontSize: '12px', color: '#666' }}>
        {recentProjects.length} projects
      </span>
    </div>
  );

  return (
    <div style={{ padding: '20px' }}>
      <Button
        ref={anchorRef}
        onClick={() => setIsOpen(!isOpen)}
        sdsStyle="rounded"
        sdsType="secondary"
      >
        Open Project
      </Button>

      <DropdownMenu
        anchorEl={anchorRef.current}
        open={isOpen}
        options={recentProjects}
        headerComponentSlot={customHeader}
        search={true}
        onChange={handleProjectSelect}
        onClickAway={() => setIsOpen(false)}
        width={320}
      />

      {selectedProject && (
        <div style={{ marginTop: '16px' }}>
          <p><strong>Opened:</strong> {selectedProject.name}</p>
          <p><strong>Last modified:</strong> {selectedProject.modified}</p>
        </div>
      )}
    </div>
  );
}
```

### Positioning Options

```tsx
import React, { useState, useRef } from 'react';
import { DropdownMenu, Button } from '@czi-sds/components';

const menuOptions = [
  { name: 'Option 1', id: '1' },
  { name: 'Option 2', id: '2' },
  { name: 'Option 3', id: '3' },
];

function PositionedDropdownMenus() {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const anchorRefs = {
    topLeft: useRef<HTMLButtonElement>(null),
    topRight: useRef<HTMLButtonElement>(null),
    bottomLeft: useRef<HTMLButtonElement>(null),
    bottomRight: useRef<HTMLButtonElement>(null),
  };

  const toggleMenu = (position: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [position]: !prev[position]
    }));
  };

  const closeMenu = (position: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [position]: false
    }));
  };

  return (
    <div style={{ 
      padding: '100px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '100px',
      alignItems: 'center',
      justifyItems: 'center'
    }}>
      <div>
        <Button
          ref={anchorRefs.topLeft}
          onClick={() => toggleMenu('topLeft')}
          sdsStyle="rounded"
          sdsType="primary"
        >
          Bottom Start
        </Button>
        <DropdownMenu
          anchorEl={anchorRefs.topLeft.current}
          open={openMenus.topLeft || false}
          options={menuOptions}
          title="Bottom Start Menu"
          PopperPlacement="bottom-start"
          onChange={() => closeMenu('topLeft')}
          onClickAway={() => closeMenu('topLeft')}
        />
      </div>

      <div>
        <Button
          ref={anchorRefs.topRight}
          onClick={() => toggleMenu('topRight')}
          sdsStyle="rounded"
          sdsType="secondary"
        >
          Bottom End
        </Button>
        <DropdownMenu
          anchorEl={anchorRefs.topRight.current}
          open={openMenus.topRight || false}
          options={menuOptions}
          title="Bottom End Menu"
          PopperPlacement="bottom-end"
          onChange={() => closeMenu('topRight')}
          onClickAway={() => closeMenu('topRight')}
        />
      </div>

      <div>
        <Button
          ref={anchorRefs.bottomLeft}
          onClick={() => toggleMenu('bottomLeft')}
          sdsStyle="rounded"
          sdsType="tertiary"
        >
          Top Start
        </Button>
        <DropdownMenu
          anchorEl={anchorRefs.bottomLeft.current}
          open={openMenus.bottomLeft || false}
          options={menuOptions}
          title="Top Start Menu"
          PopperPlacement="top-start"
          onChange={() => closeMenu('bottomLeft')}
          onClickAway={() => closeMenu('bottomLeft')}
        />
      </div>

      <div>
        <Button
          ref={anchorRefs.bottomRight}
          onClick={() => toggleMenu('bottomRight')}
          sdsStyle="rounded"
          sdsType="primary"
        >
          Top End
        </Button>
        <DropdownMenu
          anchorEl={anchorRefs.bottomRight.current}
          open={openMenus.bottomRight || false}
          options={menuOptions}
          title="Top End Menu"
          PopperPlacement="top-end"
          onChange={() => closeMenu('bottomRight')}
          onClickAway={() => closeMenu('bottomRight')}
        />
      </div>
    </div>
  );
}
```

### Context Menu Example

```tsx
import React, { useState, useRef } from 'react';
import { DropdownMenu } from '@czi-sds/components';

const contextMenuOptions = [
  { name: 'Copy', id: 'copy', icon: '📋' },
  { name: 'Cut', id: 'cut', icon: '✂️' },
  { name: 'Paste', id: 'paste', icon: '📄' },
  { name: 'Delete', id: 'delete', icon: '🗑️' },
  { name: 'Rename', id: 'rename', icon: '✏️' },
  { name: 'Properties', id: 'properties', icon: 'ℹ️' },
];

function ContextMenuExample() {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const [lastAction, setLastAction] = useState<string>('');
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null,
    );
  };

  const handleMenuAction = (event: any, option: any) => {
    setLastAction(option.name);
    setContextMenu(null);
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  // Create a virtual anchor element for positioning
  const virtualAnchor = contextMenu ? {
    getBoundingClientRect: () => ({
      top: contextMenu.mouseY,
      left: contextMenu.mouseX,
      right: contextMenu.mouseX,
      bottom: contextMenu.mouseY,
      width: 0,
      height: 0,
      x: contextMenu.mouseX,
      y: contextMenu.mouseY,
      toJSON: () => {}
    } as DOMRect)
  } as HTMLElement : null;

  return (
    <div style={{ padding: '20px' }}>
      <div
        onContextMenu={handleContextMenu}
        style={{
          width: '300px',
          height: '200px',
          border: '2px dashed #ccc',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'context-menu',
          backgroundColor: '#f9f9f9'
        }}
      >
        <p style={{ textAlign: 'center', color: '#666' }}>
          Right-click here to open context menu
          {lastAction && (
            <><br /><br />Last action: <strong>{lastAction}</strong></>
          )}
        </p>
      </div>

      <DropdownMenu
        anchorEl={virtualAnchor}
        open={contextMenu !== null}
        options={contextMenuOptions}
        title="Context Menu"
        onChange={handleMenuAction}
        onClickAway={handleClose}
        width={200}
      />
    </div>
  );
}
```

### Advanced Configuration

```tsx
import React, { useState, useRef } from 'react';
import { DropdownMenu, Button } from '@czi-sds/components';

const advancedOptions = [
  { 
    name: 'High Priority Task', 
    id: 'high', 
    details: 'Requires immediate attention',
    category: 'Priority'
  },
  { 
    name: 'Medium Priority Task', 
    id: 'medium', 
    details: 'Normal processing time',
    category: 'Priority'  
  },
  { 
    name: 'Background Process', 
    id: 'background', 
    details: 'Runs automatically',
    category: 'Automation'
  },
  { 
    name: 'Manual Review', 
    id: 'manual', 
    details: 'Requires human oversight',
    category: 'Manual'
  },
];

function AdvancedDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleInputChange = (event: any, value: string) => {
    setSearchValue(value);
  };

  const handleSelectionChange = (event: any, option: any) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const customSearchRender = (params: any) => (
    <input
      {...params.inputProps}
      placeholder="Type to filter tasks..."
      style={{
        width: '100%',
        padding: '8px 12px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px'
      }}
    />
  );

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Button
          ref={anchorRef}
          onClick={() => setIsOpen(!isOpen)}
          sdsStyle="rounded"
          sdsType="primary"
        >
          Task Options
        </Button>
      </div>

      <DropdownMenu
        anchorEl={anchorRef.current}
        open={isOpen}
        options={advancedOptions}
        title="Task Management"
        search={true}
        renderInput={customSearchRender}
        onInputChange={handleInputChange}
        groupBy={(option) => option.category}
        onChange={handleSelectionChange}
        onClickAway={() => setIsOpen(false)}
        width={350}
        PopperBaseProps={{
          placement: 'bottom-start',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 8],
              },
            },
          ],
        }}
        ClickAwayListenerProps={{
          mouseEvent: 'onMouseDown',
          touchEvent: 'onTouchStart',
        }}
      />

      <div style={{ marginTop: '16px' }}>
        {searchValue && (
          <p style={{ fontSize: '14px', color: '#666' }}>
            Search: "{searchValue}"
          </p>
        )}
        
        {selectedOption && (
          <div style={{ 
            padding: '12px',
            backgroundColor: '#e8f4fd',
            borderRadius: '4px',
            border: '1px solid #bee5eb'
          }}>
            <h4 style={{ margin: '0 0 8px 0' }}>Selected Task:</h4>
            <p style={{ margin: '4px 0' }}><strong>Name:</strong> {selectedOption.name}</p>
            <p style={{ margin: '4px 0' }}><strong>Category:</strong> {selectedOption.category}</p>
            <p style={{ margin: '4px 0' }}><strong>Details:</strong> {selectedOption.details}</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

## Variations

### Positioning Options

- **bottom-start**: Menu appears below anchor, aligned to left edge
- **bottom-end**: Menu appears below anchor, aligned to right edge
- **top-start**: Menu appears above anchor, aligned to left edge
- **top-end**: Menu appears above anchor, aligned to right edge

### Layout Options

- **Single Column**: Standard vertical list of options
- **Multi-Column**: Side-by-side columns for related option groups

### Header Configurations

- **Title Only**: Simple text title in header
- **Custom Header**: Full custom header component
- **No Header**: Clean menu without header section

## Component States

- **Closed**: Menu is hidden and not rendered
- **Open**: Menu is visible and positioned relative to anchor
- **Searching**: Active search state with filtered options
- **Loading**: Shows loading indicator while fetching options

## Best Practices

### When to Use

- Use for context menus triggered by right-click or specific actions
- Ideal for dropdown menus that need precise positioning control
- Perfect for complex menus with search, grouping, or custom headers
- Recommended when you need to control the trigger element separately

### When Not to Use

- Avoid for simple form selections (use Dropdown instead)
- Don't use for navigation (use MenuSelect for navigation menus)
- Consider Button for single actions rather than single-option menus

### Accessibility Guidelines

- Component includes comprehensive ARIA attributes and roles
- Supports full keyboard navigation (Tab, Arrow keys, Enter, Escape)
- Screen readers announce menu state, options, and groupings
- Focus management handles anchor to menu transitions
- Click-away behavior is accessible to keyboard users

### UX Guidelines

- Position menus to avoid screen edges when possible
- Provide clear visual connection between trigger and menu
- Use search functionality for menus with 10+ options
- Consider grouping for related options
- Provide immediate feedback for menu actions

### Design Guidelines

- Maintain consistent menu widths for related functionality
- Use appropriate spacing and typography for readability
- Consider visual hierarchy in complex menu structures
- Ensure adequate contrast for all menu elements
- Test positioning behavior across different screen sizes

## Related Components

- **Dropdown** - Use for complete dropdown solution with integrated trigger
- **MenuSelect** - Use for navigation and command selection
- **Autocomplete** - Use for large datasets with advanced search capabilities
- **Button** - Often used as triggers for dropdown menus

## Migration Notes

### From Legacy Menu Components

- **Positioning System**: Updated to use PopperJS for more reliable positioning
- **Event Handling**: Improved click-away and keyboard interaction handling
- **Customization**: Enhanced header and search customization options

### Breaking Changes

- `anchorEl` prop is now required and must be a valid HTMLElement
- Updated styling system uses SDS design tokens
- Improved accessibility requires proper ARIA labeling

## API Reference

- [Storybook Stories](https://main--64ad2577a2c26e0097ff24a6.chromatic.com/?path=/story/components-dropdowns-dropdownmenu--default) - Interactive examples and testing
- [PopperJS Documentation](https://popper.js.org/) - Positioning system documentation
- [Design Tokens](https://zeroheight.com/2a1e5182b/p/6145b2-design-tokens) - Available theme tokens and values