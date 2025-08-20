# ListItem

## Overview

The ListItem component represents individual items within List structures, providing flexible typography, spacing, and bullet/numbering styling. It automatically handles visual markers for both ordered and unordered lists, supports multiple font sizes, and includes proper spacing tokens from the Science Design System. The component renders as an HTML `<li>` element and integrates seamlessly with nested list structures.

## Installation & Import

```tsx
import { ListItem, ListItemLabel } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `React.ReactNode` | - | - | Content to display within the list item |
| fontSize | `"xxxs" \| "xxs" \| "xs" \| "s" \| "m" \| "l"` | - | `"s"` | Font size using design system typography tokens |
| marginBottom | `"xxs" \| "xs" \| "s"` | - | `"xs"` | Bottom margin spacing using design tokens |
| ordered | `boolean` | - | `false` | Whether this item is part of an ordered list with numbers |
| className | `string` | - | - | Additional CSS classes to apply |
| id | `string` | - | - | Unique identifier for the list item |
| style | `CSSProperties` | - | - | Inline styles to apply |
| onClick | `function` | - | - | Click event handler |
| selected | `boolean` | - | `false` | Whether the list item is selected |
| disabled | `boolean` | - | `false` | Whether the list item is disabled |

### Additional MUI Props

ListItem extends Material UI's ListItem component, so it supports all standard MUI ListItem props including:
- `alignItems` - Alignment of flex container items
- `button` - Makes the item interactive as a button
- `dense` - Enables dense spacing
- `divider` - Shows divider line after the item
- `secondaryAction` - Content for secondary action area

## Usage Examples

### Basic List Items

```tsx
import React from 'react';
import { List, ListItem } from '@czi-sds/components';

function BasicListItems() {
  return (
    <List>
      <ListItem>DNA extraction protocol</ListItem>
      <ListItem>RNA purification steps</ListItem>
      <ListItem>Protein quantification methods</ListItem>
      <ListItem>Quality control procedures</ListItem>
    </List>
  );
}
```

### Font Size Variations

```tsx
import React from 'react';
import { List, ListItem, ListSubheader } from '@czi-sds/components';

function FontSizeVariations() {
  return (
    <List 
      subheader={
        <ListSubheader>
          Typography Scale Examples
        </ListSubheader>
      }
    >
      <ListItem fontSize="l" marginBottom="s">
        Large text - Main headings and important information
      </ListItem>
      <ListItem fontSize="m" marginBottom="s">
        Medium text - Standard body content and descriptions
      </ListItem>
      <ListItem fontSize="s" marginBottom="xs">
        Small text - Default size for most list items
      </ListItem>
      <ListItem fontSize="xs" marginBottom="xs">
        Extra small text - Secondary information and details
      </ListItem>
      <ListItem fontSize="xxs" marginBottom="xs">
        Extra extra small text - Captions and metadata
      </ListItem>
      <ListItem fontSize="xxxs">
        Extra extra extra small text - Fine print and footnotes
      </ListItem>
    </List>
  );
}
```

### Ordered List Items with Numbering

```tsx
import React from 'react';
import { List, ListItem, ListSubheader } from '@czi-sds/components';

function OrderedListItems() {
  return (
    <List 
      ordered
      subheader={
        <ListSubheader>
          Laboratory Safety Checklist
        </ListSubheader>
      }
    >
      <ListItem ordered fontSize="m" marginBottom="s">
        Put on appropriate personal protective equipment (PPE)
      </ListItem>
      <ListItem ordered fontSize="m" marginBottom="s">
        Verify all equipment is functioning properly
      </ListItem>
      <ListItem ordered fontSize="m" marginBottom="s">
        Check that safety shower and eyewash stations are accessible
      </ListItem>
      <ListItem ordered fontSize="m" marginBottom="s">
        Review material safety data sheets (MSDS) for chemicals
      </ListItem>
      <ListItem ordered fontSize="m">
        Ensure proper waste disposal containers are available
      </ListItem>
    </List>
  );
}
```

### Nested Lists with Hierarchy

```tsx
import React from 'react';
import { List, ListItem, ListSubheader } from '@czi-sds/components';

