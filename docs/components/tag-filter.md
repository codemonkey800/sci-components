# TagFilter

## Overview

The TagFilter component is a specialized tag designed specifically for filtering interfaces. It extends the basic tag functionality with a built-in delete/remove capability, making it perfect for showing active filters, selected options, or removable items. The component automatically displays a close icon and provides an onDelete callback for handling removal interactions.

## Installation & Import

```tsx
import { TagFilter } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| label | `string` | ✓ | - | The content of the component |
| onDelete | `(event: any) => void` | ✓ | - | Callback fired when the delete icon is clicked. If set, the delete icon will be shown |
| disabled | `boolean` | - | `false` | If true, the component is disabled |
| icon | `ReactElement` | - | - | Icon element to display |
| size | `"small" \| "medium"` | - | `"medium"` | The size of the component |
| onClick | `function` | - | - | Callback fired when the tag body is clicked |

## Usage Examples

### Basic Usage

```tsx
import React, { useState } from 'react';
import { TagFilter } from '@czi-sds/components';

function BasicTagFilterExample() {
  const [activeFilters, setActiveFilters] = useState(['DNA Analysis', 'Cell Biology']);

  const handleRemoveFilter = (filterToRemove: string) => {
    setActiveFilters(prev => 
      prev.filter(filter => filter !== filterToRemove)
    );
  };

  return (
    <div>
      <h3>Active Filters:</h3>
      {activeFilters.map((filter) => (
        <TagFilter
          key={filter}
          label={filter}
          onDelete={() => handleRemoveFilter(filter)}
        />
      ))}
    </div>
  );
}
```

### Filter Management Interface

```tsx
import React, { useState } from 'react';
import { TagFilter, Button } from '@czi-sds/components';

interface Filter {
  id: string;
  label: string;
  category: string;
}

function FilterManagementExample() {
  const [activeFilters, setActiveFilters] = useState<Filter[]>([
    { id: '1', label: 'Published', category: 'Status' },
    { id: '2', label: 'Genomics', category: 'Field' },
    { id: '3', label: '2023', category: 'Year' }
  ]);

  const handleRemoveFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.filter(filter => filter.id !== filterId)
    );
  };

  const handleClearAllFilters = () => {
    setActiveFilters([]);
  };

  const addSampleFilter = () => {
    const newFilter: Filter = {
      id: Date.now().toString(),
      label: 'New Filter',
      category: 'Custom'
    };
    setActiveFilters(prev => [...prev, newFilter]);
  };

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Button sdsType="primary" sdsStyle="minimal" onClick={addSampleFilter}>
          Add Filter
        </Button>
        {activeFilters.length > 0 && (
          <Button sdsType="secondary" sdsStyle="minimal" onClick={handleClearAllFilters}>
            Clear All
          </Button>
        )}
      </div>
      
      <div>
        <strong>Applied Filters ({activeFilters.length}):</strong>
        {activeFilters.length === 0 ? (
          <p>No filters applied</p>
        ) : (
          activeFilters.map((filter) => (
            <TagFilter
              key={filter.id}
              label={`${filter.category}: ${filter.label}`}
              onDelete={() => handleRemoveFilter(filter.id)}
              style={{ margin: '4px' }}
            />
          ))
        )}
      </div>
    </div>
  );
}
```

### With Icons and Different Sizes

```tsx
import React, { useState } from 'react';
import { TagFilter, Icon } from '@czi-sds/components';

function IconTagFiltersExample() {
  const [filters, setFilters] = useState([
    { id: '1', label: 'High Priority', icon: 'ExclamationMarkCircle', size: 'medium' },
    { id: '2', label: 'Assigned to Me', icon: 'Person', size: 'small' },
    { id: '3', label: 'Due Today', icon: 'CheckCircle', size: 'medium' },
  ]);

  const handleRemoveFilter = (filterId: string) => {
    setFilters(prev => prev.filter(f => f.id !== filterId));
  };

  return (
    <div>
      <h3>Advanced Filters:</h3>
      {filters.map((filter) => (
        <TagFilter
          key={filter.id}
          label={filter.label}
          size={filter.size as "small" | "medium"}
          icon={<Icon sdsIcon={filter.icon as any} sdsSize="s" />}
          onDelete={() => handleRemoveFilter(filter.id)}
          style={{ margin: '4px' }}
        />
      ))}
    </div>
  );
}
```

### Interactive Filter Tags

```tsx
import React, { useState } from 'react';
import { TagFilter } from '@czi-sds/components';

interface FilterItem {
  id: string;
  label: string;
  count?: number;
}

