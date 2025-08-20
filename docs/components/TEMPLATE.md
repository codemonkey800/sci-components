# ComponentName

## Overview

Brief description of what the component does and its primary use cases. Include the component's purpose within the Science Design System and when developers should use it.

## Installation & Import

```tsx
import { ComponentName } from '@czi-sds/components';
// or for data-viz components:
// import { ComponentName } from '@czi-sds/data-viz';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| propName | `string` | ✓ | - | Description of the prop |
| optionalProp | `boolean` | - | `false` | Description of optional prop |

### SDS-Specific Props

For components with SDS-specific styling props:

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| sdsStyle | `"style1" \| "style2"` | ✓ | - | Visual style variant of the component |
| sdsType | `"primary" \| "secondary"` | - | `"primary"` | Type/variant of the component |
| sdsSize | `"small" \| "medium" \| "large"` | - | `"medium"` | Size of the component |

## Usage Examples

### Basic Usage

```tsx
import React from 'react';
import { ComponentName } from '@czi-sds/components';

function MyComponent() {
  return (
    <ComponentName
      sdsStyle="primary"
      onClick={() => console.log('clicked')}
    >
      Component content
    </ComponentName>
  );
}
```

### Advanced Usage

Show more complex examples with multiple props, event handlers, and real-world scenarios:

```tsx
import React, { useState } from 'react';
import { ComponentName } from '@czi-sds/components';

function AdvancedExample() {
  const [value, setValue] = useState('');

  return (
    <ComponentName
      sdsStyle="secondary"
      sdsSize="large"
      disabled={false}
      onChange={(newValue) => setValue(newValue)}
      value={value}
    >
      Advanced component usage
    </ComponentName>
  );
}
```

### With Theme Integration

Show how the component works with theme customization:

```tsx
import React from 'react';
import { ComponentName, getColors } from '@czi-sds/components';
import styled from '@emotion/styled';

const CustomWrapper = styled.div`
  ${(props) => {
    const colors = getColors(props);
    return `
      background-color: ${colors?.primary[100]};
      padding: 16px;
    `;
  }}
`;

function ThemedExample() {
  return (
    <CustomWrapper>
      <ComponentName sdsStyle="primary">
        Themed component
      </ComponentName>
    </CustomWrapper>
  );
}
```

## Variations

### Style Variations

Document different `sdsStyle` options if applicable:

- **primary**: Default primary style with standard appearance
- **secondary**: Secondary style with reduced emphasis
- **tertiary**: Minimal style for subtle use cases

### Size Variations

Document different `sdsSize` options if applicable:

- **small**: Compact size for dense interfaces
- **medium**: Standard size for most use cases  
- **large**: Larger size for emphasis or accessibility

### Type Variations

Document different `sdsType` options if applicable:

- **default**: Standard behavior
- **destructive**: For dangerous or irreversible actions

## Component States

Document different states the component can have:

- **Default**: Normal interactive state
- **Disabled**: Non-interactive state
- **Loading**: Processing state (if applicable)
- **Error**: Error state with validation feedback

## Best Practices

### When to Use

- Use this component when you need [specific functionality]
- Ideal for [use case scenarios]
- Recommended for [design patterns]

### When Not to Use

- Avoid using this component for [anti-patterns]
- Consider [alternative component] instead for [different use cases]

### Accessibility Guidelines

- Component includes ARIA attributes for screen readers
- Supports keyboard navigation with [keys]
- Maintains focus management for modal/dialog components
- Color contrast meets WCAG guidelines

### Design Guidelines

- Follow spacing guidelines using theme tokens
- Maintain consistent typography using font mixins
- Use semantic colors from the theme palette

## Related Components

List related components that users might also need:

- **[RelatedComponent1]** - Use for similar but different functionality
- **[RelatedComponent2]** - Often used together with this component
- **[RelatedComponent3]** - Alternative for different use cases

## Migration Notes

Include any migration information for deprecated components or breaking changes:

- **Deprecated Features**: List any deprecated props or behaviors
- **Breaking Changes**: Note any API changes between versions
- **Migration Path**: Provide clear steps for updating existing code

## API Reference

Link to additional technical documentation:

- [Storybook Stories](link-to-storybook) - Interactive examples and testing
- [Material UI Base Component](link-to-mui-docs) - Underlying MUI component documentation
- [Design Tokens](link-to-tokens) - Available theme tokens and values