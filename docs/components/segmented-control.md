# SegmentedControl

## Overview

The SegmentedControl component provides a set of mutually exclusive toggle buttons grouped together as a single control. It's ideal for switching between different views, modes, or options where only one selection can be active at a time. The component automatically manages selection state and provides consistent visual feedback for the active option.

## Installation & Import

```tsx
import { SegmentedControl } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| buttonDefinition | `SingleButtonDefinition[]` | ✓ | - | Array of button configuration objects |
| value | `any` | - | - | The currently selected value within the group |
| onChange | `(event: React.MouseEvent<HTMLElement>, value: string \| null) => void` | - | - | Callback fired when the value changes |
| disabled | `boolean` | - | `false` | If `true`, all buttons in the group are disabled |
| fullWidth | `boolean` | - | `false` | If `true`, the button group takes up the full width of its container |
| size | `"small" \| "medium" \| "large"` | - | `"medium"` | The size of the component |
| color | `"standard" \| "primary" \| "secondary" \| "error" \| "info" \| "success" \| "warning"` | - | `"standard"` | The color of the button when selected |
| className | `string` | - | - | Standard React className prop |
| style | `CSSProperties` | - | - | Standard React style prop |
| id | `string` | - | - | Standard React id prop |

### SingleButtonDefinition Interface

| Property Name | Type | Required | Default | Description |
|---------------|------|----------|---------|-------------|
| value | `string` | ✓ | - | Unique identifier for this button |
| icon | `keyof IconNameToSizes \| ReactElement` | ✓ | - | The icon to display (icon name or custom SVG element) |
| tooltipText | `string` | - | - | Tooltip text shown on hover (defaults to value if not provided) |
| disabled | `boolean` | - | `false` | If `true`, this specific button is disabled |

## Usage Examples

### Basic Usage

```tsx
import React, { useState } from 'react';
import { SegmentedControl } from '@czi-sds/components';

function MyComponent() {
  const [viewMode, setViewMode] = useState('list');

  const buttonDefinitions = [
    {
      value: 'list',
      icon: 'List',
      tooltipText: 'List View',
    },
    {
      value: 'grid',
      icon: 'Grid',
      tooltipText: 'Grid View',
    },
    {
      value: 'table',
      icon: 'Table',
      tooltipText: 'Table View',
    },
  ];

  return (
    <SegmentedControl
      buttonDefinition={buttonDefinitions}
      value={viewMode}
      onChange={(event, newValue) => setViewMode(newValue || 'list')}
    />
  );
}
```

### Advanced Usage with Disabled Options

```tsx
import React, { useState } from 'react';
import { SegmentedControl } from '@czi-sds/components';

function AdvancedExample() {
  const [analysisMode, setAnalysisMode] = useState('basic');
  const [hasAdvancedLicense, setHasAdvancedLicense] = useState(false);

  const analysisOptions = [
    {
      value: 'basic',
      icon: 'BarChart',
      tooltipText: 'Basic Analysis',
    },
    {
      value: 'advanced',
      icon: 'TrendingUp',
      tooltipText: 'Advanced Analysis',
      disabled: !hasAdvancedLicense,
    },
    {
      value: 'ml',
      icon: 'Psychology',
      tooltipText: 'Machine Learning Analysis',
      disabled: !hasAdvancedLicense,
    },
    {
      value: 'export',
      icon: 'Download',
      tooltipText: 'Export Data',
    },
  ];

  const handleModeChange = (event: React.MouseEvent<HTMLElement>, newMode: string | null) => {
    if (newMode) {
      setAnalysisMode(newMode);
      console.log(`Switched to ${newMode} mode`);
    }
  };

  return (
    <div>
      <SegmentedControl
        buttonDefinition={analysisOptions}
        value={analysisMode}
        onChange={handleModeChange}
        size="medium"
        color="primary"
      />
      
      <button 
        onClick={() => setHasAdvancedLicense(!hasAdvancedLicense)}
        style={{ marginTop: '16px' }}
      >
        {hasAdvancedLicense ? 'Disable' : 'Enable'} Advanced License
      </button>
    </div>
  );
}
```

### Uncontrolled Component

```tsx
import React from 'react';
import { SegmentedControl } from '@czi-sds/components';

