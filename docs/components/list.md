# List

## Overview

The List component provides a structured way to display collections of related information with consistent styling and semantic HTML structure. It supports both ordered and unordered lists, nested hierarchies, subheaders, and flexible spacing options. Built on Material UI's List component, it maintains accessibility standards while providing the Science Design System's typography and spacing tokens.

## Installation & Import

```tsx
import { List } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `ReactNode` | - | - | List items and content to display |
| ordered | `boolean` | - | `false` | Whether to render as ordered list (`<ol>`) or unordered (`<ul>`) |
| marginBottom | `"xxxs" \| "xxs" \| "xs" \| "s" \| "m" \| "l"` | - | - | Bottom margin spacing using design tokens |
| component | `ElementType` | - | - | Override the root element (defaults to `ul` or `ol` based on ordered prop) |
| subheader | `ReactNode` | - | - | Optional subheader element for the list |
| className | `string` | - | - | Additional CSS classes to apply |
| id | `string` | - | - | Unique identifier for the list element |
| style | `CSSProperties` | - | - | Inline styles to apply |
| onClick | `function` | - | - | Click event handler |
| onChange | `FormEventHandler<HTMLUListElement>` | - | - | Form change event handler |

## Usage Examples

### Basic Unordered List

```tsx
import React from 'react';
import { List, ListItem } from '@czi-sds/components';

function BasicUnorderedList() {
  return (
    <List>
      <ListItem>DNA extraction from blood samples</ListItem>
      <ListItem>RNA isolation and purification</ListItem>
      <ListItem>Protein quantification assays</ListItem>
      <ListItem>Quality control measurements</ListItem>
    </List>
  );
}
```

### Basic Ordered List

```tsx
import React from 'react';
import { List, ListItem } from '@czi-sds/components';

function BasicOrderedList() {
  return (
    <List ordered>
      <ListItem ordered>Collect samples from test subjects</ListItem>
      <ListItem ordered>Prepare samples for analysis</ListItem>
      <ListItem ordered>Run sequencing protocols</ListItem>
      <ListItem ordered>Analyze and validate results</ListItem>
      <ListItem ordered>Generate final report</ListItem>
    </List>
  );
}
```

### With Subheader and Spacing

```tsx
import React from 'react';
import { List, ListItem, ListSubheader } from '@czi-sds/components';

function ListWithSubheader() {
  return (
    <List 
      marginBottom="m"
      subheader={
        <ListSubheader>
          Laboratory Protocol Checklist
        </ListSubheader>
      }
    >
      <ListItem fontSize="m" marginBottom="s">
        Prepare sterile workspace and equipment
      </ListItem>
      <ListItem fontSize="m" marginBottom="s">
        Verify sample labeling and documentation
      </ListItem>
      <ListItem fontSize="m" marginBottom="s">
        Follow standard operating procedures
      </ListItem>
      <ListItem fontSize="m">
        Record all observations and measurements
      </ListItem>
    </List>
  );
}
```

### Nested Lists with Hierarchy

```tsx
import React from 'react';
import { List, ListItem, ListSubheader } from '@czi-sds/components';

function NestedLists() {
  return (
    <List 
      ordered
      subheader={
        <ListSubheader>
          Experimental Workflow
        </ListSubheader>
      }
    >
      <ListItem ordered>
        <span>
          Sample Preparation
          <List ordered marginBottom="s">
            <ListItem ordered fontSize="s">
              Thaw samples at room temperature
            </ListItem>
            <ListItem ordered fontSize="s">
              Centrifuge at 2000g for 5 minutes
            </ListItem>
            <ListItem ordered fontSize="s">
              Transfer supernatant to clean tubes
            </ListItem>
          </List>
        </span>
      </ListItem>
      
      <ListItem ordered>
        <span>
          Analysis Protocol
          <List ordered marginBottom="s">
            <ListItem ordered fontSize="s">
              <span>
                Spectrophotometric Analysis
                <List ordered>
                  <ListItem ordered fontSize="xs">
                    Set wavelength to 280nm
                  </ListItem>
                  <ListItem ordered fontSize="xs">
                    Calibrate with blank solution
                  </ListItem>
                  <ListItem ordered fontSize="xs">
                    Record absorbance values
                  </ListItem>
                </List>
              </span>
            </ListItem>
            <ListItem ordered fontSize="s">
              Fluorescence measurements
            </ListItem>
            <ListItem ordered fontSize="s">
              Data validation and quality control
            </ListItem>
          </List>
        </span>
      </ListItem>
      
      <ListItem ordered>
        Documentation and reporting
      </ListItem>
    </List>
  );
}
```

### Dynamic Lists with Interactive Content

```tsx
import React, { useState } from 'react';
import { List, ListItem, ListSubheader, Button, Icon } from '@czi-sds/components';

interface ProtocolStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  substeps?: string[];
}

