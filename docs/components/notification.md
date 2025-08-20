# Notification

## Overview

Notification is a toast-style feedback component designed for temporary messages that slide in from the edge of the screen. Built on Material UI's Alert foundation with enhanced slide animations, it provides an effective way to communicate status updates, confirmations, and alerts without disrupting the user's workflow.

Notifications are ideal for showing quick feedback messages that automatically dismiss or can be manually closed. They appear with smooth slide animations and elevated styling to draw appropriate attention while remaining unobtrusive to the primary interface.

## Installation & Import

```tsx
import { Notification } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| intent | `"info" \| "negative" \| "positive" \| "notice"` | ✓ | - | The intent/severity level of the notification |
| slideDirection | `"left" \| "right"` | ✓ | `"left"` | Direction from which the notification slides in |
| children | `ReactNode` | - | - | The notification message content |
| autoDismiss | `boolean \| number` | - | - | Auto-dismiss after timeout. `true` uses 8000ms, number sets custom timeout |
| dismissed | `boolean` | - | - | Controls visibility (controlled component) |
| onClose | `(event: SyntheticEvent) => void` | - | - | Callback fired when notification is closed |
| icon | `keyof IconNameToSizes \| ReactElement` | - | - | Custom icon override. Uses default based on intent if not provided |
| sdsIconProps | `Partial<IconProps>` | - | - | Props to customize the icon |
| buttonText | `string` | - | - | Text for optional action button |
| buttonOnClick | `(event: SyntheticEvent) => void` | - | - | Callback for action button clicks |
| buttonPosition | `"left" \| "right"` | - | - | Position of the action button within notification |
| className | `string` | - | - | Additional CSS class names |
| style | `CSSProperties` | - | - | Inline styles |

## Usage Examples

### Basic Usage

```tsx
import React, { useState } from 'react';
import { Notification, Button } from '@czi-sds/components';

function MyComponent() {
  const [showNotification, setShowNotification] = useState(false);

  return (
    <>
      <Button onClick={() => setShowNotification(true)}>
        Show Success Message
      </Button>
      
      <Notification
        intent="positive"
        slideDirection="right"
        dismissed={!showNotification}
        onClose={() => setShowNotification(false)}
      >
        Your data has been saved successfully!
      </Notification>
    </>
  );
}
```

### Auto-Dismiss Notification

```tsx
import React, { useState } from 'react';
import { Notification, Button } from '@czi-sds/components';

function AutoDismissExample() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message: string, intent: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, intent }]);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div>
      <Button onClick={() => addNotification('File uploaded!', 'positive')}>
        Upload File
      </Button>
      <Button onClick={() => addNotification('Processing data...', 'info')}>
        Process Data
      </Button>
      
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          intent={notification.intent}
          slideDirection="left"
          autoDismiss={4000}
          onClose={() => removeNotification(notification.id)}
        >
          {notification.message}
        </Notification>
      ))}
    </div>
  );
}
```

### With Action Button

```tsx
import React, { useState } from 'react';
import { Notification, Button } from '@czi-sds/components';

function ActionButtonExample() {
  const [showNotification, setShowNotification] = useState(false);

  const handleAction = () => {
    console.log('Action button clicked');
    // Perform some action
    setShowNotification(false);
  };

  return (
    <>
      <Button onClick={() => setShowNotification(true)}>
        Show Notification with Action
      </Button>
      
      <Notification
        intent="info"
        slideDirection="right"
        dismissed={!showNotification}
        onClose={() => setShowNotification(false)}
        buttonText="View Details"
        buttonOnClick={handleAction}
        buttonPosition="right"
      >
        New analysis results are available.
      </Notification>
    </>
  );
}
```

### Notification Queue System

```tsx
import React, { useState, useCallback } from 'react';
import { Notification, Button } from '@czi-sds/components';

interface NotificationItem {
  id: number;
  message: string;
  intent: 'info' | 'positive' | 'negative' | 'notice';
  duration?: number;
}

