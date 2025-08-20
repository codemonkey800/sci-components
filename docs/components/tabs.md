# Tabs

## Overview

The Tabs component provides tabbed navigation for organizing content into separate views. It features customizable sizing, optional count badges, and underlined styling. The component consists of a container (`Tabs`) and individual tab items (`Tab`) that work together to create an accessible and visually consistent tabbed interface for scientific applications.

## Installation & Import

```tsx
import { Tabs, Tab } from '@czi-sds/components';
```

## Props

### Tabs Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `ReactNode` | ✓ | - | Tab components to render |
| sdsSize | `"large" \| "small"` | - | `"large"` | Size of the tabs |
| value | `any` | - | - | The value of the currently selected tab |
| onChange | `(event: SyntheticEvent, value: any) => void` | - | - | Callback fired when the value changes |
| variant | `"standard" \| "scrollable" \| "fullWidth"` | - | `"standard"` | Determines display behavior of the tabs |
| orientation | `"horizontal" \| "vertical"` | - | `"horizontal"` | The tabs orientation |
| className | `string` | - | - | Standard React className prop |
| style | `CSSProperties` | - | - | Standard React style prop |
| id | `string` | - | - | Standard React id prop |

### Tab Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| label | `ReactNode` | ✓ | - | The label content of the tab |
| value | `any` | - | - | The value of the tab (should match Tabs value when selected) |
| count | `ReactNode` | - | - | Optional count badge to display with the tab label |
| disabled | `boolean` | - | `false` | If `true`, the tab is disabled |
| selected | `boolean` | - | `false` | If `true`, the tab is selected |
| onClick | `MouseEventHandler` | - | - | Click event handler |
| className | `string` | - | - | Standard React className prop |
| style | `CSSProperties` | - | - | Standard React style prop |
| id | `string` | - | - | Standard React id prop |

## Usage Examples

### Basic Usage

```tsx
import React, { useState } from 'react';
import { Tabs, Tab } from '@czi-sds/components';

function MyComponent() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Tabs value={selectedTab} onChange={handleTabChange} sdsSize="large">
        <Tab label="Overview" value={0} />
        <Tab label="Details" value={1} />
        <Tab label="Settings" value={2} />
      </Tabs>

      {/* Tab content */}
      <div style={{ padding: '20px' }}>
        {selectedTab === 0 && <div>Overview content goes here...</div>}
        {selectedTab === 1 && <div>Details content goes here...</div>}
        {selectedTab === 2 && <div>Settings content goes here...</div>}
      </div>
    </div>
  );
}
```

### Advanced Usage with Counts

```tsx
import React, { useState } from 'react';
import { Tabs, Tab } from '@czi-sds/components';

interface DataCategory {
  id: string;
  label: string;
  count: number;
  data: any[];
}

function AdvancedExample() {
  const [selectedTab, setSelectedTab] = useState('experiments');

  const categories: DataCategory[] = [
    {
      id: 'experiments',
      label: 'Experiments',
      count: 12,
      data: [/* experiment data */],
    },
    {
      id: 'datasets',
      label: 'Datasets',
      count: 7,
      data: [/* dataset data */],
    },
    {
      id: 'publications',
      label: 'Publications',
      count: 23,
      data: [/* publication data */],
    },
    {
      id: 'archived',
      label: 'Archived',
      count: 5,
      data: [/* archived data */],
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const selectedCategory = categories.find(cat => cat.id === selectedTab);

  return (
    <div>
      <Tabs 
        value={selectedTab} 
        onChange={handleTabChange} 
        sdsSize="large"
        variant="standard"
      >
        {categories.map((category) => (
          <Tab
            key={category.id}
            label={category.label}
            value={category.id}
            count={category.count}
            disabled={category.count === 0}
          />
        ))}
      </Tabs>

      {/* Dynamic tab content */}
      <div style={{ padding: '24px' }}>
        <h2>{selectedCategory?.label}</h2>
        <p>Found {selectedCategory?.count} items</p>
        
        {selectedCategory?.data.length === 0 ? (
          <div style={{ 
            padding: '40px', 
            textAlign: 'center', 
            color: '#666' 
          }}>
            No {selectedCategory.label.toLowerCase()} available
          </div>
        ) : (
          <div>
            {/* Render category-specific content */}
            {selectedCategory?.data.map((item, index) => (
              <div key={index} style={{ 
                padding: '16px', 
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                marginBottom: '8px'
              }}>
                Content for {selectedCategory.label} item {index + 1}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

### Scrollable Tabs for Many Options

```tsx
import React, { useState } from 'react';
import { Tabs, Tab } from '@czi-sds/components';

