# InputSearch

## Overview

The InputSearch component is a specialized text input field designed for search functionality. It features a built-in search icon, submit handling on Enter key press, and a clear button for easy input reset. Built on Material UI's TextField component, it provides a consistent search experience with customizable styling and accessibility features.

This component is ideal for search bars, filter inputs, query interfaces, and any scenario where users need to input search terms with immediate feedback and submission capabilities.

## Installation & Import

```tsx
import { InputSearch } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| label | `string` | ✓ | - | Label text for the input field |
| id | `string` | ✓ | - | Unique identifier for the input element |
| placeholder | `string` | - | - | Placeholder text shown when input is empty |
| value | `string` | - | - | Controlled value of the input |
| onChange | `(event: ChangeEvent<HTMLInputElement>) => void` | - | - | Callback fired when input value changes |
| handleSubmit | `(value: string) => void` | - | - | Callback fired when search is submitted |
| sdsStyle | `"rounded" \| "square"` | - | `"square"` | Visual style variant of the component |
| intent | `"default" \| "negative" \| "notice" \| "positive"` | - | `"default"` | Visual intent/state for styling |
| disabled | `boolean` | - | `false` | If true, disables the input |
| fullWidth | `boolean` | - | `false` | If true, input takes full width of container |
| size | `"small" \| "medium"` | - | `"medium"` | Size of the input field |
| variant | `"filled" \| "outlined" \| "standard"` | - | `"outlined"` | Material UI variant style |
| name | `string` | - | - | Name attribute for form submission |
| onClick | `function` | - | - | Click event handler |
| customTheme | `"light" \| "dark" \| "auto"` | - | - | Theme variant for styling |
| className | `string` | - | - | CSS class name for custom styling |
| style | `CSSProperties` | - | - | Inline styles object |

## Usage Examples

### Basic Search Input

```tsx
import React, { useState } from 'react';
import { InputSearch } from '@czi-sds/components';

function BasicSearchExample() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Perform search logic
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <InputSearch
      id="basic-search"
      label="Search"
      placeholder="Enter search terms..."
      value={searchQuery}
      onChange={handleChange}
      handleSubmit={handleSearch}
    />
  );
}
```

### Different Visual Styles

```tsx
import React, { useState } from 'react';
import { InputSearch } from '@czi-sds/components';

function StyleVariations() {
  const [queries, setQueries] = useState({
    square: '',
    rounded: ''
  });

  const handleQueryChange = (type: 'square' | 'rounded') => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQueries(prev => ({ ...prev, [type]: event.target.value }));
    };

  const handleSubmit = (type: string) => (query: string) => {
    console.log(`${type} search:`, query);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <InputSearch
        id="square-search"
        label="Square Style Search"
        placeholder="Search with square edges..."
        sdsStyle="square"
        value={queries.square}
        onChange={handleQueryChange('square')}
        handleSubmit={handleSubmit('Square')}
      />
      
      <InputSearch
        id="rounded-search"
        label="Rounded Style Search"
        placeholder="Search with rounded edges..."
        sdsStyle="rounded"
        value={queries.rounded}
        onChange={handleQueryChange('rounded')}
        handleSubmit={handleSubmit('Rounded')}
      />
    </div>
  );
}
```

### Intent States for Validation

```tsx
import React, { useState } from 'react';
import { InputSearch } from '@czi-sds/components';

function ValidationSearch() {
  const [query, setQuery] = useState('');
  const [searchState, setSearchState] = useState<'default' | 'notice' | 'negative' | 'positive'>('default');
  const [message, setMessage] = useState('');

  const validateAndSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchState('negative');
      setMessage('Search query cannot be empty');
      return;
    }

    if (searchQuery.length < 3) {
      setSearchState('notice');
      setMessage('Search query should be at least 3 characters');
      return;
    }

    // Simulate search
    setSearchState('positive');
    setMessage(`Searching for: "${searchQuery}"`);
    
    // Reset to default after some time
    setTimeout(() => {
      setSearchState('default');
      setMessage('');
    }, 3000);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    if (searchState !== 'default') {
      setSearchState('default');
      setMessage('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <InputSearch
        id="validation-search"
        label="Validated Search"
        placeholder="Enter at least 3 characters..."
        value={query}
        onChange={handleChange}
        handleSubmit={validateAndSearch}
        intent={searchState}
      />
      
      {message && (
        <p style={{ 
          color: searchState === 'negative' ? 'red' : 
                 searchState === 'notice' ? 'orange' : 
                 searchState === 'positive' ? 'green' : 'black',
          fontSize: '14px',
          margin: 0
        }}>
          {message}
        </p>
      )}
    </div>
  );
}
```

### Size Variations

```tsx
import React, { useState } from 'react';
import { InputSearch } from '@czi-sds/components';

