# ComplexFilter

## Overview

The ComplexFilter component provides an advanced filtering interface that combines a dropdown selection mechanism with chip-based display of selected filters. It supports both single and multiple selections, multi-column data structures, search functionality, and sophisticated data manipulation. Built on the Dropdown component, it offers a comprehensive solution for complex filtering scenarios in data-heavy applications.

## Installation & Import

```tsx
import { ComplexFilter } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| label | `ReactNode` | - | - | Label for the filter dropdown trigger |
| options | `T[]` | ✓ | - | Array of options to choose from |
| multiple | `boolean` | - | `false` | Whether to allow multiple selections |
| search | `boolean` | - | `false` | Whether to enable search functionality |
| value | `AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>` | - | - | Current selected value(s) |
| onChange | `function` | - | - | Callback fired when selection changes |
| InputDropdownProps | `InputDropdownProps` | - | `{ sdsStyle: "minimal" }` | Props passed to the dropdown trigger |
| DropdownMenuProps | `DropdownMenuProps` | - | - | Props passed to the dropdown menu |
| buttons | `boolean` | - | `true` | Whether to show action buttons in dropdown |
| isTriggerChangeOnOptionClick | `boolean` | - | `false` | Whether clicking options immediately triggers change |

### Option Interface

```tsx
interface DefaultAutocompleteOption {
  name: string;
  section?: string;
  [key: string]: any;
}
```

## Usage Examples

### Basic Single Selection Filter

```tsx
import React, { useState } from 'react';
import { ComplexFilter } from '@czi-sds/components';

interface ExperimentType {
  name: string;
  section: string;
  description: string;
}

function BasicComplexFilter() {
  const [selectedType, setSelectedType] = useState<ExperimentType | null>(null);

  const experimentTypes: ExperimentType[] = [
    { 
      name: 'RNA Sequencing', 
      section: 'Genomics',
      description: 'RNA-seq analysis for gene expression'
    },
    { 
      name: 'DNA Sequencing', 
      section: 'Genomics',
      description: 'Whole genome or targeted sequencing'
    },
    { 
      name: 'Flow Cytometry', 
      section: 'Cell Biology',
      description: 'Cell population analysis'
    },
    { 
      name: 'Western Blot', 
      section: 'Protein Analysis',
      description: 'Protein detection and quantification'
    },
    { 
      name: 'Microscopy', 
      section: 'Imaging',
      description: 'Cellular and tissue imaging'
    }
  ];

  return (
    <div style={{ width: '300px' }}>
      <ComplexFilter<ExperimentType, false, false, false>
        label="Select Experiment Type"
        options={experimentTypes}
        value={selectedType}
        onChange={(value) => {
          setSelectedType(value);
          console.log('Selected:', value);
        }}
        search
        DropdownMenuProps={{
          title: "Experiment Types",
          width: 350,
          groupBy: (option) => option.section
        }}
        InputDropdownProps={{
          sdsStyle: "square",
          width: 300,
          placeholder: "Choose experiment type..."
        }}
      />
    </div>
  );
}
```

### Multiple Selection Filter

```tsx
import React, { useState } from 'react';
import { ComplexFilter, Button } from '@czi-sds/components';

interface SampleCategory {
  name: string;
  section: string;
  count: number;
}

