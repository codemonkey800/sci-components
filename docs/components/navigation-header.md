# NavigationHeader

## Overview

The NavigationHeader component provides a comprehensive application header with logo, primary and secondary navigation, search functionality, and action buttons. It features responsive behavior with automatic mobile drawer navigation, scroll elevation effects, and both standard and inverted color schemes. This component serves as the main navigation hub for scientific applications.

## Installation & Import

```tsx
import { NavigationHeader } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| title | `string` | ✓ | - | The main title displayed next to the logo |
| logo | `ReactNode` | - | - | Logo element (image, SVG, or custom component) |
| logoUrl | `string` | - | - | URL for the logo link |
| logoLinkComponent | `ElementType` | - | `"a"` | Component type for the logo link |
| logoLinkProps | `LinkProps` | - | - | Additional props to pass to the logo link component |
| tag | `string` | - | - | Tag label to display next to the title |
| tagColor | `SdsTagColorType` | - | - | Color scheme for the tag |
| hasInvertedStyle | `boolean` | - | `false` | If `true`, uses inverted colors |
| showSearch | `boolean` | - | `true` | If `true`, displays the search input |
| searchProps | `Partial<InputSearchProps>` | - | - | Props to pass to the search input |
| scrollElevation | `boolean` | - | `true` | If `true`, adds elevation on scroll |
| primaryNavItems | `NavigationHeaderPrimaryNavItem[]` | - | - | Array of primary navigation items |
| primaryNavPosition | `"left" \| "right"` | - | `"left"` | Position of primary navigation relative to search |
| activePrimaryNavKey | `string` | - | - | Key of the currently active primary nav item |
| setActivePrimaryNavKey | `(key: string) => void` | - | - | Callback to set active primary nav item |
| secondaryNavItems | `NavigationHeaderSecondaryNavItem[]` | - | - | Array of secondary navigation items |
| buttons | `Array<Partial<SdsProps & ButtonProps> \| ReactNode>` | - | - | Array of button components or props |
| drawerOpen | `boolean` | - | - | Controlled drawer open state (mobile) |
| setDrawerOpen | `(open: boolean) => void` | - | - | Callback to control drawer state |
| className | `string` | - | - | Standard React className prop |
| style | `CSSProperties` | - | - | Standard React style prop |
| id | `string` | - | - | Standard React id prop |

### NavigationHeaderPrimaryNavItem Interface

| Property Name | Type | Required | Description |
|---------------|------|----------|-------------|
| key | `string` | ✓ | Unique identifier for the nav item |
| label | `string` | ✓ | Text label for the navigation item |
| itemType | `"text" \| "dropdown"` | - | Type of navigation item |
| component | `ElementType` | - | Component type for the link |
| href | `string` | - | URL for the navigation link |
| onClick | `() => void` | - | Click handler for the item |
| tag | `string` | - | Tag to display next to label |
| tagColor | `SdsTagColorType` | - | Color for the tag |
| items | `DropdownItem[]` | - | Dropdown menu items (if itemType is "dropdown") |

### NavigationHeaderSecondaryNavItem Interface

| Property Name | Type | Required | Description |
|---------------|------|----------|-------------|
| label | `string` | ✓ | Text label for the navigation item |
| itemType | `"text" \| "dropdown"` | - | Type of navigation item |
| component | `ElementType` | - | Component type for the link |
| href | `string` | - | URL for the navigation link |
| onClick | `() => void` | - | Click handler for the item |
| items | `DropdownItem[]` | - | Dropdown menu items (if itemType is "dropdown") |

## Usage Examples

### Basic Usage

```tsx
import React, { useState } from 'react';
import { NavigationHeader } from '@czi-sds/components';

