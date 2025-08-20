# InputToggle

## Overview

The InputToggle component provides an interactive toggle switch for binary on/off states and settings. Built on Material UI's Switch component, it offers immediate feedback for state changes and can be customized with labels, colors, and sizing. Unlike checkboxes, toggle switches are ideal for settings that take immediate effect and clearly represent an active/inactive state.

Key features include customizable on/off labels, various color schemes, size options, disabled states, and full accessibility support for keyboard and screen reader users.

## Installation & Import

```tsx
import { InputToggle } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| onChange | `function` | - | - | Callback fired when the toggle state changes |
| onLabel | `string` | - | - | Label text displayed when toggle is in the "on" state |
| offLabel | `string` | - | - | Label text displayed when toggle is in the "off" state |
| checked | `boolean` | - | `false` | If true, the toggle is checked/on |
| disabled | `boolean` | - | `false` | If true, the toggle is disabled |
| size | `"small" \| "medium"` | - | `"medium"` | Size of the toggle switch |
| color | `"primary" \| "secondary" \| "error" \| "info" \| "success" \| "warning" \| "default"` | - | `"primary"` | Color scheme of the toggle |
| width | `number` | - | - | Fixed width for the toggle component |
| icon | `ReactNode` | - | - | Custom icon displayed when toggle is unchecked |
| value | `unknown` | - | - | Value of the component for form submission |
| name | `string` | - | - | Name attribute of the input element |
| id | `string` | - | - | ID attribute of the input element |
| onClick | `function` | - | - | Click event handler |
| className | `string` | - | - | CSS class name for custom styling |
| style | `CSSProperties` | - | - | Inline styles object |

## Usage Examples

### Basic Toggle Switch

```tsx
import React, { useState } from 'react';
import { InputToggle } from '@czi-sds/components';

function BasicToggle() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  const handleNotificationToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsNotificationsEnabled(event.target.checked);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3>Notification Settings</h3>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <InputToggle
          checked={isNotificationsEnabled}
          onChange={handleNotificationToggle}
        />
        <label>Email notifications</label>
      </div>

      <p style={{ fontSize: '14px', color: '#666' }}>
        Status: {isNotificationsEnabled ? 'Notifications are enabled' : 'Notifications are disabled'}
      </p>
    </div>
  );
}
```

### Toggle with Custom Labels

```tsx
import React, { useState } from 'react';
import { InputToggle } from '@czi-sds/components';

function LabeledToggle() {
  const [isExperimentActive, setIsExperimentActive] = useState(false);
  const [isDataPublic, setIsDataPublic] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3>Experiment Configuration</h3>
      
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <InputToggle
            checked={isExperimentActive}
            onChange={(e) => setIsExperimentActive(e.target.checked)}
            onLabel="Active"
            offLabel="Inactive"
          />
          <label>Experiment Status</label>
        </div>
        <p style={{ fontSize: '12px', color: '#666' }}>
          The experiment is currently {isExperimentActive ? 'running' : 'stopped'}
        </p>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <InputToggle
            checked={isDataPublic}
            onChange={(e) => setIsDataPublic(e.target.checked)}
            onLabel="Public"
            offLabel="Private"
            color="success"
          />
          <label>Data Visibility</label>
        </div>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Data is {isDataPublic ? 'publicly accessible' : 'restricted access'}
        </p>
      </div>
    </div>
  );
}
```

### Color Variations

```tsx
import React, { useState } from 'react';
import { InputToggle } from '@czi-sds/components';

