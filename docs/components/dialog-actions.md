# DialogActions

## Overview

DialogActions is a specialized container component designed to house action buttons (like "Cancel", "Save", "Delete") at the bottom of dialog boxes. Built on Material UI's DialogActions foundation, it provides consistent spacing, alignment, and responsive behavior for dialog interactions. The component automatically inherits sizing context from its parent Dialog component to ensure visual consistency.

DialogActions is typically used within Dialog components to create a standardized action area that follows the Science Design System's interaction patterns and maintains accessibility standards for modal interfaces.

## Installation & Import

```tsx
import { DialogActions } from '@czi-sds/components';
// Often used with other Dialog components:
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@czi-sds/components';
```

## Props

DialogActions inherits all props from Material UI's DialogActions component and includes:

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `ReactNode` | - | - | Action buttons and other interactive elements |
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
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          Are you sure you want to proceed with this action?
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
            onClick={() => {
              // Perform action
              setOpen(false);
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

### Data Management Dialog

```tsx
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  TextField,
  InputText
} from '@czi-sds/components';

interface FormData {
  name: string;
  description: string;
}

function DataManagementExample() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({ name: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Data submitted:', formData);
      setOpen(false);
      setFormData({ name: '', description: '' });
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setFormData({ name: '', description: '' });
  };

  const isFormValid = formData.name.trim() && formData.description.trim();

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Create New Dataset
      </Button>
      
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Create Dataset</DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <InputText
              label="Dataset Name"
              placeholder="Enter dataset name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              disabled={isSubmitting}
            />
            <InputText
              label="Description"
              placeholder="Enter dataset description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              multiline
              rows={3}
              disabled={isSubmitting}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button 
            sdsStyle="square" 
            sdsType="secondary"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            sdsStyle="square" 
            sdsType="primary"
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Dataset'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

### Destructive Action Dialog

```tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@czi-sds/components';

function DestructiveActionExample() {
  const [open, setOpen] = useState(false);
  const [itemName] = useState('Important Research Data');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Simulate deletion API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Item deleted');
      setOpen(false);
    } catch (error) {
      console.error('Deletion failed:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button 
        sdsStyle="square" 
        sdsType="primary"
        onClick={() => setOpen(true)}
      >
        Delete Item
      </Button>
      
      <Dialog 
        open={open} 
        onClose={() => !isDeleting && setOpen(false)}
        maxWidth="sm"
      >
        <DialogTitle>Delete Item</DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to delete <strong>"{itemName}"</strong>?
          </p>
          <p style={{ color: '#d32f2f', fontSize: '14px', marginTop: '12px' }}>
            This action cannot be undone. All associated data will be permanently removed.
          </p>
        </DialogContent>
        <DialogActions>
          <Button 
            sdsStyle="square" 
            sdsType="secondary"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            Keep Item
          </Button>
          <Button 
            sdsStyle="square" 
            sdsType="primary"
            onClick={handleDelete}
            disabled={isDeleting}
            style={{ backgroundColor: '#d32f2f' }}
          >
            {isDeleting ? 'Deleting...' : 'Delete Permanently'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

### Multiple Action Options

```tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@czi-sds/components';

function MultipleActionsExample() {
  const [open, setOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const handleAction = (action: string) => {
    setSelectedAction(action);
    console.log(`Action selected: ${action}`);
    // Perform the selected action
    setTimeout(() => {
      setOpen(false);
      setSelectedAction(null);
    }, 1000);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Export Data
      </Button>
      
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm">
        <DialogTitle>Export Options</DialogTitle>
        <DialogContent>
          <p>Choose how you would like to export your data:</p>
          <ul style={{ marginTop: '12px' }}>
            <li>CSV format for spreadsheet applications</li>
            <li>JSON format for programmatic access</li>
            <li>PDF format for reports and documentation</li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button 
            sdsStyle="square" 
            sdsType="secondary"
            onClick={() => setOpen(false)}
            disabled={!!selectedAction}
          >
            Cancel
          </Button>
          <Button 
            sdsStyle="square" 
            sdsType="secondary"
            onClick={() => handleAction('csv')}
            disabled={!!selectedAction}
          >
            {selectedAction === 'csv' ? 'Exporting...' : 'Export CSV'}
          </Button>
          <Button 
            sdsStyle="square" 
            sdsType="secondary"
            onClick={() => handleAction('json')}
            disabled={!!selectedAction}
          >
            {selectedAction === 'json' ? 'Exporting...' : 'Export JSON'}
          </Button>
          <Button 
            sdsStyle="square" 
            sdsType="primary"
            onClick={() => handleAction('pdf')}
            disabled={!!selectedAction}
          >
            {selectedAction === 'pdf' ? 'Exporting...' : 'Export PDF'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

### Custom Layout and Styling

```tsx
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  getColors,
  getSpaces 
} from '@czi-sds/components';
import styled from '@emotion/styled';

const StyledDialogActions = styled(DialogActions)`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    return `
      background: ${colors?.gray[50]};
      border-top: 1px solid ${colors?.gray[300]};
      padding: ${spaces?.l}px;
      gap: ${spaces?.m}px;
      justify-content: space-between;
      
      .action-group {
        display: flex;
        gap: ${spaces?.s}px;
      }
    `;
  }}
`;

function CustomLayoutExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Custom Layout Dialog
      </Button>
      
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
        <DialogTitle>Advanced Settings</DialogTitle>
        <DialogContent>
          <p>Configure your advanced settings here...</p>
          <div style={{ height: '200px', background: '#f5f5f5', margin: '16px 0' }}>
            {/* Settings content would go here */}
          </div>
        </DialogContent>
        <StyledDialogActions>
          <div className="action-group">
            <Button 
              sdsStyle="minimal" 
              sdsType="secondary"
              onClick={() => console.log('Help clicked')}
            >
              Help
            </Button>
            <Button 
              sdsStyle="minimal" 
              sdsType="secondary"
              onClick={() => console.log('Reset clicked')}
            >
              Reset to Defaults
            </Button>
          </div>
          <div className="action-group">
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
              onClick={() => {
                console.log('Settings applied');
                setOpen(false);
              }}
            >
              Apply Changes
            </Button>
          </div>
        </StyledDialogActions>
      </Dialog>
    </>
  );
}
```

### Responsive Action Layout

```tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@czi-sds/components';

function ResponsiveActionsExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Responsive Actions
      </Button>
      
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Mobile-Friendly Dialog</DialogTitle>
        <DialogContent>
          <p>This dialog adapts its action layout for different screen sizes.</p>
        </DialogContent>
        <DialogActions 
          style={{ 
            flexDirection: 'column',
            alignItems: 'stretch',
            '@media (min-width: 600px)': {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }
          }}
        >
          <Button 
            sdsStyle="square" 
            sdsType="secondary"
            onClick={() => setOpen(false)}
            style={{ marginBottom: '8px', width: '100%' }}
          >
            Cancel
          </Button>
          <Button 
            sdsStyle="square" 
            sdsType="primary"
            onClick={() => setOpen(false)}
            style={{ width: '100%' }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

## Component Features

### Context Integration

- Automatically receives `sdsSize` from parent Dialog component
- Maintains consistent sizing and spacing with dialog content
- Inherits theme context for proper styling

### Layout Behavior

- **Horizontal Layout**: Actions are arranged horizontally by default
- **Right Alignment**: Primary actions typically appear on the right
- **Responsive**: Adapts to container width and screen size
- **Flexible Spacing**: Automatic spacing between action elements

### Styling Integration

- Consistent padding and margins with Dialog system
- Proper visual hierarchy for action buttons
- Theme-aware styling that adapts to light/dark modes
- Seamless integration with Dialog borders and backgrounds

## Best Practices

### When to Use

- All dialog interfaces requiring user actions
- Confirmation dialogs with accept/cancel options
- Form dialogs with submit/cancel buttons
- Multi-step processes with navigation actions
- Settings and configuration dialogs

### Action Button Guidelines

- **Primary Action**: Place the main action (Save, Confirm, Delete) on the right
- **Secondary Action**: Cancel or dismissive actions go on the left
- **Button Labels**: Use clear, action-oriented language
- **Button Hierarchy**: Use appropriate button types (primary, secondary) to show importance
- **Loading States**: Disable actions and show loading indicators during operations

### Layout Guidelines

- **Order**: Place destructive actions away from default/primary actions
- **Grouping**: Group related actions together
- **Spacing**: Use consistent spacing between button groups
- **Alignment**: Align actions to the right for consistency with system dialogs

### Accessibility Guidelines

- Actions are keyboard navigable in logical order
- Focus management returns to trigger element on close
- Button labels are descriptive and actionable
- Proper ARIA attributes for dialog actions
- Support for Escape key to cancel

### UX Guidelines

- **Clear Actions**: Make it obvious what each button does
- **Safe Defaults**: Make the safe action (Cancel) easily accessible
- **Destructive Actions**: Use appropriate visual treatment for dangerous actions
- **Confirmation**: Require explicit confirmation for irreversible actions
- **Progress**: Show progress for long-running operations

## Related Components

- **[Dialog](dialog.md)** - Parent component that provides context
- **[DialogTitle](dialog-title.md)** - Title area for dialogs
- **[DialogContent](dialog-content.md)** - Main content area for dialogs
- **[Button](button.md)** - Action buttons typically used within DialogActions

## API Reference

- [Material UI DialogActions Documentation](https://mui.com/material-ui/api/dialog-actions/) - Underlying MUI component
- [Dialog Documentation](dialog.md) - Parent component and context system
- [Button Documentation](button.md) - Action button component reference
- [Storybook Stories](link-to-storybook) - Interactive examples and testing