function UncontrolledExample() {
  const filterOptions = [
    {
      value: 'all',
      icon: 'SelectAll',
      tooltipText: 'Show All Items',
    },
    {
      value: 'active',
      icon: 'PlayArrow',
      tooltipText: 'Active Items Only',
    },
    {
      value: 'completed',
      icon: 'CheckCircle',
      tooltipText: 'Completed Items Only',
    },
    {
      value: 'archived',
      icon: 'Archive',
      tooltipText: 'Archived Items',
    },
  ];

  const handleFilterChange = (event: React.MouseEvent<HTMLElement>, newFilter: string | null) => {
    console.log(`Filter changed to: ${newFilter}`);
    // Component manages its own state internally
  };

  return (
    <SegmentedControl
      buttonDefinition={filterOptions}
      onChange={handleFilterChange}
      fullWidth
    />
  );
}
```

### With Theme Integration

```tsx
import React, { useState } from 'react';
import { SegmentedControl, getColors, getSpaces } from '@czi-sds/components';
import styled from '@emotion/styled';

const StyledControlContainer = styled.div`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    return `
      background-color: ${colors?.gray[50]};
      padding: ${spaces?.l}px;
      border-radius: 12px;
      border: 1px solid ${colors?.gray[200]};
    `;
  }}
`;

const ControlLabel = styled.h3`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    return `
      color: ${colors?.gray[700]};
      margin: 0 0 ${spaces?.m}px 0;
      font-size: 16px;
      font-weight: 600;
    `;
  }}
`;

function ThemedExample() {
  const [chartType, setChartType] = useState('line');

  const chartOptions = [
    {
      value: 'line',
      icon: 'ShowChart',
      tooltipText: 'Line Chart',
    },
    {
      value: 'bar',
      icon: 'BarChart',
      tooltipText: 'Bar Chart',
    },
    {
      value: 'pie',
      icon: 'PieChart',
      tooltipText: 'Pie Chart',
    },
    {
      value: 'scatter',
      icon: 'ScatterPlot',
      tooltipText: 'Scatter Plot',
    },
  ];

  return (
    <StyledControlContainer>
      <ControlLabel>Chart Type</ControlLabel>
      <SegmentedControl
        buttonDefinition={chartOptions}
        value={chartType}
        onChange={(event, newValue) => setChartType(newValue || 'line')}
        color="primary"
        size="large"
      />
    </StyledControlContainer>
  );
}
```

## Variations

### Color Variations

- **standard**: Default neutral appearance
- **primary**: Primary brand color when selected
- **secondary**: Secondary color scheme
- **error**: Error/warning color (red tones)
- **info**: Information color (blue tones)
- **success**: Success color (green tones)
- **warning**: Warning color (orange tones)

### Size Variations

- **small**: Compact size for dense interfaces
- **medium**: Standard size for most use cases
- **large**: Larger size for emphasis or touch interfaces

## Component States

- **Default**: Unselected button with subtle styling
- **Selected**: Active button with emphasized styling
- **Disabled**: Individual buttons or entire group can be disabled
- **Hover**: Visual feedback on mouse hover
- **Focus**: Keyboard focus states with proper focus management

## Best Practices

### When to Use

- Use for switching between different views or modes (list/grid, chart types)
- Ideal for filter controls with mutually exclusive options
- Perfect for toolbar controls where only one option should be active
- Use when you need immediate visual feedback of the current selection

### When Not to Use

- Don't use for actions that aren't mutually exclusive
- Avoid for navigation between different pages - use Tabs or NavigationHeader instead
- Don't use when more than 5-6 options are needed - consider a dropdown instead
- Avoid for binary choices - use ButtonToggle instead

### Accessibility Guidelines

- Each button includes proper `aria-label` attributes
- Supports keyboard navigation with arrow keys between buttons
- Uses `role="group"` for the button group
- Maintains focus management within the group
- Tooltips provide additional context for screen readers
- Color contrast meets WCAG AA guidelines for all states

### Design Guidelines

- Keep button definitions concise with clear, recognizable icons
- Use consistent tooltip text that matches the action or mode
- Group related functionality logically
- Maintain visual hierarchy with appropriate sizing
- Use semantic colors that match the action intent

## Related Components

- **Tabs** - Use for content-heavy navigation between sections
- **ButtonToggle** - Use for binary on/off states
- **Button** - Use for individual actions
- **InputRadio** - Use for form-based single selection with labels

## Migration Notes

- **Stable Component**: This component is stable and ready for production use
- **Controlled/Uncontrolled**: Supports both controlled and uncontrolled usage patterns
- **Icon Requirements**: All buttons require an icon - text-only buttons are not supported
- **Value Management**: Always handle the onChange event for controlled components

## API Reference

- [Storybook Stories](https://main--61e7b0c7c7b2df00213dc295.chromatic.com/?path=/story/components-segmentedcontrol) - Interactive examples and testing
- [Material UI ToggleButtonGroup](https://mui.com/material-ui/react-toggle-button/) - Underlying MUI component documentation
- [Design Tokens](https://zeroheight.com/2e0e8f7fc/p/6138ce-design-tokens) - Available theme tokens and values