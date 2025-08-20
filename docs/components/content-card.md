# ContentCard

## Overview

ContentCard is a versatile card layout container component designed to display structured content in a visually appealing and organized manner. Built on Material UI's Card component, it provides a flexible foundation for content display with support for images, icons, text hierarchies, and action buttons. The component is ideal for creating content previews, product cards, article summaries, and other information-rich layouts within the Science Design System.

ContentCard automatically adapts between wide and narrow layouts based on available space, ensuring optimal presentation across different screen sizes and container widths.

## Installation & Import

```tsx
import { 
  ContentCard, 
  ContentCardActions, 
  ContentCardBody, 
  ContentCardTitle,
  ContentCardSubtitle,
  ContentCardMetadata,
  ContentCardOverline 
} from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| visualElementType | `"image" \| "icon" \| "none"` | - | `"none"` | Type of visual media to display in the card |
| sdsType | `"wide" \| "narrow"` | - | `"wide"` | Layout type of the card |
| boundingBox | `boolean` | - | `true` | Whether to display the card border |
| clickableCard | `boolean` | - | `false` | Makes the entire card clickable as a button |
| buttonsPosition | `"left" \| "right"` | - | `"left"` | Alignment of action buttons |
| overlineText | `ReactNode` | - | - | Text displayed above the title |
| titleText | `ReactNode` | - | - | Main title text of the card |
| subtitleText | `ReactNode` | - | - | Subtitle text below the title |
| metadataText | `ReactNode` | - | - | Metadata text displayed separately |
| children | `ReactNode` | - | - | Card content and actions |
| classes | `object` | - | `{}` | Custom CSS classes for styling components |

### Image-Specific Props

When `visualElementType="image"`:

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| image | `ReactNode \| string` | - | - | Image element or URL to display |
| imagePosition | `"left" \| "right"` | - | `"left"` | Position of image relative to content |
| imagePadding | `boolean` | - | `false` | Whether to add padding around the image |
| imageSize | `number` | - | `300` | Size of image in pixels |

### Icon-Specific Props  

When `visualElementType="icon"`:

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| icon | `ReactNode` | - | - | Icon element to display |

### Clickable Card Props

When `clickableCard={true}`:

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| clickableCardProps | `Partial<SdsMinimalButtonProps>` | - | - | Props passed to the underlying clickable button |

## Sub-components

### ContentCardActions

Container for action buttons within the card.

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `ReactElement<ButtonProps> \| ReactElement<ButtonProps>[]` | ✓ | - | Button elements to display |
| buttonsPosition | `"left" \| "right"` | - | `"left"` | Button alignment |
| clickableCard | `boolean` | - | `false` | Whether parent card is clickable |

### ContentCardTitle

Handles the display of title, subtitle, overline, and metadata text.

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| overlineText | `ReactNode` | - | - | Text above the title |
| titleText | `ReactNode` | - | - | Main title text |
| subtitleText | `ReactNode` | - | - | Text below the title |
| metadataText | `ReactNode` | - | - | Additional metadata text |

### ContentCardImageMedia

Handles image display and responsive sizing.

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| image | `ReactNode \| string` | - | - | Image to display |
| imageSize | `number` | ✓ | - | Image size in pixels |
| sdsType | `"wide" \| "narrow"` | ✓ | - | Card layout type |
| imagePadding | `boolean` | - | `false` | Whether to add padding |
| imagePosition | `"left" \| "right"` | - | `"left"` | Image position |
| boundingBox | `boolean` | - | `true` | Whether card has border |

## Usage Examples

### Basic Text Card

```tsx
import React from 'react';
import { 
  ContentCard, 
  ContentCardActions, 
  ContentCardBody,
  Button 
} from '@czi-sds/components';

