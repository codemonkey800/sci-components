# Panel

## Overview

The Panel component provides a slide-out interface element that can be used for navigation, filters, detailed content, or additional tools. It supports two distinct types: basic panels that push content aside and overlay panels that appear above content. Built on Material UI's Drawer component, it includes automatic focus management, customizable positioning, and consistent Science Design System styling.

## Installation & Import

```tsx
import { Panel } from '@czi-sds/components';
```

## Props

### Common Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| sdsType | `"basic" \| "overlay"` | ✓ | - | Panel type determining behavior and positioning |
| open | `boolean` | - | `false` | Whether the panel is open/visible |
| onClose | `function` | - | - | Callback fired when panel should close |
| position | `"left" \| "right" \| "bottom"` | - | `"left"` | Position of the panel relative to viewport |
| width | `number \| string` | - | - | Custom width of the panel |
| children | `React.ReactNode` | - | - | Panel content |
| isBackdropClickEnabled | `boolean` | - | `false` | Whether clicking outside closes the panel |
| className | `string` | - | - | Additional CSS classes to apply |
| id | `string` | - | - | Unique identifier for the panel |
| style | `CSSProperties` | - | - | Inline styles to apply |

### Basic Panel Props

Basic panels push content aside and remain visible when opened.

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| position | `"left" \| "right"` | - | `"left"` | Panel position (bottom not supported for basic) |
| width | `number \| string` | - | `240px` | Panel width |

### Overlay Panel Props

Overlay panels appear above content with optional headers and close functionality.

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| position | `"left" \| "right" \| "bottom"` | - | `"left"` | Panel position |
| width | `number \| string` | - | `320px` | Panel width |
| HeaderComponent | `React.ReactNode` | - | - | Custom header content |
| closeButtonOnClick | `function` | - | - | Close button click handler |
| CloseButtonComponent | `React.ReactNode` | - | - | Custom close button component |

## Usage Examples

### Basic Panel

```tsx
import React, { useState } from 'react';
import { Panel, Button, List, ListItem, ListSubheader } from '@czi-sds/components';

function BasicPanel() {
  const [open, setOpen] = useState(false);

  const navigation = [
    'Experiments',
    'Data Analysis', 
    'Reports',
    'Settings'
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Panel
        sdsType="basic"
        open={open}
        position="left"
        width={280}
      >
        <div style={{ padding: '16px' }}>
          <List
            subheader={
              <ListSubheader>
                Laboratory Navigation
              </ListSubheader>
            }
          >
            {navigation.map((item, index) => (
              <ListItem key={index} fontSize="m" marginBottom="xs">
                <Button
                  sdsType="secondary"
                  sdsStyle="minimal"
                  fullWidth
                  style={{ justifyContent: 'flex-start' }}
                >
                  {item}
                </Button>
              </ListItem>
            ))}
          </List>
        </div>
      </Panel>

      <main style={{ flex: 1, padding: '20px' }}>
        <Button
          sdsType="primary"
          sdsStyle="rounded"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Hide' : 'Show'} Navigation
        </Button>
        
        <div style={{ marginTop: '20px' }}>
          <h1>Main Content Area</h1>
          <p>
            This is the main content area that gets pushed aside when the
            basic panel is opened. The content smoothly transitions to make
            room for the navigation panel.
          </p>
        </div>
      </main>
    </div>
  );
}
```

### Overlay Panel with Header

