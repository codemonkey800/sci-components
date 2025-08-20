# Chip

## Overview

**⚠️ DEPRECATED: This component is deprecated and will be removed in a future major version. Please use the `Tag` component instead for new implementations.**

The Chip component is a compact, interactive element used to represent entities, attributes, or actions. It displays concise information in a small form factor and can be used for labels, categories, filters, or selected items. The Chip component is built on Material UI's Chip component but is being deprecated in favor of the more flexible `Tag` component.

## Installation & Import

```tsx
import { Chip } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| label | `ReactNode` | - | - | The content of the component |
| size | `"small" \| "medium"` | - | `"medium"` | The size of the component |
| color | `"success" \| "error" \| "warning" \| "info" \| "default" \| "primary" \| "secondary"` | - | `"default"` | The color of the component |
| variant | `"filled" \| "outlined"` | - | `"filled"` | The variant to use |
| status | `"success" \| "error" \| "warning" \| "info" \| "pending" \| "beta"` | - | - | The status indicator for the chip |
| isRounded | `boolean` | - | - | Whether the chip has rounded corners |
| disabled | `boolean` | - | `false` | If true, the component is disabled |
| icon | `ReactElement` | - | - | Icon element to display |
| onClick | `function` | - | - | Callback fired when the chip is clicked |
| onChange | `FormEventHandler<HTMLDivElement>` | - | - | Callback fired when the chip state changes |

## Usage Examples

### Basic Usage

```tsx
import React from 'react';
import { Chip } from '@czi-sds/components';

function MyComponent() {
  return (
    <div>
      <Chip label="Basic Chip" />
      <Chip label="Primary" color="primary" />
      <Chip label="Success" color="success" />
    </div>
  );
}
```

### With Status and Icons

```tsx
import React from 'react';
import { Chip, Icon } from '@czi-sds/components';

function StatusChipsExample() {
  return (
    <div>
      <Chip 
        label="Beta Feature" 
        status="beta"
        icon={<Icon sdsIcon="LightBulb" sdsSize="s" />}
      />
      <Chip 
        label="Processing" 
        status="pending"
        icon={<Icon sdsIcon="Loading" sdsSize="s" />}
      />
      <Chip 
        label="Complete" 
        status="success"
        icon={<Icon sdsIcon="CheckCircle" sdsSize="s" />}
      />
    </div>
  );
}
```

### Interactive Chips

```tsx
import React, { useState } from 'react';
import { Chip } from '@czi-sds/components';

function InteractiveChipsExample() {
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const handleChipClick = (chipId: string) => {
    setSelectedChips(prev => 
      prev.includes(chipId) 
        ? prev.filter(id => id !== chipId)
        : [...prev, chipId]
    );
  };

  return (
    <div>
      {['Option A', 'Option B', 'Option C'].map((option) => (
        <Chip
          key={option}
          label={option}
          color={selectedChips.includes(option) ? 'primary' : 'default'}
          variant={selectedChips.includes(option) ? 'filled' : 'outlined'}
          onClick={() => handleChipClick(option)}
        />
      ))}
    </div>
  );
}
```

## Variations

### Size Variations

- **small**: Compact size for dense interfaces
- **medium**: Standard size for most use cases

### Color Variations

- **default**: Standard neutral appearance
- **primary**: Primary brand color
- **secondary**: Secondary brand color
- **success**: Green color for positive states
- **error**: Red color for error states
- **warning**: Orange/yellow color for warnings
- **info**: Blue color for informational content

### Variant Variations

- **filled**: Solid background with contrast text
- **outlined**: Border with transparent background

### Status Variations

- **success**: Green indicator for completed/successful states
- **error**: Red indicator for error states
- **warning**: Orange indicator for warning states
- **info**: Blue indicator for informational states
- **pending**: Loading/processing state
- **beta**: Beta feature indicator

## Component States

- **Default**: Normal interactive state
- **Disabled**: Non-interactive state with reduced opacity
- **Hover**: Elevated appearance on mouse hover (when clickable)
- **Focus**: Focused state with keyboard navigation support

## Migration Notes

### Migration from Chip to Tag

**This component is deprecated.** Please migrate to the `Tag` component for all new implementations:

#### Before (Chip - Deprecated)
```tsx
import { Chip } from '@czi-sds/components';

<Chip 
  label="My Label"
  color="primary" 
  size="medium"
  variant="filled"
/>
```

#### After (Tag - Recommended)
```tsx
import { Tag } from '@czi-sds/components';

<Tag 
  label="My Label"
  sdsType="primary" 
  sdsSize="l"
  variant="filled"
/>
```

#### Key Migration Changes

1. **Import**: Change from `Chip` to `Tag`
2. **Props Mapping**:
   - `color="primary"` → `sdsType="primary"`
   - `color="secondary"` → `sdsType="secondary"`
   - `size="medium"` → `sdsSize="l"`
   - `size="small"` → `sdsSize="s"`
   - `isRounded` → `sdsStyle="rounded"`
3. **Enhanced Features**: The `Tag` component offers additional customization options and better consistency with the SDS design system

### Breaking Changes

- **Deprecated Props**: The `status` prop is not available in the `Tag` component
- **Color System**: The `Tag` component uses a different color system with theme-aware colors
- **Styling**: Use `sdsStyle`, `sdsType`, and `sdsSize` props instead of basic Material UI props

## Best Practices

### When to Migrate

- **New Development**: Always use `Tag` component for new features
- **Existing Code**: Plan migration during regular maintenance cycles
- **Critical Updates**: Prioritize migration if using deprecated props or patterns

### Accessibility Guidelines

- Components include ARIA attributes for screen readers
- Supports keyboard navigation with Enter and Space keys
- Maintains proper focus management
- Color contrast meets WCAG guidelines
- Consider providing text alternatives for icon-only chips

## Related Components

- **Tag** - Modern replacement for Chip with enhanced SDS integration
- **TagFilter** - Specialized tag component with filtering capabilities
- **Button** - For more prominent interactive elements
- **Icon** - For displaying icons within chips

## API Reference

- [Tag Component Documentation](tag.md) - Recommended replacement component
- [Material UI Chip](https://mui.com/material-ui/react-chip/) - Underlying MUI component documentation
- [Design Tokens](../design-tokens.md) - Available theme tokens and values