function SizeVariations() {
  const [smallQuery, setSmallQuery] = useState('');
  const [mediumQuery, setMediumQuery] = useState('');

  const handleSubmit = (size: string) => (query: string) => {
    console.log(`${size} search submitted:`, query);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <InputSearch
        id="small-search"
        label="Small Search"
        placeholder="Compact search input..."
        size="small"
        value={smallQuery}
        onChange={(e) => setSmallQuery(e.target.value)}
        handleSubmit={handleSubmit('Small')}
      />
      
      <InputSearch
        id="medium-search"
        label="Medium Search (Default)"
        placeholder="Standard size search input..."
        size="medium"
        value={mediumQuery}
        onChange={(e) => setMediumQuery(e.target.value)}
        handleSubmit={handleSubmit('Medium')}
      />
    </div>
  );
}
```

### Real-time Search with Debouncing

```tsx
import React, { useState, useEffect, useCallback } from 'react';
import { InputSearch } from '@czi-sds/components';

function RealTimeSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock data
  const mockData = [
    'Gene Expression Analysis',
    'Protein Sequencing',
    'Cell Culture Protocol',
    'RNA Extraction Method',
    'DNA Amplification',
    'Mass Spectrometry',
    'Microscopy Techniques',
    'Bioinformatics Pipeline'
  ];

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.trim()) {
        setIsSearching(true);
        // Simulate API call
        setTimeout(() => {
          const filtered = mockData.filter(item =>
            item.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setResults(filtered);
          setIsSearching(false);
        }, 300);
      } else {
        setResults([]);
        setIsSearching(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (searchQuery: string) => {
    console.log('Search submitted:', searchQuery);
  };

  return (
    <div style={{ position: 'relative', width: '400px' }}>
      <InputSearch
        id="realtime-search"
        label="Real-time Search"
        placeholder="Search protocols and methods..."
        value={query}
        onChange={handleChange}
        handleSubmit={handleSubmit}
        fullWidth
      />
      
      {(results.length > 0 || isSearching) && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxHeight: '200px',
          overflowY: 'auto',
          zIndex: 1000
        }}>
          {isSearching ? (
            <div style={{ padding: '12px', textAlign: 'center' }}>
              Searching...
            </div>
          ) : (
            results.map((result, index) => (
              <div
                key={index}
                style={{
                  padding: '12px',
                  borderBottom: index < results.length - 1 ? '1px solid #eee' : 'none',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setQuery(result);
                  setResults([]);
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                {result}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// Utility debounce function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
```

### Form Integration

```tsx
import React, { useState } from 'react';
import { InputSearch, Button } from '@czi-sds/components';

function SearchForm() {
  const [searchData, setSearchData] = useState({
    query: '',
    category: 'all'
  });
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(prev => ({ ...prev, query: event.target.value }));
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      // Add to search history
      setSearchHistory(prev => {
        const newHistory = [query, ...prev.filter(item => item !== query)];
        return newHistory.slice(0, 5); // Keep only last 5 searches
      });
      
      console.log('Search submitted:', { ...searchData, query });
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <InputSearch
        id="form-search"
        name="search"
        label="Research Database Search"
        placeholder="Search papers, protocols, datasets..."
        value={searchData.query}
        onChange={handleSearchChange}
        handleSubmit={handleSearch}
        fullWidth
      />

      {searchHistory.length > 0 && (
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <h4 style={{ margin: 0, fontSize: '14px' }}>Recent Searches</h4>
            <Button 
              onClick={clearHistory}
              sdsStyle="minimal"
              sdsType="secondary"
              size="small"
            >
              Clear
            </Button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {searchHistory.map((historyItem, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchData(prev => ({ ...prev, query: historyItem }));
                  handleSearch(historyItem);
                }}
                style={{
                  padding: '4px 8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                {historyItem}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

### Disabled State

```tsx
import React, { useState } from 'react';
import { InputSearch, Button } from '@czi-sds/components';

function DisabledSearch() {
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = (searchQuery: string) => {
    console.log('Search:', searchQuery);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <label>
          <input
            type="checkbox"
            checked={isSearchEnabled}
            onChange={(e) => setIsSearchEnabled(e.target.checked)}
          />
          Enable search functionality
        </label>
      </div>

      <InputSearch
        id="disabled-search"
        label="Database Search"
        placeholder={isSearchEnabled ? "Enter search terms..." : "Search is disabled"}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        handleSubmit={handleSearch}
        disabled={!isSearchEnabled}
        intent={!isSearchEnabled ? "notice" : "default"}
      />

      <p style={{ fontSize: '14px', color: '#666' }}>
        {isSearchEnabled 
          ? "Search is enabled - you can enter queries"
          : "Check the box above to enable search functionality"
        }
      </p>
    </div>
  );
}
```

### With Theme Integration

```tsx
import React, { useState } from 'react';
import { InputSearch, getColors, getSpaces } from '@czi-sds/components';
import styled from '@emotion/styled';

const SearchContainer = styled.div`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    
    return `
      background-color: ${colors?.gray[100]};
      padding: ${spaces?.l}px;
      border-radius: 12px;
      border: 1px solid ${colors?.gray[300]};
      display: flex;
      flex-direction: column;
      gap: ${spaces?.m}px;
    `;
  }}
`;

const ResultsContainer = styled.div`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    
    return `
      background-color: ${colors?.common.white};
      border: 1px solid ${colors?.gray[300]};
      border-radius: 8px;
      padding: ${spaces?.m}px;
      min-height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${colors?.gray[600]};
    `;
  }}
`;

function ThemedSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string>('');

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setSearchResults(`Searching for: "${query}"`);
      
      // Simulate async search
      setTimeout(() => {
        setSearchResults(`Found results for: "${query}"`);
      }, 1000);
    } else {
      setSearchResults('');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    if (!event.target.value.trim()) {
      setSearchResults('');
    }
  };

  return (
    <SearchContainer>
      <h3 style={{ margin: 0 }}>Scientific Literature Search</h3>
      
      <InputSearch
        id="themed-search"
        label="Search Query"
        placeholder="Enter keywords, authors, or topics..."
        value={searchQuery}
        onChange={handleChange}
        handleSubmit={handleSearch}
        sdsStyle="rounded"
        fullWidth
      />

      <ResultsContainer>
        {searchResults || 'Enter a search term to begin'}
      </ResultsContainer>
    </SearchContainer>
  );
}
```

## Variations

### SDS Style Variations

- **square**: Default rectangular appearance with sharp corners
- **rounded**: Rounded corners for softer visual styling

### Intent Variations

- **default**: Standard neutral appearance
- **positive**: Green accent for successful searches or confirmations
- **notice**: Yellow/orange accent for warnings or important information
- **negative**: Red accent for errors or invalid input

### Size Variations

- **small**: Compact size for dense interfaces or secondary search inputs
- **medium**: Standard size for most use cases (default)

## Component States

- **Default**: Normal interactive state ready for input
- **Focused**: Active state when input receives focus, showing focus ring
- **Filled**: State when input contains text
- **Disabled**: Non-interactive state when `disabled={true}`
- **Submitted**: Momentary state during search submission

## Best Practices

### When to Use

- Use for search functionality across your application
- Ideal for filter interfaces and query builders
- Perfect for real-time search with autocomplete suggestions
- Recommended for research databases and content discovery

### When Not to Use

- Avoid for general text input - use InputText instead
- Don't use for form fields that aren't search-related
- Consider Autocomplete for complex search with predefined options

### Accessibility Guidelines

- Always provide meaningful labels via the `label` prop
- Use proper `id` attributes for screen reader association
- Component includes built-in ARIA attributes and roles
- Supports full keyboard navigation (Tab, Enter, Escape)
- Search icon and clear button are accessible via keyboard
- Submit functionality works with Enter key press

### UX Guidelines

- Provide clear placeholder text that explains what users can search for
- Implement debouncing for real-time search to avoid excessive API calls  
- Show loading states during search operations
- Clear input provides immediate feedback and resets search state
- Use appropriate intent colors to communicate search state

### Design Guidelines

- Maintain consistent styling across search interfaces
- Use appropriate size based on the search importance and available space
- Provide visual feedback for successful/failed searches
- Consider search result presentation below or near the input
- Ensure adequate spacing for touch targets

## Related Components

- **InputText** - Use for general text input without search functionality
- **Autocomplete** - Use for searchable selection from predefined options
- **ComplexFilter** - Use for advanced filtering interfaces
- **InputDropdown** - Use for selecting from limited search categories

## Migration Notes

### From Legacy Search Components

- **Props Changes**: `handleSubmit` replaces separate submit button handling
- **Styling**: New `sdsStyle` prop replaces individual style configurations
- **Intent System**: Use `intent` prop instead of separate color/theme props

### Breaking Changes in v2.x

- Clear button functionality is now built-in
- Submit behavior standardized with Enter key and `handleSubmit` callback
- Accessibility requirements now enforce `id` and `label` props

## API Reference

- [Storybook Stories](https://main--64ad2577a2c26e0097ff24a6.chromatic.com/?path=/story/components-inputs-inputsearch--default) - Interactive examples and testing
- [Material UI TextField](https://mui.com/material-ui/react-text-field/) - Underlying MUI component documentation  
- [Design Tokens](https://zeroheight.com/2a1e5182b/p/6145b2-design-tokens) - Available theme tokens and values