function ColorVariations() {
  const [toggleStates, setToggleStates] = useState({
    primary: false,
    secondary: false,
    success: true,
    warning: false,
    error: false,
    info: false
  });

  const handleToggleChange = (color: keyof typeof toggleStates) => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setToggleStates(prev => ({ ...prev, [color]: event.target.checked }));
    };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3>System Status</h3>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <InputToggle
          checked={toggleStates.primary}
          onChange={handleToggleChange('primary')}
          color="primary"
        />
        <label>Primary Service</label>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <InputToggle
          checked={toggleStates.secondary}
          onChange={handleToggleChange('secondary')}
          color="secondary"
        />
        <label>Secondary Service</label>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <InputToggle
          checked={toggleStates.success}
          onChange={handleToggleChange('success')}
          color="success"
        />
        <label>Health Check (Healthy)</label>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <InputToggle
          checked={toggleStates.warning}
          onChange={handleToggleChange('warning')}
          color="warning"
        />
        <label>Warning Alerts</label>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <InputToggle
          checked={toggleStates.error}
          onChange={handleToggleChange('error')}
          color="error"
        />
        <label>Error Notifications</label>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <InputToggle
          checked={toggleStates.info}
          onChange={handleToggleChange('info')}
          color="info"
        />
        <label>Info Messages</label>
      </div>
    </div>
  );
}
```

### Size Variations

```tsx
import React, { useState } from 'react';
import { InputToggle } from '@czi-sds/components';

function SizeVariations() {
  const [smallToggle, setSmallToggle] = useState(false);
  const [mediumToggle, setMediumToggle] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3>Toggle Sizes</h3>
      
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <InputToggle
            checked={smallToggle}
            onChange={(e) => setSmallToggle(e.target.checked)}
            size="small"
          />
          <label>Small Toggle</label>
        </div>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Compact size for dense interfaces or secondary settings
        </p>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <InputToggle
            checked={mediumToggle}
            onChange={(e) => setMediumToggle(e.target.checked)}
            size="medium"
          />
          <label>Medium Toggle (Default)</label>
        </div>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Standard size for most applications and primary settings
        </p>
      </div>
    </div>
  );
}
```

### Scientific Settings Dashboard

```tsx
import React, { useState } from 'react';
import { InputToggle } from '@czi-sds/components';

interface AnalysisSettings {
  qualityControl: boolean;
  normalizeData: boolean;
  includeMetadata: boolean;
  generatePlots: boolean;
  exportResults: boolean;
  sendNotifications: boolean;
}

