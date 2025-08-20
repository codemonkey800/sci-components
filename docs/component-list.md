# Science Design System Components

Complete list of all components exported by the `@czi-sds/components` and `@czi-sds/data-viz` packages.

## Summary

- **Total Components**: 56
- **@czi-sds/components**: 55 components
- **@czi-sds/data-viz**: 1 component

---

## @czi-sds/components

### Form Inputs (11 components)

| Component | Description |
|-----------|-------------|
| **Autocomplete** | Searchable dropdown with auto-suggestions and type-ahead functionality |
| **InputCheckbox** | Checkbox input for boolean selections |
| **InputDropdown** | Dropdown select input field |
| **InputRadio** | Radio button input for single selection from multiple options |
| **InputSearch** | Search input field with search icon and clear functionality |
| **InputSlider** | Slider control for numeric value selection |
| **InputText** | Standard text input field |
| **InputToggle** | Toggle switch for on/off states |
| **Dropdown** | Basic dropdown component |
| **DropdownMenu** | Advanced dropdown menu with custom options |
| **MenuSelect** | Selectable menu component |

### Buttons & Actions (5 components)

| Component | Description |
|-----------|-------------|
| **Button** | Standard button with multiple variants (primary, secondary, etc.) |
| **ButtonDropdown** | Button with integrated dropdown menu |
| **ButtonIcon** | Icon-only button for compact actions |
| **ButtonToggle** | Toggle button for binary states |
| **SegmentedControl** | Multi-segment toggle control |

### Navigation (6 components)

| Component | Description |
|-----------|-------------|
| **NavigationFooter** | Footer navigation component |
| **NavigationHeader** | Header navigation bar |
| **NavigationJumpTo** | Quick navigation/jump-to component |
| **Pagination** | Page navigation controls |
| **Tabs** | Tab-based navigation |
| **Link** | Styled hyperlink component |

### Data Display (9 components)

| Component | Description |
|-----------|-------------|
| **Table** | Main table container component |
| **TableHeader** | Table header row component |
| **TableRow** | Table data row component |
| **CellBasic** | Basic table cell |
| **CellComponent** | Advanced table cell with custom content |
| **CellHeader** | Table header cell |
| **List** | List container component |
| **ListItem** | Individual list item |
| **ListSubheader** | List section header |

### Feedback & Messaging (7 components)

| Component | Description |
|-----------|-------------|
| **Alert** | Alert messages with severity levels |
| **Banner** | Page-level banner for important messages |
| **Callout** | Highlighted content section |
| **CalloutTitle** | Title component for callouts |
| **Notification** | Toast-style notifications |
| **LoadingIndicator** | Loading spinner/skeleton |
| **Tooltip** | Standard hover tooltip |
| **TooltipCondensed** | Compact tooltip variant |
| **TooltipTable** | Table-formatted tooltip |

### Layout & Containers (5 components)

| Component | Description |
|-----------|-------------|
| **Accordion** | Expandable/collapsible content sections |
| **ContentCard** | Card layout container |
| **Dialog** | Modal dialog window |
| **Panel** | Panel layout container |
| **ComplexFilter** | Advanced filtering interface panel |

### Dialog Components (5 sub-components)

| Component | Description |
|-----------|-------------|
| **DialogActions** | Dialog footer with action buttons |
| **DialogContent** | Main dialog content area |
| **DialogPaper** | Dialog surface/backdrop |
| **DialogTitle** | Dialog header with title |

### Tags & Labels (3 components)

| Component | Description |
|-----------|-------------|
| **Chip** | Small labeled element for tags/badges |
| **Tag** | Label/tag component |
| **TagFilter** | Filterable tag component |

### Menu Components (2 components)

| Component | Description |
|-----------|-------------|
| **Menu** | Menu container |
| **MenuItem** | Individual menu item |

### Icons (1 component)

| Component | Description |
|-----------|-------------|
| **Icon** | Icon component with 100+ built-in SVG icons |

---

## @czi-sds/data-viz

### Data Visualization (1 component)

| Component | Description |
|-----------|-------------|
| **HeatmapChart** | ECharts-based heatmap visualization for scientific data |

---

## Additional Exports

### Design System Utilities

The `@czi-sds/components` package also exports extensive design system utilities:

#### Theme Selectors
- `getColors` - Access color palette
- `getSpaces` - Access spacing values
- `getTypography` - Access typography settings
- `getMode` - Get current theme mode
- `getPalette` - Access full palette
- `getSemanticColors` - Semantic color values
- `getShadows` - Shadow definitions
- `getCorners` - Border radius values
- `getFontWeights` - Font weight values
- `getIconSizes` - Icon size definitions
- `getBorders` - Border definitions
- `getBreakpoints` - Responsive breakpoints

#### Typography Mixins (70+ utilities)

**Body Fonts**: `fontBodyXs`, `fontBodyS`, `fontBodyM`, `fontBodyL`, `fontBodyXl`

**Header Fonts**: `fontHeaderXXS`, `fontHeaderXS`, `fontHeaderS`, `fontHeaderM`, `fontHeaderL`, `fontHeaderXL`, `fontHeaderXXL`

**Code Fonts**: `fontCodeXs`, `fontCodeS`, `fontCodeM`, `fontCodeL`, `fontCodeXl`

**Tabular Fonts**: `fontTabularXXXS`, `fontTabularXXS`, `fontTabularXS`, `fontTabularS`, `fontTabularM`, `fontTabularL`

**Title Fonts**: `fontTitleBoldS`, `fontTitleBoldM`, `fontTitleBoldL`, `fontTitleBoldXL`, `fontTitleBoldXXL`

**Link Fonts**: `fontLinkXs`, `fontLinkS`, `fontLinkM`, `fontLinkL`, `fontLinkXl`

**Caps Fonts**: `fontCapsXXXS`, `fontCapsXXS`, `fontCapsXS`, `fontCapsS`, `fontCapsM`, `fontCapsL`

### Icon Library

The `Icon` component provides access to 100+ SVG icons including:
- Navigation icons (arrows, chevrons, menu)
- Action icons (edit, copy, download, share)
- Status icons (check, error, warning, info)
- Science-specific icons (bacteria, DNA, flask, microscope)
- UI elements (search, filter, settings, calendar)

### Design Tokens

Available in multiple formats:
- CSS custom properties (`variables.css`)
- SCSS variables (`_variables.scss`)
- Tailwind configuration (JSON)
- JavaScript/TypeScript objects

---

## Usage Example

```tsx
import {
  Button,
  Icon,
  Tooltip,
  fontHeaderL,
  getColors
} from '@czi-sds/components';

import { HeatmapChart } from '@czi-sds/data-viz';
```

## Package Information

- **Built on**: Material UI v5
- **Language**: TypeScript
- **Styling**: Emotion + Design Tokens
- **Testing**: Jest + Testing Library + Storybook
- **Documentation**: Storybook with live examples