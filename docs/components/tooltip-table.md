# TooltipTable

## Overview

TooltipTable is a specialized content component designed to display structured tabular data within tooltips. It provides a clean, organized way to present key-value pairs, multiple data sections, and optional alert messages in a compact table format. This component is typically used as content within Tooltip components when presenting structured information.

Built with Material UI's Table components and optimized typography, TooltipTable ensures excellent readability and proper alignment of data while maintaining the Science Design System's visual consistency.

## Installation & Import

```tsx
import { TooltipTable } from '@czi-sds/components';
// Often used with Tooltip:
import { Tooltip, TooltipTable } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| data | `Array<SectionData>` | - | - | Array of data sections to display in the table |
| contentAlert | `string \| JSX.Element` | - | - | Alert message displayed at the top of the table |
| itemAlign | `"left" \| "right"` | - | `"right"` | Alignment of data values in the table |
| showSectionHeader | `boolean` | - | `true` | Whether to show section headers for each data group |

### SectionData Interface

```tsx
interface SectionData {
  label?: string;           // Section header label
  disabled?: boolean;       // Whether section appears disabled
  dataRows: Array<{
    label: string;          // Row label (left column)
    value: string | number; // Row value (right column)
  }>;
}
```

## Usage Examples

### Basic Usage within Tooltip

```tsx
import React from 'react';
import { Tooltip, TooltipTable, Button } from '@czi-sds/components';

function BasicExample() {
  const tableData = [
    {
      label: "Sample Information",
      dataRows: [
        { label: "Sample ID", value: "EXP-2024-001" },
        { label: "Type", value: "RNA-seq" },
        { label: "Status", value: "Complete" },
        { label: "Quality Score", value: 94.2 }
      ]
    }
  ];

  return (
    <Tooltip
      componentSlot={
        <TooltipTable
          data={tableData}
          itemAlign="right"
        />
      }
      width="wide"
      sdsStyle="light"
    >
      <Button sdsStyle="square" sdsType="primary">
        View Sample Details
      </Button>
    </Tooltip>
  );
}
```

### Multiple Sections

```tsx
import React from 'react';
import { Tooltip, TooltipTable, IconButton, Icon } from '@czi-sds/components';

function MultipleSectionsExample() {
  const experimentData = [
    {
      label: "Experiment Details",
      dataRows: [
        { label: "ID", value: "EXP-2024-042" },
        { label: "Title", value: "Gene Expression Analysis" },
        { label: "Principal Investigator", value: "Dr. Smith" },
        { label: "Created", value: "2024-03-15" }
      ]
    },
    {
      label: "Technical Specifications",
      dataRows: [
        { label: "Platform", value: "Illumina NovaSeq" },
        { label: "Read Length", value: "150 bp" },
        { label: "Coverage", value: "30X" },
        { label: "Total Reads", value: "45.2M" }
      ]
    },
    {
      label: "Quality Metrics",
      dataRows: [
        { label: "Q30 Score", value: "92.4%" },
        { label: "GC Content", value: "42.1%" },
        { label: "Duplication Rate", value: "15.3%" }
      ]
    }
  ];

  return (
    <Tooltip
      componentSlot={
        <TooltipTable
          data={experimentData}
          itemAlign="right"
          showSectionHeader={true}
        />
      }
      width="wide"
      sdsStyle="light"
    >
      <IconButton>
        <Icon sdsIcon="InfoCircle" sdsSize="m" />
      </IconButton>
    </Tooltip>
  );
}
```

### With Alert Message

```tsx
import React from 'react';
import { Tooltip, TooltipTable, Button } from '@czi-sds/components';