function NestedListItems() {
  return (
    <List 
      ordered
      subheader={
        <ListSubheader>
          Experimental Protocol Hierarchy
        </ListSubheader>
      }
    >
      <ListItem ordered fontSize="m">
        <span>
          Sample Preparation
          <List ordered marginBottom="s">
            <ListItem ordered fontSize="s" marginBottom="xs">
              Collect biological samples in sterile containers
            </ListItem>
            <ListItem ordered fontSize="s" marginBottom="xs">
              <span>
                Processing Steps
                <List ordered>
                  <ListItem ordered fontSize="xs">
                    Centrifuge at 4°C for 10 minutes
                  </ListItem>
                  <ListItem ordered fontSize="xs">
                    Remove supernatant carefully
                  </ListItem>
                  <ListItem ordered fontSize="xs">
                    Store pellet at -80°C until analysis
                  </ListItem>
                </List>
              </span>
            </ListItem>
            <ListItem ordered fontSize="s">
              Label samples with unique identifiers
            </ListItem>
          </List>
        </span>
      </ListItem>
      
      <ListItem ordered fontSize="m">
        <span>
          Analysis Phase
          <List ordered marginBottom="s">
            <ListItem ordered fontSize="s">
              Thaw samples to room temperature
            </ListItem>
            <ListItem ordered fontSize="s">
              Run quality control checks
            </ListItem>
            <ListItem ordered fontSize="s">
              Process through analytical instruments
            </ListItem>
          </List>
        </span>
      </ListItem>
      
      <ListItem ordered fontSize="m">
        Data analysis and reporting
      </ListItem>
    </List>
  );
}
```

### Interactive List Items

```tsx
import React, { useState } from 'react';
import { List, ListItem, ListItemLabel, Icon, Button } from '@czi-sds/components';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

function InteractiveListItems() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Review data analysis results', completed: false, priority: 'high' },
    { id: '2', title: 'Update laboratory notebook', completed: true, priority: 'medium' },
    { id: '3', title: 'Prepare samples for sequencing', completed: false, priority: 'high' },
    { id: '4', title: 'Clean and organize workspace', completed: false, priority: 'low' }
  ]);

  const toggleTask = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#666';
    }
  };

  return (
    <List>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          fontSize="m"
          marginBottom="s"
          button
          onClick={() => toggleTask(task.id)}
          selected={task.completed}
          style={{
            opacity: task.completed ? 0.6 : 1,
            textDecoration: task.completed ? 'line-through' : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
            <Icon 
              sdsIcon={task.completed ? "CheckCircle" : "Circle"} 
              sdsSize="s"
              style={{ color: task.completed ? '#4caf50' : '#ccc' }}
            />
            
            <span style={{ flex: 1 }}>
              {task.title}
            </span>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ListItemLabel style={{ color: getPriorityColor(task.priority) }}>
                {task.priority}
              </ListItemLabel>
              
              <Button
                sdsType="secondary"
                sdsStyle="minimal"
                startIcon={<Icon sdsIcon="DotsHorizontal" sdsSize="xs" />}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('More actions for', task.title);
                }}
                aria-label={`More actions for ${task.title}`}
              />
            </div>
          </div>
        </ListItem>
      ))}
    </List>
  );
}
```

### With Theme Integration and Custom Styling

```tsx
import React from 'react';
import { List, ListItem, ListItemLabel, getColors, getSpaces } from '@czi-sds/components';
import styled from '@emotion/styled';

