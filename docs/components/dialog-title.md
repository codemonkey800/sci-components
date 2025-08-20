# DialogTitle

## Overview

DialogTitle is the header component for dialog interfaces, providing a structured title area with support for main titles, subtitles, overlines, and optional close functionality. Built on Material UI's DialogTitle foundation with Science Design System typography and spacing, it creates clear visual hierarchy and consistent branding for modal interactions.

The component automatically inherits sizing context from its parent Dialog and offers flexible content organization with semantic typography elements to communicate dialog purpose and context effectively.

## Installation & Import

```tsx
import { DialogTitle } from '@czi-sds/components';
// Often used with other Dialog components:
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@czi-sds/components';
// Individual typography elements can be imported:
import { DialogTitleTitle, DialogTitleSubtitle, DialogTitleOverline } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| title | `string` | - | - | Primary title text for the dialog |
| subtitle | `string` | - | - | Secondary descriptive text below the title |
| overline | `string` | - | - | Small text above the title (e.g., category, section) |
| onClose | `() => void` | - | - | Callback for close button click. When provided, shows close button |
| children | `ReactNode` | - | - | Custom content. When provided, overrides structured title content |
| className | `string` | - | - | Additional CSS class names |
| style | `CSSProperties` | - | - | Inline styles |

*Note: The `sdsSize` prop is automatically provided by the parent Dialog component through React Context.*

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
        Open Dialog
      </Button>
      
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle title="Experiment Analysis" />
        <DialogContent>
          <p>View and analyze your experiment data with our comprehensive tools.</p>
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

### With Subtitle

```tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@czi-sds/components';

function SubtitleExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        View Dataset Info
      </Button>
      
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle 
          title="RNA Sequencing Dataset" 
          subtitle="Liver tissue samples from metabolic study cohort"
        />
        <DialogContent>
          <div>
            <p><strong>Samples:</strong> 150 tissue samples</p>
            <p><strong>Timepoints:</strong> 6 collection periods</p>
            <p><strong>Status:</strong> Quality control completed</p>
            <p><strong>Size:</strong> 2.3 GB compressed</p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button sdsStyle="square" sdsType="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button sdsStyle="square" sdsType="primary" onClick={() => console.log('Access dataset')}>
            Access Dataset
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

### With Overline and Close Button

```tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@czi-sds/components';

function OverlineCloseExample() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    console.log('Dialog closed via title close button');
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Settings
      </Button>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle 
          overline="System Configuration"
          title="Analysis Settings"
          subtitle="Configure parameters for data analysis pipeline"
          onClose={handleClose}
        />
        <DialogContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label>Processing Threads:</label>
              <select style={{ marginLeft: '8px', padding: '4px' }}>
                <option>1</option>
                <option>2</option>
                <option selected>4</option>
                <option>8</option>
              </select>
            </div>
            <div>
              <label>Memory Limit:</label>
              <select style={{ marginLeft: '8px', padding: '4px' }}>
                <option>4 GB</option>
                <option selected>8 GB</option>
                <option>16 GB</option>
              </select>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button sdsStyle="square" sdsType="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button sdsStyle="square" sdsType="primary" onClick={() => console.log('Settings saved')}>
            Save Settings
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

### Custom Content Structure

```tsx
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  DialogTitleTitle,
  DialogTitleSubtitle,
  DialogTitleOverline
} from '@czi-sds/components';

function CustomContentExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Custom Title Layout
      </Button>
      
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
        <DialogTitle>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <DialogTitleOverline>Experiment EXP-2024-001</DialogTitleOverline>
              <DialogTitleTitle>Gene Expression Analysis</DialogTitleTitle>
              <DialogTitleSubtitle>
                Progress: 3 of 5 steps completed
              </DialogTitleSubtitle>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                padding: '4px 8px', 
                backgroundColor: '#e3f2fd', 
                borderRadius: '4px',
                fontSize: '12px',
                color: '#1976d2'
              }}>
                RUNNING
              </div>
              <Button 
                sdsStyle="minimal" 
                sdsType="secondary" 
                onClick={() => setOpen(false)}
              >
                ✕
              </Button>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <p>Custom title layout with status indicator and manual close button.</p>
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