function MyComponent() {
  const [activeNav, setActiveNav] = useState('home');

  const primaryNavItems = [
    {
      key: 'home',
      label: 'Home',
      onClick: () => console.log('Home clicked'),
    },
    {
      key: 'research',
      label: 'Research',
      href: '/research',
    },
    {
      key: 'publications',
      label: 'Publications',
      href: '/publications',
    },
  ];

  return (
    <NavigationHeader
      title="Science Platform"
      primaryNavItems={primaryNavItems}
      activePrimaryNavKey={activeNav}
      setActivePrimaryNavKey={setActiveNav}
      showSearch={true}
    />
  );
}
```

### Advanced Usage with Dropdown Navigation

```tsx
import React, { useState } from 'react';
import { NavigationHeader } from '@czi-sds/components';

// Custom logo component
const PlatformLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="14" fill="#1976d2" />
    <text x="16" y="20" textAnchor="middle" fill="white" fontSize="12">SP</text>
  </svg>
);

function AdvancedExample() {
  const [activeNav, setActiveNav] = useState('dashboard');

  const primaryNavItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      onClick: () => console.log('Dashboard clicked'),
    },
    {
      key: 'tools',
      label: 'Tools',
      itemType: 'dropdown' as const,
      items: [
        {
          label: 'Data Analysis',
          href: '/tools/analysis',
        },
        {
          label: 'Visualization',
          href: '/tools/visualization',
        },
        {
          label: 'Machine Learning',
          href: '/tools/ml',
        },
      ],
    },
    {
      key: 'experiments',
      label: 'Experiments',
      tag: 'Beta',
      tagColor: 'beta',
      href: '/experiments',
    },
  ];

  const secondaryNavItems = [
    {
      label: 'Help',
      itemType: 'dropdown' as const,
      items: [
        {
          label: 'Documentation',
          href: '/docs',
        },
        {
          label: 'API Reference',
          href: '/api',
        },
        {
          label: 'Support',
          href: '/support',
        },
      ],
    },
    {
      label: 'About',
      href: '/about',
    },
  ];

  const actionButtons = [
    {
      children: 'Sign In',
      sdsType: 'secondary' as const,
      onClick: () => console.log('Sign in clicked'),
    },
    {
      children: 'Profile',
      icon: 'Person',
      onClick: () => console.log('Profile clicked'),
    },
  ];

  return (
    <NavigationHeader
      logo={<PlatformLogo />}
      logoUrl="/"
      title="Research Hub"
      tag="v3.0"
      tagColor="info"
      primaryNavItems={primaryNavItems}
      secondaryNavItems={secondaryNavItems}
      activePrimaryNavKey={activeNav}
      setActivePrimaryNavKey={setActiveNav}
      buttons={actionButtons}
      showSearch={true}
      searchProps={{
        placeholder: 'Search experiments, data, publications...',
        onChange: (value) => console.log('Search:', value),
      }}
      scrollElevation={true}
    />
  );
}
```

### Controlled Mobile Drawer

```tsx
import React, { useState } from 'react';
import { NavigationHeader } from '@czi-sds/components';

function ControlledDrawerExample() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('');

  const navigation = [
    { key: 'data', label: 'Data Repository' },
    { key: 'analysis', label: 'Analysis Tools' },
    { key: 'collaboration', label: 'Collaboration' },
  ];

  return (
    <>
      <NavigationHeader
        title="Mobile-First Platform"
        primaryNavItems={navigation}
        activePrimaryNavKey={activeNav}
        setActivePrimaryNavKey={setActiveNav}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        buttons={[
          {
            children: 'Get Started',
            sdsType: 'primary' as const,
            onClick: () => setDrawerOpen(false),
          },
        ]}
      />
      
      {/* Main content */}
      <div style={{ padding: '20px' }}>
        <h1>Mobile Navigation Demo</h1>
        <p>Resize the window to see mobile drawer behavior</p>
        <button onClick={() => setDrawerOpen(true)}>
          Open Mobile Menu
        </button>
      </div>
    </>
  );
}
```

### With Theme Integration

```tsx
import React, { useState } from 'react';
import { NavigationHeader, getColors, getSpaces } from '@czi-sds/components';
import styled from '@emotion/styled';

const StyledPageWrapper = styled.div`
  ${(props) => {
    const colors = getColors(props);
    return `
      background-color: ${colors?.gray[50]};
      min-height: 100vh;
    `;
  }}
`;

