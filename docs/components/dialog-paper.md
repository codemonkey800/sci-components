# DialogPaper

## Overview

DialogPaper is a styled Paper component that serves as the surface/backdrop for Dialog components in the Science Design System. It extends Material UI's Paper component and integrates with the Dialog system through DialogContext to provide consistent sizing, styling, and theming. DialogPaper is typically used as a sub-component within Dialog compositions and automatically adapts its dimensions and styling based on the parent Dialog's sdsSize prop.

The component provides a styled surface with appropriate shadows, borders, padding, and dimensions that create the visual foundation for dialog content.

## Installation & Import

```tsx
import { DialogPaper } from "@czi-sds/components";
```

## Props

DialogPaper extends Material UI's PaperProps, inheriting all Paper component functionality:

| Prop Name | Type                        | Required | Default       | Description                                                      |
| --------- | --------------------------- | -------- | ------------- | ---------------------------------------------------------------- |
| children  | `React.ReactNode`           | -        | -             | Content to be displayed inside the paper surface                 |
| classes   | `object`                    | -        | -             | Override or extend the styles applied to the component           |
| className | `string`                    | -        | -             | CSS class name for custom styling                                |
| component | `React.ElementType`         | -        | `'div'`       | Component used for the root node                                 |
| elevation | `number`                    | -        | `1`           | Shadow depth (0-24). Higher values create more prominent shadows |
| square    | `boolean`                   | -        | `false`       | If true, rounded corners are disabled                            |
| sx        | `SxProps`                   | -        | -             | System prop for defining custom styles and overrides             |
| variant   | `'elevation' \| 'outlined'` | -        | `'elevation'` | Visual variant of the paper component                            |

### SDS-Specific Behavior

DialogPaper automatically receives styling based on the DialogContext:

| Context Value | Type                        | Description                                                                              |
| ------------- | --------------------------- | ---------------------------------------------------------------------------------------- |
| sdsSize       | `'xs' \| 's' \| 'm' \| 'l'` | Size variant inherited from parent Dialog component that controls dimensions and padding |

## Usage Examples

### Basic Usage with Dialog

```tsx
import React from "react";
import {
  Dialog,
  DialogPaper,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@czi-sds/components";

function BasicDialogExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        sdsSize="m"
        PaperComponent={DialogPaper}
      >
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          This content is rendered inside the DialogPaper surface.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

### Custom Paper Component

```tsx
import React from "react";
import {
  Dialog,
  DialogPaper,
  DialogTitle,
  DialogContent,
  DialogPaperProps,
} from "@czi-sds/components";

// Create a custom DialogPaper with additional styling
const CustomDialogPaper = React.forwardRef<HTMLDivElement, DialogPaperProps>(
  function CustomDialogPaper(props, ref) {
    return (
      <DialogPaper
        ref={ref}
        {...props}
        sx={{
          border: "2px solid",
          borderColor: "primary.main",
          ...props.sx,
        }}
      />
    );
  }
);

function CustomPaperExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      sdsSize="l"
      PaperComponent={CustomDialogPaper}
    >
      <DialogTitle>Custom Styled Dialog</DialogTitle>
      <DialogContent>
        This dialog uses a custom DialogPaper with additional border styling.
      </DialogContent>
    </Dialog>
  );
}
```

### Standalone Usage (Advanced)

```tsx
import React from "react";
import { DialogPaper, DialogContext } from "@czi-sds/components";