function InteractiveProtocolList() {
  const [steps, setSteps] = useState<ProtocolStep[]>([
    {
      id: '1',
      title: 'Sample Collection',
      description: 'Collect samples using sterile techniques',
      completed: false,
      substeps: [
        'Prepare collection tubes',
        'Label with unique identifiers',
        'Document collection time and conditions'
      ]
    },
    {
      id: '2', 
      title: 'Processing',
      description: 'Process samples according to protocol',
      completed: false,
      substeps: [
        'Centrifuge samples',
        'Separate components',
        'Store at appropriate temperature'
      ]
    },
    {
      id: '3',
      title: 'Analysis',
      description: 'Analyze using approved methods',
      completed: false
    }
  ]);

  const toggleStepCompletion = (id: string) => {
    setSteps(prev => 
      prev.map(step => 
        step.id === id 
          ? { ...step, completed: !step.completed }
          : step
      )
    );
  };

  return (
    <List 
      ordered
      subheader={
        <ListSubheader>
          Protocol Execution Checklist
        </ListSubheader>
      }
    >
      {steps.map((step) => (
        <ListItem 
          key={step.id} 
          ordered 
          fontSize="m"
          marginBottom="s"
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Button
              sdsType={step.completed ? "primary" : "secondary"}
              sdsStyle="minimal"
              startIcon={
                <Icon 
                  sdsIcon={step.completed ? "CheckCircle" : "Circle"} 
                  sdsSize="s" 
                />
              }
              onClick={() => toggleStepCompletion(step.id)}
              aria-label={step.completed ? "Mark incomplete" : "Mark complete"}
            >
              {step.completed ? "Complete" : "Pending"}
            </Button>
            
            <div style={{ flex: 1 }}>
              <div style={{ 
                fontWeight: step.completed ? 'normal' : '600',
                textDecoration: step.completed ? 'line-through' : 'none',
                opacity: step.completed ? 0.7 : 1
              }}>
                {step.title}
              </div>
              <div style={{ 
                fontSize: '14px', 
                color: '#666', 
                marginTop: '2px' 
              }}>
                {step.description}
              </div>
              
              {step.substeps && (
                <List marginBottom="xs" style={{ marginTop: '8px' }}>
                  {step.substeps.map((substep, index) => (
                    <ListItem key={index} fontSize="s">
                      {substep}
                    </ListItem>
                  ))}
                </List>
              )}
            </div>
          </div>
        </ListItem>
      ))}
    </List>
  );
}
```

### With Theme Integration

```tsx
import React from 'react';
import { List, ListItem, ListSubheader, getColors, getSpaces } from '@czi-sds/components';
import styled from '@emotion/styled';

const ThemedListContainer = styled.div`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    
    return `
      background-color: ${colors?.primary[50]};
      border-left: 4px solid ${colors?.primary[300]};
      padding: ${spaces?.m}px;
      border-radius: 4px;
      
      .priority-item {
        background-color: ${colors?.warning[100]};
        border-radius: 2px;
        padding: ${spaces?.xs}px ${spaces?.s}px;
        margin: ${spaces?.xs}px 0;
        border-left: 3px solid ${colors?.warning[500]};
      }
    `;
  }}
`;

function ThemedList() {
  return (
    <ThemedListContainer>
      <List 
        ordered
        subheader={
          <ListSubheader>
            High-Priority Research Tasks
          </ListSubheader>
        }
      >
        <ListItem ordered className="priority-item">
          Complete RNA sequencing for Sample Batch A
        </ListItem>
        <ListItem ordered className="priority-item">
          Validate protein expression analysis results  
        </ListItem>
        <ListItem ordered>
          Document experimental procedures and findings
        </ListItem>
        <ListItem ordered>
          Prepare interim progress report
        </ListItem>
      </List>
    </ThemedListContainer>
  );
}
```

## List Types

### Unordered Lists (`ordered={false}`)
- Uses bullet points for visual hierarchy
- Appropriate for items without inherent sequence
- Semantic `<ul>` element for accessibility
- Default list type when ordered prop is omitted

### Ordered Lists (`ordered={true}`)
- Uses numerical or alphabetical markers
- Indicates sequential or ranked items
- Semantic `<ol>` element for accessibility
- Automatically handles nested numbering schemes

## Spacing System

### Margin Bottom Options
- **xxxs**: Minimal spacing for compact layouts
- **xxs**: Very tight spacing for dense information
- **xs**: Small spacing for related items
- **s**: Standard spacing for most use cases
- **m**: Medium spacing for section separation
- **l**: Large spacing for major content divisions

## Best Practices

### When to Use

- Use List for displaying collections of related items
- Ideal for procedures, checklists, and step-by-step instructions
- Perfect for scientific protocols and experimental workflows
- Recommended for navigation menus and feature listings

### When Not to Use

- Don't use List for tabular data (use Table instead)
- Avoid for single items that don't form a collection
- Consider Card components for complex item layouts

### Accessibility Guidelines

- List automatically provides semantic HTML structure (`<ul>`, `<ol>`, `<li>`)
- Screen readers can navigate list structure and announce item counts
- Supports keyboard navigation for interactive list items
- Maintains proper heading hierarchy with ListSubheader components
- Color contrast meets WCAG guidelines for all text content

### Design Guidelines

- Use consistent spacing patterns within lists
- Keep list items concise and scannable
- Use nested lists sparingly to avoid excessive hierarchy
- Apply semantic ordering (use ordered lists for sequences)
- Maintain visual consistency with typography and spacing tokens

## Related Components

- **ListItem** - Individual items within the list structure
- **ListSubheader** - Semantic headers for list sections
- **Table** - Alternative for tabular data display
- **Accordion** - Alternative for collapsible content sections
- **Card** - Alternative for complex item layouts

## Migration Notes

- **Automatic Padding**: List automatically disables default padding for clean integration with design system spacing
- **Component Flexibility**: Supports custom root elements through component prop
- **Material UI Integration**: Built on MUI List with enhanced styling and spacing options

## API Reference

- [Storybook Stories](https://main--61e887d56582fe003ac9595e.chromatic.com/?path=/story/components-list--default) - Interactive examples and testing
- [Material UI List](https://mui.com/material-ui/react-list/) - Underlying MUI component documentation
- [ListItem Component](./list-item.md) - Individual list item component
- [ListSubheader Component](./list-subheader.md) - List section headers