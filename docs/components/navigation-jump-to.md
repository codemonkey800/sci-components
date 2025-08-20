# NavigationJumpTo

## Overview

The NavigationJumpTo component provides vertical tab navigation that automatically syncs with page scroll position. It creates a table of contents-style navigation that highlights the currently visible section and allows users to jump to specific sections. The component supports hierarchical navigation with sub-items and is ideal for long-form content with multiple sections.

## Installation & Import

```tsx
import { NavigationJumpTo } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| items | `Item[]` | ✓ | - | Array of navigation items with refs to page sections |
| offsetTop | `number` | - | `0` | Offset from top when scrolling to sections (useful with fixed headers) |
| width | `CSSProperties["width"]` | - | `"100%"` | Width of the navigation component |
| onChange | `(value: number, event?: SyntheticEvent, type?: "click" \| "scroll") => void` | - | - | Callback fired when navigation changes |
| className | `string` | - | - | Standard React className prop |
| style | `CSSProperties` | - | - | Standard React style prop |
| id | `string` | - | - | Standard React id prop |
| children | `ReactNode` | - | - | Standard React children prop |

### Item Interface

| Property Name | Type | Required | Description |
|---------------|------|----------|-------------|
| title | `string` | ✓ | Display text for the navigation item |
| elementRef | `React.MutableRefObject<HTMLElement \| null>` | ✓ | Ref to the target section element |
| subItems | `SubItem[]` | - | Array of sub-navigation items |

### SubItem Interface

| Property Name | Type | Required | Description |
|---------------|------|----------|-------------|
| title | `string` | ✓ | Display text for the sub-navigation item |
| elementRef | `React.MutableRefObject<HTMLElement \| null>` | ✓ | Ref to the target sub-section element |

## Usage Examples

### Basic Usage

```tsx
import React, { useRef } from 'react';
import { NavigationJumpTo } from '@czi-sds/components';

function MyComponent() {
  // Create refs for each section
  const introRef = useRef<HTMLDivElement>(null);
  const methodsRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const conclusionRef = useRef<HTMLDivElement>(null);

  const navigationItems = [
    {
      title: 'Introduction',
      elementRef: introRef,
    },
    {
      title: 'Methods',
      elementRef: methodsRef,
    },
    {
      title: 'Results',
      elementRef: resultsRef,
    },
    {
      title: 'Conclusion',
      elementRef: conclusionRef,
    },
  ];

  return (
    <div style={{ display: 'flex' }}>
      {/* Navigation */}
      <aside style={{ width: '200px', position: 'sticky', top: '20px' }}>
        <NavigationJumpTo
          items={navigationItems}
          width="100%"
          offsetTop={60} // Account for fixed header
        />
      </aside>

      {/* Content */}
      <main style={{ flex: 1, paddingLeft: '20px' }}>
        <div ref={introRef} id="introduction">
          <h2>Introduction</h2>
          <p>This is the introduction section...</p>
        </div>

        <div ref={methodsRef} id="methods">
          <h2>Methods</h2>
          <p>This is the methods section...</p>
        </div>

        <div ref={resultsRef} id="results">
          <h2>Results</h2>
          <p>This is the results section...</p>
        </div>

        <div ref={conclusionRef} id="conclusion">
          <h2>Conclusion</h2>
          <p>This is the conclusion section...</p>
        </div>
      </main>
    </div>
  );
}
```

### Advanced Usage with Sub-Items

```tsx
import React, { useRef } from 'react';
import { NavigationJumpTo } from '@czi-sds/components';