function ScientificSettingsDashboard() {
  const [settings, setSettings] = useState<AnalysisSettings>({
    qualityControl: true,
    normalizeData: true,
    includeMetadata: false,
    generatePlots: true,
    exportResults: false,
    sendNotifications: true
  });

  const handleSettingChange = (setting: keyof AnalysisSettings) => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSettings(prev => ({ ...prev, [setting]: event.target.checked }));
    };

  const getActiveCount = () => {
    return Object.values(settings).filter(Boolean).length;
  };

  return (
    <div style={{ width: '500px', padding: '20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2>RNA-seq Analysis Pipeline</h2>
        <p style={{ color: '#666', marginTop: '8px' }}>
          Configure analysis parameters ({getActiveCount()}/6 options enabled)
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <InputToggle
              checked={settings.qualityControl}
              onChange={handleSettingChange('qualityControl')}
              onLabel="Enabled"
              offLabel="Disabled"
              color="success"
            />
            <label style={{ fontWeight: 'medium' }}>Quality Control</label>
          </div>
          <p style={{ fontSize: '14px', color: '#666', marginLeft: '44px' }}>
            Perform quality assessment and filtering of raw reads
          </p>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <InputToggle
              checked={settings.normalizeData}
              onChange={handleSettingChange('normalizeData')}
              onLabel="On"
              offLabel="Off"
              color="primary"
            />
            <label style={{ fontWeight: 'medium' }}>Data Normalization</label>
          </div>
          <p style={{ fontSize: '14px', color: '#666', marginLeft: '44px' }}>
            Apply normalization methods to expression counts
          </p>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <InputToggle
              checked={settings.includeMetadata}
              onChange={handleSettingChange('includeMetadata')}
              onLabel="Include"
              offLabel="Exclude"
              color="info"
            />
            <label style={{ fontWeight: 'medium' }}>Metadata Integration</label>
          </div>
          <p style={{ fontSize: '14px', color: '#666', marginLeft: '44px' }}>
            Include sample metadata in analysis outputs
          </p>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <InputToggle
              checked={settings.generatePlots}
              onChange={handleSettingChange('generatePlots')}
              onLabel="Generate"
              offLabel="Skip"
              color="warning"
            />
            <label style={{ fontWeight: 'medium' }}>Visualization Plots</label>
          </div>
          <p style={{ fontSize: '14px', color: '#666', marginLeft: '44px' }}>
            Create quality control and analysis plots
          </p>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <InputToggle
              checked={settings.exportResults}
              onChange={handleSettingChange('exportResults')}
              onLabel="Export"
              offLabel="Local"
              color="secondary"
            />
            <label style={{ fontWeight: 'medium' }}>Auto Export</label>
          </div>
          <p style={{ fontSize: '14px', color: '#666', marginLeft: '44px' }}>
            Automatically export results to external storage
          </p>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <InputToggle
              checked={settings.sendNotifications}
              onChange={handleSettingChange('sendNotifications')}
              onLabel="Notify"
              offLabel="Silent"
              color="info"
            />
            <label style={{ fontWeight: 'medium' }}>Completion Notifications</label>
          </div>
          <p style={{ fontSize: '14px', color: '#666', marginLeft: '44px' }}>
            Send email notifications when analysis completes
          </p>
        </div>
      </div>

      <div style={{ 
        marginTop: '24px',
        padding: '16px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <h4 style={{ margin: '0 0 8px 0' }}>Pipeline Summary</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
          <li>Quality Control: {settings.qualityControl ? 'Enabled' : 'Disabled'}</li>
          <li>Normalization: {settings.normalizeData ? 'Enabled' : 'Disabled'}</li>
          <li>Metadata: {settings.includeMetadata ? 'Included' : 'Excluded'}</li>
          <li>Plots: {settings.generatePlots ? 'Generate' : 'Skip'}</li>
          <li>Export: {settings.exportResults ? 'Automatic' : 'Manual'}</li>
          <li>Notifications: {settings.sendNotifications ? 'Enabled' : 'Disabled'}</li>
        </ul>
      </div>
    </div>
  );
}
```

### Disabled States

```tsx
import React, { useState } from 'react';
import { InputToggle, Button } from '@czi-sds/components';

function DisabledToggles() {
  const [isSettingsLocked, setIsSettingsLocked] = useState(true);
  const [settings, setSettings] = useState({
    feature1: false,
    feature2: true,
    feature3: false
  });

  const handleSettingChange = (setting: keyof typeof settings) => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isSettingsLocked) {
        setSettings(prev => ({ ...prev, [setting]: event.target.checked }));
      }
    };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Button 
          onClick={() => setIsSettingsLocked(!isSettingsLocked)}
          sdsStyle="rounded"
          sdsType={isSettingsLocked ? "secondary" : "primary"}
        >
          {isSettingsLocked ? "Unlock Settings" : "Lock Settings"}
        </Button>
        <span style={{ fontSize: '14px', color: '#666' }}>
          {isSettingsLocked ? "Settings are locked" : "Settings are editable"}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3>System Features</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <InputToggle
            checked={settings.feature1}
            onChange={handleSettingChange('feature1')}
            disabled={isSettingsLocked}
          />
          <label style={{ color: isSettingsLocked ? '#999' : 'inherit' }}>
            Advanced Analytics
          </label>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <InputToggle
            checked={settings.feature2}
            onChange={handleSettingChange('feature2')}
            disabled={isSettingsLocked}
            color="success"
          />
          <label style={{ color: isSettingsLocked ? '#999' : 'inherit' }}>
            Real-time Monitoring
          </label>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <InputToggle
            checked={settings.feature3}
            onChange={handleSettingChange('feature3')}
            disabled={isSettingsLocked}
            color="warning"
          />
          <label style={{ color: isSettingsLocked ? '#999' : 'inherit' }}>
            Debug Mode
          </label>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <InputToggle
            checked={false}
            onChange={() => {}}
            disabled={true}
            color="error"
          />
          <label style={{ color: '#999' }}>
            Maintenance Mode (Always disabled)
          </label>
        </div>
      </div>
    </div>
  );
}
```

### Fixed Width Toggle

```tsx
import React, { useState } from 'react';
import { InputToggle } from '@czi-sds/components';

