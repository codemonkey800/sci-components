# NavigationFooter

## Overview

The NavigationFooter component provides a comprehensive footer section for scientific applications. It includes logo placement, navigation links, partner images, and responsive behavior. The component automatically adapts its layout for different screen sizes and offers both standard and inverted color schemes to match various design requirements.

## Installation & Import

```tsx
import { NavigationFooter } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| title | `string` | ✓ | - | The main title displayed next to the logo |
| logo | `ReactNode` | - | - | Logo element (image, SVG, or custom component) |
| logoUrl | `string` | - | - | URL for the logo link |
| logoComponent | `ElementType` | - | - | Component type for the logo link (e.g., 'a', custom Link component) |
| logoLinkProps | `Record<string, unknown>` | - | - | Additional props to pass to the logo link component |
| tag | `string` | - | - | Tag label to display next to the title (e.g., "Beta", "Preview") |
| tagColor | `TagProps["tagColor"]` | - | - | Color scheme for the tag |
| hasInvertedStyle | `boolean` | - | `false` | If `true`, uses inverted colors (light text on dark background) |
| navItems | `NavigationFooterNavItem[]` | - | - | Array of main navigation items |
| navLinks | `NavigationFooterNavItem[]` | - | - | Array of footer links (typically legal/support links) |
| images | `FooterImage[]` | - | - | Array of partner/sponsor images |
| className | `string` | - | - | Standard React className prop |
| style | `CSSProperties` | - | - | Standard React style prop |
| id | `string` | - | - | Standard React id prop |

### NavigationFooterNavItem Interface

| Property Name | Type | Required | Default | Description |
|---------------|------|----------|---------|-------------|
| label | `string` | ✓ | - | Text label for the navigation item |
| url | `string` | - | - | URL for the navigation link |
| component | `ElementType` | - | - | Component type for the link (e.g., 'a', custom Link component) |
| linkProps | `Record<string, unknown>` | - | - | Additional props to pass to the link component |

### FooterImage Interface

| Property Name | Type | Required | Default | Description |
|---------------|------|----------|---------|-------------|
| image | `ReactNode` | ✓ | - | Image element (img, SVG, or custom component) |
| url | `string` | - | - | URL for the image link |
| component | `ElementType` | - | - | Component type for the image link |
| linkProps | `Record<string, unknown>` | - | - | Additional props to pass to the image link component |

## Usage Examples

### Basic Usage

```tsx
import React from 'react';
import { NavigationFooter } from '@czi-sds/components';

function MyComponent() {
  const navItems = [
    { label: 'Home', url: '/' },
    { label: 'About', url: '/about' },
    { label: 'Research', url: '/research' },
    { label: 'Publications', url: '/publications' },
    { label: 'Contact', url: '/contact' },
  ];

  const navLinks = [
    { label: 'Privacy Policy', url: '/privacy' },
    { label: 'Terms of Service', url: '/terms' },
    { label: 'Support', url: '/support' },
  ];

  return (
    <NavigationFooter
      title="Science Platform"
      tag="Beta"
      tagColor="beta"
      navItems={navItems}
      navLinks={navLinks}
    />
  );
}
```

### Advanced Usage with Logo and Images

```tsx
import React from 'react';
import { NavigationFooter } from '@czi-sds/components';

// Custom logo component
const PlatformLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="18" fill="#1976d2" />
    <text x="20" y="25" textAnchor="middle" fill="white" fontSize="16">SP</text>
  </svg>
);

// Partner logos
const PartnerLogo = ({ name }: { name: string }) => (
  <div style={{ 
    width: '64px', 
    height: '24px', 
    backgroundColor: '#f0f0f0', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    fontSize: '10px',
    color: '#666'
  }}>
    {name}
  </div>
);

function AdvancedExample() {
  const navigation = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Data Analysis', url: '/analysis' },
    { label: 'Experiments', url: '/experiments' },
    { label: 'Collaboration', url: '/collaboration' },
    { label: 'Documentation', url: '/docs' },
  ];

  const footerLinks = [
    { 
      label: 'Privacy Policy', 
      url: '/privacy',
      linkProps: { target: '_blank' }
    },
    { 
      label: 'API Documentation', 
      url: '/api-docs',
      linkProps: { target: '_blank' }
    },
    { 
      label: 'Contact Support', 
      url: 'mailto:support@example.com' 
    },
  ];

  const partnerImages = [
    {
      image: <PartnerLogo name="Partner 1" />,
      url: 'https://partner1.example.com',
      linkProps: { target: '_blank', rel: 'noopener noreferrer' }
    },
    {
      image: <PartnerLogo name="Partner 2" />,
      url: 'https://partner2.example.com',
      linkProps: { target: '_blank', rel: 'noopener noreferrer' }
    },
    {
      image: <PartnerLogo name="Partner 3" />,
      url: 'https://partner3.example.com',
      linkProps: { target: '_blank', rel: 'noopener noreferrer' }
    },
  ];

  return (
    <NavigationFooter
      logo={<PlatformLogo />}
      logoUrl="/"
      title="Science Platform"
      tag="v2.1"
      tagColor="info"
      navItems={navigation}
      navLinks={footerLinks}
      images={partnerImages}
      hasInvertedStyle={false}
    />
  );
}
```

### Inverted Style Footer

```tsx
import React from 'react';
import { NavigationFooter } from '@czi-sds/components';

