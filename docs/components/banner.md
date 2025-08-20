# Banner

## Overview

Banner is a full-width feedback component designed to communicate important information across entire page sections or applications. It displays prominently at the top of content areas with contextual icons, optional dismissible functionality, and various intent levels to convey different types of messages.

Banners are ideal for system-wide announcements, important notifications, or status messages that need to be visible across an entire interface. Unlike alerts or notifications, banners are designed to persist until explicitly dismissed by the user.

## Installation & Import

```tsx
import { Banner } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `ReactNode` | ✓ | - | The content of the banner |
| sdsType | `"primary" \| "secondary"` | ✓ | - | The type/variant of the banner styling |
| intent | `"info" \| "negative" \| "notice" \| "positive"` | - | `"info"` | The intent/severity level of the banner |
| icon | `keyof IconNameToSizes \| ReactElement` | - | - | Custom icon to display. If not provided, uses default based on intent |
| sdsIconProps | `Partial<IconProps>` | - | - | Props to customize the default or custom SDS icon |
| dismissed | `boolean` | - | - | Controls whether banner is dismissed (controlled component) |
| dismissible | `boolean` | - | `true` | Whether the banner can be dismissed by the user |
| onClose | `(e: MouseEvent) => void` | - | - | Callback fired when banner is dismissed |

## Usage Examples

### Basic Usage

```tsx
import React from 'react';
import { Banner } from '@czi-sds/components';

function MyComponent() {
  return (
    <Banner sdsType="primary" intent="info">
      Welcome to the new Science Data Portal! Explore enhanced features and improved performance.
    </Banner>
  );
}
```

### With Custom Close Handler

```tsx
import React, { useState } from 'react';
import { Banner } from '@czi-sds/components';

function DismissibleBanner() {
  const [isDismissed, setIsDismissed] = useState(false);

  const handleClose = () => {
    setIsDismissed(true);
    // Additional cleanup or analytics
  };

  if (isDismissed) return null;

  return (
    <Banner
      sdsType="primary"
      intent="notice"
      onClose={handleClose}
      dismissible
    >
      System maintenance scheduled for tonight from 2-4 AM EST.
    </Banner>
  );
}
```

### Controlled Banner State

```tsx
import React, { useState } from 'react';
import { Banner, Button } from '@czi-sds/components';

function ControlledBanner() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <>
      <Button 
        sdsStyle="square" 
        sdsType="secondary" 
        onClick={() => setShowBanner(!showBanner)}
      >
        {showBanner ? 'Hide' : 'Show'} Banner
      </Button>
      
      <Banner
        sdsType="primary"
        intent="positive"
        dismissed={!showBanner}
        onClose={() => setShowBanner(false)}
      >
        Data processing completed successfully! View your results in the dashboard.
      </Banner>
    </>
  );
}
```

### With Custom Icon

```tsx
import React from 'react';
import { Banner } from '@czi-sds/components';

function CustomIconBanner() {
  return (
    <Banner
      sdsType="secondary"
      intent="info"
      icon="DataAnalysis"
      sdsIconProps={{ sdsSize: "l" }}
    >
      New analysis tools are now available in your workspace.
    </Banner>
  );
}
```

### With Theme Integration

```tsx
import React from 'react';
import { Banner, getColors } from '@czi-sds/components';
import styled from '@emotion/styled';

const BannerWrapper = styled.div`
  ${(props) => {
    const colors = getColors(props);
    return `
      margin: 16px 0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: ${colors?.shadows?.l};
    `;
  }}
`;

function ThemedBanner() {
  return (
    <BannerWrapper>
      <Banner sdsType="primary" intent="positive">
        Your experiment results are ready for review!
      </Banner>
    </BannerWrapper>
  );
}
```

## Variations

### Type Variations

- **primary**: High-contrast styling for maximum visibility and importance
- **secondary**: Softer styling for less critical but still important messages

### Intent Variations

- **info**: General informational messages (blue theme)
- **positive**: Success messages and confirmations (green theme)  
- **negative**: Error messages requiring attention (red theme)
- **notice**: Warning messages and important notices (orange theme)

### Icon Behavior

- **Default Icons**: Automatically selected based on intent:
  - `info`: InfoCircle icon
  - `positive`: CheckCircle icon  
  - `negative`/`notice`: ExclamationMarkCircle icon
- **Custom Icons**: Override with any SDS icon name or custom ReactElement
- **No Icon**: Not recommended as icons help with accessibility and visual hierarchy

## Component States

- **Visible**: Banner is displayed with full content and interactions
- **Dismissed**: Banner is hidden from view (returns `null`)
- **Dismissible**: User can close the banner via close button
- **Non-dismissible**: Banner persists until programmatically dismissed

## Best Practices

### When to Use

- System-wide announcements or updates
- Important status messages affecting entire applications
- Maintenance notifications or service disruptions  
- Feature announcements or onboarding messages
- Critical warnings that need persistent visibility

### When Not to Use

- Individual form field validation (use field-level feedback)
- Temporary toast-style notifications (use Notification component)
- Contextual help within specific content areas (use Callout component)
- Page-level navigation or breadcrumbs

### Accessibility Guidelines

- Banner includes `role="banner"` for screen readers
- Close button includes proper `aria-label="Close"`
- Color is not the only indicator of intent (icons provide additional context)
- Supports keyboard navigation for dismissible banners
- Content should be concise but descriptive

### Design Guidelines

- Keep banner content concise - users need to process the information quickly
- Use appropriate intent levels - reserve "negative" for truly urgent issues
- Consider banner placement - typically at top of page or content sections
- Limit concurrent banners - multiple banners can overwhelm users
- Provide clear calls-to-action when appropriate

## Related Components

- **[Callout](callout.md)** - For contextual messaging within content areas
- **[Notification](notification.md)** - For temporary toast-style alerts
- **[Alert](alert.md)** - Legacy component, use Banner for full-width messages

## API Reference

- [Storybook Stories](link-to-storybook) - Interactive examples and component playground
- [Icon Component](icon.md) - For customizing banner icons
- [Design Tokens](link-to-tokens) - Available colors, spacing, and typography tokens