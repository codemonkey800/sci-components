# Callout

## Overview

Callout is a versatile feedback component designed to display contextual information, alerts, and messages within content areas. Built on Material UI's Alert foundation, it provides multiple interaction patterns including persistent, dismissible, and expandable styles. Callouts help communicate important information while maintaining visual hierarchy and user control.

The component is the modern replacement for the deprecated Alert component, offering enhanced functionality with structured content areas (title, body, extra content) and sophisticated interaction patterns for complex messaging scenarios.

## Installation & Import

```tsx
import { Callout } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| intent | `"info" \| "negative" \| "notice" \| "positive"` | ✓ | - | The intent/severity level of the callout |
| sdsStyle | `"persistent" \| "expandable" \| "dismissible"` | - | `"persistent"` | The visual and interaction style variant |
| title | `string` | - | - | Title text displayed prominently at the top |
| body | `ReactNode` | - | - | Main content body of the callout |
| children | `ReactNode` | - | - | Additional content (used in expandable style) |
| icon | `keyof IconNameToSizes \| ReactElement` | - | - | Custom icon override. Uses default based on intent if not provided |
| sdsIconProps | `Partial<IconProps>` | - | - | Props to customize the icon |
| dismissed | `boolean` | - | - | Controls visibility (controlled component) |
| autoDismiss | `boolean \| number` | - | - | Auto-dismiss after timeout. `true` uses 8000ms, number sets custom timeout |
| sdsStage | `"open" \| "closed"` | - | `"open"` | Initial expansion state for expandable style |
| hideTitle | `boolean` | - | `false` | Hide the title area |
| hideBody | `boolean` | - | `false` | Hide the body area |
| onClose | `(event: SyntheticEvent) => void` | - | - | Callback fired when callout is closed |
| className | `string` | - | - | Additional CSS class names |
| style | `CSSProperties` | - | - | Inline styles |

## Usage Examples

### Basic Usage

```tsx
import React from 'react';
import { Callout } from '@czi-sds/components';

function MyComponent() {
  return (
    <Callout
      intent="info"
      title="Data Processing Complete"
      body="Your analysis has finished successfully. Results are now available in the dashboard."
    />
  );
}
```

### Dismissible Callout

```tsx
import React, { useState } from 'react';
import { Callout } from '@czi-sds/components';

function DismissibleExample() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    console.log('Callout dismissed');
  };

  return (
    <Callout
      intent="positive"
      sdsStyle="dismissible"
      title="Success!"
      body="Your data has been saved successfully."
      dismissed={!isVisible}
      onClose={handleClose}
    />
  );
}
```

### Expandable Callout

```tsx
import React from 'react';
import { Callout } from '@czi-sds/components';

function ExpandableExample() {
  return (
    <Callout
      intent="notice"
      sdsStyle="expandable"
      title="Important Update"
      body="New features have been added to improve your workflow."
      sdsStage="closed"
    >
      <div>
        <h4>New Features Include:</h4>
        <ul>
          <li>Enhanced data visualization tools</li>
          <li>Improved export capabilities</li>
          <li>Real-time collaboration features</li>
          <li>Advanced filtering options</li>
        </ul>
      </div>
    </Callout>
  );
}
```

### Auto-Dismiss Callout

```tsx
import React from 'react';
import { Callout } from '@czi-sds/components';

function AutoDismissExample() {
  return (
    <Callout
      intent="positive"
      sdsStyle="dismissible"
      title="File Uploaded"
      body="Your data file has been processed and added to the project."
      autoDismiss={5000} // Dismiss after 5 seconds
    />
  );
}
```

### With Custom Icon

```tsx
import React from 'react';
import { Callout } from '@czi-sds/components';

function CustomIconExample() {
  return (
    <Callout
      intent="info"
      title="Beta Feature Available"
      body="Try out our new experimental analysis tools in your workspace."
      icon="Flask"
      sdsIconProps={{ sdsSize: "l" }}
    />
  );
}
```

### Complex Content Structure

```tsx
import React from 'react';
import { Callout, Button } from '@czi-sds/components';