### Confirmation Dialog

```tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@czi-sds/components';

function ConfirmationExample() {
  const [open, setOpen] = useState(false);
  const [itemName] = useState('Critical Research Dataset');

  const handleDelete = () => {
    console.log('Item deleted');
    setOpen(false);
  };

  return (
    <>
      <Button 
        sdsStyle="square" 
        sdsType="primary"
        onClick={() => setOpen(true)}
      >
        Delete Dataset
      </Button>
      
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        maxWidth="sm"
      >
        <DialogTitle 
          overline="Destructive Action"
          title="Confirm Deletion"
          subtitle="This action cannot be undone"
        />
        <DialogContent>
          <p>
            Are you sure you want to permanently delete <strong>"{itemName}"</strong> 
            and all associated analysis results?
          </p>
          <div style={{ 
            marginTop: '16px', 
            padding: '12px', 
            backgroundColor: '#ffebee', 
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            ⚠️ This will also delete:
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              <li>All derived analysis results</li>
              <li>Visualization configurations</li>
              <li>Shared access permissions</li>
            </ul>
          </div>
        </DialogContent>
        <DialogActions>
          <Button 
            sdsStyle="square" 
            sdsType="secondary"
            onClick={() => setOpen(false)}
          >
            Keep Dataset
          </Button>
          <Button 
            sdsStyle="square" 
            sdsType="primary"
            onClick={handleDelete}
            style={{ backgroundColor: '#d32f2f' }}
          >
            Delete Permanently
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

### Multi-Step Process Dialog

```tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@czi-sds/components';

