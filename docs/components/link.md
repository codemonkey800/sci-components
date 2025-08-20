# Link

## Overview

The Link component provides styled navigation links with Science Design System theming. It extends Material-UI's Link component with SDS-specific styling options, including different visual styles, sizes, and font weights. The component maintains accessibility standards while providing consistent styling for both internal navigation and external links.

## Installation & Import

```tsx
import { Link } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| href | `string` | - | - | The URL to link to |
| children | `ReactNode` | - | - | The content of the link |
| sdsStyle | `"default" \| "dashed"` | - | `"default"` | Visual style variant of the link |
| sdsSize | `"xs" \| "s"` | - | `"s"` | Size of the link text |
| fontWeight | `"normal" \| "bold"` | - | `"normal"` | Font weight of the link text |
| component | `ElementType` | - | `"a"` | Component type to render (useful for routing libraries) |
| target | `HTMLAttributeAnchorTarget` | - | - | Where to open the linked document |
| underline | `"none" \| "hover" \| "always"` | - | Based on sdsStyle | Text decoration behavior |
| color | `"inherit" \| "primary" \| "secondary" \| "textPrimary" \| "textSecondary" \| "error"` | - | - | Color of the link |
| disabled | `boolean` | - | `false` | If `true`, the link is disabled |
| onClick | `MouseEventHandler` | - | - | Click event handler |
| className | `string` | - | - | Standard React className prop |
| style | `CSSProperties` | - | - | Standard React style prop |
| id | `string` | - | - | Standard React id prop |

## Usage Examples

### Basic Usage

```tsx
import React from 'react';
import { Link } from '@czi-sds/components';

function MyComponent() {
  return (
    <div>
      <p>
        Visit our <Link href="/documentation">documentation</Link> for more information.
      </p>
      
      <p>
        <Link 
          href="https://example.com" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          External Link
        </Link>
      </p>
    </div>
  );
}
```

### Advanced Usage with Different Styles

```tsx
import React from 'react';
import { Link } from '@czi-sds/components';

function AdvancedExample() {
  const handleLinkClick = (event: React.MouseEvent) => {
    console.log('Link clicked:', event.currentTarget);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Default link */}
      <Link 
        href="/default-example"
        sdsStyle="default"
        sdsSize="s"
        fontWeight="normal"
        onClick={handleLinkClick}
      >
        Default Style Link
      </Link>

      {/* Dashed underline link */}
      <Link 
        href="/dashed-example"
        sdsStyle="dashed"
        sdsSize="s"
        fontWeight="normal"
      >
        Dashed Style Link (inherits text color)
      </Link>

      {/* Bold link */}
      <Link 
        href="/bold-example"
        sdsStyle="default"
        fontWeight="bold"
        sdsSize="s"
      >
        Bold Link Text
      </Link>

      {/* Small size link */}
      <Link 
        href="/small-example"
        sdsStyle="default"
        sdsSize="xs"
        fontWeight="normal"
      >
        Extra Small Link
      </Link>

      {/* Disabled link */}
      <Link 
        href="/disabled-example"
        disabled
        sdsStyle="default"
      >
        Disabled Link
      </Link>
    </div>
  );
}
```

### Router Integration Example

```tsx
import React from 'react';
import { Link } from '@czi-sds/components';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function RouterIntegrationExample() {
  const navigate = useNavigate();

  const handleCustomNavigation = () => {
    // Custom navigation logic
    console.log('Navigating with custom logic...');
    navigate('/custom-route');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Using React Router Link component */}
      <Link 
        component={RouterLink}
        to="/internal-page"
        sdsStyle="default"
        sdsSize="s"
      >
        Internal Page (React Router)
      </Link>

      {/* Custom navigation handler */}
      <Link 
        component="button"
        onClick={handleCustomNavigation}
        sdsStyle="default"
        sdsSize="s"
        style={{ border: 'none', background: 'none', padding: 0 }}
      >
        Custom Navigation Handler
      </Link>

      {/* Next.js Link integration */}
      <Link 
        href="/nextjs-page"
        sdsStyle="default"
        sdsSize="s"
      >
        Next.js Page
      </Link>
    </div>
  );
}
```

### Contextual Link Usage

```tsx
import React from 'react';
import { Link } from '@czi-sds/components';

function ContextualExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Within body text */}
      <div style={{ maxWidth: '600px', lineHeight: '1.6' }}>
        <p>
          The Science Design System provides a comprehensive set of components 
          for building scientific applications. For more details, see our{' '}
          <Link 
            href="/component-library"
            sdsStyle="default"
            sdsSize="s"
          >
            component library
          </Link>{' '}
          or review the{' '}
          <Link 
            href="/design-guidelines"
            sdsStyle="default"
            sdsSize="s"
            fontWeight="bold"
          >
            design guidelines
          </Link>.
        </p>
      </div>

      {/* List of references */}
      <div>
        <h3>External Resources</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '8px' }}>
            <Link 
              href="https://mui.com/material-ui/"
              target="_blank"
              rel="noopener noreferrer"
              sdsStyle="default"
              sdsSize="s"
            >
              Material-UI Documentation
            </Link>
          </li>
          <li style={{ marginBottom: '8px' }}>
            <Link 
              href="https://react.dev/"
              target="_blank" 
              rel="noopener noreferrer"
              sdsStyle="default"
              sdsSize="s"
            >
              React Documentation
            </Link>
          </li>
          <li style={{ marginBottom: '8px' }}>
            <Link 
              href="https://www.w3.org/WAI/WCAG21/quickref/"
              target="_blank"
              rel="noopener noreferrer"
              sdsStyle="dashed"
              sdsSize="xs"
            >
              WCAG 2.1 Quick Reference
            </Link>
          </li>
        </ul>
      </div>

      {/* Footer-style links */}
      <div style={{ 
        borderTop: '1px solid #e0e0e0', 
        paddingTop: '16px',
        display: 'flex',
        gap: '24px',
        fontSize: '14px'
      }}>
        <Link 
          href="/privacy"
          sdsStyle="dashed"
          sdsSize="xs"
        >
          Privacy Policy
        </Link>
        <Link 
          href="/terms"
          sdsStyle="dashed"
          sdsSize="xs"
        >
          Terms of Service
        </Link>
        <Link 
          href="/support"
          sdsStyle="dashed"
          sdsSize="xs"
        >
          Support
        </Link>
      </div>
    </div>
  );
}
```

### With Theme Integration

```tsx
import React from 'react';
import { Link, getColors, getSpaces } from '@czi-sds/components';
import styled from '@emotion/styled';

const StyledLinkSection = styled.section`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    return `
      background-color: ${colors?.gray[50]};
      padding: ${spaces?.xl}px;
      border-radius: 8px;
      border: 1px solid ${colors?.gray[200]};
    `;
  }}
`;

const StyledLinkGrid = styled.div`
  ${(props) => {
    const spaces = getSpaces(props);
    return `
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: ${spaces?.m}px;
      margin-top: ${spaces?.m}px;
    `;
  }}
`;

const StyledLinkCard = styled.div`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    return `
      background-color: ${colors?.common?.white};
      padding: ${spaces?.m}px;
      border-radius: 6px;
      border: 1px solid ${colors?.gray[200]};
    `;
  }}
`;

