# Tooltip

## Overview

Tooltip is a contextual information component that displays helpful content when users hover over or focus on an element. Built on Material UI's Tooltip foundation, it provides enhanced styling options, structured content areas (title, subtitle, custom content), and comprehensive accessibility features. The component supports multiple visual styles and can accommodate both simple text and complex interactive content.

Tooltips are essential for providing additional context, explanations, or supplementary information without cluttering the primary interface. They should be used judiciously to enhance user understanding while maintaining a clean user experience.

## Installation & Import

```tsx
import { Tooltip } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `ReactElement` | ✓ | - | The element that triggers the tooltip on hover/focus |
| title | `ReactNode` | - | - | Primary content/title of the tooltip |
| subtitle | `ReactNode` | - | - | Secondary content below the title |
| componentSlot | `ReactNode` | - | - | Custom content area for complex tooltip content |
| sdsStyle | `"dark" \| "light"` | - | `"dark"` | Visual style variant of the tooltip |
| width | `"default" \| "wide"` | - | `"default"` | Width variant of the tooltip |
| textAlign | `"left" \| "right" \| "center"` | - | - | Text alignment within the tooltip |
| followCursor | `boolean` | - | `false` | Whether tooltip follows cursor movement |
| open | `boolean` | - | - | Controls tooltip visibility (controlled component) |
| onClose | `(event: Event \| SyntheticEvent) => void` | - | - | Callback fired when tooltip closes |
| arrowOffset | `number` | - | - | Offset for the tooltip arrow positioning |
| className | `string` | - | - | Additional CSS class names |
| style | `CSSProperties` | - | - | Inline styles |
| id | `string` | - | - | HTML id for accessibility |

*Note: Tooltip inherits all Material UI Tooltip props for advanced positioning and behavior customization.*

## Usage Examples

### Basic Usage

```tsx
import React from 'react';
import { Tooltip, Button } from '@czi-sds/components';

function BasicExample() {
  return (
    <Tooltip title="This button saves your current work">
      <Button sdsStyle="square" sdsType="primary">
        Save
      </Button>
    </Tooltip>
  );
}
```

### With Title and Subtitle

```tsx
import React from 'react';
import { Tooltip, IconButton, Icon } from '@czi-sds/components';

function TitleSubtitleExample() {
  return (
    <Tooltip
      title="Data Analysis"
      subtitle="Run statistical analysis on your dataset using advanced algorithms"
      sdsStyle="dark"
      width="wide"
    >
      <IconButton>
        <Icon sdsIcon="DataAnalysis" sdsSize="m" />
      </IconButton>
    </Tooltip>
  );
}
```

### With Custom Content

```tsx
import React from 'react';
import { Tooltip, Button } from '@czi-sds/components';

function CustomContentExample() {
  const customContent = (
    <div>
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
        Experiment Details
      </div>
      <div>
        <strong>Status:</strong> Running
      </div>
      <div>
        <strong>Progress:</strong> 75%
      </div>
      <div>
        <strong>ETA:</strong> 2 minutes
      </div>
    </div>
  );

  return (
    <Tooltip
      title="Current Experiment"
      componentSlot={customContent}
      width="wide"
      sdsStyle="light"
    >
      <Button sdsStyle="square" sdsType="secondary">
        View Status
      </Button>
    </Tooltip>
  );
}
```

### Interactive Tooltip with Controls

```tsx
import React, { useState } from 'react';
import { Tooltip, Button, IconButton, Icon } from '@czi-sds/components';

function InteractiveExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [followCursor, setFollowCursor] = useState(false);

  const interactiveContent = (
    <div style={{ minWidth: '200px' }}>
      <div style={{ marginBottom: '12px' }}>
        <strong>Tooltip Settings</strong>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <input
          type="checkbox"
          checked={followCursor}
          onChange={(e) => setFollowCursor(e.target.checked)}
          id="follow-cursor"
        />
        <label htmlFor="follow-cursor">Follow Cursor</label>
      </div>
      <Button
        sdsStyle="minimal"
        sdsType="primary"
        size="small"
        onClick={() => setIsOpen(false)}
      >
        Close
      </Button>
    </div>
  );

  return (
    <div>
      <Button 
        sdsStyle="square" 
        sdsType="primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        Toggle Interactive Tooltip
      </Button>
      
      <div style={{ marginTop: '20px' }}>
        <Tooltip
          open={isOpen}
          onClose={() => setIsOpen(false)}
          followCursor={followCursor}
          componentSlot={interactiveContent}
          width="wide"
          sdsStyle="light"
          // Prevent tooltip from closing on hover
          disableHoverListener={true}
          disableFocusListener={true}
        >
          <IconButton>
            <Icon sdsIcon="Settings" sdsSize="m" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
```

### Disabled Element Tooltip

```tsx
import React, { useState } from 'react';
import { Tooltip, Button } from '@czi-sds/components';

function DisabledElementExample() {
  const [isProcessing, setIsProcessing] = useState(true);

  return (
    <div>
      <Button onClick={() => setIsProcessing(!isProcessing)}>
        Toggle Processing State
      </Button>
      
      <div style={{ marginTop: '20px' }}>
        <Tooltip
          title={isProcessing ? "Please wait for current process to complete" : "Ready to upload"}
          subtitle={isProcessing ? "Processing data..." : "Click to select files"}
        >
          {/* Wrap disabled elements in span for tooltip to work */}
          <span>
            <Button
              sdsStyle="square"
              sdsType="primary"
              disabled={isProcessing}
              style={{ pointerEvents: isProcessing ? 'none' : 'auto' }}
            >
              Upload Files
            </Button>
          </span>
        </Tooltip>
      </div>
    </div>
  );
}
```

### Multiple Tooltips with Different Styles

```tsx
import React from 'react';
import { Tooltip, Button } from '@czi-sds/components';

function MultipleStylesExample() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Tooltip
        title="Dark Theme Tooltip"
        subtitle="Default dark styling"
        sdsStyle="dark"
      >
        <Button sdsStyle="square" sdsType="primary">
          Dark Tooltip
        </Button>
      </Tooltip>

      <Tooltip
        title="Light Theme Tooltip"
        subtitle="Light styling for dark backgrounds"
        sdsStyle="light"
      >
        <Button sdsStyle="square" sdsType="secondary">
          Light Tooltip
        </Button>
      </Tooltip>

      <Tooltip
        title="Wide Tooltip Example"
        subtitle="This tooltip has more space for longer explanations and detailed information"
        width="wide"
        textAlign="left"
      >
        <Button sdsStyle="square" sdsType="tertiary">
          Wide Tooltip
        </Button>
      </Tooltip>

      <Tooltip
        title="Center Aligned"
        subtitle="All content is centered"
        textAlign="center"
      >
        <Button sdsStyle="square" sdsType="primary">
          Centered
        </Button>
      </Tooltip>
    </div>
  );
}
```

### With Theme Integration

```tsx
import React from 'react';
import { Tooltip, Button, getColors } from '@czi-sds/components';
import styled from '@emotion/styled';

