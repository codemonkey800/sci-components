# Icon

## Overview

The Icon component provides access to over 100 built-in SVG icons designed specifically for scientific applications. It offers a comprehensive set of icons covering scientific instruments, data visualization, molecular biology, user interface elements, and general-purpose symbols. The component supports multiple sizes, colors, and custom theming while maintaining accessibility and performance standards.

## Installation & Import

```tsx
import { Icon } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| sdsIcon | `IconName` | ✓ | - | The name of the icon to display |
| sdsSize | `"xs" \| "s" \| "l" \| "xl"` | ✓ | - | The size of the component |
| color | `"blue" \| "gray" \| "green" \| "purple" \| "red" \| "yellow"` | - | - | Base color theme for the icon |
| shade | `"100" \| "200" \| "300" \| "400" \| "500" \| "600" \| "700" \| "800"` | - | - | Color shade intensity (100=lightest, 800=darkest) |

## Available Icons

The Science Design System includes 100+ icons organized by category:

### Scientific Instruments & Equipment
- **Flask**, **FlaskPrivate**, **FlaskPublic** - Laboratory equipment
- **DNA** - Molecular biology
- **Bacteria** - Microbiology
- **Virus**, **VirusCircleS** - Virology
- **Cube** - 3D structures/molecular modeling

### Data Visualization & Charts
- **BarChartHorizontal3**, **BarChartVertical3**, **BarChartVertical4** - Bar charts
- **ScatterPlot** - Scatter plot visualization
- **TreeDendogram**, **TreeHorizontal**, **TreeVertical** - Tree diagrams
- **Grid**, **GridPrivate**, **GridPublic** - Grid layouts
- **Table** - Tabular data

### User Interface & Navigation
- **ChevronDown**, **ChevronUp**, **ChevronLeft**, **ChevronRight** - Directional navigation
- **ChevronDown2**, **ChevronUp2**, **ChevronLeft2**, **ChevronRight2** - Alternative chevrons
- **TriangleDown**, **TriangleUp**, **TriangleLeft**, **TriangleRight** - Triangle indicators
- **DotsHorizontal** - More options menu
- **LinesHorizontal3** - Menu/list indicator

### Actions & Controls
- **Plus**, **PlusCircle** - Add/create actions
- **Minus** - Remove/subtract actions
- **Edit** - Edit/modify actions
- **Copy** - Copy/duplicate actions
- **TrashCan** - Delete actions
- **Save** - Save actions
- **Download**, **Upload** - File transfer
- **Refresh** - Reload/update actions
- **Search**, **SearchLinesHorizontal3** - Search functionality

### Status & Feedback
- **CheckCircle**, **Check** - Success/completion
- **XMark**, **XMarkCircle** - Error/close
- **ExclamationMarkCircle**, **ExclamationMarkSpeechBubble** - Warnings
- **InfoCircle**, **InfoSpeechBubble** - Information
- **Loading** - Processing states
- **LightBulb** - Ideas/tips

### Files & Documents
- **Document** - General documents
- **Book** - Documentation/manuals
- **Envelope** - Email/messages
- **Link** - Hyperlinks
- **Open** - Open/external links

### Security & Access
- **Lock**, **LockCircle** - Secured/private content
- **EyeOpen**, **EyeClosed** - Visibility toggles
- **Person**, **People** - Users/teams
- **ProjectPrivate**, **ProjectPublic** - Project visibility

### System & Settings
- **Gear** - Settings/configuration
- **Filter** - Filtering options
- **SlidersHorizontal** - Controls/adjustments
- **Widget** - Widgets/components
- **PuzzlePiece** - Plugins/extensions

### Communication & Social
- **SpeechBubbles** - Communications
- **Share** - Sharing functionality
- **Send** - Send messages
- **ThumbsUp**, **ThumbsDown** - Feedback

### Scientific Context
- **Compass** - Navigation/orientation
- **Scale** - Measurements
- **Percentage** - Statistical data
- **CirclesOverlap2** - Venn diagrams/overlap
- **Code** - Programming/development

### Flags & Indicators
- **FlagCheck**, **FlagOutline**, **FlagQuestionMark**, **FlagXMark** - Status flags
- **Pin**, **PinLocation** - Location markers
- **Star**, **Starburst** - Favorites/highlights

### Utilities & Misc
- **House** - Home/dashboard
- **Globe**, **GlobeBasic** - Web/global
- **Github** - Version control
- **LifeRing** - Help/support
- **Rocket** - Launch/deployment
- **RotateLeft**, **RotateRight** - Rotation controls
- **Pause**, **Play** - Media controls
- **QuestionMark**, **QuestionMarkCircle** - Help/unknown
- **Quote** - Citations/quotes
- **Read** - Reading/documentation
- **Report** - Reports/analytics
- **SquareOnDashedSquare** - Layers/overlays
- **Update** - Updates/changes
- **List** - Lists/catalogs

## Usage Examples

### Basic Usage

```tsx
import React from 'react';
import { Icon } from '@czi-sds/components';

