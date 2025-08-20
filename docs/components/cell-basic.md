# CellBasic

## Overview

The CellBasic component provides a structured way to display text-based content within table cells. It supports up to three levels of text hierarchy (primary, secondary, tertiary), optional icons, and flexible content slots for enhanced layouts. The component handles text wrapping, alignment, tooltip integration, and accessibility features automatically, making it ideal for displaying structured data in tables.

## Installation & Import

```tsx
import { CellBasic } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| primaryText | `string` | ✓ | - | Main text content displayed prominently |
| secondaryText | `string` | - | - | Supporting text displayed below primary text |
| tertiaryText | `string` | - | - | Additional text displayed below secondary text |
| icon | `ReactElement` | - | - | Icon element to display alongside text content |
| horizontalAlign | `"left" \| "right"` | - | `"left"` | Horizontal alignment of cell content |
| verticalAlign | `"top" \| "center" \| "bottom"` | - | `"top"` | Vertical alignment of cell content |
| iconVerticalAlign | `"top" \| "center" \| "bottom"` | - | `"top"` | Vertical alignment of the icon relative to text |
| shouldTextWrap | `boolean` | - | `true` | Whether text should wrap within the cell |
| primaryTextWrapLineCount | `number` | - | - | Maximum lines for primary text before truncation |
| secondaryTextWrapLineCount | `number` | - | - | Maximum lines for secondary text before truncation |
| tertiaryTextWrapLineCount | `number` | - | - | Maximum lines for tertiary text before truncation |
| tabularNums | `boolean` | - | `false` | Whether to use tabular (monospace) numbers for alignment |
| primaryTextComponentSlotRight | `ReactNode` | - | - | Component slot positioned to the right of primary text |
| primaryTextComponentSlotBottom | `ReactNode` | - | - | Component slot positioned below primary text |
| shouldShowTooltipOnHover | `boolean` | - | `true` | Whether to show tooltip on hover |
| tooltipProps | `TooltipProps` | - | - | Additional props passed to the Tooltip component |
| className | `string` | - | - | Additional CSS classes to apply |
| id | `string` | - | - | Unique identifier for the cell element |
| style | `CSSProperties` | - | - | Inline styles to apply |
| onClick | `function` | - | - | Click event handler |
| onChange | `FormEventHandler<HTMLTableCellElement>` | - | - | Form change event handler |

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

function BasicCellExample() {
  return (
    <Table>
      <TableHeader>
        <CellHeader>Sample</CellHeader>
        <CellHeader>Type</CellHeader>
        <CellHeader>Count</CellHeader>
      </TableHeader>
      <tbody>
        <TableRow>
          <CellBasic primaryText="Sample A-001" />
          <CellBasic primaryText="RNA Sequencing" />
          <CellBasic 
            primaryText="1,234" 
            horizontalAlign="right"
            tabularNums
          />
        </TableRow>
      </tbody>
    </Table>
  );
}
```

### Advanced Usage with Multiple Text Levels

```tsx
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  CellHeader, 
  CellBasic,
  Icon 
} from '@czi-sds/components';

function MultiLevelCellExample() {
  const samples = [
    {
      id: 'SMPL-001',
      name: 'Primary Cell Culture',
      description: 'Human fibroblast cells from skin biopsy',
      notes: 'Passage 3, 95% viability',
      count: 2500000,
      type: 'cell-culture'
    },
    {
      id: 'SMPL-002', 
      name: 'DNA Extract',
      description: 'Genomic DNA extracted from blood sample',
      notes: 'High purity, A260/A280 = 1.8',
      count: 150,
      type: 'dna'
    }
  ];

  return (
    <Table>
      <TableHeader>
        <CellHeader>Sample Details</CellHeader>
        <CellHeader horizontalAlign="right">Count</CellHeader>
      </TableHeader>
      <tbody>
        {samples.map((sample) => (
          <TableRow key={sample.id}>
            <CellBasic
              icon={<Icon sdsIcon="Flask" sdsSize="l" />}
              primaryText={sample.name}
              secondaryText={sample.description}
              tertiaryText={sample.notes}
              shouldTextWrap
              secondaryTextWrapLineCount={2}
              iconVerticalAlign="top"
            />
            <CellBasic
              primaryText={sample.count.toLocaleString()}
              secondaryText={sample.type === 'cell-culture' ? 'cells' : 'ng/μL'}
              horizontalAlign="right"
              tabularNums
            />
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}
```

### With Component Slots and Custom Styling