function StandaloneDialogPaper() {
  // Provide DialogContext when using DialogPaper outside of Dialog
  const contextValue = { sdsSize: "s" as const };

  return (
    <DialogContext.Provider value={contextValue}>
      <DialogPaper
        elevation={3}
        sx={{
          position: "relative",
          margin: 2,
        }}
      >
        <div style={{ padding: "16px" }}>
          Standalone DialogPaper with small size styling
        </div>
      </DialogPaper>
    </DialogContext.Provider>
  );
}
```

### With Theme Integration

```tsx
import React from "react";
import {
  Dialog,
  DialogPaper,
  DialogTitle,
  DialogContent,
  getSpaces,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const ThemedWrapper = styled.div`
  ${(props) => {
    const spaces = getSpaces(props);
    return `
      padding: ${spaces?.xl}px;
    `;
  }}
`;

function ThemedDialogExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <ThemedWrapper>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        sdsSize="m"
        PaperComponent={DialogPaper}
      >
        <DialogTitle>Themed Dialog</DialogTitle>
        <DialogContent>Content with theme integration</DialogContent>
      </Dialog>
    </ThemedWrapper>
  );
}
```

## Variations

### Size Variations

DialogPaper automatically adapts its dimensions and padding based on the parent Dialog's `sdsSize`:

- **xs**: Width: 400px, Min-height: 160px, Padding: xl (compact dialogs)
- **s**: Width: 600px, Min-height: 400px, Padding: xl (small dialogs)
- **m**: Width: 900px, Min-height: 480px, Padding: xxl (standard dialogs)
- **l**: Width: 1200px, Min-height: 600px, Padding: xxl (large dialogs)

### Elevation Variations

Since DialogPaper extends Material UI Paper, it supports all elevation levels:

- **elevation={0}**: Flat surface with no shadow
- **elevation={1}**: Subtle shadow (default for Paper)
- **elevation={3}**: Moderate shadow (recommended for dialogs)
- **elevation={8}**: Prominent shadow for high emphasis

### Variant Variations

- **elevation**: Default style with shadow depth based on elevation prop
- **outlined**: Alternative style with border instead of shadow

## Component States

DialogPaper inherits states from Material UI Paper and integrates with Dialog states:

- **Default**: Normal styled surface within dialog
- **Context-Aware**: Automatically styled based on DialogContext sdsSize
- **Elevated**: Various shadow depths based on elevation prop
- **Custom**: Extensible through sx prop and custom styling

## Best Practices

### When to Use

- Use DialogPaper as the default surface component for Dialog components
- Ideal for creating consistent dialog surfaces across the application
- Recommended when you need automatic sizing based on dialog context
- Use when extending or customizing dialog paper styling while maintaining SDS consistency

### When Not to Use

- Avoid using DialogPaper outside of dialog contexts without providing DialogContext
- Don't use for general paper surfaces - use Material UI Paper directly instead
- Consider regular Paper component for non-dialog surface needs

### Accessibility Guidelines

- DialogPaper maintains focus management when used within Dialog components
- Inherits ARIA attributes from parent Dialog component
- Provides proper contrast ratios through theme integration
- Supports keyboard navigation through Dialog integration

### Design Guidelines

- DialogPaper automatically applies appropriate spacing using theme tokens
- Uses semantic colors from the theme palette for backgrounds and borders
- Maintains consistent border radius and shadow patterns
- Follows SDS sizing guidelines through automatic dimension calculation

## Related Components

- **[Dialog](./dialog.md)** - Parent component that typically contains DialogPaper
- **[DialogTitle](./dialog-title.md)** - Header component used within DialogPaper
- **[DialogContent](./dialog-content.md)** - Main content area within DialogPaper
- **[DialogActions](./dialog-actions.md)** - Action buttons area within DialogPaper
- **Paper** - Base Material UI component that DialogPaper extends

## Migration Notes

- **Consistent Sizing**: DialogPaper automatically handles sizing through context - no manual dimension props needed
- **Theme Integration**: Styling is handled through SDS theme tokens rather than custom CSS
- **Context Dependency**: Requires DialogContext when used outside of Dialog components

## API Reference

- [Storybook Stories](#) - Interactive examples and testing
- [Material UI Paper Documentation](https://mui.com/material-ui/api/paper/) - Base component API reference
- [Dialog Documentation](./dialog.md) - Parent component documentation

