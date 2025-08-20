# ListSubheader

## Overview

The ListSubheader component provides semantic section headers for List components, offering clear organization and hierarchy within list structures. It renders as an HTML heading element and includes sticky positioning options, consistent typography styling, and proper accessibility attributes. The component is designed to work seamlessly with List and ListItem components to create well-structured, scannable content.

## Installation & Import

```tsx
import { ListSubheader } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `React.ReactNode` | - | - | Header text or content to display |
| color | `"default" \| "primary" \| "inherit"` | - | `"default"` | Color theme for the subheader |
| component | `ElementType` | - | `"li"` | Component or HTML element to render as |
| disableGutters | `boolean` | - | `true` | Whether to disable default padding/gutters |
| disableSticky | `boolean` | - | `false` | Whether to disable sticky positioning |
| inset | `boolean` | - | `false` | Whether to add inset padding for alignment |
| className | `string` | - | - | Additional CSS classes to apply |
| id | `string` | - | - | Unique identifier for the subheader |
| style | `CSSProperties` | - | - | Inline styles to apply |

### Additional MUI Props

ListSubheader extends Material UI's ListSubheader component and supports all standard MUI props including styling and positioning options.

## Usage Examples

### Basic Subheader

```tsx
import React from 'react';
import { List, ListSubheader, ListItem } from '@czi-sds/components';

function BasicSubheader() {
  return (
    <List 
      subheader={
        <ListSubheader>
          Laboratory Equipment
        </ListSubheader>
      }
    >
      <ListItem>Microscopes</ListItem>
      <ListItem>Centrifuges</ListItem>
      <ListItem>Spectrophotometers</ListItem>
      <ListItem>Incubators</ListItem>
    </List>
  );
}
```

### Multiple Sections with Subheaders

```tsx
import React from 'react';
import { List, ListSubheader, ListItem } from '@czi-sds/components';

function MultipleSections() {
  return (
    <div>
      <List 
        subheader={
          <ListSubheader>
            Sample Collection Protocols
          </ListSubheader>
        }
      >
        <ListItem>Blood sample collection</ListItem>
        <ListItem>Tissue biopsy procedures</ListItem>
        <ListItem>Saliva collection methods</ListItem>
      </List>

      <List 
        subheader={
          <ListSubheader>
            Processing Procedures
          </ListSubheader>
        }
      >
        <ListItem>DNA extraction protocols</ListItem>
        <ListItem>RNA purification steps</ListItem>
        <ListItem>Protein isolation methods</ListItem>
      </List>

      <List 
        subheader={
          <ListSubheader>
            Quality Control Checks
          </ListSubheader>
        }
      >
        <ListItem>Sample purity assessment</ListItem>
        <ListItem>Concentration measurements</ListItem>
        <ListItem>Contamination screening</ListItem>
      </List>
    </div>
  );
}
```

### Sticky Subheaders for Long Lists

```tsx
import React from 'react';
import { List, ListSubheader, ListItem } from '@czi-sds/components';

function StickySubheaders() {
  const protocolCategories = [
    {
      title: 'Pre-Analytical Phase',
      items: [
        'Patient preparation and identification',
        'Sample collection and labeling',
        'Transportation and storage',
        'Pre-processing quality checks'
      ]
    },
    {
      title: 'Analytical Phase', 
      items: [
        'Instrument calibration and setup',
        'Sample preparation and processing',
        'Analysis execution and monitoring',
        'Quality control measurements',
        'Result validation and review'
      ]
    },
    {
      title: 'Post-Analytical Phase',
      items: [
        'Data analysis and interpretation',
        'Result reporting and documentation',
        'Critical value notifications',
        'Sample archival or disposal'
      ]
    }
  ];

  return (
    <div style={{ height: '400px', overflow: 'auto', border: '1px solid #ddd' }}>
      {protocolCategories.map((category, index) => (
        <List
          key={index}
          subheader={
            <ListSubheader>
              {category.title}
            </ListSubheader>
          }
        >
          {category.items.map((item, itemIndex) => (
            <ListItem key={itemIndex} fontSize="s" marginBottom="xs">
              {item}
            </ListItem>
          ))}
        </List>
      ))}
    </div>
  );
}
```

### Customized Subheader Styling

```tsx
import React from 'react';
import { 
  List, 
  ListSubheader, 
  ListItem, 
  getColors, 
  getSpaces 
} from '@czi-sds/components';
import styled from '@emotion/styled';