```tsx
import React, { useState } from 'react';
import { 
  Panel, 
  Button, 
  Icon, 
  InputText,
  InputDropdown,
  Checkbox,
  Tag 
} from '@czi-sds/components';

function FilterOverlayPanel() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: [] as string[],
    dateRange: ''
  });

  const categories = [
    'DNA Sequencing',
    'RNA Analysis', 
    'Protein Studies',
    'Cell Culture',
    'Microscopy'
  ];

  const statusOptions = [
    'In Progress',
    'Completed',
    'On Hold',
    'Failed'
  ];

  const handleStatusChange = (status: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      status: checked
        ? [...prev.status, status]
        : prev.status.filter(s => s !== status)
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      status: [],
      dateRange: ''
    });
  };

  const HeaderComponent = (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px',
      padding: '0 16px'
    }}>
      <Icon sdsIcon="Filter" sdsSize="s" />
      <div>
        <div style={{ fontWeight: '600', fontSize: '16px' }}>
          Filter Experiments
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          Refine your search results
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Button
        sdsType="secondary"
        sdsStyle="rounded"
        startIcon={<Icon sdsIcon="Filter" sdsSize="s" />}
        onClick={() => setOpen(true)}
      >
        Open Filters
      </Button>

      <Panel
        sdsType="overlay"
        open={open}
        position="right"
        width={350}
        HeaderComponent={HeaderComponent}
        closeButtonOnClick={() => setOpen(false)}
        onClose={() => setOpen(false)}
        isBackdropClickEnabled={true}
      >
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Search Filter */}
            <InputText
              label="Search Experiments"
              placeholder="Enter experiment name or ID..."
              value={filters.search}
              onChange={(value) => setFilters(prev => ({ ...prev, search: value }))}
            />

            {/* Category Filter */}
            <InputDropdown
              label="Category"
              value={filters.category}
              onChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </InputDropdown>

            {/* Status Filter */}
            <div>
              <label style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                marginBottom: '8px',
                display: 'block'
              }}>
                Status
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {statusOptions.map((status) => (
                  <Checkbox
                    key={status}
                    checked={filters.status.includes(status)}
                    onChange={(checked) => handleStatusChange(status, checked)}
                  >
                    {status}
                  </Checkbox>
                ))}
              </div>
            </div>

            {/* Date Range Filter */}
            <InputDropdown
              label="Date Range"
              value={filters.dateRange}
              onChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}
            >
              <option value="">Any Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </InputDropdown>

            {/* Active Filters */}
            {(filters.search || filters.category || filters.status.length > 0 || filters.dateRange) && (
              <div>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  marginBottom: '8px' 
                }}>
                  Active Filters
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {filters.search && (
                    <Tag
                      color="info"
                      label={`Search: "${filters.search}"`}
                      sdsStyle="rounded"
                      sdsType="secondary"
                    />
                  )}
                  {filters.category && (
                    <Tag
                      color="info"
                      label={filters.category}
                      sdsStyle="rounded"
                      sdsType="secondary"
                    />
                  )}
                  {filters.status.map((status) => (
                    <Tag
                      key={status}
                      color="info"
                      label={status}
                      sdsStyle="rounded"
                      sdsType="secondary"
                    />
                  ))}
                  {filters.dateRange && (
                    <Tag
                      color="info"
                      label={filters.dateRange}
                      sdsStyle="rounded"
                      sdsType="secondary"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              paddingTop: '20px',
              borderTop: '1px solid #e0e0e0'
            }}>
              <Button
                sdsType="secondary"
                sdsStyle="square"
                onClick={clearFilters}
                fullWidth
              >
                Clear All
              </Button>
              <Button
                sdsType="primary"
                sdsStyle="square"
                onClick={() => {
                  console.log('Applying filters:', filters);
                  setOpen(false);
                }}
                fullWidth
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </Panel>
    </>
  );
}
```

### Bottom Panel for Tools