function ScrollableTabsExample() {
  const [selectedTab, setSelectedTab] = useState('section1');

  // Many sections to demonstrate scrollable behavior
  const sections = Array.from({ length: 15 }, (_, i) => ({
    id: `section${i + 1}`,
    label: `Section ${i + 1}`,
    count: Math.floor(Math.random() * 50) + 1,
  }));

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sdsSize="small"
      >
        {sections.map((section) => (
          <Tab
            key={section.id}
            label={section.label}
            value={section.id}
            count={section.count}
          />
        ))}
      </Tabs>

      <div style={{ padding: '20px' }}>
        <h3>Content for {selectedTab}</h3>
        <p>This demonstrates scrollable tabs when you have many options.</p>
      </div>
    </div>
  );
}
```

### Vertical Tabs Layout

```tsx
import React, { useState } from 'react';
import { Tabs, Tab } from '@czi-sds/components';

function VerticalTabsExample() {
  const [selectedTab, setSelectedTab] = useState('profile');

  const settingsOptions = [
    { id: 'profile', label: 'Profile Settings', count: undefined },
    { id: 'notifications', label: 'Notifications', count: 3 },
    { id: 'privacy', label: 'Privacy & Security', count: undefined },
    { id: 'integrations', label: 'Integrations', count: 7 },
    { id: 'billing', label: 'Billing', count: undefined },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <div style={{ display: 'flex', minHeight: '400px' }}>
      {/* Vertical tabs sidebar */}
      <div style={{ width: '240px', borderRight: '1px solid #e0e0e0' }}>
        <Tabs
          orientation="vertical"
          value={selectedTab}
          onChange={handleTabChange}
          sdsSize="large"
          sx={{ 
            borderRight: 1, 
            borderColor: 'divider',
            '& .MuiTab-root': {
              alignItems: 'flex-start',
              textAlign: 'left',
            }
          }}
        >
          {settingsOptions.map((option) => (
            <Tab
              key={option.id}
              label={option.label}
              value={option.id}
              count={option.count}
            />
          ))}
        </Tabs>
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, padding: '24px' }}>
        {selectedTab === 'profile' && (
          <div>
            <h2>Profile Settings</h2>
            <p>Manage your account profile information...</p>
          </div>
        )}
        {selectedTab === 'notifications' && (
          <div>
            <h2>Notification Settings</h2>
            <p>Configure how and when you receive notifications...</p>
          </div>
        )}
        {selectedTab === 'privacy' && (
          <div>
            <h2>Privacy & Security</h2>
            <p>Control your privacy settings and account security...</p>
          </div>
        )}
        {selectedTab === 'integrations' && (
          <div>
            <h2>Integrations</h2>
            <p>Manage third-party integrations and API access...</p>
          </div>
        )}
        {selectedTab === 'billing' && (
          <div>
            <h2>Billing Information</h2>
            <p>View and manage your billing details...</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

### With Theme Integration

```tsx
import React, { useState } from 'react';
import { Tabs, Tab, getColors, getSpaces } from '@czi-sds/components';
import styled from '@emotion/styled';

const StyledTabContainer = styled.div`
  ${(props) => {
    const colors = getColors(props);
    return `
      background-color: ${colors?.gray[50]};
      border-radius: 8px;
      overflow: hidden;
    `;
  }}
`;

const StyledTabContent = styled.div`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    return `
      background-color: ${colors?.common?.white};
      padding: ${spaces?.xl}px;
      border-top: 1px solid ${colors?.gray[200]};
      min-height: 300px;
    `;
  }}