const CustomSubheader = styled(ListSubheader)`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    
    return `
      background-color: ${colors?.primary[100]};
      color: ${colors?.primary[700]};
      font-weight: 600;
      font-size: 16px;
      padding: ${spaces?.s}px ${spaces?.m}px;
      border-left: 4px solid ${colors?.primary[500]};
      border-radius: 2px;
      margin-bottom: ${spaces?.xs}px;
      
      &.priority-high {
        background-color: ${colors?.negative[100]};
        color: ${colors?.negative[700]};
        border-left-color: ${colors?.negative[500]};
      }
      
      &.priority-medium {
        background-color: ${colors?.warning[100]};
        color: ${colors?.warning[700]};
        border-left-color: ${colors?.warning[500]};
      }
    `;
  }}
`;

function CustomizedSubheaders() {
  return (
    <div>
      <List 
        subheader={
          <CustomSubheader className="priority-high">
            Critical Laboratory Issues
          </CustomSubheader>
        }
      >
        <ListItem>Equipment failure in Lab 3</ListItem>
        <ListItem>Chemical spill containment needed</ListItem>
        <ListItem>Power outage backup procedures</ListItem>
      </List>

      <List 
        subheader={
          <CustomSubheader className="priority-medium">
            Routine Maintenance Tasks
          </CustomSubheader>
        }
      >
        <ListItem>Weekly equipment calibration</ListItem>
        <ListItem>Inventory stock check</ListItem>
        <ListItem>Safety equipment inspection</ListItem>
      </List>

      <List 
        subheader={
          <CustomSubheader>
            Standard Operating Procedures
          </CustomSubheader>
        }
      >
        <ListItem>Daily startup checklist</ListItem>
        <ListItem>Sample processing workflow</ListItem>
        <ListItem>End-of-day shutdown procedures</ListItem>
      </List>
    </div>
  );
}
```

### Subheaders with Interactive Elements

```tsx
import React, { useState } from 'react';
import { 
  List, 
  ListSubheader, 
  ListItem, 
  Button, 
  Icon 
} from '@czi-sds/components';

interface Section {
  title: string;
  items: string[];
  expanded: boolean;
}

