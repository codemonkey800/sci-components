# DialogContent

## Overview

DialogContent is the main content area component for dialog interfaces, designed to house the primary information, forms, and interactive elements within modal dialogs. Built on Material UI's DialogContent foundation with Science Design System styling, it provides consistent spacing, scrolling behavior, and responsive layout for dialog body content.

The component handles content overflow automatically with appropriate scrolling behavior while maintaining proper spacing and typography hierarchy within the Science Design System's modal interaction patterns.

## Installation & Import

```tsx
import { DialogContent } from '@czi-sds/components';
// Often used with other Dialog components:
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@czi-sds/components';
```

## Props

DialogContent inherits all props from Material UI's DialogContent component:

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `ReactNode` | - | - | The main content of the dialog |
| className | `string` | - | - | Additional CSS class names |
| style | `CSSProperties` | - | - | Inline styles |
| dividers | `boolean` | - | `false` | Whether to display divider lines above and below content |

*Note: All Material UI DialogContent props are supported for advanced layout and behavior customization.*

## Usage Examples

### Basic Usage

```tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@czi-sds/components';

function BasicExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Info Dialog
      </Button>
      
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Dataset Information</DialogTitle>
        <DialogContent>
          <p>
            This dataset contains RNA sequencing data from 150 liver tissue samples 
            collected across multiple timepoints during a metabolic study.
          </p>
          <p>
            The data has been processed through standard quality control procedures 
            and is ready for downstream analysis.
          </p>
        </DialogContent>
        <DialogActions>
          <Button sdsStyle="square" sdsType="primary" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

### Form Content

```tsx
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  InputText,
  InputDropdown,
  InputCheckbox
} from '@czi-sds/components';

interface ExperimentForm {
  name: string;
  type: string;
  description: string;
  isPublic: boolean;
}

function FormContentExample() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ExperimentForm>({
    name: '',
    type: '',
    description: '',
    isPublic: false
  });

  const experimentTypes = [
    { label: 'RNA Sequencing', value: 'rna-seq' },
    { label: 'DNA Sequencing', value: 'dna-seq' },
    { label: 'ChIP Sequencing', value: 'chip-seq' },
    { label: 'ATAC Sequencing', value: 'atac-seq' }
  ];

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setOpen(false);
  };

  const isFormValid = formData.name && formData.type && formData.description;

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Create Experiment
      </Button>
      
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>New Experiment</DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '8px' }}>
            <InputText
              label="Experiment Name"
              placeholder="Enter a descriptive name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
            
            <InputDropdown
              label="Experiment Type"
              options={experimentTypes}
              value={formData.type}
              onChange={(value) => setFormData(prev => ({ ...prev, type: value as string }))}
              placeholder="Select experiment type"
              required
            />
            
            <InputText
              label="Description"
              placeholder="Describe the purpose and methodology"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              multiline
              rows={4}
              required
            />
            
            <InputCheckbox
              checked={formData.isPublic}
              onChange={(checked) => setFormData(prev => ({ ...prev, isPublic: checked }))}
              label="Make this experiment publicly accessible"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button 
            sdsStyle="square" 
            sdsType="secondary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            sdsStyle="square" 
            sdsType="primary"
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Create Experiment
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

### Scrollable Content

```tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@czi-sds/components';

function ScrollableContentExample() {
  const [open, setOpen] = useState(false);

  const longContent = Array.from({ length: 50 }, (_, i) => (
    <div key={i} style={{ marginBottom: '16px', padding: '12px', background: '#f8f9fa', borderRadius: '4px' }}>
      <h4>Sample {i + 1}</h4>
      <p>
        This is sample data entry {i + 1} containing detailed information about the experiment 
        parameters, measurements, and observations. Each entry represents a significant 
        data point in the overall study.
      </p>
      <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
        ID: SAM-{String(i + 1).padStart(3, '0')} | Quality Score: {(85 + Math.random() * 10).toFixed(1)}%
      </div>
    </div>
  ));

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        View All Samples
      </Button>
      
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Sample Database (50 entries)</DialogTitle>
        <DialogContent dividers style={{ maxHeight: '400px' }}>
          {longContent}
        </DialogContent>
        <DialogActions>
          <Button sdsStyle="square" sdsType="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button sdsStyle="square" sdsType="primary" onClick={() => console.log('Export clicked')}>
            Export Data
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

### Rich Media Content

```tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@czi-sds/components';

function RichMediaExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        View Analysis Results
      </Button>
      
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Gene Expression Analysis Results</DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Summary Section */}
            <div>
              <h3 style={{ marginBottom: '12px', color: '#1976d2' }}>Analysis Summary</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '16px', background: '#e3f2fd', borderRadius: '8px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>2,847</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Total Genes</div>
                </div>
                <div style={{ padding: '16px', background: '#e8f5e8', borderRadius: '8px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4caf50' }}>1,432</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Upregulated</div>
                </div>
                <div style={{ padding: '16px', background: '#ffebee', borderRadius: '8px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f44336' }}>968</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Downregulated</div>
                </div>
              </div>
            </div>

            {/* Visualization Placeholder */}
            <div>
              <h3 style={{ marginBottom: '12px', color: '#1976d2' }}>Expression Heatmap</h3>
              <div style={{ 
                height: '300px', 
                background: 'linear-gradient(45deg, #e3f2fd, #f3e5f5, #e8f5e8)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed #ccc'
              }}>
                <div style={{ textAlign: 'center', color: '#666' }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>📊</div>
                  <div>Interactive heatmap visualization would appear here</div>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div>
              <h3 style={{ marginBottom: '12px', color: '#1976d2' }}>Top Differentially Expressed Genes</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f5f5f5' }}>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Gene</th>
                    <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #ddd' }}>Log2FC</th>
                    <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #ddd' }}>P-value</th>
                    <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Direction</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { gene: 'BRCA1', fc: 2.45, pvalue: 0.001, direction: '↑' },
                    { gene: 'TP53', fc: -1.87, pvalue: 0.003, direction: '↓' },
                    { gene: 'MYC', fc: 3.12, pvalue: 0.0001, direction: '↑' },
                    { gene: 'EGFR', fc: -2.23, pvalue: 0.002, direction: '↓' }
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 'bold' }}>{row.gene}</td>
                      <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'monospace' }}>{row.fc.toFixed(2)}</td>
                      <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'monospace' }}>{row.pvalue}</td>
                      <td style={{ 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontSize: '20px',
                        color: row.direction === '↑' ? '#4caf50' : '#f44336'
                      }}>
                        {row.direction}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button sdsStyle="square" sdsType="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button sdsStyle="square" sdsType="secondary" onClick={() => console.log('Download clicked')}>
            Download Report
          </Button>
          <Button sdsStyle="square" sdsType="primary" onClick={() => console.log('Open in analysis tool')}>
            Open in Analysis Tool
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

### With Dividers

```tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@czi-sds/components';

function DividersExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Settings
      </Button>
      
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>System Settings</DialogTitle>
        <DialogContent dividers>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <section>
              <h3 style={{ marginBottom: '12px', color: '#1976d2' }}>General Settings</h3>
              <div style={{ paddingLeft: '16px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" defaultChecked />
                    Enable automatic updates
                  </label>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" />
                    Send usage analytics
                  </label>
                </div>
              </div>
            </section>

            <section>
              <h3 style={{ marginBottom: '12px', color: '#1976d2' }}>Data Processing</h3>
              <div style={{ paddingLeft: '16px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <label>Maximum parallel processes:</label>
                  <select style={{ marginLeft: '8px', padding: '4px' }}>
                    <option>1</option>
                    <option>2</option>
                    <option selected>4</option>
                    <option>8</option>
                  </select>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label>Cache size limit:</label>
                  <select style={{ marginLeft: '8px', padding: '4px' }}>
                    <option>1 GB</option>
                    <option selected>5 GB</option>
                    <option>10 GB</option>
                    <option>Unlimited</option>
                  </select>
                </div>
              </div>
            </section>

            <section>
              <h3 style={{ marginBottom: '12px', color: '#1976d2' }}>Security</h3>
              <div style={{ paddingLeft: '16px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" defaultChecked />
                    Require authentication for data access
                  </label>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" defaultChecked />
                    Log all user actions
                  </label>
                </div>
              </div>
            </section>
          </div>
        </DialogContent>
        <DialogActions>
          <Button sdsStyle="square" sdsType="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button sdsStyle="square" sdsType="primary" onClick={() => setOpen(false)}>
            Save Settings
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

### Responsive Content Layout

```tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@czi-sds/components';

function ResponsiveContentExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Responsive Dialog
      </Button>
      
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="md" 
        fullWidth
        fullScreen={false} // Could be made responsive based on screen size
      >
        <DialogTitle>Data Visualization Dashboard</DialogTitle>
        <DialogContent>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <div style={{ 
              padding: '20px', 
              border: '1px solid #e0e0e0', 
              borderRadius: '8px',
              background: '#fafafa'
            }}>
              <h4>Dataset Overview</h4>
              <p>Summary statistics and metadata for the selected dataset.</p>
              <div style={{ height: '150px', background: '#e3f2fd', borderRadius: '4px', marginTop: '12px' }}>
                {/* Chart placeholder */}
              </div>
            </div>
            
            <div style={{ 
              padding: '20px', 
              border: '1px solid #e0e0e0', 
              borderRadius: '8px',
              background: '#fafafa'
            }}>
              <h4>Quality Metrics</h4>
              <p>Data quality indicators and validation results.</p>
              <div style={{ height: '150px', background: '#e8f5e8', borderRadius: '4px', marginTop: '12px' }}>
                {/* Chart placeholder */}
              </div>
            </div>
            
            <div style={{ 
              padding: '20px', 
              border: '1px solid #e0e0e0', 
              borderRadius: '8px',
              background: '#fafafa',
              gridColumn: '1 / -1' // Full width on larger screens
            }}>
              <h4>Analysis Timeline</h4>
              <p>Processing steps and analysis workflow visualization.</p>
              <div style={{ height: '100px', background: '#fff3e0', borderRadius: '4px', marginTop: '12px' }}>
                {/* Timeline placeholder */}
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button sdsStyle="square" sdsType="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button sdsStyle="square" sdsType="primary" onClick={() => console.log('Export dashboard')}>
            Export Dashboard
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

## Component Features

### Content Management

- **Automatic Scrolling**: Handles content overflow with appropriate scroll behavior
- **Responsive Layout**: Adapts to different screen sizes and dialog configurations
- **Proper Spacing**: Consistent padding and margins within the Design System
- **Flexible Content**: Supports any React content including forms, media, and complex layouts

### Visual Features

- **Optional Dividers**: Visual separation from title and actions when enabled
- **Typography Integration**: Proper text styling and hierarchy
- **Theme Compatibility**: Consistent appearance across light/dark themes
- **Responsive Behavior**: Adapts to different viewport sizes

### Accessibility

- **Scrollable Region**: Proper ARIA attributes for scrollable content
- **Focus Management**: Maintains focus within dialog content
- **Screen Reader Support**: Semantic structure for assistive technologies
- **Keyboard Navigation**: Full keyboard accessibility for interactive elements

## Best Practices

### Content Organization

- **Logical Structure**: Organize content with clear visual hierarchy
- **Scannable Layout**: Use headings, sections, and white space effectively
- **Progressive Disclosure**: Consider expandable sections for complex information
- **Consistent Spacing**: Maintain regular spacing patterns throughout content

### Form Integration

- **Field Grouping**: Group related form fields logically
- **Validation Feedback**: Provide clear error messages and validation states
- **Tab Order**: Ensure logical tab order for keyboard navigation
- **Required Fields**: Clearly indicate required vs. optional fields

### Content Guidelines

- **Concise Text**: Keep dialog content focused and scannable
- **Clear Labels**: Use descriptive labels for all interactive elements
- **Help Text**: Provide contextual help where needed
- **Action-Oriented**: Focus on what users need to accomplish

### Performance Guidelines

- **Lazy Loading**: Consider lazy loading for heavy content or media
- **Virtualization**: Use virtual scrolling for very long lists
- **Image Optimization**: Optimize images and media for dialog contexts
- **Content Limits**: Set reasonable limits for very large content sets

### Responsive Design

- **Mobile-First**: Design content that works well on small screens
- **Flexible Layouts**: Use responsive grid systems and flexible layouts
- **Touch Targets**: Ensure interactive elements meet touch target size requirements
- **Viewport Considerations**: Account for different screen orientations

## Related Components

- **[Dialog](dialog.md)** - Parent container component
- **[DialogTitle](dialog-title.md)** - Title area for dialogs
- **[DialogActions](dialog-actions.md)** - Action button container
- **[InputText](input-text.md)** - Text input fields for forms within DialogContent

## API Reference

- [Material UI DialogContent Documentation](https://mui.com/material-ui/api/dialog-content/) - Underlying MUI component
- [Dialog Documentation](dialog.md) - Parent component and dialog system
- [Storybook Stories](link-to-storybook) - Interactive examples and layout patterns
- [Design Tokens](link-to-tokens) - Spacing, typography, and color tokens