# TableHeader

## Overview

The TableHeader component serves as the header section for Table components, providing a semantic structure for column headers. It automatically wraps its children in a TableRow with appropriate styling and accessibility attributes. The component renders as an HTML `<thead>` element and is designed to work exclusively with CellHeader components to create sortable, accessible column headers.

## Installation & Import

```tsx
import { TableHeader } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `React.ReactNode` | ✓ | - | Header cell components (typically CellHeader components) |

## Usage Examples

### Basic Usage

```tsx
import React from 'react';
import { 
  Table, 
  TableHeader, 
  CellHeader, 
  TableRow, 
  CellBasic 
} from '@czi-sds/components';

function BasicTableWithHeader() {
  return (
    <Table>
      <TableHeader>
        <CellHeader>Name</CellHeader>
        <CellHeader>Type</CellHeader>
        <CellHeader>Status</CellHeader>
      </TableHeader>
      <tbody>
        <TableRow>
          <CellBasic primaryText="Sample A" />
          <CellBasic primaryText="RNA" />
          <CellBasic primaryText="Active" />
        </TableRow>
      </tbody>
    </Table>
  );
}
```

### Advanced Usage with Sortable Headers

```tsx
import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  CellHeader, 
  TableRow, 
  CellBasic 
} from '@czi-sds/components';

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

function SortableTable() {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  
  const data = [
    { name: 'Sample A', type: 'RNA', status: 'Active', count: 150 },
    { name: 'Sample B', type: 'DNA', status: 'Inactive', count: 200 },
    { name: 'Sample C', type: 'Protein', status: 'Active', count: 75 }
  ];

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  return (
    <Table>
      <TableHeader>
        <CellHeader 
          active={sortConfig?.key === 'name'}
          hover
          onClick={() => handleSort('name')}
        >
          Sample Name
        </CellHeader>
        <CellHeader 
          active={sortConfig?.key === 'type'}
          hover
          onClick={() => handleSort('type')}
        >
          Type
        </CellHeader>
        <CellHeader 
          active={sortConfig?.key === 'status'}
          hover
          onClick={() => handleSort('status')}
        >
          Status
        </CellHeader>
        <CellHeader 
          active={sortConfig?.key === 'count'}
          hover
          horizontalAlign="right"
          onClick={() => handleSort('count')}
        >
          Sample Count
        </CellHeader>
      </TableHeader>
      <tbody>
        {sortedData.map((item, index) => (
          <TableRow key={index}>
            <CellBasic primaryText={item.name} />
            <CellBasic primaryText={item.type} />
            <CellBasic primaryText={item.status} />
            <CellBasic 
              primaryText={item.count.toString()} 
              horizontalAlign="right" 
            />
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}
```

### With Theme Integration

```tsx
import React from 'react';
import { 
  Table, 
  TableHeader, 
  CellHeader, 
  getColors, 
  getSpaces 
} from '@czi-sds/components';
import styled from '@emotion/styled';

const ThemedTableContainer = styled.div`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    return `
      background-color: ${colors?.primary[50]};
      border-radius: ${spaces?.xs}px;
      padding: ${spaces?.m}px;
    `;
  }}
`;

function ThemedTableHeader() {
  return (
    <ThemedTableContainer>
      <Table>
        <TableHeader>
          <CellHeader active hover>Active Column</CellHeader>
          <CellHeader hover>Sortable Column</CellHeader>
          <CellHeader hideSortIcon>Static Column</CellHeader>
          <CellHeader horizontalAlign="right">Right Aligned</CellHeader>
        </TableHeader>
      </Table>
    </ThemedTableContainer>
  );
}
```

## Component Structure

### Automatic Row Wrapper

The TableHeader component automatically wraps its children in a TableRow component with specific configurations:

```tsx
<TableHeader>
  {/* Children are automatically wrapped in: */}
  <TableRow hover={false} shouldShowTooltipOnHover={false}>
    {children}
  </TableRow>
</TableHeader>
```

### Semantic HTML Output

```html
<thead>
  <tr>
    <th>Column 1</th>
    <th>Column 2</th>
  </tr>
</thead>
```

## Best Practices

### When to Use

- Use TableHeader as the container for all table column headers
- Essential for creating accessible table structures
- Required when using sortable columns or complex header layouts
- Ideal for tables that need semantic HTML structure for screen readers

### When Not to Use

- Don't use multiple TableHeader components in a single table
- Avoid using TableHeader outside of Table components
- Don't use for footer content (use tbody with appropriate styling instead)

### Accessibility Guidelines

- TableHeader automatically provides proper semantic structure with `<thead>` element
- Works with CellHeader to provide appropriate ARIA attributes and roles
- Maintains proper tab order for sortable column headers
- Screen readers can navigate column headers independently from table data
- Supports keyboard navigation for interactive sorting functionality

### Design Guidelines

- Keep header text concise but descriptive
- Use consistent alignment patterns (text left, numbers right)
- Implement visual hierarchy with active states for sorted columns
- Maintain adequate spacing and padding for touch targets
- Use consistent typography from the design system

## Related Components

- **Table** - Parent container that houses the TableHeader
- **CellHeader** - Individual header cell components with sorting capabilities
- **TableRow** - Automatically used internally to wrap header cells
- **CellBasic** - Used in table body for basic data display
- **CellComponent** - Used in table body for complex content

## Migration Notes

- **Automatic Wrapping**: TableHeader automatically wraps children in TableRow, eliminating need for manual row creation in headers
- **Semantic Structure**: Renders as proper `<thead>` element for improved accessibility
- **Hover Disabled**: Header rows automatically disable hover effects to maintain consistent header appearance

## API Reference

- [Storybook Stories](https://main--61e887d56582fe003ac9595e.chromatic.com/?path=/story/components-table-table--default) - Interactive examples in full table context
- [Table Component](./table.md) - Parent component documentation
- [CellHeader Component](./cell-header.md) - Header cell component with sorting functionality