const StyledList = styled(List)`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    
    return `
      background-color: ${colors?.primary[50]};
      border-radius: 4px;
      padding: ${spaces?.m}px;
      
      .critical-item {
        background-color: ${colors?.negative[100]};
        border-left: 4px solid ${colors?.negative[500]};
        border-radius: 2px;
        padding: ${spaces?.s}px;
        margin: ${spaces?.xs}px 0;
        
        &:before {
          color: ${colors?.negative[500]};
        }
      }
      
      .completed-item {
        background-color: ${colors?.positive[100]};
        border-left: 4px solid ${colors?.positive[500]};
        border-radius: 2px;
        padding: ${spaces?.s}px;
        margin: ${spaces?.xs}px 0;
        
        &:before {
          color: ${colors?.positive[500]};
        }
      }
    `;
  }}
`;

function ThemedListItems() {
  const items = [
    { text: 'Critical: Equipment malfunction in Lab 3', type: 'critical' },
    { text: 'Completed: Weekly safety inspection', type: 'completed' },
    { text: 'Pending: Review experimental protocols', type: 'normal' },
    { text: 'Completed: Update chemical inventory', type: 'completed' }
  ];

  return (
    <StyledList>
      {items.map((item, index) => (
        <ListItem
          key={index}
          fontSize="m"
          className={
            item.type === 'critical' 
              ? 'critical-item'
              : item.type === 'completed'
              ? 'completed-item'
              : ''
          }
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {item.type === 'critical' && (
              <ListItemLabel style={{ color: '#f44336' }}>
                URGENT
              </ListItemLabel>
            )}
            {item.type === 'completed' && (
              <ListItemLabel style={{ color: '#4caf50' }}>
                ✓
              </ListItemLabel>
            )}
            <span>{item.text}</span>
          </div>
        </ListItem>
      ))}
    </StyledList>
  );
}
```

## Typography Scale

### Font Size Options
- **xxxs**: Fine print, footnotes, extremely small details
- **xxs**: Captions, metadata, secondary information  
- **xs**: Small details, supporting text, compact interfaces
- **s**: Default size, standard body text, most list items
- **m**: Emphasized content, important information
- **l**: Headings, prominent information, main topics

## Spacing System

### Margin Bottom Options
- **xxs**: Minimal spacing for very compact lists
- **xs**: Default spacing for standard lists  
- **s**: Larger spacing for separated sections

## Visual Markers

### Unordered Lists
- Bullet point (•) with consistent spacing
- Automatically styled with theme colors
- Proper alignment with multi-line content

### Ordered Lists
- Automatic numbering with CSS counters
- Supports nested numbering (1.1, 1.2, etc.)
- Consistent spacing and alignment
- Numbers styled to match theme typography

## Best Practices

### When to Use

- Use ListItem for individual items within List components
- Ideal for step-by-step procedures and instructions
- Perfect for displaying collections of related information
- Recommended for hierarchical content with nesting

### When Not to Use

- Don't use ListItem outside of List components
- Avoid for tabular data (use Table and cell components instead)
- Consider other components for complex interactive layouts

### Accessibility Guidelines

- ListItem automatically provides semantic `<li>` element structure
- Screen readers can navigate list structure and announce item positions
- Supports keyboard navigation for interactive items
- Maintains proper focus management within lists
- Color and typography meet WCAG contrast requirements

### Design Guidelines

- Use consistent font sizes within the same list level
- Apply appropriate spacing based on content density
- Leverage ordered lists for sequential procedures
- Keep item content concise and scannable
- Use nested lists sparingly to avoid excessive hierarchy

## Related Components

- **List** - Parent container component for list structures
- **ListSubheader** - Section headers within lists
- **ListItemLabel** - Emphasized text labels within list items
- **Table** - Alternative for structured tabular data
- **Card** - Alternative for complex item layouts

## Migration Notes

- **Automatic Gutters**: ListItem automatically disables gutters for consistent spacing
- **CSS Counters**: Ordered list numbering handled automatically with CSS
- **Typography Integration**: Font sizes use design system typography tokens

## API Reference

- [Storybook Stories](https://main--61e887d56582fe003ac9595e.chromatic.com/?path=/story/components-list--default) - Interactive examples within List context
- [Material UI ListItem](https://mui.com/material-ui/react-list/#list-item) - Underlying MUI component documentation
- [List Component](./list.md) - Parent list container component