`;

function ThemedExample() {
  const [activeTab, setActiveTab] = useState('analysis');

  const researchTabs = [
    { id: 'analysis', label: 'Data Analysis', count: 15 },
    { id: 'visualization', label: 'Visualizations', count: 8 },
    { id: 'reports', label: 'Reports', count: 12 },
    { id: 'sharing', label: 'Collaboration', count: 3 },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <StyledTabContainer>
      <Tabs 
        value={activeTab} 
        onChange={handleTabChange}
        sdsSize="large"
        variant="fullWidth"
      >
        {researchTabs.map((tab) => (
          <Tab
            key={tab.id}
            label={tab.label}
            value={tab.id}
            count={tab.count}
          />
        ))}
      </Tabs>

      <StyledTabContent>
        {activeTab === 'analysis' && (
          <div>
            <h2>Data Analysis Dashboard</h2>
            <p>Access your analysis tools and recent work...</p>
          </div>
        )}
        {activeTab === 'visualization' && (
          <div>
            <h2>Data Visualizations</h2>
            <p>Create and manage your data visualizations...</p>
          </div>
        )}
        {activeTab === 'reports' && (
          <div>
            <h2>Research Reports</h2>
            <p>Generate and export research reports...</p>
          </div>
        )}
        {activeTab === 'sharing' && (
          <div>
            <h2>Collaboration Hub</h2>
            <p>Share your work and collaborate with colleagues...</p>
          </div>
        )}
      </StyledTabContent>
    </StyledTabContainer>
  );
}
```

## Variations

### Size Variations

- **large**: Default size with standard padding and typography
- **small**: Compact size for dense interfaces or secondary navigation

### Layout Variations

- **standard**: Default horizontal layout with fixed tab widths
- **scrollable**: Horizontal layout with scrollable tabs for overflow
- **fullWidth**: Tabs expand to fill the full width of the container

### Orientation Variations

- **horizontal**: Default horizontal tab layout
- **vertical**: Vertical tab layout for sidebar navigation

## Component States

- **Default**: Normal unselected tab state
- **Selected**: Active tab with indicator and emphasized styling
- **Disabled**: Non-interactive tab with reduced opacity
- **Hover**: Visual feedback on mouse hover
- **Focus**: Keyboard focus state with visible focus ring

## Best Practices

### When to Use

- Use for organizing related content into separate views
- Ideal for settings pages, dashboards, and data categorization
- Perfect for navigation between different aspects of the same feature
- Use when content sections are mutually exclusive

### When Not to Use

- Don't use for primary site navigation - use NavigationHeader instead
- Avoid for sequential processes - use stepper components instead
- Don't use when all content should be visible simultaneously
- Avoid for content that users need to compare side-by-side

### Content Organization Guidelines

- Keep tab labels concise and descriptive
- Use consistent labeling patterns across tabs
- Order tabs by importance or logical sequence
- Group related functionality within tabs
- Limit the number of tabs to avoid cognitive overload

### Accessibility Guidelines

- All tabs are keyboard accessible with arrow key navigation
- ARIA attributes provide proper role and state information
- Tab panels are properly associated with their tabs
- Focus management works correctly when switching tabs
- Screen readers announce tab changes and count information
- Color is not the only indicator of active state

### Performance Considerations

- Consider lazy loading tab content for complex data
- Implement proper state management for tab content
- Use React.memo for tab content components to prevent unnecessary re-renders
- Cache data between tab switches when appropriate

## Related Components

- **NavigationHeader** - Use for primary site navigation
- **SegmentedControl** - Use for toggle-style navigation without content panels
- **NavigationJumpTo** - Use for section navigation within long content
- **Accordion** - Use for collapsible content sections

## Migration Notes

- **Material UI Integration**: Built on top of Material-UI Tabs with SDS styling
- **Count Display**: Count badges are optional and support any React node
- **Value Management**: Supports both controlled and uncontrolled usage patterns
- **Indicator Styling**: Custom tab indicator styling with SDS theme integration

## API Reference

- [Storybook Stories](https://main--61e7b0c7c7b2df00213dc295.chromatic.com/?path=/story/components-tabs) - Interactive examples and testing
- [Material UI Tabs](https://mui.com/material-ui/react-tabs/) - Underlying MUI component documentation
- [Design Tokens](https://zeroheight.com/2e0e8f7fc/p/6138ce-design-tokens) - Available theme tokens and values