function BasicIconExample() {
  return (
    <div>
      <Icon sdsIcon="CheckCircle" sdsSize="s" />
      <Icon sdsIcon="Flask" sdsSize="l" />
      <Icon sdsIcon="DNA" sdsSize="xl" />
    </div>
  );
}
```

### Size Variations

```tsx
import React from 'react';
import { Icon } from '@czi-sds/components';

function IconSizesExample() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Icon sdsIcon="LightBulb" sdsSize="xs" />
      <Icon sdsIcon="LightBulb" sdsSize="s" />
      <Icon sdsIcon="LightBulb" sdsSize="l" />
      <Icon sdsIcon="LightBulb" sdsSize="xl" />
    </div>
  );
}
```

### Color and Shade Variations

```tsx
import React from 'react';
import { Icon } from '@czi-sds/components';

function ColoredIconsExample() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {/* Different colors */}
      <Icon sdsIcon="Flask" sdsSize="l" color="blue" shade="500" />
      <Icon sdsIcon="Flask" sdsSize="l" color="green" shade="500" />
      <Icon sdsIcon="Flask" sdsSize="l" color="red" shade="500" />
      <Icon sdsIcon="Flask" sdsSize="l" color="purple" shade="500" />
      <Icon sdsIcon="Flask" sdsSize="l" color="yellow" shade="500" />
      <Icon sdsIcon="Flask" sdsSize="l" color="gray" shade="500" />
    </div>
  );
}
```

### Shade Intensity Examples

```tsx
import React from 'react';
import { Icon } from '@czi-sds/components';