```tsx
import React from 'react';
import { 
  Table, 
  TableRow, 
  CellBasic,
  Tag,
  Icon,
  getColors 
} from '@czi-sds/components';
import styled from '@emotion/styled';

const StatusTag = styled(Tag)`
  ${(props) => {
    const colors = getColors(props);
    return `
      margin-left: 8px;
      font-size: 10px;
    `;
  }}
`;

const MetricsDisplay = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 4px;
  font-size: 11px;
  color: #666;
`;

function CellWithSlotsExample() {
  return (
    <Table>
      <tbody>
        <TableRow>
          <CellBasic
            primaryText="Experiment Dataset"
            primaryTextComponentSlotRight={
              <StatusTag
                color="positive"
                label="Complete"
                sdsStyle="rounded"
                sdsType="secondary"
              />
            }
            primaryTextComponentSlotBottom={
              <MetricsDisplay>
                <span>Files: 24</span>
                <span>Size: 2.1 GB</span>
                <span>Modified: 2 hours ago</span>
              </MetricsDisplay>
            }
            secondaryText="RNA-seq analysis results with quality metrics"
            shouldTextWrap
          />
        </TableRow>
      </tbody>
    </Table>
  );
}
```

### Numerical Data with Alignment

```tsx
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  CellHeader, 
  CellBasic 
} from '@czi-sds/components';

function NumericalDataExample() {
  const data = [
    { metric: 'Total Reads', value: 45234567, unit: 'reads', change: '+12.3%' },
    { metric: 'Mapped Reads', value: 42156789, unit: 'reads', change: '+8.7%' },
    { metric: 'Quality Score', value: 28.5, unit: 'mean', change: '+2.1%' }
  ];

  return (
    <Table>
      <TableHeader>
        <CellHeader>Metric</CellHeader>
        <CellHeader horizontalAlign="right">Value</CellHeader>
        <CellHeader horizontalAlign="right">Change</CellHeader>
      </TableHeader>
      <tbody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <CellBasic primaryText={item.metric} />
            <CellBasic
              primaryText={item.value.toLocaleString()}
              secondaryText={item.unit}
              horizontalAlign="right"
              tabularNums
            />
            <CellBasic
              primaryText={item.change}
              horizontalAlign="right"
              tabularNums
            />
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}
```

## Text Hierarchy

### Primary Text
- Main content with prominent styling
- Always visible and required
- Supports custom line wrapping limits

### Secondary Text
- Supporting information with reduced emphasis
- Displayed below primary text
- Optional with independent wrapping controls

### Tertiary Text
- Additional contextual information
- Smallest text size with subtle styling
- Used for metadata, timestamps, or notes

## Alignment Options

### Horizontal Alignment
- **left**: Default alignment for text content
- **right**: Ideal for numerical data and monetary values

### Vertical Alignment
- **top**: Default alignment, content aligns to cell top
- **center**: Centers content vertically within cell
- **bottom**: Aligns content to bottom of cell

### Icon Alignment
- Independent vertical alignment control for icons
- Allows precise positioning relative to text content

## Best Practices

### When to Use

- Use CellBasic for text-based table cell content
- Ideal for displaying structured data with hierarchy
- Perfect for numerical data that needs alignment
- Recommended for cells requiring tooltips or icons

### When Not to Use

- Don't use for complex interactive content (use CellComponent instead)
- Avoid for cells that need custom layouts beyond text hierarchy
- Consider CellHeader for column headers with sorting

### Accessibility Guidelines

- CellBasic includes automatic tooltip support for content overflow
- Proper semantic structure with heading hierarchy
- Screen readers can navigate text levels appropriately
- High contrast maintained between text levels
- Keyboard navigation supported for interactive cells

### Design Guidelines

- Use consistent text hierarchy patterns across tables
- Align numerical data to the right for easy comparison
- Enable tabular numbers for aligned numerical displays
- Limit line wrapping to maintain table readability
- Use icons sparingly to avoid visual clutter

## Related Components

- **CellComponent** - Flexible cell for custom React components
- **CellHeader** - Header cells with sorting functionality
- **TableRow** - Container for cell components
- **Table** - Root table container
- **Icon** - Used within icon prop for cell decoration
- **Tooltip** - Integrated tooltip functionality

## Migration Notes

- **Tooltip Integration**: Automatic tooltip generation from primary and secondary text
- **Text Wrapping**: Enhanced control over line limits and overflow behavior
- **Component Slots**: Flexible content positioning with slot system

## API Reference

- [Storybook Stories](https://main--61e887d56582fe003ac9595e.chromatic.com/?path=/story/components-table-cellbasic--default) - Interactive examples and testing
- [Table Component](./table.md) - Parent table component
- [CellComponent](./cell-component.md) - Alternative for custom content