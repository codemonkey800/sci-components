# Alert

## Overview

**⚠️ DEPRECATED: This component is deprecated and will be removed in the next major version. Please use `Callout` or `Notification` instead.**

Alert is a legacy feedback component that displays important messages to users with different severity levels. Built on Material UI's Alert component, it was previously used to communicate success, informational, warning, or error messages. 

The Alert component has been superseded by more specialized components:
- **Callout** - For static messaging and contextual information
- **Notification** - For toast notifications and temporary alerts

## Installation & Import

```tsx
import { Alert } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `ReactNode` | - | - | The content of the component |
| color | `"success" \| "info" \| "warning" \| "error"` | - | - | The color/severity of the alert |
| icon | `ReactNode` | - | - | Override the default severity icon. Set to `false` to remove icon |
| onClose | `(event: SyntheticEvent) => void` | - | - | Callback fired when close button is clicked |
| variant | `"standard" \| "filled" \| "outlined"` | - | `"standard"` | The visual style variant |
| className | `string` | - | - | Additional CSS class names |
| style | `CSSProperties` | - | - | Inline styles |

## Migration Guide

### Migrating to Callout

For persistent messaging and contextual information:

```tsx
// ❌ Old Alert usage
<Alert severity="info" onClose={handleClose}>
  Important information about your data
</Alert>

// ✅ New Callout usage
<Callout
  intent="info"
  dismissible
  onClose={handleClose}
  sdsStyle="persistent"
>
  Important information about your data
</Callout>
```

### Migrating to Notification

For toast notifications and temporary alerts:

```tsx
// ❌ Old Alert in Snackbar
<Snackbar open={open} onClose={handleClose}>
  <Alert severity="success">
    Data saved successfully!
  </Alert>
</Snackbar>

// ✅ New Notification usage
<Notification
  intent="positive"
  sdsStyle="toast"
  onClose={handleClose}
  isOpen={open}
>
  Data saved successfully!
</Notification>
```

## Usage Examples

### Basic Usage (Deprecated)

```tsx
import React from 'react';
import { Alert } from '@czi-sds/components';

function MyComponent() {
  return (
    <Alert severity="info">
      This is an informational alert
    </Alert>
  );
}
```

### With Close Handler (Deprecated)

```tsx
import React from 'react';
import { Alert } from '@czi-sds/components';

function DismissibleAlert() {
  const handleClose = () => {
    console.log('Alert dismissed');
  };

  return (
    <Alert severity="warning" onClose={handleClose}>
      This alert can be dismissed
    </Alert>
  );
}
```

## Variations

### Severity Levels

- **info**: Informational messages (default)
- **success**: Success confirmation messages
- **warning**: Warning messages requiring attention
- **error**: Error messages requiring immediate action

### Visual Variants

- **standard**: Default appearance with subtle background
- **filled**: Solid background with high contrast
- **outlined**: Border-only style with transparent background

## Best Practices

### Migration Recommendations

- **Replace with Callout** when you need:
  - Persistent messaging within content
  - Contextual help or instructions
  - Status updates that remain visible
  - Informational content with rich formatting

- **Replace with Notification** when you need:
  - Toast notifications
  - Temporary status messages
  - Action confirmations
  - System alerts that auto-dismiss

### Accessibility Guidelines

- Component includes proper ARIA attributes
- Color is not the only indicator of severity (icons are included)
- Focus management for dismissible alerts
- Screen reader accessible content

## Related Components

- **[Callout](callout.md)** - Modern replacement for persistent messaging
- **[Notification](notification.md)** - Modern replacement for toast alerts
- **[Banner](banner.md)** - Full-width messaging across page sections

## Migration Timeline

- **Current**: Alert is deprecated but functional
- **Next Major Version**: Alert will be removed
- **Action Required**: Update all Alert usage to Callout or Notification

## API Reference

- [Material UI Alert Documentation](https://mui.com/material-ui/react-alert/) - Underlying MUI component
- [Callout Documentation](callout.md) - Recommended replacement for persistent messages
- [Notification Documentation](notification.md) - Recommended replacement for toast alerts