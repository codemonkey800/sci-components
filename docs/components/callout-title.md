# CalloutTitle

## Overview

CalloutTitle is a specialized sub-component designed to provide consistent title styling within Callout components. It renders as a prominently styled heading that establishes clear visual hierarchy and semantic structure for callout messages. While primarily intended for internal use within the Callout component, it can also be used independently for consistent title styling.

The component is built on Material UI's AlertTitle foundation and includes proper display name handling to ensure expandable Callout functionality works correctly.

## Installation & Import

```tsx
import { CalloutTitle } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `ReactNode` | ✓ | - | The title content to display |

*Note: CalloutTitle accepts all standard HTML div element props through Material UI's AlertTitleProps interface.*

## Usage Examples

### Basic Usage

```tsx
import React from 'react';
import { CalloutTitle } from '@czi-sds/components';

function MyComponent() {
  return (
    <CalloutTitle>
      Important Information
    </CalloutTitle>
  );
}
```

### Within Custom Callout Structure

```tsx
import React from 'react';
import { CalloutTitle, CalloutBody } from '@czi-sds/components';
import styled from '@emotion/styled';

const CustomCalloutWrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  background-color: #f5f5f5;
`;

function CustomCalloutExample() {
  return (
    <CustomCalloutWrapper>
      <CalloutTitle>
        System Update Required
      </CalloutTitle>
      <div style={{ marginTop: '8px' }}>
        Please update your browser to the latest version for optimal performance.
      </div>
    </CustomCalloutWrapper>
  );
}
```

### Dynamic Title Content

```tsx
import React from 'react';
import { CalloutTitle } from '@czi-sds/components';

interface DynamicTitleProps {
  status: 'success' | 'error' | 'warning' | 'info';
  itemCount: number;
}

function DynamicTitleExample({ status, itemCount }: DynamicTitleProps) {
  const getTitle = () => {
    switch (status) {
      case 'success':
        return `Successfully processed ${itemCount} items`;
      case 'error':
        return `Failed to process ${itemCount} items`;
      case 'warning':
        return `${itemCount} items need attention`;
      case 'info':
      default:
        return `Processing ${itemCount} items`;
    }
  };

  return (
    <CalloutTitle>
      {getTitle()}
    </CalloutTitle>
  );
}
```

### With Rich Content

```tsx
import React from 'react';
import { CalloutTitle } from '@czi-sds/components';

function RichContentExample() {
  return (
    <CalloutTitle>
      <span>
        <strong>Data Upload:</strong> Stage 2 of 3 Complete
      </span>
    </CalloutTitle>
  );
}
```

### With Theme Integration

```tsx
import React from 'react';
import { CalloutTitle, getColors } from '@czi-sds/components';
import styled from '@emotion/styled';

const ThemedCalloutTitle = styled(CalloutTitle)`
  ${(props) => {
    const colors = getColors(props);
    return `
      color: ${colors?.primary[600]};
      text-transform: uppercase;
      letter-spacing: 0.5px;
    `;
  }}
`;

function ThemedExample() {
  return (
    <ThemedCalloutTitle>
      Custom Styled Title
    </ThemedCalloutTitle>
  );
}
```

## Typography Styling

The CalloutTitle component includes built-in typography styling that:

- Uses the appropriate font weight for visual prominence
- Maintains consistent spacing with the Design System
- Provides proper contrast ratios for accessibility
- Scales appropriately with the parent Callout's theme

## Best Practices

### When to Use

- Inside Callout components for structured messaging
- When building custom alert or notification components
- For maintaining consistent title styling across feedback components
- When you need semantic heading structure in callout content

### When Not to Use

- As a general page heading (use Typography or HTML heading tags instead)
- For body text content (use regular text elements)
- Outside of callout or alert contexts (consider Typography component)

### Content Guidelines

- Keep titles concise and descriptive
- Use sentence case for better readability
- Avoid excessive punctuation in titles
- Make titles scannable and informative
- Consider internationalization for user-facing text

### Accessibility Guidelines

- Title provides semantic structure for screen readers
- Contributes to proper heading hierarchy within callouts
- Should be descriptive enough to understand the callout's purpose
- Maintains proper contrast ratios with background colors

### Design Guidelines

- Title creates visual hierarchy within callout content
- Spacing is automatically handled by the component
- Typography scales with the Design System's font tokens
- Color inherits from parent context appropriately

## Related Components

- **[Callout](callout.md)** - Parent component that typically contains CalloutTitle
- **[Banner](banner.md)** - Alternative full-width messaging component
- **[Typography](typography.md)** - For general text styling outside callouts
- **[Notification](notification.md)** - For toast-style temporary messages

## Technical Notes

### Display Name Handling

The component includes a specific `displayName` property that ensures proper functionality within expandable Callout components:

```tsx
CalloutTitle.displayName = CALLOUT_TITLE_DISPLAY_NAME;
```

This is crucial for the Callout's expand/collapse logic to correctly identify title elements.

### Integration with Callout

When used within a Callout component, CalloutTitle is automatically:
- Styled according to the callout's intent and theme
- Positioned correctly within the callout's layout
- Hidden/shown based on the callout's `hideTitle` prop
- Included in expand/collapse animations

## API Reference

- [Material UI AlertTitle Documentation](https://mui.com/material-ui/api/alert-title/) - Underlying MUI component
- [Callout Component Documentation](callout.md) - Primary use case and integration
- [Typography Component Documentation](typography.md) - Alternative for non-callout headings
- [Design Tokens](link-to-tokens) - Typography and spacing tokens used by the component