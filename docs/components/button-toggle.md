# ButtonToggle

## Overview

The ButtonToggle component is a specialized toggle button that can switch between "on" and "off" states. It's designed for icon-only toggle actions where users need to activate or deactivate features, settings, or modes in scientific applications. The component provides clear visual feedback for the current state and supports different styles and sizes.

**Status:** Beta - This component is in active development and may undergo changes.

## Installation & Import

```tsx
import { ButtonToggle } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| icon | `keyof IconNameToSizes \| ReactElement` | ✓ | - | The icon to display (icon name or custom SVG element) |
| disabled | `boolean` | - | `false` | If `true`, the component is disabled |
| onClick | `MouseEventHandler<HTMLButtonElement>` | - | - | Click event handler |
| className | `string` | - | - | Standard React className prop |
| style | `CSSProperties` | - | - | Standard React style prop |
| id | `string` | - | - | Standard React id prop |
| children | `ReactNode` | - | - | Content to display (typically not used for toggle buttons) |

### SDS-Specific Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| sdsStage | `"on" \| "off"` | - | `"off"` | The current toggle state of the button |
| sdsType | `"primary" \| "secondary"` | - | `"primary"` | Type/variant of the button |
| sdsSize | `"small" \| "medium" \| "large"` | - | `"medium"` | Size of the button |

## Usage Examples

### Basic Usage

```tsx
import React, { useState } from 'react';
import { ButtonToggle } from '@czi-sds/components';

function MyComponent() {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <ButtonToggle
      icon="Visibility"
      sdsStage={isVisible ? "on" : "off"}
      sdsType="primary"
      sdsSize="medium"
      onClick={handleToggle}
      aria-label={isVisible ? "Hide content" : "Show content"}
      aria-pressed={isVisible}
    />
  );
}
```

### Advanced Usage with Multiple Toggles

```tsx
import React, { useState } from 'react';
import { ButtonToggle } from '@czi-sds/components';

interface ToggleStates {
  notifications: boolean;
  darkMode: boolean;
  autoSave: boolean;
}

function AdvancedExample() {
  const [toggles, setToggles] = useState<ToggleStates>({
    notifications: false,
    darkMode: false,
    autoSave: true,
  });

  const handleToggle = (key: keyof ToggleStates) => {
    setToggles(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <ButtonToggle
        icon="Notifications"
        sdsStage={toggles.notifications ? "on" : "off"}
        sdsType="primary"
        sdsSize="large"
        onClick={() => handleToggle('notifications')}
        aria-label="Toggle notifications"
        aria-pressed={toggles.notifications}
      />
      
      <ButtonToggle
        icon="DarkMode"
        sdsStage={toggles.darkMode ? "on" : "off"}
        sdsType="secondary"
        sdsSize="large"
        onClick={() => handleToggle('darkMode')}
        aria-label="Toggle dark mode"
        aria-pressed={toggles.darkMode}
      />
      
      <ButtonToggle
        icon="Save"
        sdsStage={toggles.autoSave ? "on" : "off"}
        sdsType="primary"
        sdsSize="large"
        disabled={false}
        onClick={() => handleToggle('autoSave')}
        aria-label="Toggle auto-save"
        aria-pressed={toggles.autoSave}
      />
    </div>
  );
}
```

### With Theme Integration

```tsx
import React, { useState } from 'react';
import { ButtonToggle, getColors, getSpaces } from '@czi-sds/components';
import styled from '@emotion/styled';

const StyledToggleContainer = styled.div`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    return `
      background-color: ${colors?.gray[50]};
      padding: ${spaces?.m}px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: ${spaces?.s}px;
      border: 1px solid ${colors?.gray[200]};
    `;
  }}
`;

const ToggleLabel = styled.span`
  ${(props) => {
    const colors = getColors(props);
    return `
      color: ${colors?.gray[600]};
      font-size: 14px;
      font-weight: 500;
    `;
  }}
`;

function ThemedExample() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <StyledToggleContainer>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <ButtonToggle
          icon="Mail"
          sdsStage={settings.emailNotifications ? "on" : "off"}
          sdsType="primary"
          sdsSize="medium"
          onClick={() => handleToggle('emailNotifications')}
          aria-label="Toggle email notifications"
          aria-pressed={settings.emailNotifications}
        />
        <ToggleLabel>Email Notifications</ToggleLabel>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <ButtonToggle
          icon="PhoneAndroid"
          sdsStage={settings.pushNotifications ? "on" : "off"}
          sdsType="secondary"
          sdsSize="medium"
          onClick={() => handleToggle('pushNotifications')}
          aria-label="Toggle push notifications"
          aria-pressed={settings.pushNotifications}
        />
        <ToggleLabel>Push Notifications</ToggleLabel>
      </div>
    </StyledToggleContainer>
  );
}
```

## Variations

### Stage Variations

- **off**: Default inactive state with subtle styling
- **on**: Active state with emphasized styling to indicate selection

### Type Variations

- **primary**: High emphasis toggle with primary color scheme
- **secondary**: Medium emphasis toggle with secondary styling

### Size Variations

- **small**: Compact size for dense interfaces
- **medium**: Standard size for most use cases
- **large**: Larger size for emphasis or touch interfaces

## Component States

- **Off**: Inactive state with default icon and styling
- **On**: Active state with emphasized styling and visual feedback
- **Disabled**: Non-interactive state with reduced opacity
- **Focus**: Keyboard focus state with visible focus ring
- **Hover**: Mouse hover state with subtle visual feedback

## Best Practices

### When to Use

- Use for binary settings that can be turned on or off (e.g., notifications, dark mode, auto-save)
- Ideal for toolbar toggles and feature activation controls
- Perfect for preferences and configuration interfaces
- Use when immediate visual feedback of state is important

### When Not to Use

- Don't use for actions that aren't reversible or stateful
- Avoid for primary actions that need text labels for clarity
- Don't use for navigation - consider Tabs or NavigationHeader instead
- Avoid when multiple options exist - use SegmentedControl instead

### Accessibility Guidelines

- **Always include `aria-label`** that describes the toggle action
- **Use `aria-pressed`** to indicate the current toggle state
- Supports keyboard navigation with Enter and Space keys
- Maintains proper focus management and visual focus indicators
- Ensure sufficient color contrast between on/off states
- Provide clear visual distinction between active and inactive states

### State Management Guidelines

- Always use controlled components with explicit state management
- Update `sdsStage` prop based on your component's state
- Handle the `onClick` event to toggle the state
- Consider using `useCallback` for event handlers in complex components
- Maintain consistent state across component re-renders

## Related Components

- **Button** - Use for non-toggle actions
- **SegmentedControl** - Use for multiple mutually exclusive options
- **InputCheckbox** - Use for form-based toggle options with labels
- **ButtonIcon** - Alternative for non-toggle icon actions

## Migration Notes

- **Beta Component**: This component is in beta and may undergo API changes
- **Icon Requirement**: The `icon` prop is required and must be provided
- **State Management**: Unlike form inputs, this component requires manual state management

## API Reference

- [Storybook Stories](https://main--61e7b0c7c7b2df00213dc295.chromatic.com/?path=/story/components-buttons-buttontoggle) - Interactive examples and testing
- [Material UI Button](https://mui.com/material-ui/react-button/) - Underlying MUI component documentation
- [Design Tokens](https://zeroheight.com/2e0e8f7fc/p/6138ce-design-tokens) - Available theme tokens and values