# TooltipCondensed

## Overview

TooltipCondensed is a compact variant of the Tooltip component, specifically designed for space-constrained interfaces where minimal visual footprint is essential. It provides condensed styling with tighter padding, follows the cursor for better precision, and includes an optional colored indicator for enhanced visual communication.

Built on the standard Tooltip foundation, TooltipCondensed is optimized for dense data displays, charts, tables, and other contexts where traditional tooltips might feel visually overwhelming while still providing essential contextual information.

## Installation & Import

```tsx
import { TooltipCondensed } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `ReactElement` | ✓ | - | The element that triggers the tooltip |
| title | `ReactNode` | - | - | Content to display in the tooltip |
| indicator | `boolean` | - | `false` | Whether to show a colored indicator circle |
| indicatorColor | `string` | - | - | Color of the indicator circle (CSS color value) |

*Note: TooltipCondensed inherits all props from the standard Tooltip component, but some behaviors are automatically configured for the condensed experience.*

### Automatic Configuration

The following props are automatically set for optimal condensed behavior:
- `followCursor`: `true` - Tooltip follows mouse movement
- `placement`: `"right-end"` - Positioned to the right-end of trigger
- `enterDelay`: `50` - Quick appearance on hover
- `leaveDelay`: `50` - Quick disappearance when leaving
- `arrow`: `false` - No arrow for minimal appearance

## Usage Examples

### Basic Usage

```tsx
import React from 'react';
import { TooltipCondensed } from '@czi-sds/components';

function BasicExample() {
  return (
    <TooltipCondensed title="Sample ID: EXP-2024-001">
      <span style={{ 
        padding: '4px 8px', 
        background: '#f0f0f0', 
        borderRadius: '4px',
        fontSize: '12px'
      }}>
        EXP-001
      </span>
    </TooltipCondensed>
  );
}
```

### With Status Indicator

```tsx
import React from 'react';
import { TooltipCondensed } from '@czi-sds/components';

function StatusIndicatorExample() {
  const experiments = [
    { id: 'EXP-001', status: 'running', color: '#4caf50', description: 'Analysis in progress' },
    { id: 'EXP-002', status: 'completed', color: '#2196f3', description: 'Results available' },
    { id: 'EXP-003', status: 'error', color: '#f44336', description: 'Failed with errors' },
    { id: 'EXP-004', status: 'pending', color: '#ff9800', description: 'Queued for processing' }
  ];

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {experiments.map((exp) => (
        <TooltipCondensed
          key={exp.id}
          title={exp.description}
          indicator
          indicatorColor={exp.color}
        >
          <div style={{
            padding: '6px 10px',
            background: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}>
            {exp.id}
          </div>
        </TooltipCondensed>
      ))}
    </div>
  );
}
```

### In Data Tables

```tsx
import React from 'react';
import { TooltipCondensed } from '@czi-sds/components';

interface DataRow {
  id: string;
  name: string;
  value: number;
  status: 'active' | 'inactive' | 'processing';
  description: string;
}

