# CellComponent

## Overview

The CellComponent provides a flexible container for displaying custom React components within table cells. Unlike CellBasic which is optimized for structured text content, CellComponent allows you to embed any React elements such as buttons, form controls, tags, icons, or complex layouts. It maintains proper table cell semantics while providing full control over content and styling.

## Installation & Import

```tsx
import { CellComponent } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `ReactNode` | - | - | React components or elements to display in the cell |
| horizontalAlign | `"left" \| "center" \| "right"` | - | `"left"` | Horizontal alignment of cell content |
| verticalAlign | `"top" \| "center" \| "bottom"` | - | `"top"` | Vertical alignment of cell content |
| className | `string` | - | - | Additional CSS classes to apply |
| id | `string` | - | - | Unique identifier for the cell element |
| style | `CSSProperties` | - | - | Inline styles to apply |
| onClick | `function` | - | - | Click event handler |
| onChange | `FormEventHandler<HTMLTableCellElement>` | - | - | Form change event handler |
| disabled | `boolean` | - | `false` | Whether the cell is disabled |
| name | `string` | - | - | Name attribute for form integration |
| value | `string \| number \| readonly string[]` | - | - | Value for form integration |

## Usage Examples

### Basic Usage with Components

```tsx
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  CellHeader, 
  CellComponent, 
  CellBasic,
  Tag,
  Icon,
  Button 
} from '@czi-sds/components';

function BasicComponentCell() {
  return (
    <Table>
      <TableHeader>
        <CellHeader>Sample</CellHeader>
        <CellHeader>Status</CellHeader>
        <CellHeader>Actions</CellHeader>
      </TableHeader>
      <tbody>
        <TableRow>
          <CellBasic primaryText="Sample A-001" />
          <CellComponent>
            <Tag
              color="positive"
              label="Active"
              sdsStyle="rounded"
              sdsType="secondary"
            />
          </CellComponent>
          <CellComponent horizontalAlign="center">
            <Button
              sdsType="primary"
              sdsStyle="minimal"
              startIcon={<Icon sdsIcon="Download" sdsSize="s" />}
            >
              Download
            </Button>
          </CellComponent>
        </TableRow>
      </tbody>
    </Table>
  );
}
```

### Advanced Usage with Multiple Components

```tsx
import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  CellHeader, 
  CellComponent, 
  CellBasic,
  Tag,
  Icon,
  Button,
  Checkbox 
} from '@czi-sds/components';

interface Sample {
  id: string;
  name: string;
  tags: Array<{label: string; color: 'info' | 'positive' | 'negative'}>;
  selected?: boolean;
}