```tsx
import React, { useState } from 'react';
import { 
  Panel, 
  Button, 
  Icon, 
  Table,
  TableHeader,
  TableRow,
  CellHeader,
  CellBasic,
  Tag
} from '@czi-sds/components';

function BottomToolPanel() {
  const [open, setOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const analysisResults = [
    { 
      sample: 'SMPL-001', 
      quality: 'High', 
      reads: '45.2M', 
      coverage: '32x',
      status: 'Complete'
    },
    { 
      sample: 'SMPL-002', 
      quality: 'Medium', 
      reads: '38.7M', 
      coverage: '28x',
      status: 'Processing'
    },
    { 
      sample: 'SMPL-003', 
      quality: 'High', 
      reads: '52.1M', 
      coverage: '35x',
      status: 'Complete'
    }
  ];

  const tools = [
    { id: 'quality', name: 'Quality Control', icon: 'CheckCircle' },
    { id: 'analysis', name: 'Statistical Analysis', icon: 'Chart' },
    { id: 'visualization', name: 'Data Visualization', icon: 'Eye' },
    { id: 'export', name: 'Export Results', icon: 'Download' }
  ];

  const HeaderComponent = (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '0 16px',
      width: '100%'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Icon sdsIcon="Tools" sdsSize="s" />
        <div>
          <div style={{ fontWeight: '600', fontSize: '16px' }}>
            Analysis Tools
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {analysisResults.length} samples processed
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '8px' }}>
        {tools.map((tool) => (
          <Button
            key={tool.id}
            sdsType={selectedTool === tool.id ? 'primary' : 'secondary'}
            sdsStyle="minimal"
            startIcon={<Icon sdsIcon={tool.icon as any} sdsSize="xs" />}
            onClick={() => setSelectedTool(tool.id)}
            size="small"
          >
            {tool.name}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1>Genomic Analysis Dashboard</h1>
        <p>
          Main analysis view with results and controls. The bottom panel provides
          additional tools and detailed information without obscuring the primary content.
        </p>
      </div>

      <Button
        sdsType="primary"
        sdsStyle="rounded"
        startIcon={<Icon sdsIcon="Tools" sdsSize="s" />}
        onClick={() => setOpen(!open)}
      >
        {open ? 'Hide' : 'Show'} Analysis Tools
      </Button>

      <Panel
        sdsType="overlay"
        open={open}
        position="bottom"
        width="100%"
        HeaderComponent={HeaderComponent}
        closeButtonOnClick={() => setOpen(false)}
        onClose={() => setOpen(false)}
        style={{ height: '400px' }}
      >
        <div style={{ padding: '20px', height: '100%', overflow: 'auto' }}>
          {selectedTool === 'analysis' || !selectedTool ? (
            <div>
              <h3 style={{ marginTop: 0, marginBottom: '16px' }}>
                Sample Analysis Results
              </h3>
              <Table>
                <TableHeader>
                  <CellHeader>Sample ID</CellHeader>
                  <CellHeader>Quality</CellHeader>
                  <CellHeader horizontalAlign="right">Total Reads</CellHeader>
                  <CellHeader horizontalAlign="right">Coverage</CellHeader>
                  <CellHeader>Status</CellHeader>
                </TableHeader>
                <tbody>
                  {analysisResults.map((result, index) => (
                    <TableRow key={index}>
                      <CellBasic primaryText={result.sample} />
                      <CellBasic 
                        primaryText={result.quality}
                        style={{ 
                          color: result.quality === 'High' ? '#4caf50' : '#ff9800'
                        }}
                      />
                      <CellBasic 
                        primaryText={result.reads} 
                        horizontalAlign="right"
                      />
                      <CellBasic 
                        primaryText={result.coverage} 
                        horizontalAlign="right"
                      />
                      <CellBasic>
                        <Tag
                          color={result.status === 'Complete' ? 'positive' : 'info'}
                          label={result.status}
                          sdsStyle="rounded"
                          sdsType="secondary"
                        />
                      </CellBasic>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <div style={{ 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <Icon 
                sdsIcon={tools.find(t => t.id === selectedTool)?.icon as any} 
                sdsSize="xl" 
                style={{ color: '#ccc' }}
              />
              <div style={{ textAlign: 'center' }}>
                <h3>{tools.find(t => t.id === selectedTool)?.name}</h3>
                <p style={{ color: '#666' }}>
                  Tool interface would be implemented here
                </p>
              </div>
            </div>
          )}
        </div>
      </Panel>
    </div>
  );
}
```

### Custom Close Button Panel

```tsx
import React, { useState } from 'react';
import { 
  Panel, 
  Button, 
  Icon, 
  List,
  ListItem,
  getColors 
} from '@czi-sds/components';
import styled from '@emotion/styled';

const CustomCloseButton = styled(Button)`
  ${(props) => {
    const colors = getColors(props);
    return `
      background-color: ${colors?.negative[500]};
      color: white;
      border-radius: 20px;
      padding: 8px 16px;
      font-size: 12px;
      
      &:hover {
        background-color: ${colors?.negative[600]};
      }
    `;
  }}