function AdvancedExample() {
  // Create refs for main sections
  const overviewRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);
  const discussionRef = useRef<HTMLDivElement>(null);

  // Create refs for sub-sections
  const dataCollectionRef = useRef<HTMLDivElement>(null);
  const dataProcessingRef = useRef<HTMLDivElement>(null);
  const statisticalRef = useRef<HTMLDivElement>(null);
  const visualizationRef = useRef<HTMLDivElement>(null);
  const limitationsRef = useRef<HTMLDivElement>(null);
  const futureWorkRef = useRef<HTMLDivElement>(null);

  const navigationItems = [
    {
      title: 'Overview',
      elementRef: overviewRef,
    },
    {
      title: 'Data & Methods',
      elementRef: dataRef,
      subItems: [
        {
          title: 'Data Collection',
          elementRef: dataCollectionRef,
        },
        {
          title: 'Data Processing',
          elementRef: dataProcessingRef,
        },
      ],
    },
    {
      title: 'Analysis',
      elementRef: analysisRef,
      subItems: [
        {
          title: 'Statistical Analysis',
          elementRef: statisticalRef,
        },
        {
          title: 'Data Visualization',
          elementRef: visualizationRef,
        },
      ],
    },
    {
      title: 'Discussion',
      elementRef: discussionRef,
      subItems: [
        {
          title: 'Limitations',
          elementRef: limitationsRef,
        },
        {
          title: 'Future Work',
          elementRef: futureWorkRef,
        },
      ],
    },
  ];

  const handleNavigationChange = (
    value: number,
    event?: React.SyntheticEvent,
    type?: "click" | "scroll"
  ) => {
    console.log(`Navigation changed to index ${value} via ${type}`);
  };

  return (
    <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Fixed Navigation */}
      <nav
        style={{
          width: '250px',
          position: 'sticky',
          top: '20px',
          height: 'fit-content',
          paddingRight: '20px',
        }}
      >
        <NavigationJumpTo
          items={navigationItems}
          width="100%"
          offsetTop={80}
          onChange={handleNavigationChange}
        />
      </nav>

      {/* Content with sections */}
      <article style={{ flex: 1 }}>
        <section ref={overviewRef} id="overview" style={{ minHeight: '600px' }}>
          <h1>Research Overview</h1>
          <p>This section provides an overview of the research...</p>
        </section>

        <section ref={dataRef} id="data-methods" style={{ minHeight: '600px' }}>
          <h1>Data & Methods</h1>
          
          <div ref={dataCollectionRef} id="data-collection" style={{ minHeight: '300px' }}>
            <h2>Data Collection</h2>
            <p>Details about data collection methodology...</p>
          </div>

          <div ref={dataProcessingRef} id="data-processing" style={{ minHeight: '300px' }}>
            <h2>Data Processing</h2>
            <p>Information about data processing pipeline...</p>
          </div>
        </section>

        <section ref={analysisRef} id="analysis" style={{ minHeight: '600px' }}>
          <h1>Analysis</h1>
          
          <div ref={statisticalRef} id="statistical-analysis" style={{ minHeight: '300px' }}>
            <h2>Statistical Analysis</h2>
            <p>Statistical methods and results...</p>
          </div>

          <div ref={visualizationRef} id="visualization" style={{ minHeight: '300px' }}>
            <h2>Data Visualization</h2>
            <p>Charts and visual representations...</p>
          </div>
        </section>

        <section ref={discussionRef} id="discussion" style={{ minHeight: '600px' }}>
          <h1>Discussion</h1>
          
          <div ref={limitationsRef} id="limitations" style={{ minHeight: '300px' }}>
            <h2>Limitations</h2>
            <p>Study limitations and constraints...</p>
          </div>

          <div ref={futureWorkRef} id="future-work" style={{ minHeight: '300px' }}>
            <h2>Future Work</h2>
            <p>Suggestions for future research...</p>
          </div>
        </section>
      </article>
    </div>
  );
}
```

### With Custom Width and Styling

```tsx
import React, { useRef } from 'react';
import { NavigationJumpTo, getColors, getSpaces } from '@czi-sds/components';
import styled from '@emotion/styled';

const StyledNavigationContainer = styled.aside`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    return `
      background-color: ${colors?.gray[50]};
      border: 1px solid ${colors?.gray[200]};
      border-radius: 8px;
      padding: ${spaces?.m}px;
      position: sticky;
      top: ${spaces?.l}px;
      width: 280px;
    `;
  }}
`;