const StyledTooltipContent = styled.div`
  ${(props) => {
    const colors = getColors(props);
    return `
      padding: 8px;
      border-left: 3px solid ${colors?.primary[500]};
      background: ${colors?.gray[50]};
      
      .highlight {
        color: ${colors?.primary[600]};
        font-weight: 600;
      }
    `;
  }}
`;

function ThemedExample() {
  const themedContent = (
    <StyledTooltipContent>
      <div>
        Status: <span className="highlight">Active</span>
      </div>
      <div>
        Last Updated: <span className="highlight">2 minutes ago</span>
      </div>
    </StyledTooltipContent>
  );

  return (
    <Tooltip
      title="System Status"
      componentSlot={themedContent}
      width="wide"
      sdsStyle="light"
    >
      <Button sdsStyle="square" sdsType="primary">
        Themed Tooltip
      </Button>
    </Tooltip>
  );
}
```

## Variations

### Style Variations

- **dark**: Default dark theme with light text on dark background
- **light**: Light theme with dark text on light background (suitable for dark UI backgrounds)

### Width Variations

- **default**: Standard tooltip width, suitable for short to medium content
- **wide**: Expanded width for longer content and complex layouts

### Text Alignment

- **left**: Left-aligned text (default)
- **center**: Center-aligned text
- **right**: Right-aligned text

## Component Structure

### Content Areas

- **Title**: Primary heading content, styled prominently
- **Subtitle**: Secondary descriptive content below title
- **Component Slot**: Flexible area for custom content, interactive elements, or complex layouts

### Positioning

- Automatic intelligent positioning relative to trigger element
- Arrow always points to trigger element
- Respects viewport boundaries and repositions as needed
- Custom arrow offset available for fine-tuning

## Best Practices

### When to Use

- Providing definitions or explanations for technical terms
- Showing additional context for icons or abbreviated labels
- Displaying status information or metadata
- Offering help text for form fields or complex controls
- Presenting supplementary information that doesn't fit in main UI

### When Not to Use

- For critical information users must see (use visible text instead)
- On mobile devices where hover isn't available (consider alternatives)
- For very long content (use modal or dedicated info section)
- As primary navigation or essential functionality
- When the same information is already visible nearby

### Content Guidelines

- Keep title concise and descriptive
- Use subtitle for additional context, not repetition
- Write in clear, user-friendly language
- Avoid excessive punctuation
- Consider localization for international users
- Test content length across different screen sizes

### Accessibility Guidelines

- Component includes proper ARIA attributes (`aria-describedby`, `role="tooltip"`)
- Supports keyboard navigation (tooltip appears on focus)
- Screen reader compatible with announcements
- Color is not the only differentiator between variants
- Sufficient contrast ratios for all style variants
- Respects user motion preferences

### Design Guidelines

- Use consistent tooltip styling throughout application
- Position tooltips to not obscure important content
- Ensure sufficient contrast between tooltip and background
- Consider dark/light theme appropriately for context
- Maintain consistent spacing and typography
- Test across different viewport sizes

### Performance Guidelines

- Tooltips render only when needed (on hover/focus)
- Avoid complex interactive content that might cause performance issues
- Consider lazy loading for tooltips with heavy content
- Limit concurrent tooltips to prevent UI clutter

## Related Components

- **[TooltipCondensed](tooltip-condensed.md)** - Compact variant for space-constrained interfaces
- **[TooltipTable](tooltip-table.md)** - Structured table format for data tooltips
- **[Button](button.md)** - Common trigger element for tooltips
- **[IconButton](icon-button.md)** - Another common tooltip trigger

## Migration Notes

### Deprecated Props

- `inverted` prop is deprecated - use `sdsStyle` instead
- `hasInvertedStyle` is being phased out in favor of `sdsStyle`

### Breaking Changes

- Always renders with arrow (cannot be disabled)
- Default tab index set to 0 for keyboard accessibility
- Custom PopperComponent defaults to StyledPopper

## API Reference

- [Material UI Tooltip Documentation](https://mui.com/material-ui/react-tooltip/) - Underlying MUI component
- [Storybook Stories](link-to-storybook) - Interactive examples and testing
- [Design Tokens](link-to-tokens) - Available colors, spacing, and typography tokens
- [Accessibility Guidelines](link-to-a11y) - WCAG compliance and screen reader support