# Dialog

## Overview

The Dialog component provides a modal overlay system for displaying important content, forms, or confirmations that require user attention. It supports multiple sizes, customizable close behavior, and includes proper focus management and accessibility features. Built on Material UI's Dialog, it integrates with DialogTitle, DialogContent, and DialogActions components to create comprehensive modal experiences with consistent Science Design System styling.

## Installation & Import

```tsx
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions 
} from '@czi-sds/components';
```

## Props

### Dialog Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| open | `boolean` | ✓ | - | Whether the dialog is open/visible |
| onClose | `function` | - | - | Callback fired when dialog should close |
| sdsSize | `"xs" \| "s" \| "m" \| "l"` | - | `"m"` | Size of the dialog |
| canClickOutsideClose | `boolean` | - | `true` | Whether clicking backdrop or pressing escape closes dialog |
| children | `React.ReactNode` | - | - | Dialog content (typically DialogTitle, DialogContent, DialogActions) |
| maxWidth | `"xs" \| "s" \| "m" \| "l" \| "xl" \| false` | - | `"sm"` | Maximum width of the dialog |
| fullWidth | `boolean` | - | `false` | Whether dialog should use full available width |
| fullScreen | `boolean` | - | `false` | Whether dialog should be full screen |
| scroll | `"body" \| "paper"` | - | `"paper"` | Where scrolling should occur when content overflows |

### DialogTitle Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| title | `string` | - | - | Main title text |
| subtitle | `string` | - | - | Subtitle text below the title |
| overline | `string` | - | - | Small text above the title |
| onClose | `function` | - | - | Callback for close button (shows close X when provided) |
| children | `React.ReactNode` | - | - | Custom content (overrides title/subtitle/overline) |

### DialogContent Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `React.ReactNode` | - | - | Main dialog content |
| dividers | `boolean` | - | `false` | Whether to add divider lines above and below content |

### DialogActions Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `React.ReactNode` | - | - | Action buttons |
| buttonPosition | `"left" \| "right"` | - | `"right"` | Alignment of action buttons |

## Usage Examples

### Basic Dialog

```tsx
import React, { useState } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button 
} from '@czi-sds/components';

function BasicDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button 
        sdsType="primary" 
        sdsStyle="rounded"
        onClick={() => setOpen(true)}
      >
        Open Dialog
      </Button>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        sdsSize="m"
      >
        <DialogTitle
          title="Confirm Action"
          subtitle="This action cannot be undone"
          onClose={() => setOpen(false)}
        />
        
        <DialogContent>
          Are you sure you want to delete this experiment? All associated
          data and results will be permanently removed from the system.
        </DialogContent>
        
        <DialogActions>
          <Button
            sdsType="secondary"
            sdsStyle="square"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            sdsType="primary"
            sdsStyle="square"
            onClick={() => {
              console.log('Action confirmed');
              setOpen(false);
            }}
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

### Form Dialog with Validation

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
  InputTextArea
} from '@czi-sds/components';

interface ExperimentForm {
  name: string;
  type: string;
  description: string;
}

function FormDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ExperimentForm>({
    name: '',
    type: '',
    description: ''
  });
  const [errors, setErrors] = useState<Partial<ExperimentForm>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ExperimentForm> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Experiment name is required';
    }
    
    if (!formData.type) {
      newErrors.type = 'Please select an experiment type';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Creating experiment:', formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ name: '', type: '', description: '' });
    setErrors({});
  };

  const updateFormData = (field: keyof ExperimentForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <>
      <Button 
        sdsType="primary" 
        sdsStyle="rounded"
        onClick={() => setOpen(true)}
      >
        New Experiment
      </Button>

      <Dialog 
        open={open} 
        onClose={handleClose}
        sdsSize="l"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          title="Create New Experiment"
          subtitle="Set up a new laboratory experiment"
          overline="Experiment Setup"
          onClose={handleClose}
        />
        
        <DialogContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <InputText
              label="Experiment Name"
              placeholder="Enter a descriptive name for your experiment"
              value={formData.name}
              onChange={(value) => updateFormData('name', value)}
              intent={errors.name ? 'error' : 'default'}
              helperText={errors.name}
              required
            />
            
            <InputDropdown
              label="Experiment Type"
              value={formData.type}
              onChange={(value) => updateFormData('type', value)}
              intent={errors.type ? 'error' : 'default'}
              helperText={errors.type}
              required
            >
              <option value="">Select experiment type...</option>
              <option value="sequencing">DNA/RNA Sequencing</option>
              <option value="proteomics">Protein Analysis</option>
              <option value="cell-culture">Cell Culture Studies</option>
              <option value="microscopy">Microscopy Analysis</option>
              <option value="flow-cytometry">Flow Cytometry</option>
            </InputDropdown>
            
            <InputTextArea
              label="Description"
              placeholder="Describe the experiment objectives, methods, and expected outcomes..."
              value={formData.description}
              onChange={(value) => updateFormData('description', value)}
              intent={errors.description ? 'error' : 'default'}
              helperText={errors.description}
              rows={4}
              required
            />
          </div>
        </DialogContent>
        
        <DialogActions>
          <Button
            sdsType="secondary"
            sdsStyle="square"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            sdsType="primary"
            sdsStyle="square"
            onClick={handleSubmit}
          >
            Create Experiment
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

### Confirmation Dialog with Different Actions

```tsx
import React, { useState } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Icon,
  Tag
} from '@czi-sds/components';