function ThemedExample() {
  const resourceLinks = [
    {
      title: 'API Reference',
      href: '/api-reference',
      description: 'Complete API documentation',
      style: 'default' as const,
      size: 's' as const,
    },
    {
      title: 'Component Gallery',
      href: '/components',
      description: 'Browse available components',
      style: 'default' as const,
      size: 's' as const,
    },
    {
      title: 'Design Tokens',
      href: '/tokens',
      description: 'Colors, spacing, and typography',
      style: 'dashed' as const,
      size: 's' as const,
    },
    {
      title: 'Getting Started',
      href: '/getting-started',
      description: 'Installation and setup guide',
      style: 'default' as const,
      size: 's' as const,
    },
  ];

  return (
    <StyledLinkSection>
      <h2 style={{ margin: '0 0 8px 0' }}>Documentation Resources</h2>
      <p style={{ margin: '0 0 16px 0', color: '#666' }}>
        Explore our comprehensive documentation to get started with the Design System.
      </p>

      <StyledLinkGrid>
        {resourceLinks.map((resource) => (
          <StyledLinkCard key={resource.href}>
            <Link
              href={resource.href}
              sdsStyle={resource.style}
              sdsSize={resource.size}
              fontWeight="bold"
            >
              {resource.title}
            </Link>
            <p style={{ 
              margin: '8px 0 0 0', 
              fontSize: '14px', 
              color: '#666',
              lineHeight: '1.4'
            }}>
              {resource.description}
            </p>
          </StyledLinkCard>
        ))}
      </StyledLinkGrid>

      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <Link 
          href="/contact"
          sdsStyle="default"
          sdsSize="s"
          fontWeight="normal"
        >
          Need help? Contact our support team
        </Link>
      </div>
    </StyledLinkSection>
  );
}
```

## Variations

### Style Variations

- **default**: Standard link with SDS accent colors and no underline by default
- **dashed**: Inherits text color with dashed underline, becomes solid on hover/focus

### Size Variations

- **s**: Standard size with body small typography (default)
- **xs**: Extra small size with body extra small typography

### Font Weight Variations

- **normal**: Standard font weight (400)
- **bold**: Bold font weight (600) for emphasis

## Component States

- **Default**: Normal link state with SDS styling
- **Hover**: Color change and underline appearance on mouse hover
- **Focus**: Focus state with underline and color change for keyboard navigation
- **Active**: Pressed state with darker color
- **Disabled**: Non-interactive state with reduced opacity
- **Visited**: Browser default visited state (maintains SDS colors)

## Best Practices

### When to Use

- Use for navigation between pages or sections
- Ideal for inline text links within content
- Perfect for external resource references
- Use for action links that trigger navigation

### When Not to Use

- Don't use for actions that aren't navigation-related - use Button instead
- Avoid for primary call-to-action - use Button with appropriate styling
- Don't use for toggle actions - use ButtonToggle instead
- Avoid when the action doesn't lead to a new location or resource

### Content Guidelines

- Use descriptive link text that clearly indicates the destination
- Avoid generic text like "click here" or "read more"
- Keep link text concise while being informative
- Use consistent language patterns across similar links
- Ensure link text makes sense out of context for screen readers

### Accessibility Guidelines

- All links are keyboard accessible and focusable
- Focus states provide clear visual indication
- Link text is descriptive and informative for screen readers
- External links should include `target="_blank"` and `rel="noopener noreferrer"`
- Color is not the only indicator of link state
- Sufficient color contrast maintained in all states

### SEO and Performance

- Use descriptive `href` values for better SEO
- Include proper `rel` attributes for external links
- Consider prefetching for critical navigation paths
- Use semantic HTML structure around links

## Related Components

- **Button** - Use for actions that aren't navigation
- **NavigationHeader** - For primary site navigation
- **NavigationFooter** - For footer navigation links
- **Tabs** - For tabbed navigation within sections

## Migration Notes

- **Material UI Integration**: Built on top of Material-UI Link with SDS theming
- **Component Polymorphism**: Supports custom components via the `component` prop
- **Default Behavior**: Default style removes underline until hover/focus
- **Router Integration**: Works seamlessly with React Router and other routing libraries

## API Reference

- [Storybook Stories](https://main--61e7b0c7c7b2df00213dc295.chromatic.com/?path=/story/components-link) - Interactive examples and testing
- [Material UI Link](https://mui.com/material-ui/react-link/) - Underlying MUI component documentation
- [Design Tokens](https://zeroheight.com/2e0e8f7fc/p/6138ce-design-tokens) - Available theme tokens and values