function DataTableExample() {
  const data: DataRow[] = [
    { id: 'DS-001', name: 'Gene Expression', value: 85.3, status: 'active', description: 'RNA sequencing dataset from liver tissue samples' },
    { id: 'DS-002', name: 'Protein Analysis', value: 92.7, status: 'processing', description: 'Mass spectrometry proteomics data' },
    { id: 'DS-003', name: 'Metabolomics', value: 78.1, status: 'inactive', description: 'Small molecule metabolite profiling' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#4caf50';
      case 'processing': return '#ff9800';
      case 'inactive': return '#9e9e9e';
      default: return '#666';
    }
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
      <thead>
        <tr style={{ background: '#f5f5f5' }}>
          <th style={{ padding: '12px 8px', textAlign: 'left' }}>Dataset ID</th>
          <th style={{ padding: '12px 8px', textAlign: 'left' }}>Name</th>
          <th style={{ padding: '12px 8px', textAlign: 'right' }}>Value</th>
          <th style={{ padding: '12px 8px', textAlign: 'center' }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} style={{ borderTop: '1px solid #e0e0e0' }}>
            <td style={{ padding: '8px' }}>
              <TooltipCondensed title={`Full ID: ${row.id}`}>
                <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                  {row.id}
                </span>
              </TooltipCondensed>
            </td>
            <td style={{ padding: '8px' }}>
              <TooltipCondensed title={row.description}>
                <span style={{ cursor: 'help', borderBottom: '1px dotted #ccc' }}>
                  {row.name}
                </span>
              </TooltipCondensed>
            </td>
            <td style={{ padding: '8px', textAlign: 'right', fontFamily: 'monospace' }}>
              <TooltipCondensed title={`Exact value: ${row.value}%`}>
                <span>{row.value.toFixed(1)}%</span>
              </TooltipCondensed>
            </td>
            <td style={{ padding: '8px', textAlign: 'center' }}>
              <TooltipCondensed
                title={`Status: ${row.status.charAt(0).toUpperCase() + row.status.slice(1)}`}
                indicator
                indicatorColor={getStatusColor(row.status)}
              >
                <span style={{ fontSize: '12px', textTransform: 'capitalize' }}>
                  {row.status}
                </span>
              </TooltipCondensed>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### Chart Data Points

```tsx
import React from 'react';
import { TooltipCondensed } from '@czi-sds/components';

function ChartDataPointExample() {
  const dataPoints = [
    { x: 10, y: 25, label: 'Sample A', value: 25.3, color: '#1f77b4' },
    { x: 20, y: 45, label: 'Sample B', value: 45.7, color: '#ff7f0e' },
    { x: 30, y: 35, label: 'Sample C', value: 35.1, color: '#2ca02c' },
    { x: 40, y: 60, label: 'Sample D', value: 60.9, color: '#d62728' },
  ];

  return (
    <div style={{ 
      position: 'relative', 
      width: '400px', 
      height: '200px', 
      background: '#fafafa',
      border: '1px solid #e0e0e0',
      margin: '20px 0'
    }}>
      <div style={{ padding: '10px', fontSize: '14px', fontWeight: 'bold' }}>
        Sample Data Visualization
      </div>
      
      {dataPoints.map((point, index) => (
        <TooltipCondensed
          key={index}
          title={`${point.label}: ${point.value}`}
          indicator
          indicatorColor={point.color}
        >
          <div
            style={{
              position: 'absolute',
              left: `${point.x * 8}px`,
              top: `${40 + (100 - point.y)}px`,
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: point.color,
              cursor: 'crosshair',
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          />
        </TooltipCondensed>
      ))}
    </div>
  );
}
```

### Dense Information Display

```tsx
import React from 'react';
import { TooltipCondensed } from '@czi-sds/components';

function DenseInfoExample() {
  const genes = [
    { symbol: 'BRCA1', fullName: 'BRCA1 DNA Repair Associated', expression: 'high', significance: 0.001 },
    { symbol: 'TP53', fullName: 'Tumor Protein P53', expression: 'medium', significance: 0.023 },
    { symbol: 'MYC', fullName: 'MYC Proto-Oncogene', expression: 'low', significance: 0.089 },
    { symbol: 'EGFR', fullName: 'Epidermal Growth Factor Receptor', expression: 'high', significance: 0.002 }
  ];

  const getExpressionColor = (level: string) => {
    switch (level) {
      case 'high': return '#d32f2f';
      case 'medium': return '#f57c00';
      case 'low': return '#1976d2';
      default: return '#666';
    }
  };

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '8px',
      padding: '16px',
      background: '#fafafa',
      borderRadius: '8px'
    }}>
      {genes.map((gene) => (
        <TooltipCondensed
          key={gene.symbol}
          title={`${gene.fullName} - Expression: ${gene.expression} (p=${gene.significance})`}
          indicator
          indicatorColor={getExpressionColor(gene.expression)}
        >
          <div style={{
            padding: '8px',
            background: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}>
            {gene.symbol}
          </div>
        </TooltipCondensed>
      ))}
    </div>
  );
}
```

### With Theme Integration

```tsx
import React from 'react';
import { TooltipCondensed, getColors, getSpaces } from '@czi-sds/components';
import styled from '@emotion/styled';

const StyledDataChip = styled.div`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    return `
      display: inline-block;
      padding: ${spaces?.xs}px ${spaces?.s}px;
      margin: ${spaces?.xxs}px;
      background: ${colors?.gray[100]};
      border: 1px solid ${colors?.gray[300]};
      border-radius: 16px;
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        background: ${colors?.gray[200]};
        border-color: ${colors?.primary[300]};
      }
    `;
  }}
