# CellHeader

## Overview

The CellHeader component provides sortable column headers for table structures with built-in sorting indicators, hover states, and accessibility features. It renders as an HTML `<th>` element and integrates seamlessly with the TableHeader component to create interactive, sortable table columns. The component includes automatic sort icon management, text truncation, and tooltip support for enhanced user experience.

## Installation & Import

```tsx
import { CellHeader } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `React.ReactNode` | ✓ | - | Header text or content to display |
| active | `boolean` | - | `false` | Whether this column is currently sorted |
| direction | `"asc" \| "desc"` | - | `"desc"` | Sort direction indicator |
| hideSortIcon | `boolean` | - | `false` | Whether to hide the sort icon |
| hover | `boolean` | - | `false` | Whether to show hover effects and enable sorting |
| horizontalAlign | `"left" \| "center" \| "right"` | - | `"left"` | Horizontal alignment of header content |
| shouldTruncate | `boolean` | - | `false` | Whether to truncate long header text |
| tooltipText | `string` | - | - | Main tooltip text to display on hover |
| tooltipSubtitle | `string` | - | - | Subtitle text for the tooltip |
| shouldShowTooltipOnHover | `boolean` | - | `false` | Whether to show tooltip on hover |
| tooltipProps | `TooltipProps` | - | - | Additional props passed to the Tooltip component |
| className | `string` | - | - | Additional CSS classes to apply |
| id | `string` | - | - | Unique identifier for the header element |
| style | `CSSProperties` | - | - | Inline styles to apply |
| onClick | `function` | - | - | Click event handler for sorting |
| onChange | `FormEventHandler<HTMLTableCellElement>` | - | - | Form change event handler |

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

function BasicHeaders() {
  return (
    <Table>
      <TableHeader>
        <CellHeader>Sample Name</CellHeader>
        <CellHeader>Type</CellHeader>
        <CellHeader horizontalAlign="right">Count</CellHeader>
        <CellHeader hideSortIcon>Actions</CellHeader>
      </TableHeader>
      <tbody>
        <TableRow>
          <CellBasic primaryText="Sample A" />
          <CellBasic primaryText="RNA" />
          <CellBasic primaryText="1,234" horizontalAlign="right" />
          <CellBasic primaryText="Download" />
        </TableRow>
      </tbody>
    </Table>
  );
}
```

### Sortable Headers with State Management

```tsx
import React, { useState, useMemo } from 'react';
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

interface Sample {
  name: string;
  type: string;
  count: number;
  date: string;
}

function SortableTable() {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  
  const data: Sample[] = [
    { name: 'Sample A', type: 'RNA', count: 1500, date: '2024-01-15' },
    { name: 'Sample B', type: 'DNA', count: 2300, date: '2024-01-10' },
    { name: 'Sample C', type: 'Protein', count: 800, date: '2024-01-20' }
  ];

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof Sample];
      const bValue = b[sortConfig.key as keyof Sample];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <Table>
      <TableHeader>
        <CellHeader
          active={sortConfig?.key === 'name'}
          direction={sortConfig?.key === 'name' ? sortConfig.direction : 'desc'}
          hover
          onClick={() => handleSort('name')}
        >
          Sample Name
        </CellHeader>
        <CellHeader
          active={sortConfig?.key === 'type'}
          direction={sortConfig?.key === 'type' ? sortConfig.direction : 'desc'}
          hover
          onClick={() => handleSort('type')}
        >
          Type
        </CellHeader>
        <CellHeader
          active={sortConfig?.key === 'count'}
          direction={sortConfig?.key === 'count' ? sortConfig.direction : 'desc'}
          hover
          horizontalAlign="right"
          onClick={() => handleSort('count')}
        >
          Sample Count
        </CellHeader>
        <CellHeader
          active={sortConfig?.key === 'date'}
          direction={sortConfig?.key === 'date' ? sortConfig.direction : 'desc'}
          hover
          onClick={() => handleSort('date')}
        >
          Collection Date
        </CellHeader>
      </TableHeader>
      <tbody>
        {sortedData.map((sample, index) => (
          <TableRow key={index}>
            <CellBasic primaryText={sample.name} />
            <CellBasic primaryText={sample.type} />
            <CellBasic 
              primaryText={sample.count.toLocaleString()} 
              horizontalAlign="right" 
            />
            <CellBasic primaryText={sample.date} />
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}
```

### Headers with Tooltips and Truncation