function MultipleSelectionFilter() {
  const [selectedCategories, setSelectedCategories] = useState<SampleCategory[]>([]);

  const sampleCategories: SampleCategory[] = [
    { name: 'Blood Samples', section: 'Clinical', count: 245 },
    { name: 'Tissue Biopsies', section: 'Clinical', count: 89 },
    { name: 'Cell Cultures', section: 'Laboratory', count: 156 },
    { name: 'DNA Extracts', section: 'Laboratory', count: 312 },
    { name: 'RNA Isolates', section: 'Laboratory', count: 178 },
    { name: 'Protein Lysates', section: 'Laboratory', count: 94 },
    { name: 'Plasma Samples', section: 'Clinical', count: 267 },
    { name: 'Serum Samples', section: 'Clinical', count: 198 }
  ];

  const clearFilters = () => {
    setSelectedCategories([]);
  };

  return (
    <div style={{ width: '400px' }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <ComplexFilter<SampleCategory, true, false, false>
          label="Filter by Sample Type"
          options={sampleCategories}
          value={selectedCategories}
          onChange={(value) => {
            setSelectedCategories(value || []);
            console.log('Selected categories:', value);
          }}
          multiple
          search
          DropdownMenuProps={{
            title: "Sample Categories",
            width: 400,
            PopperPlacement: "bottom-start",
            groupBy: (option) => option.section,
            getOptionLabel: (option) => `${option.name} (${option.count})`
          }}
          InputDropdownProps={{
            sdsStyle: "square",
            width: 250,
            placeholder: "Select sample types..."
          }}
        />
        
        <Button
          sdsType="secondary"
          sdsStyle="square"
          onClick={clearFilters}
          disabled={selectedCategories.length === 0}
        >
          Clear All
        </Button>
      </div>

      {selectedCategories.length > 0 && (
        <div style={{ 
          padding: '12px', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '4px' 
        }}>
          <strong>Active Filters:</strong> {selectedCategories.length} categories selected
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            Total samples: {selectedCategories.reduce((sum, cat) => sum + cat.count, 0)}
          </div>
        </div>
      )}
    </div>
  );
}
```

### Advanced Multi-Column Filter

```tsx
import React, { useState } from 'react';
import { ComplexFilter, Table, TableHeader, TableRow, CellHeader, CellBasic } from '@czi-sds/components';

interface FilterOption {
  name: string;
  section: string;
  category: string;
}

interface MultiColumnValue {
  status?: FilterOption[];
  priority?: FilterOption[];
  department?: FilterOption[];
}

function MultiColumnFilter() {
  const [filters, setFilters] = useState<MultiColumnValue>({});

  const filterOptions: FilterOption[] = [
    // Status options
    { name: 'Active', section: 'Status', category: 'status' },
    { name: 'Completed', section: 'Status', category: 'status' },
    { name: 'On Hold', section: 'Status', category: 'status' },
    { name: 'Failed', section: 'Status', category: 'status' },
    
    // Priority options
    { name: 'High Priority', section: 'Priority', category: 'priority' },
    { name: 'Medium Priority', section: 'Priority', category: 'priority' },
    { name: 'Low Priority', section: 'Priority', category: 'priority' },
    
    // Department options
    { name: 'Genomics Lab', section: 'Department', category: 'department' },
    { name: 'Proteomics Lab', section: 'Department', category: 'department' },
    { name: 'Cell Biology Lab', section: 'Department', category: 'department' },
    { name: 'Pathology Lab', section: 'Department', category: 'department' }
  ];

  // Mock data for demonstration
  const experiments = [
    { 
      id: 'EXP-001', 
      name: 'RNA Analysis Project', 
      status: 'Active',
      priority: 'High Priority',
      department: 'Genomics Lab',
      samples: 45 
    },
    { 
      id: 'EXP-002', 
      name: 'Protein Expression Study', 
      status: 'Completed',
      priority: 'Medium Priority', 
      department: 'Proteomics Lab',
      samples: 32
    },
    { 
      id: 'EXP-003', 
      name: 'Cell Migration Analysis', 
      status: 'On Hold',
      priority: 'Low Priority',
      department: 'Cell Biology Lab',
      samples: 18
    }
  ];

  const applyFilters = () => {
    console.log('Applying multi-column filters:', filters);
    // Filter logic would be implemented here
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <div style={{ marginBottom: '20px' }}>
        <ComplexFilter<FilterOption, true, false, false>
          label="Advanced Filters"
          options={filterOptions}
          value={filters}
          onChange={(value) => {
            setFilters(value || {});
            console.log('Multi-column filters changed:', value);
          }}
          multiple
          search
          DropdownMenuProps={{
            title: "Filter Options",
            width: 450,
            groupBy: (option) => option.section,
            columns: [
              {
                label: "Status",
                key: "status",
                options: filterOptions.filter(opt => opt.category === 'status')
              },
              {
                label: "Priority", 
                key: "priority",
                options: filterOptions.filter(opt => opt.category === 'priority')
              },
              {
                label: "Department",
                key: "department", 
                options: filterOptions.filter(opt => opt.category === 'department')
              }
            ]
          }}
          InputDropdownProps={{
            sdsStyle: "square",
            width: 200,
            placeholder: "Add filters..."
          }}
          isTriggerChangeOnOptionClick={false}
        />
      </div>

      <Table>
        <TableHeader>
          <CellHeader>Experiment ID</CellHeader>
          <CellHeader>Name</CellHeader>
          <CellHeader>Status</CellHeader>
          <CellHeader>Priority</CellHeader>
          <CellHeader>Department</CellHeader>
          <CellHeader horizontalAlign="right">Samples</CellHeader>
        </TableHeader>
        <tbody>
          {experiments.map((exp) => (
            <TableRow key={exp.id}>
              <CellBasic primaryText={exp.id} />
              <CellBasic primaryText={exp.name} />
              <CellBasic primaryText={exp.status} />
              <CellBasic primaryText={exp.priority} />
              <CellBasic primaryText={exp.department} />
              <CellBasic 
                primaryText={exp.samples.toString()}
                horizontalAlign="right"
              />
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
```

### Real-Time Search and Filter

```tsx
import React, { useState, useMemo } from 'react';
import { ComplexFilter, ContentCard, ContentCardBody, ContentCardActions, Button, Icon } from '@czi-sds/components';

interface SearchableItem {
  name: string;
  section: string;
  tags: string[];
  type: string;
  lastModified: string;
}

function SearchableComplexFilter() {
  const [selectedFilters, setSelectedFilters] = useState<SearchableItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const allItems: SearchableItem[] = [
    {
      name: 'RNA Sequencing Protocol v3.2',
      section: 'Protocols',
      tags: ['genomics', 'sequencing', 'rna'],
      type: 'Protocol',
      lastModified: '2024-01-15'
    },
    {
      name: 'Western Blot Standard Procedure',
      section: 'Protocols', 
      tags: ['protein', 'western', 'immunoblot'],
      type: 'Protocol',
      lastModified: '2024-01-12'
    },
    {
      name: 'Sample Collection Guidelines',
      section: 'Guidelines',
      tags: ['collection', 'samples', 'sop'],
      type: 'Guideline',
      lastModified: '2024-01-10'
    },
    {
      name: 'Lab Safety Procedures',
      section: 'Safety',
      tags: ['safety', 'procedures', 'lab'],
      type: 'Safety Document',
      lastModified: '2024-01-08'
    },
    {
      name: 'Equipment Maintenance Log',
      section: 'Maintenance',
      tags: ['equipment', 'maintenance', 'log'],
      type: 'Log',
      lastModified: '2024-01-05'
    }
  ];

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm) return allItems;
    
    return allItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Apply selected filters to show matching content
  const displayedItems = useMemo(() => {
    if (selectedFilters.length === 0) return allItems;
    
    return allItems.filter(item =>
      selectedFilters.some(filter => 
        filter.name === item.name || 
        filter.section === item.section ||
        filter.type === item.type
      )
    );
  }, [selectedFilters]);

  return (
    <div style={{ width: '100%', maxWidth: '1000px' }}>
      <div style={{ marginBottom: '24px' }}>
        <ComplexFilter<SearchableItem, true, false, false>
          label="Search and Filter Documents"
          options={filteredItems}
          value={selectedFilters}
          onChange={(value) => setSelectedFilters(value || [])}
          multiple
          search
          DropdownMenuProps={{
            title: "Laboratory Documents",
            width: 500,
            PopperPlacement: "bottom-start",
            groupBy: (option) => option.section,
            getOptionLabel: (option) => option.name,
            renderOption: (props, option) => (
              <div {...props} style={{ padding: '8px 12px' }}>
                <div style={{ fontWeight: '500' }}>{option.name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {option.type} • Modified {option.lastModified}
                </div>
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                  Tags: {option.tags.join(', ')}
                </div>
              </div>
            )
          }}
          InputDropdownProps={{
            sdsStyle: "square",
            width: 300,
            placeholder: "Search documents...",
            onChange: (e) => setSearchTerm(e.target.value)
          }}
        />
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '16px'
      }}>
        {displayedItems.map((item, index) => (
          <ContentCard
            key={index}
            visualElementType="icon"
            icon={<Icon sdsIcon="Document" sdsSize="l" />}
            titleText={item.name}
            subtitleText={`${item.type} • ${item.section}`}
            overlineText="Laboratory Document"
            metadataText={`Modified ${item.lastModified}`}
          >
            <ContentCardBody>
              <div style={{ marginBottom: '12px' }}>
                <strong>Tags:</strong>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '4px', 
                  marginTop: '4px' 
                }}>
                  {item.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      style={{
                        fontSize: '11px',
                        backgroundColor: '#e0e0e0',
                        padding: '2px 6px',
                        borderRadius: '10px',
                        color: '#666'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ContentCardBody>
            
            <ContentCardActions>
              <Button
                sdsType="secondary"
                sdsStyle="square"
                size="small"
                startIcon={<Icon sdsIcon="Eye" sdsSize="xs" />}
              >
                View
              </Button>
              <Button
                sdsType="primary"
                sdsStyle="square"
                size="small"
                startIcon={<Icon sdsIcon="Download" sdsSize="xs" />}
              >
                Download
              </Button>
            </ContentCardActions>
          </ContentCard>
        ))}
      </div>

      {displayedItems.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#666'
        }}>
          <Icon sdsIcon="Search" sdsSize="xl" style={{ marginBottom: '16px' }} />
          <h3>No documents match your filters</h3>
          <p>Try adjusting your search criteria or clearing some filters.</p>
        </div>
      )}
    </div>
  );
}
```

## Data Structures

### Single Column Options

```tsx
interface SingleColumnOption {
  name: string;         // Display name (required)
  section?: string;     // Grouping section (optional)
  [key: string]: any;   // Additional properties
}
```

### Multi-Column Options

```tsx
interface MultiColumnValue {
  [columnKey: string]: Option[] | Option;
}

// Example:
{
  status: [{ name: 'Active' }, { name: 'Complete' }],
  priority: [{ name: 'High' }],
  department: { name: 'Genomics Lab' }
}
```

## Chip Management

### Automatic Chip Display
- Selected options automatically display as removable chips
- Chips show below the filter dropdown
- Each chip includes a delete button for individual removal
- Multi-column selections group chips by category

### Chip Interactions
- **Click to Remove**: Users can click the X button on any chip
- **Keyboard Support**: Chips support keyboard navigation and deletion
- **Visual Feedback**: Hover and focus states provide clear interaction cues

## Configuration Options

### Search Configuration
- **Enabled**: `search={true}` enables real-time search within options
- **Custom Search**: Implement custom search logic in dropdown options
- **Search Placeholder**: Customize placeholder text through InputDropdownProps

### Dropdown Menu Configuration
- **Grouping**: Use `groupBy` to organize options into sections
- **Custom Rendering**: Override option display with `renderOption`
- **Positioning**: Control popup position with `PopperPlacement`
- **Sizing**: Set menu width and maximum height

### Input Styling
- **Style Variants**: Use `sdsStyle` for different visual treatments
- **Width Control**: Set specific widths for consistent layouts
- **Placeholder Text**: Provide helpful placeholder content

## Best Practices

### When to Use

- Use ComplexFilter for multi-faceted filtering scenarios
- Ideal for data tables and search interfaces with multiple criteria
- Perfect for scientific datasets requiring precise filtering
- Recommended for applications with complex hierarchical data

### When Not to Use

- Don't use for simple single-select scenarios (consider Dropdown instead)
- Avoid for binary choices (use Checkbox or Toggle instead) 
- Consider InputDropdown for straightforward dropdown selections

### Performance Considerations

- **Large Option Lists**: Implement virtualization for >1000 options
- **Search Optimization**: Debounce search input for better performance
- **Memory Management**: Clear unused selections to prevent memory leaks
- **Render Optimization**: Use React.memo for expensive option rendering

### Accessibility Guidelines

- ComplexFilter includes full keyboard navigation support
- Screen readers announce selected options and changes
- Focus management maintained throughout dropdown interactions
- Color contrast meets WCAG guidelines for all interactive elements
- ARIA labels provide context for complex multi-column selections

## Related Components

- **Dropdown** - Underlying component for selection functionality
- **Autocomplete** - Alternative for type-ahead search scenarios
- **InputDropdown** - Simpler dropdown without chip management
- **Checkbox** - Alternative for boolean filtering options
- **Table** - Often used together for data filtering interfaces

## Migration Notes

- **Controlled vs Uncontrolled**: Component supports both controlled and uncontrolled usage patterns
- **TypeScript Support**: Full generic type support for custom option interfaces
- **Material UI Integration**: Built on MUI Autocomplete with enhanced SDS styling

## API Reference

- [Storybook Stories](https://main--61e887d56582fe003ac9595e.chromatic.com/?path=/story/components-dropdowns-complexfilter--default) - Interactive examples and testing
- [Dropdown Component](./dropdown.md) - Underlying dropdown functionality
- [Autocomplete Component](./autocomplete.md) - Related search and selection component