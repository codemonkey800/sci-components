# Tag

## Overview

The Tag component is a modern, flexible element used to represent entities, attributes, or actions. It displays concise information in a compact form factor and can be used for labels, categories, status indicators, or selected items. The Tag component is the recommended replacement for the deprecated Chip component and offers enhanced customization options with full SDS design system integration.

## Installation & Import

```tsx
import { Tag } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| label | `string` | ✓ | - | The content of the component |
| disabled | `boolean` | - | `false` | If true, the component is disabled |
| icon | `ReactElement` | - | - | Icon element to display |
| size | `"small" \| "medium"` | - | `"medium"` | The size of the component |
| variant | `"outlined" \| "filled"` | - | `"filled"` | The variant to use |
| color | `"info" \| "positive" \| "notice" \| "negative" \| "neutral" \| "beta" \| "[string, string]" \| "[string, string, string]"` | - | - | The color theme or custom color array |
| tagColor | `"info" \| "positive" \| "notice" \| "negative" \| "neutral" \| "beta" \| "[string, string]" \| "[string, string, string]"` | - | - | Alternative color prop (same as color) |
| hover | `boolean` | - | - | Enable hover state styling |
| onClick | `function` | - | - | Callback fired when the tag is clicked |

### SDS-Specific Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| sdsStyle | `"square" \| "rounded"` | - | - | Visual style variant of the component |
| sdsType | `"primary" \| "secondary"` | - | - | Type/variant of the component |
| sdsSize | `"s" \| "l"` | - | - | Size of the component |

## Usage Examples

### Basic Usage

```tsx
import React from 'react';
import { Tag } from '@czi-sds/components';

function MyComponent() {
  return (
    <div>
      <Tag label="Basic Tag" />
      <Tag label="Primary" sdsType="primary" />
      <Tag label="Secondary" sdsType="secondary" />
    </div>
  );
}
```

### With SDS Styling Options

```tsx
import React from 'react';
import { Tag } from '@czi-sds/components';

function StyledTagsExample() {
  return (
    <div>
      <Tag 
        label="Small Rounded" 
        sdsSize="s" 
        sdsStyle="rounded" 
        sdsType="primary" 
      />
      <Tag 
        label="Large Square" 
        sdsSize="l" 
        sdsStyle="square" 
        sdsType="secondary" 
      />
      <Tag 
        label="Default Style" 
        sdsType="primary" 
      />
    </div>
  );
}
```

### With Colors and Icons

```tsx
import React from 'react';
import { Tag, Icon } from '@czi-sds/components';

function ColoredTagsExample() {
  return (
    <div>
      <Tag 
        label="Success" 
        color="positive"
        icon={<Icon sdsIcon="CheckCircle" sdsSize="s" />}
      />
      <Tag 
        label="Warning" 
        color="notice"
        icon={<Icon sdsIcon="ExclamationMarkCircle" sdsSize="s" />}
      />
      <Tag 
        label="Error" 
        color="negative"
        icon={<Icon sdsIcon="XMarkCircle" sdsSize="s" />}
      />
      <Tag 
        label="Info" 
        color="info"
        icon={<Icon sdsIcon="InfoCircle" sdsSize="s" />}
      />
      <Tag 
        label="Beta" 
        color="beta"
        icon={<Icon sdsIcon="LightBulb" sdsSize="s" />}
      />
    </div>
  );
}
```

### Interactive Tags with State

```tsx
import React, { useState } from 'react';
import { Tag } from '@czi-sds/components';

function InteractiveTagsExample() {
  const [selectedTags, setSelectedTags] = useState<string[]>(['tag1']);

  const handleTagClick = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const tags = [
    { id: 'tag1', label: 'Machine Learning' },
    { id: 'tag2', label: 'Genomics' },
    { id: 'tag3', label: 'Cell Biology' },
    { id: 'tag4', label: 'Data Science' },
  ];

  return (
    <div>
      {tags.map((tag) => (
        <Tag
          key={tag.id}
          label={tag.label}
          sdsType={selectedTags.includes(tag.id) ? 'primary' : 'secondary'}
          variant={selectedTags.includes(tag.id) ? 'filled' : 'outlined'}
          hover
          onClick={() => handleTagClick(tag.id)}
          style={{ margin: '4px', cursor: 'pointer' }}
        />
      ))}
    </div>
  );
}
```

### Custom Colors

```tsx
import React from 'react';
import { Tag } from '@czi-sds/components';

