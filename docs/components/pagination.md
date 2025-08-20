# Pagination

## Overview

The Pagination component provides navigation controls for paginated content, allowing users to navigate between pages of data. It features intelligent page range calculation, truncation with dropdown options for large page counts, and customizable styling. The component is commonly used with tables and lists to manage large datasets efficiently.

## Installation & Import

```tsx
import { Pagination } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| totalCount | `number` | ✓ | - | Total number of items across all pages |
| pageSize | `number` | ✓ | - | Number of items per page |
| currentPage | `number` | ✓ | - | Current active page number (1-indexed) |
| onPageChange | `(page: number) => void` | ✓ | - | Callback fired when a page number is clicked |
| onNextPage | `() => void` | ✓ | - | Callback fired when next page button is clicked |
| onPreviousPage | `() => void` | ✓ | - | Callback fired when previous page button is clicked |
| siblingCount | `number` | - | `1` | Number of page numbers to show on each side of current page |
| truncateDropdown | `boolean` | - | `true` | Whether to show dropdown for truncated pages or dots |
| sdsStyle | `"round" \| "square"` | - | `"round"` | Visual style variant of the pagination buttons |
| className | `string` | - | - | Standard React className prop |
| style | `CSSProperties` | - | - | Standard React style prop |
| id | `string` | - | - | Standard React id prop |
| children | `ReactNode` | - | - | Standard React children prop |

## Usage Examples

### Basic Usage

```tsx
import React, { useState } from 'react';
import { Pagination } from '@czi-sds/components';

function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 200;
  const itemsPerPage = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`Navigating to page ${page}`);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <Pagination
      totalCount={totalItems}
      pageSize={itemsPerPage}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      onNextPage={handleNextPage}
      onPreviousPage={handlePreviousPage}
      siblingCount={1}
      sdsStyle="round"
    />
  );
}
```

### Advanced Usage with Data Fetching

```tsx
import React, { useState, useEffect } from 'react';
import { Pagination } from '@czi-sds/components';

interface DataItem {
  id: number;
  title: string;
  description: string;
}

interface PaginatedResponse {
  data: DataItem[];
  totalCount: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

function AdvancedExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<DataItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const pageSize = 10;

  // Simulate data fetching
  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      // Replace with actual API call
      const response = await fetch(`/api/data?page=${page}&limit=${pageSize}`);
      const result: PaginatedResponse = await response.json();
      
      setData(result.data);
      setTotalCount(result.totalCount);
      setCurrentPage(result.currentPage);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(totalCount / pageSize);
    if (currentPage < maxPage) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Data display */}
      <div style={{ marginBottom: '24px' }}>
        {data.map((item) => (
          <div key={item.id} style={{ 
            padding: '16px', 
            border: '1px solid #e0e0e0', 
            marginBottom: '8px',
            borderRadius: '4px'
          }}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        siblingCount={2}
        truncateDropdown={true}
        sdsStyle="square"
      />
    </div>
  );
}
```

### Table Integration Example

```tsx
import React, { useState } from 'react';
import { Pagination } from '@czi-sds/components';

interface TableRow {
  id: number;
  name: string;
  email: string;
  status: string;
}

function TableWithPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  
  // Mock data - in real app, this would come from API
  const allData: TableRow[] = Array.from({ length: 47 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Inactive' : 'Pending',
  }));

  // Calculate pagination
  const totalCount = allData.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = allData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(totalCount / pageSize);
    if (currentPage < maxPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      
      {/* Table */}
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse', 
        marginBottom: '24px' 
      }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row) => (
            <tr key={row.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px' }}>{row.id}</td>
              <td style={{ padding: '12px' }}>{row.name}</td>
              <td style={{ padding: '12px' }}>{row.email}</td>
              <td style={{ padding: '12px' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  backgroundColor: row.status === 'Active' ? '#e8f5e8' : 
                                  row.status === 'Inactive' ? '#ffeaea' : '#fff3cd',
                  color: row.status === 'Active' ? '#2e7d32' : 
                         row.status === 'Inactive' ? '#d32f2f' : '#ed6c02'
                }}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          totalCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          siblingCount={1}
          truncateDropdown={true}
        />
      </div>

      {/* Results summary */}
      <p style={{ textAlign: 'center', marginTop: '16px', color: '#666' }}>
        Showing {startIndex + 1}-{Math.min(endIndex, totalCount)} of {totalCount} results
      </p>
    </div>
  );
}
```

### With Theme Integration

```tsx
import React, { useState } from 'react';
import { Pagination, getColors, getSpaces } from '@czi-sds/components';
import styled from '@emotion/styled';