const StyledMainContent = styled.main`
  ${(props) => {
    const spaces = getSpaces(props);
    return `
      padding: ${spaces?.xl}px;
    `;
  }}
`;

function ThemedExample() {
  const [activeNav, setActiveNav] = useState('home');

  const primaryNavigation = [
    { key: 'home', label: 'Home', href: '/' },
    { key: 'research', label: 'Research Areas', href: '/research' },
    { key: 'publications', label: 'Publications', href: '/publications' },
  ];

  return (
    <StyledPageWrapper>
      <NavigationHeader
        title="Themed Platform"
        primaryNavItems={primaryNavigation}
        activePrimaryNavKey={activeNav}
        setActivePrimaryNavKey={setActiveNav}
        hasInvertedStyle={false}
        scrollElevation={true}
      />
      
      <StyledMainContent>
        <h1>Themed Application Content</h1>
        <p>This content uses the same theme tokens as the navigation header.</p>
      </StyledMainContent>
    </StyledPageWrapper>
  );
}
```

## Variations

### Style Variations

- **Standard**: Default light theme with standard Material-UI styling
- **Inverted**: Dark theme with light text on dark background

### Position Variations

- **Sticky**: Default behavior that sticks to top on scroll (recommended)
- **Fixed**: Always fixed to top of viewport
- **Static**: Normal document flow positioning
- **Relative**: Positioned relative to normal flow

### Navigation Positions

- **Left**: Primary navigation appears to the left of search (default)
- **Right**: Primary navigation appears to the right of search

### Responsive Behavior

- **Desktop**: Full navigation with all items visible
- **Tablet/Mobile**: Collapsible drawer navigation with hamburger menu

## Component States

- **Default**: Normal interactive state with hover effects
- **Scroll Elevated**: Elevated state when page is scrolled (if enabled)
- **Mobile Drawer Open**: Drawer navigation visible on mobile
- **Focus**: Keyboard focus states for all interactive elements

## Best Practices

### When to Use

- Use as the primary navigation component for web applications
- Ideal for complex applications with multiple navigation levels
- Perfect when you need integrated search functionality
- Use when responsive mobile navigation is required

### When Not to Use

- Don't use for simple single-page applications without navigation
- Avoid for content-heavy sites that need different navigation patterns
- Don't use when footer navigation is more appropriate

### Accessibility Guidelines

- All navigation items are keyboard accessible
- Proper ARIA labels and roles for screen readers
- Focus management for mobile drawer navigation
- Search input includes proper labeling
- Color contrast meets WCAG AA guidelines
- Supports screen reader navigation announcements

### Navigation Design Guidelines

- Keep primary navigation items to 5-7 items maximum
- Use clear, descriptive labels for navigation items
- Group related functionality in dropdown menus
- Place most important actions in primary navigation
- Use secondary navigation for supplementary or contextual actions

### Mobile Considerations

- Component automatically adapts to mobile breakpoints
- Drawer navigation provides full functionality on small screens
- Touch-friendly targets and spacing
- Swipe gestures supported for drawer interaction

## Related Components

- **NavigationFooter** - Use for footer navigation
- **Tabs** - Use for content-area navigation
- **InputSearch** - Standalone search component used internally
- **Button** - Action buttons used in the header

## Migration Notes

- **Responsive Behavior**: Uses ResizeObserver for dynamic layout adaptation
- **Controlled/Uncontrolled**: Supports both controlled and uncontrolled drawer states
- **Type Safety**: Generic type support for primary navigation keys
- **Custom Components**: Supports custom link components for routing integration

## API Reference

- [Storybook Stories](https://main--61e7b0c7c7b2df00213dc295.chromatic.com/?path=/story/components-navigationheader) - Interactive examples and testing
- [Material UI AppBar](https://mui.com/material-ui/react-app-bar/) - Underlying MUI component documentation
- [InputSearch Component](./input-search.md) - Search input component used internally
- [Design Tokens](https://zeroheight.com/2e0e8f7fc/p/6138ce-design-tokens) - Available theme tokens and values