function ComplexContentExample() {
  return (
    <Callout
      intent="negative"
      sdsStyle="persistent"
      title="Action Required"
      body={
        <div>
          <p>Your subscription expires in 3 days. Renew now to avoid service interruption.</p>
          <div style={{ marginTop: '12px' }}>
            <Button sdsStyle="square" sdsType="primary" size="small">
              Renew Subscription
            </Button>
            <Button sdsStyle="square" sdsType="secondary" size="small" style={{ marginLeft: '8px' }}>
              Learn More
            </Button>
          </div>
        </div>
      }
    />
  );
}
```

### With Theme Integration

```tsx
import React from 'react';
import { Callout, getColors, getSpaces } from '@czi-sds/components';
import styled from '@emotion/styled';

const CalloutWrapper = styled.div`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    return `
      margin: ${spaces?.l}px 0;
      padding: ${spaces?.m}px;
      background: ${colors?.gray[50]};
      border-radius: 8px;
    `;
  }}
`;

function ThemedExample() {
  return (
    <CalloutWrapper>
      <Callout
        intent="info"
        title="Themed Callout"
        body="This callout is wrapped in a themed container with custom styling."
      />
    </CalloutWrapper>
  );
}
```

## Variations

### Style Variations

- **persistent**: Default style that remains visible until programmatically dismissed
- **dismissible**: Includes close button for user-initiated dismissal
- **expandable**: Collapsible content with expand/collapse toggle button

### Intent Variations

- **info**: General informational messages (blue theme with InfoCircle icon)
- **positive**: Success messages and confirmations (green theme with CheckCircle icon)
- **negative**: Error messages requiring attention (red theme with ExclamationMarkCircle icon)
- **notice**: Warning messages and important notices (orange theme with ExclamationMarkCircle icon)

### Content Structure

- **Title Only**: Use `title` prop for simple headlines
- **Body Only**: Use `body` prop for main content without title
- **Title + Body**: Combined for structured messaging
- **Expandable Content**: Use `children` for additional collapsible content

## Component States

- **Open**: Callout is visible with full content
- **Closed/Dismissed**: Callout is hidden from view
- **Expanded**: Expandable style showing all content including children
- **Collapsed**: Expandable style showing only title and body
- **Auto-Dismissing**: Callout will automatically hide after specified timeout

## Best Practices

### When to Use

- Contextual information within specific content areas
- Form validation messages and field-level feedback
- Feature announcements or help content
- Status updates that don't require full-page attention
- Progressive disclosure of detailed information (expandable)

### When Not to Use

- System-wide announcements (use Banner instead)
- Temporary toast notifications (use Notification instead)
- Critical errors requiring immediate attention (consider Banner)
- Simple tooltips on hover (use Tooltip instead)

### Content Guidelines

- **Title**: Keep concise, use sentence case
- **Body**: Provide clear, actionable information
- **Expandable Content**: Use for supplementary details that don't overwhelm
- **Auto-dismiss**: Use sparingly and only for non-critical information

### Accessibility Guidelines

- Component includes proper ARIA attributes for screen readers
- Expandable callouts announce state changes to assistive technology
- Color is not the only indicator of intent (icons provide additional context)
- Close buttons include descriptive `aria-label` attributes
- Focus management for interactive elements

### Design Guidelines

- Use consistent spacing with theme tokens
- Maintain visual hierarchy between title, body, and expandable content
- Consider placement within content flow
- Limit concurrent callouts to avoid overwhelming users
- Use appropriate intent levels based on message severity

## Related Components

- **[Banner](banner.md)** - For system-wide or full-width messaging
- **[Notification](notification.md)** - For temporary toast-style alerts
- **[CalloutTitle](callout-title.md)** - Individual title component
- **[Alert](alert.md)** - Legacy component replaced by Callout

## Migration Notes

### From Alert Component

```tsx
// ❌ Old Alert usage
<Alert severity="info" onClose={handleClose}>
  Important information
</Alert>

// ✅ New Callout usage
<Callout
  intent="info"
  sdsStyle="dismissible"
  body="Important information"
  onClose={handleClose}
/>
```

## API Reference

- [Storybook Stories](link-to-storybook) - Interactive examples and component playground
- [Material UI Alert Documentation](https://mui.com/material-ui/react-alert/) - Underlying MUI component
- [Icon Component](icon.md) - For customizing callout icons
- [Design Tokens](link-to-tokens) - Available theme colors, spacing, and typography