```tsx
import React from 'react';
import { 
  Table, 
  TableHeader, 
  CellHeader, 
  TableRow, 
  CellBasic 
} from '@czi-sds/components';

function HeadersWithTooltips() {
  return (
    <Table>
      <TableHeader>
        <CellHeader
          hover
          shouldShowTooltipOnHover
          tooltipText="Sample Identification Number"
          tooltipSubtitle="Unique identifier assigned during collection"
        >
          Sample ID
        </CellHeader>
        <CellHeader
          hover
          shouldTruncate
          shouldShowTooltipOnHover
          tooltipText="This is a very long column header that demonstrates text truncation"
          style={{ maxWidth: '120px' }}
        >
          A Very Long Column Header Title That Needs Truncation
        </CellHeader>
        <CellHeader
          hover
          horizontalAlign="center"
          shouldShowTooltipOnHover
          tooltipText="Quality Control Status"
          tooltipSubtitle="Indicates whether the sample passed quality checks"
        >
          QC Status
        </CellHeader>
        <CellHeader
          hover
          horizontalAlign="right"
          shouldShowTooltipOnHover
          tooltipText="Concentration in nanograms per microliter"
        >
          Concentration (ng/μL)
        </CellHeader>
      </TableHeader>
      <tbody>
        <TableRow>
          <CellBasic primaryText="SMPL-001" />
          <CellBasic primaryText="High quality sample data" />
          <CellBasic primaryText="Passed" horizontalAlign="center" />
          <CellBasic primaryText="25.4" horizontalAlign="right" />
        </TableRow>
      </tbody>
    </Table>
  );
}
```

### Custom Styled Headers

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

const StyledHeaderTable = styled(Table)`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    
    return `
      thead th {
        background-color: ${colors?.primary[100]};
        border-bottom: 2px solid ${colors?.primary[300]};
        padding: ${spaces?.m}px;
        font-weight: 600;
      }
      
      .priority-header {
        background-color: ${colors?.warning[100]};
        border-left: 3px solid ${colors?.warning[500]};
      }
    `;
  }}
`;

function CustomStyledHeaders() {
  return (
    <StyledHeaderTable>
      <TableHeader>
        <CellHeader hover active direction="asc">
          Sample Name (A-Z)
        </CellHeader>
        <CellHeader hover>
          Analysis Type
        </CellHeader>
        <CellHeader
          hover
          className="priority-header"
          horizontalAlign="center"
        >
          Priority Level
        </CellHeader>
        <CellHeader
          hover
          horizontalAlign="right"
        >
          Processing Time
        </CellHeader>
      </TableHeader>
    </StyledHeaderTable>
  );
}
```

## Sorting States

### Active State
- **Visual Indicator**: Bold text and visible sort icon
- **Direction Support**: Shows ascending (▲) or descending (▼) arrows
- **Accessibility**: Proper ARIA labels for sort direction

### Inactive State
- **Hover Effect**: Sort icon appears on hover when `hover={true}`
- **Default Styling**: Standard header appearance without sort indicators
- **Interactive**: Clickable when hover is enabled

### Non-Sortable State
- **Hidden Icon**: Sort icon hidden with `hideSortIcon={true}`
- **Static Display**: No hover effects or sort indicators
- **Use Cases**: Action columns, static identifiers, or decorative headers

## Best Practices

### When to Use

- Use CellHeader for all table column headers
- Essential for creating sortable data tables
- Ideal for scientific datasets requiring column-based sorting
- Perfect for complex tables with multiple data types

### When Not to Use

- Don't use CellHeader in table body rows (use CellBasic or CellComponent)
- Avoid for simple lists that don't require sorting functionality
- Consider simpler text elements for non-tabular header content

### Accessibility Guidelines

- CellHeader automatically includes proper `<th>` semantics and scope attributes
- Sort icons include descriptive ARIA labels for screen readers
- Keyboard navigation is supported for sortable columns
- Focus management maintained within table structure
- Color contrast meets WCAG guidelines for all interactive states

### Design Guidelines

- Use consistent alignment patterns (text left, numbers right)
- Keep header text concise but descriptive
- Enable sorting for data columns that benefit from ordering
- Reserve non-sortable headers for actions or static content
- Use tooltips for complex or abbreviated column names

## Related Components

- **TableHeader** - Parent container that houses CellHeader components
- **Table** - Root table container
- **CellBasic** - Basic cell component for table body content
- **CellComponent** - Flexible cell component for custom content
- **TableRow** - Row container for table body cells
- **Tooltip** - Integrated tooltip functionality for header descriptions

## Migration Notes

- **Automatic Sort Icons**: Built-in sort icon management eliminates need for custom sorting indicators
- **Enhanced Accessibility**: Proper ARIA attributes and semantic HTML structure
- **Tooltip Integration**: Optional tooltip support for complex column descriptions

## API Reference

- [Storybook Stories](https://main--61e887d56582fe003ac9595e.chromatic.com/?path=/story/components-table-cellheader--default) - Interactive examples and sorting demonstrations
- [TableHeader Component](./table-header.md) - Parent header container
- [Table Component](./table.md) - Root table component