function ShadeVariationsExample() {
  const shades = ["100", "200", "300", "400", "500", "600", "700", "800"] as const;
  
  return (
    <div>
      <h4>Blue Shade Variations</h4>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {shades.map((shade) => (
          <div key={shade} style={{ textAlign: 'center' }}>
            <Icon sdsIcon="InfoCircle" sdsSize="l" color="blue" shade={shade} />
            <div style={{ fontSize: '12px', marginTop: '4px' }}>{shade}</div>
          </div>
        ))}
      </div>
      
      <h4>Green Shade Variations</h4>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {shades.map((shade) => (
          <div key={shade} style={{ textAlign: 'center' }}>
            <Icon sdsIcon="CheckCircle" sdsSize="l" color="green" shade={shade} />
            <div style={{ fontSize: '12px', marginTop: '4px' }}>{shade}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Scientific Icons Showcase

```tsx
import React from 'react';
import { Icon } from '@czi-sds/components';

function ScientificIconsExample() {
  const scientificIcons = [
    'Flask', 'FlaskPrivate', 'FlaskPublic', 'DNA', 'Bacteria', 
    'Virus', 'Cube', 'TreeDendogram', 'ScatterPlot', 'BarChartVertical3'
  ];

  return (
    <div>
      <h3>Scientific & Laboratory Icons</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
        {scientificIcons.map((iconName) => (
          <div key={iconName} style={{ textAlign: 'center', padding: '8px' }}>
            <Icon sdsIcon={iconName as any} sdsSize="l" color="blue" shade="600" />
            <div style={{ fontSize: '12px', marginTop: '4px' }}>{iconName}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Status and Feedback Icons

```tsx
import React from 'react';
import { Icon } from '@czi-sds/components';

function StatusIconsExample() {
  const statusIcons = [
    { icon: 'CheckCircle', color: 'green', label: 'Success' },
    { icon: 'XMarkCircle', color: 'red', label: 'Error' },
    { icon: 'ExclamationMarkCircle', color: 'yellow', label: 'Warning' },
    { icon: 'InfoCircle', color: 'blue', label: 'Information' },
    { icon: 'Loading', color: 'gray', label: 'Processing' },
    { icon: 'LightBulb', color: 'purple', label: 'Tip' },
  ];

  return (
    <div>
      <h3>Status & Feedback Icons</h3>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {statusIcons.map((item) => (
          <div key={item.icon} style={{ textAlign: 'center' }}>
            <Icon 
              sdsIcon={item.icon as any} 
              sdsSize="l" 
              color={item.color as any} 
              shade="500" 
            />
            <div style={{ fontSize: '12px', marginTop: '4px' }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Navigation and UI Icons

```tsx
import React from 'react';
import { Icon } from '@czi-sds/components';

function NavigationIconsExample() {
  return (
    <div>
      <h3>Navigation Icons</h3>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <Icon sdsIcon="ChevronLeft" sdsSize="l" />
        <Icon sdsIcon="ChevronRight" sdsSize="l" />
        <Icon sdsIcon="ChevronUp" sdsSize="l" />
        <Icon sdsIcon="ChevronDown" sdsSize="l" />
      </div>

      <h3>Action Icons</h3>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Icon sdsIcon="Edit" sdsSize="l" color="blue" />
        <Icon sdsIcon="Copy" sdsSize="l" color="gray" />
        <Icon sdsIcon="TrashCan" sdsSize="l" color="red" />
        <Icon sdsIcon="Download" sdsSize="l" color="green" />
        <Icon sdsIcon="Upload" sdsSize="l" color="purple" />
      </div>
    </div>
  );
}
```

### Icons in Context

```tsx
import React from 'react';
import { Icon, Button, Tag } from '@czi-sds/components';

function IconsInContextExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4>Icons in Buttons</h4>
        <Button sdsType="primary" startIcon={<Icon sdsIcon="Plus" sdsSize="s" />}>
          Add Dataset
        </Button>
        <Button sdsType="secondary" startIcon={<Icon sdsIcon="Download" sdsSize="s" />}>
          Export
        </Button>
      </div>

      <div>
        <h4>Icons in Tags</h4>
        <Tag 
          label="Beta Feature" 
          icon={<Icon sdsIcon="LightBulb" sdsSize="s" />}
          color="beta"
        />
        <Tag 
          label="Completed" 
          icon={<Icon sdsIcon="CheckCircle" sdsSize="s" />}
          color="positive"
        />
      </div>

      <div>
        <h4>Standalone Status Icons</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon sdsIcon="Flask" sdsSize="s" color="blue" />
          <span>Experiment Status: Running</span>
          <Icon sdsIcon="Loading" sdsSize="s" color="gray" />
        </div>
      </div>
    </div>
  );
}
```

### Custom Icon Usage

```tsx
import React from 'react';
import { Icon } from '@czi-sds/components';

// Custom SVG icon component
const CustomDNAIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L22 20H2L12 2Z" />
  </svg>
);

function CustomIconExample() {
  return (
    <div>
      <h3>Built-in SDS Icons</h3>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <Icon sdsIcon="DNA" sdsSize="l" color="blue" shade="500" />
        <Icon sdsIcon="Bacteria" sdsSize="l" color="green" shade="500" />
        <Icon sdsIcon="Flask" sdsSize="l" color="purple" shade="500" />
      </div>

      <h3>Custom SVG Icons</h3>
      <div style={{ display: 'flex', gap: '16px' }}>
        {/* When you need custom icons not in the SDS library */}
        <div style={{ color: '#1976d2' }}>
          <CustomDNAIcon />
        </div>
      </div>
    </div>
  );
}
```

### With Theme Integration

```tsx
import React from 'react';
import { Icon, getColors } from '@czi-sds/components';
import styled from '@emotion/styled';

const IconShowcase = styled.div`
  ${(props) => {
    const colors = getColors(props);
    return `
      padding: 20px;
      background-color: ${colors?.gray[50]};
      border-radius: 8px;
      border: 1px solid ${colors?.gray[200]};
    `;
  }}
`;

function ThemedIconExample() {
  return (
    <IconShowcase>
      <h3>Themed Icon Display</h3>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Icon sdsIcon="Flask" sdsSize="l" color="blue" shade="600" />
        <Icon sdsIcon="DNA" sdsSize="l" color="green" shade="600" />
        <Icon sdsIcon="Bacteria" sdsSize="l" color="purple" shade="600" />
      </div>
    </IconShowcase>
  );
}
```

## Variations

### Size Variations

- **xs**: Extra small (12px) - For inline text, small buttons, and dense interfaces
- **s**: Small (16px) - Standard size for most UI elements, buttons, and form fields
- **l**: Large (24px) - For prominent UI elements, headers, and emphasis
- **xl**: Extra large (32px) - For large displays, hero sections, and major visual elements

### Color Variations

- **blue**: Primary brand color and informational states
- **gray**: Neutral states, disabled elements, and subtle indicators
- **green**: Success states, positive feedback, and completion
- **purple**: Special features, premium content, and creative elements
- **red**: Error states, warnings, and destructive actions
- **yellow**: Caution, warnings, and attention-grabbing elements

### Shade Variations

Each color supports 8 shade levels:
- **100-200**: Very light shades for backgrounds and subtle elements
- **300-400**: Light shades for secondary elements and borders
- **500**: Medium shade - the default balanced color
- **600-700**: Dark shades for emphasis and high contrast
- **800**: Very dark shade for maximum contrast and prominence

## Component States

- **Default**: Standard appearance with specified color and size
- **Hover**: Icons inherit hover states from parent interactive elements
- **Focus**: Accessible focus when part of focusable components
- **Disabled**: Reduced opacity when within disabled parent components

## Best Practices

### When to Use

- Enhance user interface elements with visual context
- Provide quick visual recognition for common actions
- Indicate status, categories, or types of content
- Support navigation and wayfinding
- Add scientific or domain-specific context

### When Not to Use

- As decorative elements without functional purpose
- When text labels would be clearer than iconography
- For complex concepts that require detailed explanation
- In dense interfaces where icons create visual noise

### Accessibility Guidelines

- Icons used alone should include appropriate ARIA labels
- Consider text alternatives or tooltips for complex icons
- Ensure sufficient color contrast for all shade combinations
- Icons should scale appropriately for accessibility needs
- Don't rely solely on color to convey important information

### Design Guidelines

- Use consistent icon sizes within the same interface context
- Align icons with text baselines and other visual elements
- Maintain adequate spacing around icons for touch interfaces
- Choose appropriate colors that match your content hierarchy
- Group related icons logically and maintain visual balance

### Performance Considerations

- SDS icons are optimized SVGs with minimal file sizes
- Icons are tree-shakable - only imported icons are included in bundles
- Consider icon loading patterns for large icon collections
- Use consistent sizes to benefit from browser caching

## Related Components

- **Button** - Often used with startIcon and endIcon props
- **Tag** - Supports icons for visual categorization
- **MenuItem** - Can include icons for menu options
- **Notification** - Uses icons for status indication

## API Reference

- [Icon Map Source](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Icon/map.ts) - Complete list of available icons
- [Storybook Stories](link-to-storybook) - Interactive examples and testing
- [Design Tokens](../design-tokens.md) - Available theme tokens and color values
- [SVG Icon Guidelines](../svg-guidelines.md) - Guidelines for creating custom icons