function NotificationQueue() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const addNotification = useCallback((notification: Omit<NotificationItem, 'id'>) => {
    const id = Date.now() + Math.random();
    setNotifications(prev => [...prev, { ...notification, id }]);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Button onClick={() => addNotification({ message: 'Success!', intent: 'positive', duration: 3000 })}>
          Success
        </Button>
        <Button onClick={() => addNotification({ message: 'Warning!', intent: 'notice', duration: 5000 })}>
          Warning
        </Button>
        <Button onClick={() => addNotification({ message: 'Error occurred!', intent: 'negative' })}>
          Error
        </Button>
      </div>
      
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
        {notifications.map((notification, index) => (
          <div key={notification.id} style={{ marginBottom: '10px' }}>
            <Notification
              intent={notification.intent}
              slideDirection="left"
              autoDismiss={notification.duration}
              onClose={() => removeNotification(notification.id)}
            >
              {notification.message}
            </Notification>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Custom Icon Notification

```tsx
import React, { useState } from 'react';
import { Notification, Button } from '@czi-sds/components';

function CustomIconExample() {
  const [showNotification, setShowNotification] = useState(false);

  return (
    <>
      <Button onClick={() => setShowNotification(true)}>
        Show Custom Icon Notification
      </Button>
      
      <Notification
        intent="info"
        slideDirection="right"
        dismissed={!showNotification}
        onClose={() => setShowNotification(false)}
        icon="Flask"
        sdsIconProps={{ sdsSize: "l" }}
      >
        Experiment analysis completed! Check your results in the lab dashboard.
      </Notification>
    </>
  );
}
```

### With Theme Integration

```tsx
import React, { useState } from 'react';
import { Notification, Button, getColors } from '@czi-sds/components';
import styled from '@emotion/styled';

const NotificationContainer = styled.div`
  ${(props) => {
    const colors = getColors(props);
    return `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1300;
      max-width: 400px;
      
      .notification-wrapper {
        margin-bottom: 12px;
        box-shadow: ${colors?.shadows?.l};
        border-radius: 8px;
        overflow: hidden;
      }
    `;
  }}
`;

function ThemedNotificationExample() {
  const [notifications, setNotifications] = useState([]);

  const showNotification = (message: string, intent: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, intent }]);
  };

  return (
    <div>
      <Button onClick={() => showNotification('Themed success!', 'positive')}>
        Show Themed Notification
      </Button>
      
      <NotificationContainer>
        {notifications.map(notification => (
          <div key={notification.id} className="notification-wrapper">
            <Notification
              intent={notification.intent}
              slideDirection="left"
              autoDismiss={5000}
              onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
            >
              {notification.message}
            </Notification>
          </div>
        ))}
      </NotificationContainer>
    </div>
  );
}
```

## Variations

### Intent Variations

- **info**: General informational messages (blue theme with InfoCircle icon)
- **positive**: Success messages and confirmations (green theme with CheckCircle icon)
- **negative**: Error messages requiring attention (red theme with ExclamationMarkCircle icon)
- **notice**: Warning messages and important notices (orange theme with ExclamationMarkCircle icon)

### Slide Direction

- **left**: Notification slides in from the left edge of the screen
- **right**: Notification slides in from the right edge of the screen

### Button Positioning

- **left**: Action button positioned on the left side of the notification
- **right**: Action button positioned on the right side of the notification

## Component States

- **Hidden**: Notification is not visible (dismissed state)
- **Sliding In**: Notification is animating into view
- **Visible**: Notification is fully displayed and interactive
- **Sliding Out**: Notification is animating out of view
- **Auto-Dismissing**: Countdown timer is active for automatic dismissal

## Best Practices

### When to Use

- Success confirmations for completed actions
- Brief status updates that don't require persistent visibility
- Non-critical error messages that don't block workflow
- System notifications and alerts
- Quick feedback for user interactions

### When Not to Use

- Critical errors that require immediate attention (use Banner or Modal)
- Complex messages requiring user study (use Callout)
- Persistent information that should remain visible (use Banner)
- Form validation messages (use field-level validation)

### Content Guidelines

- Keep messages concise and actionable
- Use clear, user-friendly language
- Include specific information when possible
- Avoid technical jargon in user-facing messages
- Consider localization for international users

### Positioning and Timing

- Position notifications in consistent screen locations
- Avoid overlapping multiple notifications
- Use appropriate auto-dismiss timers (3-8 seconds typically)
- Allow user control over dismissal
- Consider screen size and mobile responsiveness

### Accessibility Guidelines

- Notifications announce their content to screen readers
- Include proper ARIA attributes for dynamic content
- Ensure sufficient color contrast for all intent levels
- Support keyboard navigation for interactive elements
- Provide alternative ways to access critical information

### Design Guidelines

- Use consistent slide animations and timing
- Maintain visual hierarchy with proper elevation
- Consider notification stacking and overflow handling
- Ensure notifications don't interfere with primary interface
- Test on various screen sizes and orientations

## Related Components

- **[Banner](banner.md)** - For persistent, full-width messaging
- **[Callout](callout.md)** - For contextual information within content
- **[Alert](alert.md)** - Legacy component replaced by Notification for toasts

## API Reference

- [Storybook Stories](link-to-storybook) - Interactive examples and component playground
- [Material UI Alert Documentation](https://mui.com/material-ui/react-alert/) - Underlying MUI component
- [Material UI Slide Documentation](https://mui.com/material-ui/api/slide/) - Animation component
- [Design Tokens](link-to-tokens) - Available colors, spacing, and timing tokens