function InteractiveSubheaders() {
  const [sections, setSections] = useState<Section[]>([
    {
      title: 'Sample Preparation',
      expanded: true,
      items: [
        'Collect samples in appropriate containers',
        'Label with unique identifiers',
        'Store at correct temperature'
      ]
    },
    {
      title: 'Analysis Procedures',
      expanded: false,
      items: [
        'Calibrate instruments',
        'Process samples according to protocol',
        'Record all measurements'
      ]
    },
    {
      title: 'Quality Assurance',
      expanded: false,
      items: [
        'Run control samples',
        'Check for contamination',
        'Validate results'
      ]
    }
  ]);

  const toggleSection = (index: number) => {
    setSections(prev => 
      prev.map((section, i) => 
        i === index 
          ? { ...section, expanded: !section.expanded }
          : section
      )
    );
  };

  return (
    <div>
      {sections.map((section, index) => (
        <div key={index} style={{ marginBottom: '16px' }}>
          <List
            subheader={
              <ListSubheader 
                component="div"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  cursor: 'pointer'
                }}
                onClick={() => toggleSection(index)}
              >
                <span>{section.title}</span>
                <Button
                  sdsType="secondary"
                  sdsStyle="minimal"
                  startIcon={
                    <Icon 
                      sdsIcon={section.expanded ? "ChevronUp" : "ChevronDown"} 
                      sdsSize="s" 
                    />
                  }
                  aria-label={section.expanded ? "Collapse section" : "Expand section"}
                />
              </ListSubheader>
            }
          >
            {section.expanded && section.items.map((item, itemIndex) => (
              <ListItem key={itemIndex} fontSize="s" marginBottom="xs">
                {item}
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </div>
  );
}
```

### Nested Lists with Hierarchical Subheaders

```tsx
import React from 'react';
import { 
  List, 
  ListSubheader, 
  ListItem 
} from '@czi-sds/components';

function NestedSubheaders() {
  return (
    <List 
      subheader={
        <ListSubheader>
          Complete Laboratory Workflow
        </ListSubheader>
      }
    >
      <ListItem ordered fontSize="m">
        <span>
          <strong>Sample Collection Phase</strong>
          <List 
            ordered
            subheader={
              <ListSubheader disableSticky style={{ fontSize: '14px', color: '#666' }}>
                Collection Procedures
              </ListSubheader>
            }
          >
            <ListItem ordered fontSize="s">
              Patient identification and consent
            </ListItem>
            <ListItem ordered fontSize="s">
              Sample collection using sterile technique
            </ListItem>
            <ListItem ordered fontSize="s">
              Proper labeling and documentation
            </ListItem>
          </List>
        </span>
      </ListItem>

      <ListItem ordered fontSize="m">
        <span>
          <strong>Processing Phase</strong>
          <List 
            ordered
            subheader={
              <ListSubheader disableSticky style={{ fontSize: '14px', color: '#666' }}>
                Laboratory Processing
              </ListSubheader>
            }
          >
            <ListItem ordered fontSize="s">
              Sample receiving and accessioning
            </ListItem>
            <ListItem ordered fontSize="s">
              Pre-analytical processing
            </ListItem>
            <ListItem ordered fontSize="s">
              Analytical testing procedures
            </ListItem>
          </List>
        </span>
      </ListItem>

      <ListItem ordered fontSize="m">
        <span>
          <strong>Reporting Phase</strong>
          <List 
            ordered
            subheader={
              <ListSubheader disableSticky style={{ fontSize: '14px', color: '#666' }}>
                Results and Documentation
              </ListSubheader>
            }
          >
            <ListItem ordered fontSize="s">
              Result validation and review
            </ListItem>
            <ListItem ordered fontSize="s">
              Report generation and distribution
            </ListItem>
            <ListItem ordered fontSize="s">
              Archive samples and documentation
            </ListItem>
          </List>
        </span>
      </ListItem>
    </List>
  );
}
```

## Sticky Positioning

### Default Behavior
- ListSubheader includes sticky positioning by default
- Remains visible at the top when scrolling through long lists
- Helps maintain context for users navigating large datasets

### Disabling Sticky
- Use `disableSticky={true}` for normal positioning
- Useful when sticky behavior interferes with layout
- Recommended for nested subheaders within scrollable containers

## Color Options

### Default Colors
- **default**: Standard subheader styling with system colors
- **primary**: Uses primary theme colors for emphasis
- **inherit**: Inherits color from parent component

## Best Practices

### When to Use

- Use ListSubheader to organize list content into logical sections
- Ideal for categorizing related list items
- Perfect for long lists that need visual organization
- Recommended for hierarchical content structures

### When Not to Use

- Don't use for single-section lists without clear organization needs
- Avoid overuse in short lists where sections add unnecessary complexity
- Consider other heading elements for non-list content

### Accessibility Guidelines

- ListSubheader automatically provides semantic heading structure
- Screen readers can navigate between sections efficiently
- Supports proper heading hierarchy within list contexts
- Maintains focus management for keyboard navigation
- Color contrast meets WCAG guidelines for text visibility

### Design Guidelines

- Keep subheader text concise and descriptive
- Use consistent styling across all subheaders
- Apply sticky positioning judiciously for usability
- Maintain visual hierarchy with proper typography
- Consider spacing and alignment with list content

## Related Components

- **List** - Parent container component that commonly uses ListSubheader
- **ListItem** - Individual items within sectioned lists
- **Accordion** - Alternative for collapsible section organization
- **Table** - Alternative for structured data with column headers
- **Typography** - For standalone heading elements outside of lists

## Migration Notes

- **Automatic Gutters**: ListSubheader automatically disables gutters for consistent spacing
- **Sticky Default**: Sticky positioning enabled by default for better UX
- **Typography Integration**: Uses design system typography tokens for consistent styling

## API Reference

- [Storybook Stories](https://main--61e887d56582fe003ac9595e.chromatic.com/?path=/story/components-list--default) - Interactive examples within List context
- [Material UI ListSubheader](https://mui.com/material-ui/react-list/#list-subheader) - Underlying MUI component documentation
- [List Component](./list.md) - Parent list container component