function CustomColorTagsExample() {
  return (
    <div>
      {/* Two-color gradient: [background, text] */}
      <Tag 
        label="Custom Purple" 
        color={["#8B5CF6", "#FFFFFF"]}
      />
      
      {/* Three-color gradient: [background, border, text] */}
      <Tag 
        label="Custom Gradient" 
        color={["#F59E0B", "#D97706", "#FFFFFF"]}
        variant="outlined"
      />
    </div>
  );
}
```

### With Theme Integration

```tsx
import React from 'react';
import { Tag, getColors } from '@czi-sds/components';
import styled from '@emotion/styled';

const TagContainer = styled.div`
  ${(props) => {
    const colors = getColors(props);
    return `
      background-color: ${colors?.gray[100]};
      padding: 16px;
      border-radius: 8px;
    `;
  }}
`;

function ThemedTagsExample() {
  return (
    <TagContainer>
      <Tag 
        label="Themed Container" 
        sdsType="primary"
        sdsStyle="rounded"
      />
      <Tag 
        label="Secondary Tag" 
        sdsType="secondary"
        color="info"
      />
    </TagContainer>
  );
}
```

## Variations

### Style Variations

- **square**: Sharp corners for modern, geometric appearance
- **rounded**: Rounded corners for softer, friendly appearance

### Type Variations

- **primary**: Primary emphasis with brand colors
- **secondary**: Secondary emphasis with muted appearance

### Size Variations

- **s** (small): Compact size for dense interfaces and small content areas
- **l** (large): Standard size for most use cases and better readability

### Color Variations

- **info**: Blue theme for informational content
- **positive**: Green theme for success states and positive feedback
- **notice**: Orange/yellow theme for warnings and attention
- **negative**: Red theme for errors and destructive actions
- **neutral**: Gray theme for neutral, inactive states
- **beta**: Special theme for beta features and experimental content
- **Custom Arrays**: `[background, text]` or `[background, border, text]` for custom theming

### Variant Variations

- **filled**: Solid background with contrasting text
- **outlined**: Transparent background with colored border

## Component States

- **Default**: Normal interactive state
- **Hover**: Enhanced appearance when hover prop is true
- **Disabled**: Non-interactive state with reduced opacity
- **Focus**: Accessible focus state for keyboard navigation
- **Selected**: Visually distinct state for selected/active tags

## Best Practices

### When to Use

- Use for categorizing content (tags, labels, categories)
- Display status indicators with appropriate colors
- Create filter interfaces with selectable options
- Show metadata or attributes in compact form
- Represent selected items in multi-select interfaces

### When Not to Use

- Avoid for primary actions (use Button instead)
- Don't use for long text content (consider other components)
- Avoid overusing colors - maintain visual hierarchy

### Accessibility Guidelines

- Component includes proper ARIA attributes for screen readers
- Supports keyboard navigation with Enter and Space keys
- Maintains focus management for interactive states
- Color combinations meet WCAG contrast requirements
- Consider providing tooltips for icon-only tags or abbreviations

### Design Guidelines

- Use consistent color themes across your application
- Maintain proper spacing between multiple tags
- Align tag sizes with content hierarchy
- Consider tag density in different interface contexts
- Use icons sparingly and ensure they add meaningful context

## Related Components

- **TagFilter** - Specialized version with filtering and deletion capabilities
- **Chip** - Deprecated predecessor (migrate to Tag)
- **Button** - For more prominent actions and interactions
- **Icon** - For displaying icons within tags

## Migration Notes

This component is the modern replacement for the deprecated `Chip` component. See the [Chip documentation](chip.md) for detailed migration guidance.

### Key Advantages over Chip

- **Enhanced SDS Integration**: Full support for SDS design tokens and theming
- **Flexible Color System**: Support for semantic colors and custom color arrays  
- **Consistent API**: Aligned with other SDS components using sdsStyle, sdsType, sdsSize
- **Better Customization**: More granular control over appearance and behavior
- **Future-Proof**: Actively maintained and extended with new features

## API Reference

- [Storybook Stories](link-to-storybook) - Interactive examples and testing
- [Design Tokens](../design-tokens.md) - Available theme tokens and values
- [TagFilter Component](tag-filter.md) - Specialized filtering version