function FixedWidthToggle() {
  const [compactMode, setCompactMode] = useState(false);
  const [wideMode, setWideMode] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3>Width Customization</h3>
      
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <InputToggle
            checked={compactMode}
            onChange={(e) => setCompactMode(e.target.checked)}
            width={60}
            onLabel="On"
            offLabel="Off"
          />
          <label>Compact Toggle (60px width)</label>
        </div>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Reduced width for space-constrained layouts
        </p>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <InputToggle
            checked={wideMode}
            onChange={(e) => setWideMode(e.target.checked)}
            width={100}
            onLabel="Enabled"
            offLabel="Disabled"
            color="primary"
          />
          <label>Wide Toggle (100px width)</label>
        </div>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Extended width accommodates longer labels
        </p>
      </div>
    </div>
  );
}
```

### With Theme Integration

```tsx
import React, { useState } from 'react';
import { InputToggle, getColors, getSpaces } from '@czi-sds/components';
import styled from '@emotion/styled';

const SettingsPanel = styled.div`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    
    return `
      background-color: ${colors?.gray[100]};
      padding: ${spaces?.l}px;
      border-radius: 12px;
      border: 1px solid ${colors?.gray[300]};
      margin-bottom: ${spaces?.l}px;
    `;
  }}
`;

const SettingItem = styled.div`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    
    return `
      display: flex;
      align-items: center;
      gap: ${spaces?.m}px;
      padding: ${spaces?.m}px 0;
      border-bottom: 1px solid ${colors?.gray[200]};
      
      &:last-child {
        border-bottom: none;
      }
    `;
  }}
`;