function MultiStepExample() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const steps = [
    { title: 'Select Data Source', subtitle: 'Choose your input dataset' },
    { title: 'Configure Analysis', subtitle: 'Set analysis parameters' },
    { title: 'Review & Submit', subtitle: 'Confirm your settings' }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      console.log('Analysis submitted');
      setOpen(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Start Analysis Wizard
      </Button>
      
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle 
          overline={`Step ${currentStep} of ${totalSteps}`}
          title={steps[currentStep - 1].title}
          subtitle={steps[currentStep - 1].subtitle}
          onClose={() => setOpen(false)}
        />
        <DialogContent style={{ minHeight: '200px' }}>
          {/* Step Progress Indicator */}
          <div style={{ display: 'flex', marginBottom: '24px' }}>
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: i + 1 <= currentStep ? '#1976d2' : '#e0e0e0',
                  color: i + 1 <= currentStep ? 'white' : '#666',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  {i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div style={{
                    flex: 1,
                    height: '2px',
                    backgroundColor: i + 1 < currentStep ? '#1976d2' : '#e0e0e0',
                    margin: '0 8px'
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div style={{ padding: '20px', background: '#fafafa', borderRadius: '8px' }}>
            {currentStep === 1 && (
              <div>
                <h4>Select Your Dataset</h4>
                <p>Choose the dataset you want to analyze:</p>
                <div style={{ marginTop: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '8px' }}>
                    <input type="radio" name="dataset" defaultChecked /> RNA-seq Dataset A (150 samples)
                  </label>
                  <label style={{ display: 'block', marginBottom: '8px' }}>
                    <input type="radio" name="dataset" /> Proteomics Dataset B (89 samples)
                  </label>
                  <label style={{ display: 'block' }}>
                    <input type="radio" name="dataset" /> Combined Multi-omics Dataset C (200 samples)
                  </label>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div>
                <h4>Configure Analysis Parameters</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label>Statistical Method:</label>
                    <select style={{ marginLeft: '8px', padding: '4px', width: '200px' }}>
                      <option>DESeq2</option>
                      <option>edgeR</option>
                      <option>limma</option>
                    </select>
                  </div>
                  <div>
                    <label>P-value Threshold:</label>
                    <input 
                      type="number" 
                      defaultValue={0.05} 
                      step="0.01" 
                      style={{ marginLeft: '8px', padding: '4px', width: '100px' }}
                    />
                  </div>
                  <div>
                    <label>
                      <input type="checkbox" defaultChecked /> Apply multiple testing correction
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div>
                <h4>Review Your Settings</h4>
                <div style={{ background: 'white', padding: '16px', borderRadius: '4px' }}>
                  <p><strong>Dataset:</strong> RNA-seq Dataset A (150 samples)</p>
                  <p><strong>Method:</strong> DESeq2</p>
                  <p><strong>P-value:</strong> 0.05</p>
                  <p><strong>Multiple Testing:</strong> Enabled</p>
                </div>
              </div>
            )}
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
          {currentStep > 1 && (
            <Button 
              sdsStyle="square" 
              sdsType="secondary"
              onClick={handlePrevious}
            >
              Previous
            </Button>
          )}
          <Button 
            sdsStyle="square" 
            sdsType="primary"
            onClick={handleNext}
          >
            {currentStep === totalSteps ? 'Submit Analysis' : 'Next'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

## Component Features

### Content Structure

- **Overline**: Small contextual text above the main title
- **Title**: Primary heading with appropriate typography hierarchy
- **Subtitle**: Descriptive text that provides additional context
- **Close Button**: Optional close functionality integrated into the title area

### Typography Hierarchy

- **Consistent Sizing**: Automatically adapts to parent Dialog size context
- **Semantic Structure**: Proper heading hierarchy for accessibility
- **Theme Integration**: Uses Design System typography tokens
- **Responsive Design**: Scales appropriately across different screen sizes

### Interactive Elements

- **Close Button**: Appears when `onClose` prop is provided
- **Custom Content**: Full flexibility with children prop
- **Accessibility**: Proper ARIA attributes and keyboard navigation

## Best Practices

### Content Guidelines

- **Title**: Keep concise and descriptive (2-5 words typically)
- **Subtitle**: Provide helpful context without repeating the title
- **Overline**: Use for categorization or progress indication
- **Consistency**: Maintain consistent title patterns across your application

### Accessibility Guidelines

- **Heading Hierarchy**: DialogTitle renders as h2 by default for proper semantic structure
- **Screen Readers**: Title content is automatically announced when dialog opens
- **Keyboard Navigation**: Close button is keyboard accessible when provided
- **Focus Management**: Integrates with dialog focus management system

### UX Guidelines

- **Clear Purpose**: Title should immediately communicate the dialog's purpose
- **Contextual Information**: Use subtitle for additional helpful context
- **Progress Indication**: Use overline for step indicators in multi-step processes
- **Close Affordance**: Consider providing close button for user control

### Design Guidelines

- **Visual Hierarchy**: Title creates clear visual hierarchy for dialog content
- **Consistent Styling**: Maintain consistent appearance across different dialog types
- **Spacing**: Proper spacing relationships with content and actions
- **Theme Compatibility**: Ensure titles work well in both light and dark themes

## Related Components

- **[Dialog](dialog.md)** - Parent container that provides sizing context
- **[DialogContent](dialog-content.md)** - Main content area below the title
- **[DialogActions](dialog-actions.md)** - Action button container
- **[DialogTitleTitle](dialog-title.md#individual-elements)** - Individual title element component
- **[DialogTitleSubtitle](dialog-title.md#individual-elements)** - Individual subtitle element component
- **[DialogTitleOverline](dialog-title.md#individual-elements)** - Individual overline element component

## API Reference

- [Material UI DialogTitle Documentation](https://mui.com/material-ui/api/dialog-title/) - Underlying MUI component
- [Dialog Documentation](dialog.md) - Parent component and dialog system
- [Typography Documentation](typography.md) - Typography system and hierarchy
- [Storybook Stories](link-to-storybook) - Interactive examples and title patterns