function AdvancedComponentCells() {
  const [samples, setSamples] = useState<Sample[]>([
    {
      id: '1',
      name: 'RNA Sample A',
      tags: [
        { label: 'High Quality', color: 'positive' },
        { label: 'Sequencing Ready', color: 'info' }
      ]
    },
    {
      id: '2', 
      name: 'DNA Sample B',
      tags: [
        { label: 'Degraded', color: 'negative' },
        { label: 'Requires Processing', color: 'info' }
      ]
    }
  ]);

  const handleSelectSample = (id: string) => {
    setSamples(prev => 
      prev.map(sample => 
        sample.id === id 
          ? { ...sample, selected: !sample.selected }
          : sample
      )
    );
  };

  const handleDownload = (id: string) => {
    console.log(`Downloading sample ${id}`);
  };

  return (
    <Table>
      <TableHeader>
        <CellHeader horizontalAlign="center">Select</CellHeader>
        <CellHeader>Sample Name</CellHeader>
        <CellHeader>Status Tags</CellHeader>
        <CellHeader horizontalAlign="center">Actions</CellHeader>
      </TableHeader>
      <tbody>
        {samples.map((sample) => (
          <TableRow key={sample.id}>
            <CellComponent horizontalAlign="center" verticalAlign="center">
              <Checkbox
                checked={sample.selected || false}
                onChange={() => handleSelectSample(sample.id)}
                aria-label={`Select ${sample.name}`}
              />
            </CellComponent>
            
            <CellBasic primaryText={sample.name} />
            
            <CellComponent>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {sample.tags.map((tag, index) => (
                  <Tag
                    key={index}
                    color={tag.color}
                    label={tag.label}
                    sdsStyle="rounded"
                    sdsType="secondary"
                    hover={false}
                  />
                ))}
              </div>
            </CellComponent>
            
            <CellComponent horizontalAlign="center" verticalAlign="center">
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                  sdsType="primary"
                  sdsStyle="minimal"
                  startIcon={<Icon sdsIcon="Download" sdsSize="s" />}
                  onClick={() => handleDownload(sample.id)}
                  aria-label={`Download ${sample.name}`}
                >
                  Download
                </Button>
                <Button
                  sdsType="secondary"
                  sdsStyle="minimal"
                  startIcon={<Icon sdsIcon="DotsHorizontal" sdsSize="s" />}
                  aria-label={`More actions for ${sample.name}`}
                >
                  More
                </Button>
              </div>
            </CellComponent>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}
```

### Form Controls and Interactive Elements

```tsx
import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  CellHeader, 
  CellComponent, 
  CellBasic,
  InputRadio,
  InputDropdown,
  Slider 
} from '@czi-sds/components';
import { RadioGroup } from '@mui/material';

function FormControlCells() {
  const [settings, setSettings] = useState({
    sampleA: { method: 'PCR', quality: 85, priority: 'high' },
    sampleB: { method: 'Sequencing', quality: 92, priority: 'medium' }
  });

  const handleMethodChange = (sampleId: string, method: string) => {
    setSettings(prev => ({
      ...prev,
      [sampleId]: { ...prev[sampleId as keyof typeof prev], method }
    }));
  };

  return (
    <Table>
      <TableHeader>
        <CellHeader>Sample ID</CellHeader>
        <CellHeader>Analysis Method</CellHeader>
        <CellHeader>Quality Threshold</CellHeader>
        <CellHeader>Priority Level</CellHeader>
      </TableHeader>
      <tbody>
        <TableRow>
          <CellBasic primaryText="Sample A" />
          <CellComponent>
            <RadioGroup
              value={settings.sampleA.method}
              onChange={(e) => handleMethodChange('sampleA', e.target.value)}
            >
              <InputRadio 
                label="PCR Analysis" 
                value="PCR" 
                caption="Standard amplification"
              />
              <InputRadio 
                label="Sequencing" 
                value="Sequencing" 
                caption="Full genome analysis"
              />
            </RadioGroup>
          </CellComponent>
          <CellComponent verticalAlign="center">
            <div style={{ width: '120px', padding: '0 16px' }}>
              <Slider
                value={settings.sampleA.quality}
                onChange={(_, value) => 
                  setSettings(prev => ({
                    ...prev,
                    sampleA: { ...prev.sampleA, quality: value as number }
                  }))
                }
                min={0}
                max={100}
                aria-label="Quality threshold"
              />
              <div style={{ textAlign: 'center', fontSize: '12px', marginTop: '4px' }}>
                {settings.sampleA.quality}%
              </div>
            </div>
          </CellComponent>
          <CellComponent>
            <InputDropdown
              label=""
              value={settings.sampleA.priority}
              onChange={(value) => 
                setSettings(prev => ({
                  ...prev,
                  sampleA: { ...prev.sampleA, priority: value }
                }))
              }
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </InputDropdown>
          </CellComponent>
        </TableRow>
      </tbody>
    </Table>
  );
}
```

### With Theme Integration and Custom Styling

```tsx
import React from 'react';
import { 
  Table, 
  TableRow, 
  CellComponent, 
  CellBasic,
  Icon,
  getColors,
  getSpaces 
} from '@czi-sds/components';
import styled from '@emotion/styled';

const StatusIndicator = styled.div<{ status: 'success' | 'warning' | 'error' }>`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    
    const colorMap = {
      success: colors?.positive[500],
      warning: colors?.warning[500], 
      error: colors?.negative[500]
    };
    
    return `
      display: flex;
      align-items: center;
      gap: ${spaces?.xs}px;
      padding: ${spaces?.xs}px ${spaces?.s}px;
      border-radius: 4px;
      background-color: ${colorMap[props.status]}10;
      border: 1px solid ${colorMap[props.status]}40;
      font-size: 13px;
      font-weight: 500;
      color: ${colorMap[props.status]};
    `;
  }}
`;

function ThemedComponentCells() {
  const experiments = [
    { name: 'RNA-seq Analysis', status: 'success' as const, progress: 100 },
    { name: 'DNA Extraction', status: 'warning' as const, progress: 75 },
    { name: 'Quality Control', status: 'error' as const, progress: 45 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return 'CheckCircle';
      case 'warning': return 'InfoCircle';
      case 'error': return 'ExclamationTriangle';
      default: return 'InfoCircle';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return 'Complete';
      case 'warning': return 'In Progress';
      case 'error': return 'Failed';
      default: return 'Unknown';
    }
  };

  return (
    <Table>
      <tbody>
        {experiments.map((exp, index) => (
          <TableRow key={index}>
            <CellBasic primaryText={exp.name} />
            <CellComponent verticalAlign="center">
              <StatusIndicator status={exp.status}>
                <Icon 
                  sdsIcon={getStatusIcon(exp.status) as any} 
                  sdsSize="s" 
                />
                {getStatusText(exp.status)}
              </StatusIndicator>
            </CellComponent>
            <CellComponent verticalAlign="center">
              <div style={{ width: '100px' }}>
                <div 
                  style={{ 
                    width: '100%', 
                    height: '6px', 
                    backgroundColor: '#e0e0e0',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}
                >
                  <div 
                    style={{ 
                      width: `${exp.progress}%`,
                      height: '100%',
                      backgroundColor: exp.status === 'success' ? '#4caf50' : 
                                     exp.status === 'warning' ? '#ff9800' : '#f44336',
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
                <div style={{ fontSize: '11px', marginTop: '2px', textAlign: 'center' }}>
                  {exp.progress}%
                </div>
              </div>
            </CellComponent>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}
```

## Alignment Options

### Horizontal Alignment
- **left**: Default alignment, content aligned to left edge
- **center**: Content centered horizontally within cell
- **right**: Content aligned to right edge, useful for actions or numerical displays

### Vertical Alignment  
- **top**: Default alignment, content aligned to top of cell
- **center**: Content centered vertically, ideal for single-line components
- **bottom**: Content aligned to bottom, useful for consistent baselines

## Best Practices

### When to Use

- Use CellComponent for interactive table cell content
- Ideal for buttons, form controls, tags, and custom components
- Perfect for cells requiring complex layouts or multiple elements
- Recommended when you need full control over cell content and styling

### When Not to Use

- Don't use for simple text display (use CellBasic instead)
- Avoid for column headers (use CellHeader instead)
- Consider performance impact with complex components in large tables

### Accessibility Guidelines

- Ensure all interactive elements have appropriate ARIA labels
- Maintain proper tab order within table structure
- Use semantic HTML elements within the cell when possible
- Provide adequate color contrast for custom components
- Include keyboard navigation support for interactive elements

### Design Guidelines

- Keep component layouts simple and scannable
- Use consistent spacing and alignment patterns
- Limit the number of interactive elements per cell
- Consider responsive behavior for different screen sizes
- Maintain visual hierarchy with proper component sizing

## Related Components

- **CellBasic** - Text-focused cell component for structured content
- **CellHeader** - Header cell component with sorting capabilities
- **TableRow** - Container for cell components
- **Table** - Root table container
- **Tag** - Commonly used for status indicators in cells
- **Button** - Frequently used for action buttons in cells
- **Icon** - Often embedded within cell components

## Migration Notes

- **Flexible Content**: CellComponent accepts any React elements, providing maximum flexibility
- **Alignment Control**: Enhanced alignment options for precise component positioning
- **Event Handling**: Supports standard HTML table cell events while maintaining component functionality

## API Reference

- [Storybook Stories](https://main--61e887d56582fe003ac9595e.chromatic.com/?path=/story/components-table-cellcomponent--default) - Interactive examples and testing
- [Table Component](./table.md) - Parent table component
- [CellBasic Component](./cell-basic.md) - Alternative for text-based content