function ThemedToggles() {
  const [appSettings, setAppSettings] = useState({
    darkMode: false,
    autoSave: true,
    notifications: true,
    analytics: false,
    betaFeatures: false
  });

  const handleToggleChange = (setting: keyof typeof appSettings) => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAppSettings(prev => ({ ...prev, [setting]: event.target.checked }));
    };

  return (
    <div style={{ width: '400px' }}>
      <h2>Application Preferences</h2>
      
      <SettingsPanel>
        <h3 style={{ marginTop: 0 }}>Interface</h3>
        
        <SettingItem>
          <InputToggle
            checked={appSettings.darkMode}
            onChange={handleToggleChange('darkMode')}
            onLabel="Dark"
            offLabel="Light"
            color="secondary"
          />
          <div>
            <label style={{ fontWeight: 'medium' }}>Theme Mode</label>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              Switch between light and dark interface themes
            </p>
          </div>
        </SettingItem>

        <SettingItem>
          <InputToggle
            checked={appSettings.autoSave}
            onChange={handleToggleChange('autoSave')}
            onLabel="On"
            offLabel="Off"
            color="success"
          />
          <div>
            <label style={{ fontWeight: 'medium' }}>Auto Save</label>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              Automatically save changes as you work
            </p>
          </div>
        </SettingItem>
      </SettingsPanel>

      <SettingsPanel>
        <h3 style={{ marginTop: 0 }}>Privacy & Data</h3>
        
        <SettingItem>
          <InputToggle
            checked={appSettings.notifications}
            onChange={handleToggleChange('notifications')}
            onLabel="Allow"
            offLabel="Block"
            color="info"
          />
          <div>
            <label style={{ fontWeight: 'medium' }}>Push Notifications</label>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              Receive notifications about important updates
            </p>
          </div>
        </SettingItem>

        <SettingItem>
          <InputToggle
            checked={appSettings.analytics}
            onChange={handleToggleChange('analytics')}
            onLabel="Share"
            offLabel="Private"
            color="warning"
          />
          <div>
            <label style={{ fontWeight: 'medium' }}>Usage Analytics</label>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              Help improve the app by sharing anonymous usage data
            </p>
          </div>
        </SettingItem>

        <SettingItem>
          <InputToggle
            checked={appSettings.betaFeatures}
            onChange={handleToggleChange('betaFeatures')}
            onLabel="Enable"
            offLabel="Disable"
            color="error"
          />
          <div>
            <label style={{ fontWeight: 'medium' }}>Beta Features</label>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              Access experimental features (may be unstable)
            </p>
          </div>
        </SettingItem>
      </SettingsPanel>
    </div>
  );
}
```

## Variations

### Size Variations

- **small**: Compact size for dense interfaces or secondary settings
- **medium**: Standard size for most applications and primary settings (default)

### Color Variations

- **primary**: Default blue color scheme
- **secondary**: Alternative neutral color scheme  
- **success**: Green color for positive/enabled states
- **warning**: Orange/yellow color for caution settings
- **error**: Red color for critical or dangerous settings
- **info**: Blue color for informational settings
- **default**: System default color

## Component States

- **Off/Unchecked**: Toggle is in the inactive/false state
- **On/Checked**: Toggle is in the active/true state
- **Focused**: Keyboard focus state with visible focus ring
- **Disabled**: Non-interactive state when `disabled={true}`
- **Hover**: Visual feedback when hovering over the toggle

## Best Practices

### When to Use

- Use for binary settings that take immediate effect
- Ideal for enabling/disabling features, services, or functionality
- Perfect for preferences and configuration interfaces
- Recommended for states that are clearly on/off, active/inactive

### When Not to Use

- Avoid for actions that require confirmation (use Button instead)
- Don't use for multiple choice selection (use InputRadio instead)
- Consider InputCheckbox for form submissions or non-immediate actions
- Avoid for settings that need additional context or explanation

### Accessibility Guidelines

- Component includes proper ARIA attributes and roles
- Supports keyboard navigation (Tab to focus, Space/Enter to toggle)
- Screen readers announce the toggle state and any labels
- Focus management is handled automatically
- Color changes are supplemented with positional changes for colorblind users

### UX Guidelines  

- Provide immediate visual feedback when toggle state changes
- Use consistent toggle positioning throughout your interface
- Label toggles clearly to indicate what they control
- Consider the immediate impact of toggle state changes on the user
- Group related toggles logically in settings interfaces

### Design Guidelines

- Use appropriate colors to convey the meaning of different settings
- Maintain consistent toggle sizing within related setting groups
- Provide adequate spacing around toggles for touch interaction
- Consider using custom on/off labels for clarity
- Ensure toggle states are visually distinct and clear

## Related Components

- **InputCheckbox** - Use for form selections that don't take immediate effect
- **InputRadio** - Use for single selection from multiple options
- **Button** - Use for actions that require confirmation or have other effects
- **InputSlider** - Use for selecting from a range of values

## Migration Notes

### From Legacy Toggle Components

- **Label System**: New `onLabel` and `offLabel` props for clearer state indication
- **Color System**: Updated to use consistent Material UI color palette
- **Size Options**: Simplified to `small` and `medium` sizes

### Breaking Changes

- Updated color prop values to match Material UI standards
- Improved accessibility with better ARIA support
- Changed default behavior to be more consistent with toggle conventions

## API Reference

- [Storybook Stories](https://main--64ad2577a2c26e0097ff24a6.chromatic.com/?path=/story/components-inputs-inputtoggle--default) - Interactive examples and testing
- [Material UI Switch](https://mui.com/material-ui/react-switch/) - Underlying MUI component documentation
- [Design Tokens](https://zeroheight.com/2a1e5182b/p/6145b2-design-tokens) - Available theme tokens and values