function AlertMessageExample() {
  const analysisData = [
    {
      label: "Analysis Results",
      dataRows: [
        { label: "Total Genes", value: 25847 },
        { label: "Differentially Expressed", value: 1432 },
        { label: "Up-regulated", value: 823 },
        { label: "Down-regulated", value: 609 },
        { label: "P-value Threshold", value: 0.05 }
      ]
    }
  ];

  return (
    <Tooltip
      componentSlot={
        <TooltipTable
          data={analysisData}
          contentAlert={
            <span style={{ color: '#f57c00' }}>
              ⚠️ Analysis contains preliminary results
            </span>
          }
          itemAlign="right"
        />
      }
      width="wide"
      sdsStyle="light"
    >
      <Button sdsStyle="square" sdsType="secondary">
        View Analysis
      </Button>
    </Tooltip>
  );
}
```

### Disabled Sections

```tsx
import React from 'react';
import { Tooltip, TooltipTable, Button } from '@czi-sds/components';

function DisabledSectionExample() {
  const datasetData = [
    {
      label: "Dataset Overview",
      dataRows: [
        { label: "Dataset ID", value: "DS-2024-001" },
        { label: "Name", value: "Cancer Cell Lines" },
        { label: "Samples", value: 156 },
        { label: "Size", value: "2.3 GB" }
      ]
    },
    {
      label: "Access Information",
      disabled: true,  // This section will appear disabled
      dataRows: [
        { label: "Access Level", value: "Restricted" },
        { label: "Permission Required", value: "Yes" },
        { label: "Contact", value: "admin@lab.org" }
      ]
    }
  ];

  return (
    <Tooltip
      componentSlot={
        <TooltipTable
          data={datasetData}
          contentAlert="Some information requires additional permissions"
          itemAlign="right"
        />
      }
      width="wide"
      sdsStyle="light"
    >
      <Button sdsStyle="square" sdsType="primary">
        Dataset Info
      </Button>
    </Tooltip>
  );
}
```

### Without Section Headers

```tsx
import React from 'react';
import { Tooltip, TooltipTable, Badge } from '@czi-sds/components';

function NoHeadersExample() {
  const quickStats = [
    {
      dataRows: [
        { label: "Status", value: "Active" },
        { label: "Progress", value: "75%" },
        { label: "ETA", value: "2 min" },
        { label: "CPU", value: "45%" },
        { label: "Memory", value: "2.1 GB" }
      ]
    }
  ];

  return (
    <Tooltip
      componentSlot={
        <TooltipTable
          data={quickStats}
          showSectionHeader={false}  // Hide section headers
          itemAlign="right"
        />
      }
      width="default"
      sdsStyle="dark"
    >
      <Badge sdsStyle="rectangular" sdsType="primary">
        Processing
      </Badge>
    </Tooltip>
  );
}
```

### Dynamic Data from API

```tsx
import React, { useState, useEffect } from 'react';
import { Tooltip, TooltipTable, LoadingIndicator, Button } from '@czi-sds/components';

interface SampleMetrics {
  sampleId: string;
  quality: number;
  reads: number;
  coverage: number;
  contamination: number;
}

