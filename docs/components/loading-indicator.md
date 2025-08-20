# LoadingIndicator

## Overview

LoadingIndicator is a specialized feedback component that provides visual and accessible indication of loading or processing states. It displays an animated loading icon with accompanying text to inform users that content is being loaded or an operation is in progress. The component includes comprehensive accessibility features and offers two distinct visual styles.

Built with a focus on accessibility, the LoadingIndicator includes proper ARIA attributes, screen reader announcements, and live region updates to ensure all users receive appropriate feedback during loading states.

## Installation & Import

```tsx
import { LoadingIndicator } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| sdsStyle | `"minimal" \| "tag"` | ✓ | - | The visual style variant of the loading indicator |
| aria-label | `string` | - | - | Custom accessible label for screen readers |

## Usage Examples

### Basic Usage

```tsx
import React from 'react';
import { LoadingIndicator } from '@czi-sds/components';

function MyComponent() {
  return (
    <LoadingIndicator sdsStyle="minimal" />
  );
}
```

### With Custom Accessibility Label

```tsx
import React from 'react';
import { LoadingIndicator } from '@czi-sds/components';

function CustomLabelExample() {
  return (
    <LoadingIndicator 
      sdsStyle="tag"
      aria-label="Loading experiment data..."
    />
  );
}
```

### In Data Loading Scenarios

```tsx
import React, { useState, useEffect } from 'react';
import { LoadingIndicator } from '@czi-sds/components';

interface DataItem {
  id: number;
  name: string;
  value: number;
}

function DataLoadingExample() {
  const [data, setData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API call
        const response = await fetch('/api/data');
        const result = await response.json();
        
        setData(result);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <LoadingIndicator 
          sdsStyle="minimal"
          aria-label="Loading scientific data..."
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}: {item.value}</div>
      ))}
    </div>
  );
}
```

### In Form Submission

```tsx
import React, { useState } from 'react';
import { LoadingIndicator, Button, TextField } from '@czi-sds/components';

function FormSubmissionExample() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      
      // Reset form or redirect
      setFormData({ name: '', email: '' });
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        disabled={isSubmitting}
      />
      
      <TextField
        label="Email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        disabled={isSubmitting}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        sdsStyle="square"
        sdsType="primary"
      >
        {isSubmitting ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LoadingIndicator 
              sdsStyle="minimal"
              aria-label="Submitting form..."
            />
            Submitting...
          </div>
        ) : (
          'Submit'
        )}
      </Button>
    </form>
  );
}
```

### Conditional Loading States

```tsx
import React, { useState } from 'react';
import { LoadingIndicator, Button } from '@czi-sds/components';

function ConditionalLoadingExample() {
  const [loadingStates, setLoadingStates] = useState({
    data: false,
    analysis: false,
    export: false,
  });

  const toggleLoading = (key: keyof typeof loadingStates) => {
    setLoadingStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <Button onClick={() => toggleLoading('data')}>
          {loadingStates.data ? 'Stop' : 'Start'} Data Loading
        </Button>
        {loadingStates.data && (
          <div style={{ marginTop: '10px' }}>
            <LoadingIndicator 
              sdsStyle="tag"
              aria-label="Loading dataset..."
            />
          </div>
        )}
      </div>

      <div>
        <Button onClick={() => toggleLoading('analysis')}>
          {loadingStates.analysis ? 'Stop' : 'Start'} Analysis
        </Button>
        {loadingStates.analysis && (
          <div style={{ marginTop: '10px' }}>
            <LoadingIndicator 
              sdsStyle="minimal"
              aria-label="Running statistical analysis..."
            />
          </div>
        )}
      </div>

      <div>
        <Button onClick={() => toggleLoading('export')}>
          {loadingStates.export ? 'Stop' : 'Start'} Export
        </Button>
        {loadingStates.export && (
          <div style={{ marginTop: '10px' }}>
            <LoadingIndicator 
              sdsStyle="tag"
              aria-label="Exporting results..."
            />
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
import { LoadingIndicator, getColors, getSpaces } from '@czi-sds/components';
import styled from '@emotion/styled';

const LoadingContainer = styled.div`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    return `
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
      background: ${colors?.gray[50]};
      border-radius: 8px;
      border: 2px dashed ${colors?.gray[300]};
      margin: ${spaces?.l}px 0;
    `;
  }}
`;

function ThemedLoadingExample() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      <Button onClick={() => setIsLoading(!isLoading)}>
        Toggle Loading State
      </Button>
      
      {isLoading ? (
        <LoadingContainer>
          <LoadingIndicator 
            sdsStyle="tag"
            aria-label="Processing data visualization..."
          />
        </LoadingContainer>
      ) : (
        <LoadingContainer>
          <div>Content loaded successfully!</div>
        </LoadingContainer>
      )}
    </div>
  );
}
```

## Variations

### Style Variations

- **minimal**: Clean, simple loading indicator with minimal visual styling
- **tag**: Enhanced styling with background and border, similar to a tag or badge appearance

## Component Features

### Accessibility

- **ARIA Live Region**: Updates are announced to screen readers using `aria-live="polite"`
- **Role Status**: Proper `role="status"` for screen reader compatibility
- **Custom Labels**: Support for custom `aria-label` to provide context-specific information
- **Loading Announcement**: Default "Loading" text is automatically announced

### Animation

- Uses the SDS Loading icon with built-in animation
- Smooth, non-distracting animation that indicates activity
- Consistent timing and motion across all styles

## Best Practices

### When to Use

- During data fetching or API calls
- While processing user submissions
- During file uploads or downloads
- When rendering complex calculations or visualizations
- During page or component initialization

### When Not to Use

- For very quick operations (< 200ms) - loading indicators can create perceived slowness
- When you can use skeleton loading for better user experience
- For operations that should happen instantly
- In place of proper error handling

### Accessibility Guidelines

- Always provide descriptive `aria-label` text that explains what is loading
- Use the component within proper semantic structure
- Ensure loading states don't trap keyboard focus
- Consider screen reader users who need context about loading progress
- Test with assistive technologies

### UX Guidelines

- Show loading indicators for operations taking longer than 1-2 seconds
- Position loading indicators near the content being loaded
- Use consistent loading patterns throughout your application
- Consider providing progress information for long-running operations
- Allow users to cancel loading operations when appropriate

### Performance Guidelines

- Use loading indicators to mask perceived performance issues
- Implement proper error boundaries around loading states
- Consider using skeleton loading for better perceived performance
- Avoid nested or multiple simultaneous loading indicators
- Optimize the underlying operations causing the loading state

## Related Components

- **[Button](button.md)** - Often includes loading states with LoadingIndicator
- **[Notification](notification.md)** - For communicating loading completion
- **[Callout](callout.md)** - For providing loading context or instructions
- **[Icon](icon.md)** - LoadingIndicator uses the SDS Loading icon

## API Reference

- [Storybook Stories](link-to-storybook) - Interactive examples and accessibility testing
- [Icon Component Documentation](icon.md) - Details about the underlying loading icon
- [Design Tokens](link-to-tokens) - Available spacing and color tokens