type DialogAction = 'delete' | 'archive' | 'duplicate' | null;

function ActionConfirmationDialog() {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<DialogAction>(null);

  const getDialogConfig = (actionType: DialogAction) => {
    switch (actionType) {
      case 'delete':
        return {
          title: 'Delete Experiment',
          subtitle: 'This action cannot be undone',
          overline: 'Confirm Deletion',
          icon: 'Trash',
          iconColor: '#f44336',
          confirmText: 'Delete Permanently',
          confirmType: 'primary' as const,
          content: (
            <div>
              <p>
                Are you sure you want to delete experiment <strong>"RNA-Seq Analysis Batch 3"</strong>?
                This will permanently remove:
              </p>
              <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
                <li>All experimental data and results</li>
                <li>Associated sample information</li>
                <li>Analysis reports and visualizations</li>
                <li>Collaboration history and comments</li>
              </ul>
              <div style={{ 
                marginTop: '16px', 
                padding: '12px', 
                backgroundColor: '#fff3e0',
                borderRadius: '4px',
                border: '1px solid #ffb74d'
              }}>
                <strong>⚠️ Warning:</strong> This action cannot be undone. Consider archiving instead.
              </div>
            </div>
          )
        };
      case 'archive':
        return {
          title: 'Archive Experiment',
          subtitle: 'Move to archived experiments',
          overline: 'Archive Action',
          icon: 'Archive',
          iconColor: '#ff9800',
          confirmText: 'Archive Experiment',
          confirmType: 'secondary' as const,
          content: (
            <div>
              <p>
                Archive experiment <strong>"RNA-Seq Analysis Batch 3"</strong>?
                Archived experiments:
              </p>
              <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
                <li>Remain accessible in the archived section</li>
                <li>Are hidden from active experiments view</li>
                <li>Can be restored at any time</li>
                <li>Preserve all data and results</li>
              </ul>
            </div>
          )
        };
      case 'duplicate':
        return {
          title: 'Duplicate Experiment',
          subtitle: 'Create a copy with the same settings',
          overline: 'Duplicate Action',
          icon: 'Copy',
          iconColor: '#4caf50',
          confirmText: 'Create Duplicate',
          confirmType: 'primary' as const,
          content: (
            <div>
              <p>
                Create a duplicate of experiment <strong>"RNA-Seq Analysis Batch 3"</strong>?
                The duplicate will include:
              </p>
              <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
                <li>All experiment settings and parameters</li>
                <li>Protocol steps and configurations</li>
                <li>Sample templates and metadata structure</li>
              </ul>
              <div style={{ 
                marginTop: '16px', 
                padding: '12px', 
                backgroundColor: '#e8f5e8',
                borderRadius: '4px',
                border: '1px solid #4caf50'
              }}>
                <strong>ℹ️ Note:</strong> Raw data and results will not be copied.
              </div>
            </div>
          )
        };
      default:
        return null;
    }
  };

  const openDialog = (actionType: DialogAction) => {
    setAction(actionType);
    setOpen(true);
  };

  const handleConfirm = () => {
    console.log(`${action} action confirmed`);
    setOpen(false);
    setAction(null);
  };

  const handleClose = () => {
    setOpen(false);
    setAction(null);
  };

  const config = getDialogConfig(action);
  if (!config) return null;

  return (
    <>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <Button 
          sdsType="secondary" 
          sdsStyle="rounded"
          startIcon={<Icon sdsIcon="Archive" sdsSize="s" />}
          onClick={() => openDialog('archive')}
        >
          Archive
        </Button>
        <Button 
          sdsType="secondary" 
          sdsStyle="rounded"
          startIcon={<Icon sdsIcon="Copy" sdsSize="s" />}
          onClick={() => openDialog('duplicate')}
        >
          Duplicate
        </Button>
        <Button 
          sdsType="secondary" 
          sdsStyle="rounded"
          startIcon={<Icon sdsIcon="Trash" sdsSize="s" />}
          onClick={() => openDialog('delete')}
        >
          Delete
        </Button>
      </div>

      <Dialog 
        open={open} 
        onClose={handleClose}
        sdsSize="m"
        canClickOutsideClose={false}
      >
        <DialogTitle onClose={handleClose}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Icon 
              sdsIcon={config.icon as any} 
              sdsSize="l" 
              style={{ color: config.iconColor }}
            />
            <div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                {config.overline}
              </div>
              <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '2px' }}>
                {config.title}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {config.subtitle}
              </div>
            </div>
          </div>
        </DialogTitle>
        
        <DialogContent dividers>
          {config.content}
        </DialogContent>
        
        <DialogActions>
          <Button
            sdsType="secondary"
            sdsStyle="square"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            sdsType={config.confirmType}
            sdsStyle="square"
            onClick={handleConfirm}
          >
            {config.confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

### Full-Screen Dialog with Scrollable Content

```tsx
import React, { useState } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListSubheader,
  Table,
  TableHeader,
  TableRow,
  CellHeader,
  CellBasic,
  Accordion,
  AccordionHeader,
  AccordionDetails
} from '@czi-sds/components';

function FullScreenDialog() {
  const [open, setOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const experimentData = {
    overview: {
      name: 'Large-Scale Genomic Analysis Project',
      status: 'In Progress',
      created: '2024-01-15',
      samples: 250,
      progress: 68
    },
    protocols: [
      'DNA Extraction Protocol v2.1',
      'Library Preparation Standard Protocol',
      'Sequencing Quality Control Checklist',
      'Data Analysis Pipeline v3.0'
    ],
    results: [
      { sample: 'SMPL-001', quality: 'High', reads: '45M', coverage: '30x' },
      { sample: 'SMPL-002', quality: 'Medium', reads: '42M', coverage: '28x' },
      { sample: 'SMPL-003', quality: 'High', reads: '48M', coverage: '32x' },
      { sample: 'SMPL-004', quality: 'Low', reads: '35M', coverage: '24x' }
    ]
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button 
          sdsType="primary" 
          sdsStyle="rounded"
          onClick={() => {
            setFullScreen(false);
            setOpen(true);
          }}
        >
          View Report (Modal)
        </Button>
        <Button 
          sdsType="secondary" 
          sdsStyle="rounded"
          onClick={() => {
            setFullScreen(true);
            setOpen(true);
          }}
        >
          View Report (Full Screen)
        </Button>
      </div>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        sdsSize="l"
        maxWidth={fullScreen ? false : "lg"}
        fullScreen={fullScreen}
        fullWidth
        scroll="paper"
      >
        <DialogTitle
          title={experimentData.overview.name}
          subtitle="Comprehensive analysis report and data summary"
          overline="Experiment Report"
          onClose={() => setOpen(false)}
        />
        
        <DialogContent dividers>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Overview Section */}
            <div>
              <h3 style={{ marginTop: 0, marginBottom: '16px' }}>Project Overview</h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                padding: '16px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px'
              }}>
                <div>
                  <strong>Status:</strong><br />
                  {experimentData.overview.status}
                </div>
                <div>
                  <strong>Created:</strong><br />
                  {experimentData.overview.created}
                </div>
                <div>
                  <strong>Samples:</strong><br />
                  {experimentData.overview.samples}
                </div>
                <div>
                  <strong>Progress:</strong><br />
                  {experimentData.overview.progress}%
                </div>
              </div>
            </div>

            {/* Protocols Section */}
            <Accordion id="protocols" defaultExpanded>
              <AccordionHeader subtitle="Standard operating procedures">
                Protocols Used
              </AccordionHeader>
              <AccordionDetails>
                <List>
                  {experimentData.protocols.map((protocol, index) => (
                    <ListItem key={index} fontSize="s">
                      {protocol}
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>

            {/* Results Table */}
            <div>
              <h3 style={{ marginBottom: '16px' }}>Sample Results Summary</h3>
              <Table>
                <TableHeader>
                  <CellHeader>Sample ID</CellHeader>
                  <CellHeader>Quality</CellHeader>
                  <CellHeader horizontalAlign="right">Total Reads</CellHeader>
                  <CellHeader horizontalAlign="right">Coverage</CellHeader>
                </TableHeader>
                <tbody>
                  {experimentData.results.map((result, index) => (
                    <TableRow key={index}>
                      <CellBasic primaryText={result.sample} />
                      <CellBasic 
                        primaryText={result.quality}
                        style={{ 
                          color: result.quality === 'High' ? '#4caf50' : 
                                 result.quality === 'Medium' ? '#ff9800' : '#f44336'
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
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* Detailed Analysis Section */}
            <div>
              <h3 style={{ marginBottom: '16px' }}>Detailed Analysis</h3>
              <div style={{ 
                padding: '16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#fafafa'
              }}>
                <p>
                  The genomic analysis pipeline processed {experimentData.overview.samples} samples
                  with an overall success rate of 96%. Quality metrics indicate that 
                  {experimentData.results.filter(r => r.quality === 'High').length} samples 
                  met high-quality standards, while 
                  {experimentData.results.filter(r => r.quality === 'Low').length} samples
                  require additional review.
                </p>
                
                <h4>Key Findings:</h4>
                <ul>
                  <li>Average sequencing depth exceeded target coverage by 12%</li>
                  <li>No significant batch effects detected across processing groups</li>
                  <li>Quality control metrics within acceptable parameters</li>
                  <li>Data ready for downstream analysis and interpretation</li>
                </ul>

                <h4>Recommendations:</h4>
                <ul>
                  <li>Proceed with differential expression analysis</li>
                  <li>Consider reprocessing low-quality samples if additional material available</li>
                  <li>Archive raw data according to institutional guidelines</li>
                  <li>Schedule follow-up analysis review meeting</li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
        
        <DialogActions buttonPosition="right">
          <Button
            sdsType="secondary"
            sdsStyle="square"
            onClick={() => console.log('Export report')}
          >
            Export Report
          </Button>
          <Button
            sdsType="secondary"
            sdsStyle="square"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
          <Button
            sdsType="primary"
            sdsStyle="square"
            onClick={() => console.log('Continue to next phase')}
          >
            Continue Analysis
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

## Dialog Sizes

### Size Options
- **xs**: Extra small (max-width: 400px) - For simple confirmations
- **s**: Small (max-width: 600px) - For forms and short content  
- **m**: Medium (max-width: 800px) - Default size for most use cases
- **l**: Large (max-width: 1000px) - For detailed content and complex forms

## Close Behavior

### canClickOutsideClose
- **true** (default): Dialog closes when clicking backdrop or pressing Escape
- **false**: Dialog only closes through explicit close actions (onClose callback)

### Close Button Integration
- DialogTitle automatically shows close button when `onClose` prop provided
- Close button positioned consistently in top-right corner
- Keyboard accessible with proper ARIA labels

## Best Practices

### When to Use

- Use Dialog for critical actions requiring user confirmation
- Ideal for forms that need focused user attention
- Perfect for displaying detailed information without page navigation
- Recommended for multi-step wizards and guided processes

### When Not to Use

- Don't use for simple notifications (consider Toast or Snackbar)
- Avoid for complex workflows that would benefit from dedicated pages
- Don't stack multiple dialogs (consider stepper patterns instead)

### Accessibility Guidelines

- Dialog automatically manages focus and keyboard navigation
- Backdrop click and Escape key handling included
- Proper ARIA attributes and roles applied automatically
- Screen readers announce dialog open/close states
- Focus returns to trigger element when dialog closes

### Design Guidelines

- Keep dialog content focused and actionable
- Use appropriate size for content without excessive scrolling
- Position primary actions prominently (typically right-aligned)
- Include clear close mechanisms (X button or Cancel action)
- Consider mobile responsiveness for smaller screens

## Related Components

- **Button** - Trigger and action elements within dialogs
- **Form Components** - Input elements for dialog forms
- **Table** - Data display within dialog content
- **List** - Structured content organization
- **Accordion** - Collapsible content sections in large dialogs

## Migration Notes

- **Enhanced Close Control**: Granular control over close triggers with canClickOutsideClose
- **Size System**: Consistent sizing system with responsive behavior
- **Focus Management**: Automatic focus handling and restoration
- **Content Organization**: Structured approach with Title, Content, and Actions components

## API Reference

- [Storybook Stories](https://main--61e887d56582fe003ac9595e.chromatic.com/?path=/story/components-dialog--default) - Interactive examples and testing
- [Material UI Dialog](https://mui.com/material-ui/react-dialog/) - Underlying MUI component documentation
- [DialogTitle Component](./dialog-title.md) - Dialog header with title hierarchy
- [DialogContent Component](./dialog-content.md) - Main content area
- [DialogActions Component](./dialog-actions.md) - Action button container