`;

function ThemedExample() {
  const tags = [
    { name: 'RNA-seq', count: 1247, description: 'RNA sequencing experiments' },
    { name: 'ChIP-seq', count: 892, description: 'Chromatin immunoprecipitation sequencing' },
    { name: 'ATAC-seq', count: 634, description: 'Assay for transposase-accessible chromatin' },
    { name: 'scRNA-seq', count: 445, description: 'Single-cell RNA sequencing' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h3>Experimental Techniques</h3>
      <div>
        {tags.map((tag) => (
          <TooltipCondensed
            key={tag.name}
            title={`${tag.description} (${tag.count} experiments)`}
          >
            <StyledDataChip>
              {tag.name} ({tag.count})
            </StyledDataChip>
          </TooltipCondensed>
        ))}
      </div>
    </div>
  );
}
```

## Component Features

### Visual Design

- **Compact Padding**: Minimal spacing optimized for dense layouts
- **No Arrow**: Clean appearance without directional indicators
- **Max Width**: Constrained to 250px to prevent overly wide tooltips
- **Flexbox Layout**: Proper alignment of content and indicators

### Interaction Behavior

- **Cursor Following**: Tooltip moves with mouse for precision
- **Quick Response**: Fast enter/leave delays (50ms) for responsive feel
- **Right-End Placement**: Consistent positioning that avoids content overlap
- **No Focus Trap**: Allows natural keyboard navigation flow

### Indicator System

- **Optional Display**: Show/hide colored circle indicator
- **Custom Colors**: Any valid CSS color value
- **Proper Spacing**: Automatically spaced relative to content
- **Rounded Design**: Consistent with Design System aesthetics

## Best Practices

### When to Use

- Dense data displays (tables, charts, lists)
- Space-constrained interfaces
- Status indicators requiring quick context
- Scientific data visualization
- Compact information architecture
- Mobile-friendly interfaces

### When Not to Use

- Complex or lengthy explanations (use standard Tooltip)
- Primary navigation elements
- Critical information that must always be visible
- When hover interaction is not available
- Content requiring user interaction within tooltip

### Content Guidelines

- Keep content very concise and specific
- Use clear, unambiguous language  
- Focus on essential information only
- Consider abbreviations and codes for space efficiency
- Test readability at small sizes

### Accessibility Guidelines

- Ensure sufficient color contrast for indicators
- Provide meaningful content for screen readers
- Don't rely solely on color for meaning
- Test with keyboard navigation
- Consider touch device accessibility

### Design Guidelines

- Use consistent indicator colors for same meaning
- Maintain visual hierarchy in dense layouts
- Consider background contrast for visibility
- Test across different screen densities
- Ensure touch targets meet minimum size requirements

## Related Components

- **[Tooltip](tooltip.md)** - Full-featured tooltip for complex content
- **[TooltipTable](tooltip-table.md)** - Structured table format for data
- **[Badge](badge.md)** - For persistent status indicators
- **[Chip](chip.md)** - For compact, interactive tags

## API Reference

- [Tooltip Component Documentation](tooltip.md) - Base component and shared props
- [Storybook Stories](link-to-storybook) - Interactive examples and testing
- [Material UI Tooltip Documentation](https://mui.com/material-ui/react-tooltip/) - Underlying MUI component
- [Design Tokens](link-to-tokens) - Available colors, spacing, and sizing tokens