const NavigationTitle = styled.h3`
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

function StyledExample() {
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  const sections = [
    {
      title: 'Getting Started',
      elementRef: section1Ref,
    },
    {
      title: 'API Reference',
      elementRef: section2Ref,
    },
    {
      title: 'Examples',
      elementRef: section3Ref,
    },
  ];

  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <StyledNavigationContainer>
        <NavigationTitle>Page Contents</NavigationTitle>
        <NavigationJumpTo
          items={sections}
          width="100%"
          offsetTop={100}
        />
      </StyledNavigationContainer>

      <main style={{ flex: 1 }}>
        <div ref={section1Ref} id="getting-started" style={{ minHeight: '800px' }}>
          <h1>Getting Started</h1>
          <p>Welcome to the documentation...</p>
        </div>

        <div ref={section2Ref} id="api-reference" style={{ minHeight: '800px' }}>
          <h1>API Reference</h1>
          <p>Complete API documentation...</p>
        </div>

        <div ref={section3Ref} id="examples" style={{ minHeight: '800px' }}>
          <h1>Examples</h1>
          <p>Code examples and tutorials...</p>
        </div>
      </main>
    </div>
  );
}
```

## Variations

### Layout Variations

- **Fixed Width**: Set specific width using the `width` prop
- **Responsive Width**: Use percentage-based width for flexible layouts
- **Full Width**: Default `width="100%"` fills available container space

### Hierarchy Levels

- **Flat Navigation**: Single level items without sub-items
- **Hierarchical Navigation**: Items with sub-items for nested content structure

## Component States

- **Active**: Currently visible section highlighted in navigation
- **Hover**: Visual feedback on mouse hover for navigation items
- **Focus**: Keyboard focus states for accessibility
- **Scrolling**: Automatic highlight updates based on scroll position
- **Clicking**: Manual navigation with smooth scroll behavior

## Best Practices

### When to Use

- Use for long-form content with multiple clearly defined sections
- Ideal for documentation pages, research papers, and reports
- Perfect for articles with hierarchical content structure
- Use when users need to navigate quickly between sections

### When Not to Use

- Don't use for short pages that don't require section navigation
- Avoid for content without clear section boundaries
- Don't use when regular page navigation (header/footer) is more appropriate
- Avoid for dynamic content where sections change frequently

### Content Structure Guidelines

- Ensure each section has a clear, descriptive heading
- Maintain consistent section structure throughout the document
- Use semantic HTML headings (h1, h2, h3) for proper hierarchy
- Provide sufficient content in each section to justify navigation
- Include unique IDs on section elements for proper accessibility

### Accessibility Guidelines

- All navigation items are keyboard accessible with proper tab order
- ARIA attributes provide context for screen readers
- Focus management works correctly when clicking navigation items
- Smooth scroll behavior can be disabled for users with motion preferences
- Color contrast meets WCAG AA guidelines for all states

### Performance Considerations

- Uses Intersection Observer API for efficient scroll detection
- Debounced scroll handling prevents excessive re-renders
- Minimal re-renders through optimized state management
- Smooth scroll behavior is hardware-accelerated when supported

## Related Components

- **Tabs** - Use for content switching without scroll-based navigation
- **NavigationHeader** - Use for main site navigation
- **Link** - Individual link component for simple navigation
- **Accordion** - Use for collapsible content sections

## Migration Notes

- **Ref Requirements**: All navigation items must have valid element refs
- **ID Attributes**: Target elements should include ID attributes for proper accessibility
- **Intersection Observer**: Component requires modern browser support for optimal performance
- **Scroll Behavior**: Smooth scrolling requires browser support or polyfills for older browsers

## API Reference

- [Storybook Stories](https://main--61e7b0c7c7b2df00213dc295.chromatic.com/?path=/story/components-navigationjumpto) - Interactive examples and testing
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) - Browser API used for scroll detection
- [Material UI Tabs](https://mui.com/material-ui/react-tabs/) - Underlying MUI component for tab rendering
- [Design Tokens](https://zeroheight.com/2e0e8f7fc/p/6138ce-design-tokens) - Available theme tokens and values