`;

function CustomCloseButtonPanel() {
  const [open, setOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'error',
      title: 'Analysis Failed',
      message: 'Sample SMPL-001 analysis encountered an error',
      time: '2 minutes ago'
    },
    {
      id: 2,
      type: 'success',
      title: 'Processing Complete',
      message: 'Batch processing completed successfully',
      time: '15 minutes ago'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Storage Warning',
      message: 'Laboratory storage capacity at 85%',
      time: '1 hour ago'
    }
  ];

  const HeaderComponent = (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px',
      padding: '0 16px'
    }}>
      <Icon sdsIcon="Bell" sdsSize="s" />
      <div>
        <div style={{ fontWeight: '600', fontSize: '16px' }}>
          Notifications
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          {notifications.length} unread messages
        </div>
      </div>
    </div>
  );

  const CustomCloseButtonComponent = (
    <CustomCloseButton
      sdsStyle="minimal"
      startIcon={<Icon sdsIcon="XMark" sdsSize="xs" />}
    >
      Close Panel
    </CustomCloseButton>
  );

  return (
    <>
      <Button
        sdsType="secondary"
        sdsStyle="rounded"
        startIcon={<Icon sdsIcon="Bell" sdsSize="s" />}
        onClick={() => setOpen(true)}
      >
        Show Notifications
      </Button>

      <Panel
        sdsType="overlay"
        open={open}
        position="right"
        width={400}
        HeaderComponent={HeaderComponent}
        CloseButtonComponent={CustomCloseButtonComponent}
        closeButtonOnClick={() => setOpen(false)}
        onClose={() => setOpen(false)}
      >
        <div style={{ padding: '20px' }}>
          <List>
            {notifications.map((notification) => (
              <ListItem key={notification.id} fontSize="m" marginBottom="s">
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '12px',
                  padding: '12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  backgroundColor: notification.type === 'error' ? '#fff5f5' :
                                   notification.type === 'success' ? '#f0fff4' :
                                   notification.type === 'warning' ? '#fffbf0' : '#ffffff'
                }}>
                  <Icon 
                    sdsIcon={
                      notification.type === 'error' ? 'ExclamationTriangle' :
                      notification.type === 'success' ? 'CheckCircle' :
                      notification.type === 'warning' ? 'InfoCircle' : 'Bell'
                    }
                    sdsSize="s"
                    style={{
                      color: notification.type === 'error' ? '#f44336' :
                             notification.type === 'success' ? '#4caf50' :
                             notification.type === 'warning' ? '#ff9800' : '#2196f3'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                      {notification.title}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                      {notification.message}
                    </div>
                    <div style={{ fontSize: '12px', color: '#999' }}>
                      {notification.time}
                    </div>
                  </div>
                </div>
              </ListItem>
            ))}
          </List>
        </div>
      </Panel>
    </>
  );
}
```

## Panel Types

### Basic Panel (`sdsType="basic"`)
- Pushes main content aside when opened
- Persistent visibility when opened
- Supports left and right positioning only
- Default width: 240px
- Ideal for navigation and permanent tools

### Overlay Panel (`sdsType="overlay"`)
- Appears above main content
- Temporary visibility with backdrop
- Supports left, right, and bottom positioning
- Default width: 320px
- Includes header area and close functionality
- Ideal for filters, detailed information, and temporary tools

## Positioning

### Left Position
- Panel slides in from the left edge
- Content flows naturally left-to-right
- Most common position for navigation

### Right Position
- Panel slides in from the right edge
- Good for secondary tools and information
- Keeps primary navigation on left unobstructed

### Bottom Position (Overlay Only)
- Panel slides up from bottom edge
- Full-width layout option available
- Excellent for tools and detailed information
- Preserves vertical content flow

## Best Practices

### When to Use

- Use Panel for navigation, filters, and supplementary content
- Ideal for tools that need persistent access but shouldn't dominate the interface
- Perfect for detailed information that complements main content
- Recommended for responsive interfaces where drawer navigation is appropriate

### When Not to Use

- Don't use for critical information that must always be visible
- Avoid for complex workflows that need dedicated pages
- Consider Dialog for modal content that requires full user attention
- Don't use for simple dropdowns or small amounts of information

### Accessibility Guidelines

- Panel automatically manages focus and keyboard navigation
- Supports screen reader navigation with proper ARIA attributes
- Escape key closes overlay panels by default
- Focus management returns to trigger element when closed
- Backdrop interactions are configurable for accessibility needs

### Design Guidelines

- Use consistent positioning patterns within your application
- Keep panel content focused and relevant to current context
- Provide clear close mechanisms for overlay panels
- Consider mobile responsiveness and touch interactions
- Use appropriate widths that don't overwhelm main content

## Related Components

- **Button** - Triggers and actions within panels
- **List** - Navigation and content organization
- **Dialog** - Alternative for modal content
- **Accordion** - Alternative for collapsible sections
- **Table** - Data display within panel content

## Migration Notes

- **Discriminated Union Types**: Clear separation between basic and overlay panel props
- **Automatic Focus Management**: Built-in accessibility features
- **Flexible Positioning**: Support for left, right, and bottom positions
- **Custom Components**: Extensible header and close button customization

## API Reference

- [Storybook Stories](https://main--61e887d56582fe003ac9595e.chromatic.com/?path=/story/components-panel--default) - Interactive examples and testing
- [Material UI Drawer](https://mui.com/material-ui/react-drawer/) - Underlying MUI component documentation
- [Panel Types](#panel-types) - Basic vs Overlay panel differences