function InteractiveFilterTagsExample() {
  const [selectedFilters, setSelectedFilters] = useState<FilterItem[]>([
    { id: '1', label: 'Machine Learning', count: 245 },
    { id: '2', label: 'COVID-19', count: 128 },
  ]);

  const handleRemoveFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.filter(filter => filter.id !== filterId)
    );
  };

  const handleFilterClick = (filter: FilterItem) => {
    console.log(`Clicked on filter: ${filter.label}`);
    // Could open a detail modal or navigate to filter details
  };

  return (
    <div>
      <h3>Search Results Filtered By:</h3>
      {selectedFilters.length === 0 ? (
        <p>No filters active - showing all results</p>
      ) : (
        <div>
          {selectedFilters.map((filter) => (
            <TagFilter
              key={filter.id}
              label={`${filter.label} (${filter.count})`}
              onDelete={() => handleRemoveFilter(filter.id)}
              onClick={() => handleFilterClick(filter)}
              style={{ 
                margin: '4px', 
                cursor: 'pointer'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

### Disabled State

```tsx
import React from 'react';
import { TagFilter } from '@czi-sds/components';

function DisabledTagFiltersExample() {
  return (
    <div>
      <h3>System Applied Filters (Read-only):</h3>
      <TagFilter
        label="System Filter - Cannot Remove"
        disabled
        onDelete={() => console.log('This should not fire when disabled')}
      />
      <TagFilter
        label="Temporary Filter"
        onDelete={() => console.log('Filter removed')}
      />
    </div>
  );
}
```

### With Theme Integration

```tsx
import React, { useState } from 'react';
import { TagFilter, getSpaces } from '@czi-sds/components';
import styled from '@emotion/styled';

const FilterContainer = styled.div`
  ${(props) => {
    const spaces = getSpaces(props);
    return `
      padding: ${spaces?.m}px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background-color: #fafafa;
    `;
  }}
`;

function ThemedFilterExample() {
  const [filters, setFilters] = useState([
    'Genomics Research',
    'Cell Biology',
    'Machine Learning'
  ]);

  const handleRemoveFilter = (filterToRemove: string) => {
    setFilters(prev => prev.filter(f => f !== filterToRemove));
  };

  return (
    <FilterContainer>
      <h4>Research Areas:</h4>
      {filters.map((filter) => (
        <TagFilter
          key={filter}
          label={filter}
          onDelete={() => handleRemoveFilter(filter)}
          style={{ margin: '4px' }}
        />
      ))}
    </FilterContainer>
  );
}
```

## Variations

### Size Variations

- **small**: Compact size for dense filter interfaces
- **medium**: Standard size for most filtering use cases

## Component States

- **Default**: Normal interactive state with visible delete icon
- **Hover**: Enhanced appearance on mouse hover over tag or delete icon
- **Disabled**: Non-interactive state - tag appears muted and delete is non-functional
- **Focus**: Accessible focus states for both main tag and delete button

## Best Practices

### When to Use

- Display active filters in search or browse interfaces
- Show selected options that can be individually removed
- Create removable tag collections (like email recipients)
- Display applied categories or labels that users can modify
- Build dynamic filter panels with individual item control

### When Not to Use

- For permanent labels or categories (use Tag instead)
- When removal functionality is not needed (use Tag instead)
- For primary actions (use Button instead)
- In read-only contexts where modification is not allowed

### Accessibility Guidelines

- Component includes proper ARIA attributes for the delete functionality
- Delete button is keyboard accessible with Enter and Space keys
- Screen readers announce both the tag content and removal capability
- Focus management works properly between tag body and delete button
- High contrast ratios maintained for delete icon visibility

### Design Guidelines

- Use consistent spacing between multiple filter tags
- Group related filters together visually
- Provide clear visual feedback for delete hover states
- Consider the overall density of your filter interface
- Ensure delete targets are large enough for touch interaction

### Interaction Patterns

- **Single Click Delete**: Most common pattern - click X to remove
- **Confirmation Pattern**: For important filters, consider confirmation dialogs
- **Bulk Operations**: Provide "Clear All" functionality for multiple filters
- **Undo Capability**: Consider providing undo functionality after filter removal

## Related Components

- **Tag** - Basic tag component without delete functionality
- **Chip** - Deprecated predecessor component
- **Button** - For filter actions and bulk operations
- **Icon** - For custom icons within filter tags

## API Reference

- [Tag Component](tag.md) - Basic tag without delete functionality
- [Storybook Stories](link-to-storybook) - Interactive examples and testing
- [Design Tokens](../design-tokens.md) - Available theme tokens and values