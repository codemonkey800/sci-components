# Table

## Overview

The Table component provides a structured way to display tabular data with consistent Science Design System styling. It serves as the main container for table content and works in conjunction with TableHeader, TableRow, and various Cell components to create comprehensive data tables. The component is built on semantic HTML table elements and includes proper accessibility support for screen readers.

## Installation & Import

```tsx
import { Table } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `React.ReactNode` | ✓ | - | Table content including header and row components |
| className | `string` | - | - | Additional CSS classes to apply |
| id | `string` | - | - | Unique identifier for the table element |
| style | `CSSProperties` | - | - | Inline styles to apply |
| onChange | `FormEventHandler<HTMLTableElement>` | - | - | Handler for form change events |
| onClick | `function` | - | - | Click event handler |

## Usage Examples

### Basic Usage

```tsx
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  CellHeader, 
  CellBasic 
} from '@czi-sds/components';

function BasicTable() {
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
        <TableRow>
          <CellBasic primaryText="Sample B" />
          <CellBasic primaryText="DNA" />
          <CellBasic primaryText="Inactive" />
        </TableRow>
      </tbody>
    </Table>
  );
}
```

### Advanced Usage with Components

```tsx
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  CellHeader, 
  CellBasic,
  CellComponent,
  Tag,
  Icon 
} from '@czi-sds/components';

function AdvancedTable() {
  const data = [
    {
      id: 1,
      name: 'Experiment A',
      type: 'RNA Sequencing',
      status: 'completed',
      samples: 156
    },
    {
      id: 2,
      name: 'Experiment B',
      type: 'DNA Analysis',
      status: 'in-progress',
      samples: 89
    }
  ];

  return (
    <Table>
      <TableHeader>
        <CellHeader>Category</CellHeader>
        <CellHeader active hover>Experiment</CellHeader>
        <CellHeader hover>Type</CellHeader>
        <CellHeader>Status</CellHeader>
        <CellHeader horizontalAlign="right">Samples</CellHeader>
      </TableHeader>
      <tbody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <CellComponent verticalAlign="center" horizontalAlign="center">
              <Icon sdsSize="xl" sdsIcon="Flask" />
            </CellComponent>
            <CellBasic
              primaryText={item.name}
              secondaryText="Detailed experiment description"
              shouldTextWrap
            />
            <CellBasic primaryText={item.type} />
            <CellComponent>
              <Tag
                color={item.status === 'completed' ? 'positive' : 'info'}
                label={item.status}
                sdsStyle="rounded"
                sdsType="secondary"
              />
            </CellComponent>
            <CellBasic
              primaryText={item.samples.toString()}
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
import { Table, TableHeader, TableRow, CellHeader, CellBasic, getColors } from '@czi-sds/components';
import styled from '@emotion/styled';

const ThemedTableContainer = styled.div`
  ${(props) => {
    const colors = getColors(props);
    return `
      background-color: ${colors?.primary[50]};
      border-radius: 8px;
      padding: 16px;
      border: 1px solid ${colors?.primary[200]};
    `;
  }}
`;

function ThemedTable() {
  return (
    <ThemedTableContainer>
      <Table>
        <TableHeader>
          <CellHeader>Sample ID</CellHeader>
          <CellHeader>Result</CellHeader>
        </TableHeader>
        <tbody>
          <TableRow>
            <CellBasic primaryText="SMP-001" />
            <CellBasic primaryText="Positive" />
          </TableRow>
        </tbody>
      </Table>
    </ThemedTableContainer>
  );
}
```

## Component Structure

### Table Hierarchy

The Table component works with several related components to create complete data tables:

- **Table**: Root container element
- **TableHeader**: Header row container
- **TableRow**: Data row container
- **CellHeader**: Header cells with sorting capabilities
- **CellBasic**: Basic data cells with text content
- **CellComponent**: Cells that can contain React components

### Semantic HTML Structure

```tsx
<Table>
  <TableHeader> {/* renders as <thead> */}
    <CellHeader>...</CellHeader> {/* renders as <th> */}
  </TableHeader>
  <tbody>
    <TableRow> {/* renders as <tr> */}
      <CellBasic>...</CellBasic> {/* renders as <td> */}
      <CellComponent>...</CellComponent> {/* renders as <td> */}
    </TableRow>
  </tbody>
</Table>
```

## Best Practices

### When to Use

- Use Table for displaying structured tabular data with multiple columns
- Ideal for scientific datasets, experimental results, and comparative data
- Recommended for data that benefits from sorting, filtering, or row selection
- Perfect for displaying complex data relationships in a scannable format

### When Not to Use

- Avoid using Table for simple key-value pairs (consider List instead)
- Don't use for layout purposes (use Grid or Flex components)
- Consider Card components for single-record displays

### Accessibility Guidelines

- Table automatically includes proper ARIA roles and labels
- Header cells include scope attributes for screen reader navigation
- Sortable columns include appropriate ARIA sort states
- Keyboard navigation is supported for interactive elements
- High contrast ratios maintained for all text and backgrounds

### Design Guidelines

- Use consistent cell alignment based on data type (numbers right-aligned, text left-aligned)
- Implement proper spacing using theme tokens
- Maintain scannable row heights for easy data comparison
- Use semantic colors for status indicators and categorization
- Include loading and empty states for dynamic data

## Related Components

- **TableHeader** - Container for table header row with sorting capabilities
- **TableRow** - Individual data row component with hover and selection states
- **CellHeader** - Header cell component with built-in sorting functionality
- **CellBasic** - Basic cell component for text-based data display
- **CellComponent** - Flexible cell component for custom content and components
- **List** - Alternative for simpler data display without tabular structure

## Migration Notes

- **Material UI Integration**: Table extends standard HTML table props while maintaining MUI theming compatibility
- **Accessibility Improvements**: Enhanced ARIA support and keyboard navigation compared to basic HTML tables
- **Consistent Styling**: Uses SDS design tokens for consistent appearance across all table components

## API Reference

- [Storybook Stories](https://main--61e887d56582fe003ac9595e.chromatic.com/?path=/story/components-table-table--default) - Interactive examples and testing
- [Design Tokens](https://zeroheight.com/2e36e50c7/p/06c2e7-table) - Available theme tokens and styling options