# TableRow

## Overview

The TableRow component represents individual rows within Table components, providing interactive states, tooltip support, and accessibility features. It renders as an HTML `<tr>` element and supports hover effects, selection states, disabled states, and optional tooltips. The component is designed to work seamlessly with various Cell components to create rich, interactive table experiences.

## Installation & Import

```tsx
import { TableRow } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `React.ReactNode` | ✓ | - | Cell components that make up the row content |
| disabled | `boolean` | - | `false` | Whether the row is disabled (non-interactive) |
| selected | `boolean` | - | `false` | Whether the row is in selected state |
| hover | `boolean` | - | `true` | Whether to show hover effects |
| useDivider | `boolean` | - | `false` | Whether to show a divider line below the row |
| rowHeight | `number` | - | - | Custom height for the row in pixels |
| tooltipText | `string` | - | - | Main tooltip text to display on hover |
| tooltipSubtitle | `string` | - | - | Subtitle text for the tooltip |
| shouldShowTooltipOnHover | `boolean` | - | `true` | Whether to show tooltip on hover |
| tooltipProps | `TooltipProps` | - | - | Additional props passed to the Tooltip component |
| className | `string` | - | - | Additional CSS classes to apply |
| id | `string` | - | - | Unique identifier for the row element |
| style | `CSSProperties` | - | - | Inline styles to apply |
| onClick | `function` | - | - | Click event handler |
| onChange | `FormEventHandler<HTMLTableRowElement>` | - | - | Form change event handler |

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

function BasicTableRows() {
  return (
    <Table>
      <TableHeader>
        <CellHeader>Sample</CellHeader>
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

### Advanced Usage with States and Interactions

```tsx
import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  CellHeader, 
  CellBasic,
  CellComponent,
  Tag 
} from '@czi-sds/components';

interface Sample {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'error';
  isSelected?: boolean;
  isDisabled?: boolean;
}

function InteractiveTableRows() {
  const [samples, setSamples] = useState<Sample[]>([
    { id: '1', name: 'Sample A', type: 'RNA', status: 'active' },
    { id: '2', name: 'Sample B', type: 'DNA', status: 'inactive' },
    { id: '3', name: 'Sample C', type: 'Protein', status: 'error', isDisabled: true }
  ]);

  const handleRowClick = (id: string) => {
    setSamples(prev => 
      prev.map(sample => 
        sample.id === id 
          ? { ...sample, isSelected: !sample.isSelected }
          : sample
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'positive';
      case 'inactive': return 'info';
      case 'error': return 'negative';
      default: return 'info';
    }
  };

  return (
    <Table>
      <TableHeader>
        <CellHeader>Sample Name</CellHeader>
        <CellHeader>Type</CellHeader>
        <CellHeader>Status</CellHeader>
      </TableHeader>
      <tbody>
        {samples.map((sample) => (
          <TableRow
            key={sample.id}
            selected={sample.isSelected}
            disabled={sample.isDisabled}
            onClick={() => !sample.isDisabled && handleRowClick(sample.id)}
            tooltipText={sample.isDisabled ? "This sample is disabled" : undefined}
            tooltipSubtitle={sample.isDisabled ? "Cannot be modified" : undefined}
            shouldShowTooltipOnHover={sample.isDisabled}
          >
            <CellBasic 
              primaryText={sample.name}
              secondaryText={`ID: ${sample.id}`}
            />
            <CellBasic primaryText={sample.type} />
            <CellComponent>
              <Tag
                color={getStatusColor(sample.status) as any}
                label={sample.status}
                sdsStyle="rounded"
                sdsType="secondary"
              />
            </CellComponent>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}
```

### With Custom Styling and Dividers

```tsx
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  CellHeader, 
  CellBasic,
  getColors,
  getSpaces 
} from '@czi-sds/components';
import styled from '@emotion/styled';

const CustomTableContainer = styled.div`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    return `
      .selected-row {
        background-color: ${colors?.primary[100]};
        border-left: 4px solid ${colors?.primary[500]};
      }
      
      .custom-height-row {
        height: 80px;
      }
      
      margin: ${spaces?.m}px;
    `;
  }}
`;

function StyledTableRows() {
  const data = [
    { name: 'Important Sample', type: 'RNA', priority: 'high' },
    { name: 'Regular Sample', type: 'DNA', priority: 'normal' },
    { name: 'Archive Sample', type: 'Protein', priority: 'low' }
  ];

  return (
    <CustomTableContainer>
      <Table>
        <TableHeader>
          <CellHeader>Sample Name</CellHeader>
          <CellHeader>Type</CellHeader>
          <CellHeader>Priority</CellHeader>
        </TableHeader>
        <tbody>
          {data.map((item, index) => (
            <TableRow
              key={index}
              className={item.priority === 'high' ? 'selected-row custom-height-row' : ''}
              useDivider={index < data.length - 1}
              rowHeight={item.priority === 'high' ? 80 : undefined}
              selected={item.priority === 'high'}
            >
              <CellBasic 
                primaryText={item.name}
                secondaryText={item.priority === 'high' ? 'High Priority Sample' : ''}
              />
              <CellBasic primaryText={item.type} />
              <CellBasic primaryText={item.priority} />
            </TableRow>
          ))}
        </tbody>
      </Table>
    </CustomTableContainer>
  );
}
```

## Component States

### Default State
- Normal interactive row with hover effects
- Standard background color and typography
- Responsive to user interactions

### Selected State
- Highlighted background to indicate selection
- Visual emphasis to distinguish from other rows
- Maintains accessibility for screen readers

### Disabled State
- Reduced opacity and non-interactive appearance
- Automatically shows tooltip explaining disabled state
- Prevents click events and hover effects
- Accessible to assistive technologies

### Hover State
- Subtle background color change on mouse hover
- Smooth transition animations
- Can be disabled with `hover={false}` prop

## Best Practices

### When to Use

- Use TableRow for each data record in your table
- Essential for creating interactive table experiences
- Ideal when you need row-level selection or actions
- Perfect for displaying status information with tooltips

### When Not to Use

- Don't use TableRow outside of Table components
- Avoid for header content (use TableHeader instead)
- Don't use for layout purposes outside of tabular data

### Accessibility Guidelines

- TableRow includes proper ARIA attributes for selection states
- Disabled rows are properly announced to screen readers
- Keyboard navigation is supported for interactive rows
- Focus management is maintained within table structure
- Tooltips include appropriate ARIA labels and descriptions

### Design Guidelines

- Use consistent row heights for scannable data presentation
- Implement hover states for better user experience
- Use selection states sparingly to avoid overwhelming users
- Maintain adequate spacing between interactive elements
- Use semantic colors for status and priority indicators

## Related Components

- **Table** - Parent container that houses TableRow components
- **TableHeader** - Header section that works alongside table body rows
- **CellBasic** - Basic cell component for text-based row content
- **CellComponent** - Flexible cell component for custom row content
- **CellHeader** - Header cell component used in TableHeader
- **Tooltip** - Integrated tooltip functionality for additional row information

## Migration Notes

- **Tooltip Integration**: TableRow automatically handles tooltip display based on hover and disabled states
- **Selection State**: Built-in selection styling eliminates need for custom CSS classes
- **Event Handling**: Supports both click handlers and form change events for flexibility

## API Reference

- [Storybook Stories](https://main--61e887d56582fe003ac9595e.chromatic.com/?path=/story/components-table-table--default) - Interactive examples showing row states
- [Table Component](./table.md) - Parent component documentation
- [Tooltip Component](./tooltip.md) - Integrated tooltip functionality