function BasicContentCard() {
  return (
    <ContentCard
      visualElementType="none"
      titleText="Research Article"
      subtitleText="Latest findings in molecular biology"
      overlineText="PUBLICATION"
      metadataText="Published: March 15, 2024"
    >
      <ContentCardBody>
        This study presents groundbreaking research in cellular mechanisms 
        that could revolutionize our understanding of disease progression.
      </ContentCardBody>
      
      <ContentCardActions>
        <Button sdsStyle="rounded" sdsType="primary">
          Read More
        </Button>
        <Button sdsStyle="rounded" sdsType="secondary">
          Save
        </Button>
      </ContentCardActions>
    </ContentCard>
  );
}
```

### Card with Image

```tsx
import React from 'react';
import { 
  ContentCard, 
  ContentCardActions, 
  ContentCardBody,
  Button 
} from '@czi-sds/components';

function ImageContentCard() {
  return (
    <ContentCard
      visualElementType="image"
      image="https://picsum.photos/300/200"
      imagePosition="left"
      imagePadding={true}
      imageSize={200}
      titleText="Dataset Analysis"
      subtitleText="Comprehensive genomic sequencing results"
      metadataText="Updated: 2 hours ago"
    >
      <ContentCardBody>
        Explore the latest genomic sequencing data with interactive 
        visualizations and statistical analysis tools.
      </ContentCardBody>
      
      <ContentCardActions buttonsPosition="right">
        <Button sdsStyle="rounded" sdsType="primary">
          View Data
        </Button>
      </ContentCardActions>
    </ContentCard>
  );
}
```

### Card with Icon

```tsx
import React from 'react';
import { 
  ContentCard, 
  ContentCardActions, 
  ContentCardBody,
  Button,
  Icon 
} from '@czi-sds/components';

function IconContentCard() {
  return (
    <ContentCard
      visualElementType="icon"
      icon={<Icon sdsIcon="SpeechBubbles" sdsSize="xl" />}
      titleText="Collaboration Hub"
      subtitleText="Connect with research teams"
      overlineText="COMMUNITY"
    >
      <ContentCardBody>
        Join discussions, share insights, and collaborate with researchers 
        from around the world on cutting-edge scientific projects.
      </ContentCardBody>
      
      <ContentCardActions>
        <Button sdsStyle="minimal" sdsType="primary">
          Join Discussion
        </Button>
      </ContentCardActions>
    </ContentCard>
  );
}
```

### Clickable Card

```tsx
import React from 'react';
import { 
  ContentCard, 
  ContentCardActions, 
  ContentCardBody,
  Button 
} from '@czi-sds/components';

function ClickableContentCard() {
  const handleCardClick = () => {
    console.log('Card clicked');
    // Navigate to detail page
  };

  return (
    <ContentCard
      visualElementType="image"
      image="https://picsum.photos/300/200"
      titleText="Interactive Dataset"
      subtitleText="Click to explore"
      clickableCard={true}
      clickableCardProps={{
        onClick: handleCardClick,
        'aria-label': 'Open interactive dataset viewer'
      }}
    >
      <ContentCardBody>
        This dataset contains interactive visualizations and analysis tools.
      </ContentCardBody>
      
      {/* Only first button is shown when clickableCard is true */}
      <ContentCardActions>
        <Button sdsStyle="minimal" sdsType="primary">
          Explore
        </Button>
      </ContentCardActions>
    </ContentCard>
  );
}
```

### Narrow Layout Card

```tsx
import React from 'react';
import { 
  ContentCard, 
  ContentCardActions, 
  ContentCardBody,
  Button 
} from '@czi-sds/components';

function NarrowContentCard() {
  return (
    <ContentCard
      sdsType="narrow"
      visualElementType="image"
      image="https://picsum.photos/300/200"
      titleText="Mobile-First Design"
      subtitleText="Optimized for narrow layouts"
    >
      <ContentCardBody>
        This card automatically adapts to narrow layouts, with the image 
        positioned above the content for better mobile viewing.
      </ContentCardBody>
      
      <ContentCardActions>
        <Button sdsStyle="rounded" sdsType="primary" size="small">
          Learn More
        </Button>
      </ContentCardActions>
    </ContentCard>
  );
}
```

### With Theme Integration

```tsx
import React from 'react';
import { 
  ContentCard, 
  ContentCardActions, 
  ContentCardBody,
  Button,
  getColors 
} from '@czi-sds/components';
import styled from '@emotion/styled';