function InvertedStyleExample() {
  const quickLinks = [
    { label: 'Research Tools', url: '/tools' },
    { label: 'Data Repository', url: '/data' },
    { label: 'Publications', url: '/publications' },
    { label: 'Community', url: '/community' },
  ];

  const legalLinks = [
    { label: 'Terms of Use', url: '/terms' },
    { label: 'Privacy Policy', url: '/privacy' },
    { label: 'Cookie Policy', url: '/cookies' },
    { label: 'Accessibility', url: '/accessibility' },
  ];

  return (
    <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
      {/* Main content would go here */}
      <div style={{ padding: '40px 0' }}>
        <h1 style={{ color: 'white', textAlign: 'center' }}>
          Dark Theme Application
        </h1>
      </div>
      
      <NavigationFooter
        title="Research Platform"
        tag="Enterprise"
        tagColor="positive"
        navItems={quickLinks}
        navLinks={legalLinks}
        hasInvertedStyle={true}
      />
    </div>
  );
}
```

### With Theme Integration

```tsx
import React from 'react';
import { NavigationFooter, getColors, getSpaces } from '@czi-sds/components';
import styled from '@emotion/styled';

const StyledPageWrapper = styled.div`
  ${(props) => {
    const colors = getColors(props);
    return `
      background-color: ${colors?.gray[50]};
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    `;
  }}
`;

const StyledMainContent = styled.div`
  ${(props) => {
    const spaces = getSpaces(props);
    return `
      flex: 1;
      padding: ${spaces?.xl}px;
    `;
  }}
`;

function ThemedExample() {
  const platformNavigation = [
    { label: 'Home', url: '/' },
    { label: 'Research Areas', url: '/research' },
    { label: 'Tools & Resources', url: '/tools' },
    { label: 'Publications', url: '/publications' },
    { label: 'About Us', url: '/about' },
  ];

  const supportLinks = [
    { label: 'Help Center', url: '/help' },
    { label: 'API Docs', url: '/api' },
    { label: 'Status Page', url: '/status' },
    { label: 'Contact Us', url: '/contact' },
  ];

  return (
    <StyledPageWrapper>
      <StyledMainContent>
        <h1>Scientific Research Platform</h1>
        <p>Main application content goes here...</p>
      </StyledMainContent>
      
      <NavigationFooter
        title="Research Hub"
        tag="v3.0"
        tagColor="notice"
        navItems={platformNavigation}
        navLinks={supportLinks}
      />
    </StyledPageWrapper>
  );
}
```

## Variations

### Style Variations

- **Standard**: Default light theme with dark text on light background
- **Inverted**: Dark theme with light text on dark background

### Layout Variations

The component automatically adapts its layout based on screen size:
- **Desktop**: Multi-column layout with horizontal arrangement
- **Tablet/Mobile**: Stacked layout with vertical arrangement and scrollable sections

### Tag Color Variations

- **info**: Blue color scheme for informational tags
- **positive**: Green color scheme for success/positive tags
- **notice**: Orange color scheme for notice/warning tags
- **negative**: Red color scheme for error/negative tags
- **beta**: Purple color scheme for beta/preview tags
- **neutral**: Gray color scheme for neutral tags

## Component States

- **Default**: Normal interactive state for all links and images
- **Hover**: Visual feedback on mouse hover for interactive elements
- **Focus**: Keyboard focus states for accessibility
- **Responsive**: Automatic layout adaptation for different screen sizes

## Best Practices

### When to Use

- Use at the bottom of pages to provide site-wide navigation
- Ideal for displaying partner/sponsor logos and acknowledgments
- Perfect for legal links, support information, and secondary navigation
- Use when you need consistent footer across multiple pages

### When Not to Use

- Don't use for primary navigation - use NavigationHeader instead
- Avoid for content-specific actions - use regular buttons or links
- Don't use when footer content changes frequently per page

### Accessibility Guidelines

- All links include proper `href` attributes and are keyboard accessible
- Images include appropriate `alt` text when provided as img elements
- Component maintains proper heading hierarchy
- Supports screen readers with semantic HTML structure
- Focus management works correctly for keyboard navigation
- Color contrast meets WCAG AA guidelines for both standard and inverted styles

### Design Guidelines

- Keep navigation items concise and clearly labeled
- Use consistent link categorization (main nav vs. footer links)
- Provide meaningful alt text for partner/sponsor images
- Maintain visual hierarchy between different link sections
- Use appropriate tag colors that match their semantic meaning

### Responsive Guidelines

- Component automatically adapts layout for mobile devices
- Navigation items stack vertically on smaller screens
- Images arrange in horizontal rows on mobile
- Scrollable sections maintain accessibility on touch devices

## Related Components

- **NavigationHeader** - Use for primary site navigation at the top
- **Link** - Individual link component used internally
- **Tag** - Status/version tag component used for the title tag
- **Tabs** - Use for content-area navigation

## Migration Notes

- **Responsive Behavior**: Component uses ResizeObserver for dynamic layout adaptation
- **Link Components**: Supports custom link components for integration with routing libraries
- **Image Handling**: Images are passed as React nodes for maximum flexibility

## API Reference

- [Storybook Stories](https://main--61e7b0c7c7b2df00213dc295.chromatic.com/?path=/story/components-navigationfooter) - Interactive examples and testing
- [Tag Component](./tag.md) - Tag component used for version/status indicators
- [Link Component](./link.md) - Link component used internally for navigation items
- [Design Tokens](https://zeroheight.com/2e0e8f7fc/p/6138ce-design-tokens) - Available theme tokens and values