function DynamicDataExample() {
  const [sampleData, setSampleData] = useState<SampleMetrics | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSampleData = async (sampleId: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSampleData({
        sampleId,
        quality: 94.2,
        reads: 45200000,
        coverage: 30.5,
        contamination: 0.8
      });
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num > 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num > 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const tableData = sampleData ? [
    {
      label: "Quality Metrics",
      dataRows: [
        { label: "Sample ID", value: sampleData.sampleId },
        { label: "Quality Score", value: `${sampleData.quality}%` },
        { label: "Total Reads", value: formatNumber(sampleData.reads) },
        { label: "Coverage", value: `${sampleData.coverage}X` },
        { label: "Contamination", value: `${sampleData.contamination}%` }
      ]
    }
  ] : [];

  return (
    <div>
      <Button onClick={() => fetchSampleData('SAM-2024-001')}>
        Load Sample Data
      </Button>
      
      {sampleData && (
        <div style={{ marginTop: '20px' }}>
          <Tooltip
            componentSlot={
              loading ? (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <LoadingIndicator sdsStyle="minimal" />
                </div>
              ) : (
                <TooltipTable
                  data={tableData}
                  itemAlign="right"
                />
              )
            }
            width="wide"
            sdsStyle="light"
          >
            <Button sdsStyle="square" sdsType="secondary">
              View Sample Metrics
            </Button>
          </Tooltip>
        </div>
      )}
    </div>
  );
}
```

### Left-Aligned Values

```tsx
import React from 'react';
import { Tooltip, TooltipTable, Button } from '@czi-sds/components';

function LeftAlignedExample() {
  const fileData = [
    {
      label: "File Information",
      dataRows: [
        { label: "Name", value: "experiment_data.fastq.gz" },
        { label: "Type", value: "FASTQ Compressed" },
        { label: "Path", value: "/data/experiments/2024/march/" },
        { label: "Description", value: "Raw sequencing reads from liver samples" }
      ]
    }
  ];

  return (
    <Tooltip
      componentSlot={
        <TooltipTable
          data={fileData}
          itemAlign="left"  // Left-align values for better readability of text
        />
      }
      width="wide"
      sdsStyle="light"
    >
      <Button sdsStyle="square" sdsType="primary">
        File Details
      </Button>
    </Tooltip>
  );
}
```

## Component Features

### Visual Design

- **Compact Layout**: Optimized spacing for tooltip contexts
- **Clear Typography**: Different font styles for labels, values, and headers
- **Section Separation**: Visual dividers between data sections
- **Responsive Width**: Minimum width of 224px with automatic expansion

### Content Structure

- **Sectioned Data**: Organize related information into logical groups
- **Key-Value Pairs**: Clean presentation of label-value relationships
- **Optional Headers**: Show or hide section labels as needed
- **Alert Integration**: Highlight important messages or warnings

### Styling States

- **Normal**: Standard appearance for active data
- **Disabled**: Visually subdued appearance for restricted or unavailable data
- **Alert**: Highlighted messaging for important information

## Best Practices

### When to Use

- Displaying structured metadata in tooltips
- Scientific data with multiple related metrics
- Technical specifications and parameters
- Status information with multiple attributes
- Comparison data in compact format

### When Not to Use

- Simple single-value tooltips (use basic Tooltip)
- Long narrative text (use standard Tooltip with body text)
- Interactive content requiring user input
- Very large datasets (consider dedicated views)

### Data Organization

- Group related information into logical sections
- Use clear, descriptive labels for all data points
- Keep section titles concise and meaningful
- Order data by importance or logical flow
- Consider user scanning patterns (most important first)

### Content Guidelines

- **Labels**: Use consistent terminology and capitalization
- **Values**: Format numbers appropriately (units, precision)
- **Sections**: Group related metrics logically
- **Alerts**: Use for important context, not decoration

### Accessibility Guidelines

- Table structure provides semantic meaning for screen readers
- Proper contrast ratios for all text elements
- Disabled state clearly communicated to assistive technology
- Logical reading order maintained through proper markup

### Performance Guidelines

- Keep data sets reasonably small for tooltip contexts
- Use appropriate number formatting for large values
- Consider lazy loading for dynamic data
- Cache frequently accessed data when possible

## Related Components

- **[Tooltip](tooltip.md)** - Container component for TooltipTable content
- **[TooltipCondensed](tooltip-condensed.md)** - For simpler, non-tabular tooltip content
- **[Table](table.md)** - For full-size tabular data display
- **[DataGrid](data-grid.md)** - For complex, interactive data tables

## API Reference

- [Material UI Table Documentation](https://mui.com/material-ui/react-table/) - Underlying table components
- [Tooltip Documentation](tooltip.md) - Container component integration
- [Storybook Stories](link-to-storybook) - Interactive examples and testing
- [Design Tokens](link-to-tokens) - Typography, spacing, and color tokens