const StyledPaginationContainer = styled.div`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    return `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${spaces?.m}px;
      padding: ${spaces?.l}px;
      background-color: ${colors?.gray[50]};
      border-radius: 8px;
      border: 1px solid ${colors?.gray[200]};
    `;
  }}
`;

const StyledResultsInfo = styled.p`
  ${(props) => {
    const colors = getColors(props);
    return `
      margin: 0;
      color: ${colors?.gray[600]};
      font-size: 14px;
    `;
  }}
`;

function ThemedExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = 156;
  const pageSize = 12;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(totalCount / pageSize);
    if (currentPage < maxPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  return (
    <StyledPaginationContainer>
      <StyledResultsInfo>
        Showing {startItem}-{endItem} of {totalCount} items
      </StyledResultsInfo>
      
      <Pagination
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        siblingCount={2}
        sdsStyle="round"
        truncateDropdown={true}
      />
    </StyledPaginationContainer>
  );
}
```

## Variations

### Style Variations

- **round**: Default rounded button appearance
- **square**: Sharp-cornered button appearance for modern interfaces

### Truncation Behavior

- **truncateDropdown: true**: Shows dropdown menu for truncated page ranges
- **truncateDropdown: false**: Shows ellipsis (...) for truncated page ranges

### Sibling Count Variations

- **siblingCount: 1**: Shows 1 page number on each side of current page (compact)
- **siblingCount: 2-3**: Shows more page numbers for easier navigation (standard)
- **siblingCount: 4+**: Shows many page numbers (spacious, for wide layouts)

## Component States

- **Default**: Normal interactive state for all buttons
- **Current**: Active/selected state for current page button
- **Disabled**: Non-interactive state for first/last page navigation buttons
- **Hover**: Visual feedback on mouse hover for all interactive elements
- **Focus**: Keyboard focus states for accessibility

## Best Practices

### When to Use

- Use for datasets with more than one page of results
- Ideal for tables, lists, and search results
- Perfect for maintaining page context in URLs
- Use when users need to navigate to specific page numbers

### When Not to Use

- Don't use for small datasets that fit on one page
- Avoid for infinite scroll scenarios
- Don't use when load-more patterns are more appropriate
- Avoid when exact page numbers aren't important to users

### Page Size Guidelines

- **Small datasets (< 50 items)**: 10-15 items per page
- **Medium datasets (50-500 items)**: 20-25 items per page
- **Large datasets (500+ items)**: 25-50 items per page
- Consider user context and content complexity

### Accessibility Guidelines

- All page buttons are keyboard accessible with proper tab order
- ARIA labels provide context for screen readers
- Previous/Next buttons include descriptive aria-labels
- Current page is announced to screen readers
- Focus management works correctly for keyboard navigation
- Color is not the only indicator of current page state

### Performance Considerations

- Only render visible page numbers to optimize performance
- Use efficient pagination algorithms for large datasets
- Consider server-side pagination for very large datasets
- Debounce rapid page changes to prevent excessive API calls

## Related Components

- **Table** - Often used together for data display
- **NavigationHeader** - For main site navigation
- **Button** - Individual button component used internally
- **InputDropdown** - Used for page size selection in advanced scenarios

## Migration Notes

- **Page Indexing**: Component uses 1-based page indexing (pages start at 1, not 0)
- **Error Handling**: Throws error if pageSize is less than 1
- **Null Rendering**: Returns null if currentPage is 0 or total pages < 2
- **Event Handling**: Provides separate callbacks for different navigation actions

## API Reference

- [Storybook Stories](https://main--61e7b0c7c7b2df00213dc295.chromatic.com/?path=/story/components-table-pagination) - Interactive examples and testing
- [Material UI Pagination](https://mui.com/material-ui/react-pagination/) - Related MUI component reference
- [Design Tokens](https://zeroheight.com/2e0e8f7fc/p/6138ce-design-tokens) - Available theme tokens and values