const CustomCardWrapper = styled.div`
  ${(props) => {
    const colors = getColors(props);
    return `
      background-color: ${colors?.gray[50]};
      padding: 16px;
      border-radius: 8px;
    `;
  }}
`;

function ThemedContentCard() {
  return (
    <CustomCardWrapper>
      <ContentCard
        visualElementType="icon"
        icon={<Icon sdsIcon="Compass" sdsSize="xl" />}
        titleText="Themed Card"
        subtitleText="Custom styling with theme tokens"
        boundingBox={false}
      >
        <ContentCardBody>
          This card uses theme colors for consistent styling across the application.
        </ContentCardBody>
        
        <ContentCardActions>
          <Button sdsStyle="rounded" sdsType="primary">
            Explore Theme
          </Button>
        </ContentCardActions>
      </ContentCard>
    </CustomCardWrapper>
  );
}
```

## Variations

### Layout Types

- **wide**: Default horizontal layout with image/icon on the side and content flowing next to it
- **narrow**: Vertical layout with image/icon above content, automatically applied on small containers

### Visual Element Types

- **none**: Text-only card without visual media
- **image**: Card with image support, accepts string URLs or React elements
- **icon**: Card with icon display, typically used for categorical or symbolic representation

### Button Positioning

- **left**: Buttons aligned to the left side of the action area (default)
- **right**: Buttons aligned to the right side of the action area

## Component States

- **Default**: Standard interactive state with full functionality
- **Clickable**: Entire card acts as a button when `clickableCard={true}`
- **Responsive**: Automatically switches between wide and narrow layouts based on container width
- **Borderless**: Card without border when `boundingBox={false}`

## Best Practices

### When to Use

- Display structured content with consistent layout patterns
- Create content previews with images, titles, and action buttons
- Build product cards, article summaries, or feature highlights
- Present information that benefits from visual hierarchy
- Design interfaces that need responsive card layouts

### When Not to Use

- Simple text-only content without structured layout needs
- Complex forms or interactive content (use dedicated form components)
- Data tables or lists (use Table or List components instead)
- Single action buttons without content context (use standalone Button)

### Accessibility Guidelines

- ContentCard includes proper ARIA attributes for screen readers
- Clickable cards are implemented as proper button elements with keyboard navigation
- Images include alt text for screen reader accessibility
- Focus management maintains logical tab order through card elements
- Color contrast meets WCAG AA standards for all text elements

### Design Guidelines

- Use consistent spacing and typography from the theme tokens
- Maintain proper content hierarchy with overline, title, subtitle, and metadata
- Keep action buttons relevant to the card content
- Use appropriate visual elements (images/icons) that support the content
- Consider responsive behavior and narrow layout appearance

### Content Organization

- **Overline**: Use for categories, tags, or content type labels
- **Title**: Primary heading that clearly identifies the content
- **Subtitle**: Supporting information that provides additional context
- **Body**: Main content description or summary
- **Metadata**: Secondary information like dates, authors, or status
- **Actions**: Relevant buttons for primary and secondary actions

## Related Components

- **[Card](./card.md)** - Basic MUI Card component for simple layouts
- **[Button](./button.md)** - Action buttons used within ContentCardActions
- **[Icon](./icon.md)** - Icons displayed in icon-type cards
- **[Typography](./typography.md)** - Text styling components for custom content

## Migration Notes

### From Basic Card Component

- Replace `Card` with `ContentCard` for structured content layouts
- Move action buttons into `ContentCardActions` wrapper
- Use built-in text props (`titleText`, `subtitleText`, etc.) instead of manual Typography components
- Update image handling to use `visualElementType="image"` and `image` prop

### Breaking Changes

- `ContentCardActions` only accepts `Button` components as children
- Clickable cards limit action buttons to one visible button
- Image sizing and positioning props only work with `visualElementType="image"`

## API Reference

- [Storybook Stories](https://main--6324ac9568a6b900079ee76a.chromatic.com/?path=/story/components-contentcard--default) - Interactive examples and testing
- [Material UI Card Component](https://mui.com/material-ui/react-card/) - Underlying MUI component documentation
- [Design Tokens](../design-tokens.md) - Available theme tokens and values