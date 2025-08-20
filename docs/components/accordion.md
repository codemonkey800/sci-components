# Accordion

## Overview

The Accordion component provides a collapsible content structure that allows users to expand and collapse sections of information. It consists of a header that acts as a trigger and a details section that contains the expandable content. Built on Material UI's Accordion, it includes automatic state management, accessibility features, and consistent Science Design System styling. The component is ideal for organizing content into digestible sections while conserving screen space.

## Installation & Import

```tsx
import { Accordion, AccordionHeader, AccordionDetails } from '@czi-sds/components';
```

## Props

### Accordion Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| id | `string` | ✓ | - | Unique identifier for accordion state management |
| children | `React.ReactNode` | - | - | AccordionHeader and AccordionDetails components |
| defaultExpanded | `boolean` | - | `false` | Whether the accordion starts in expanded state |
| useDivider | `boolean` | - | `false` | Whether to show divider line below accordion |
| togglePosition | `"left" \| "right"` | - | `"right"` | Position of the expand/collapse toggle |
| disabled | `boolean` | - | `false` | Whether the accordion is disabled |
| className | `string` | - | - | Additional CSS classes to apply |
| style | `CSSProperties` | - | - | Inline styles to apply |
| onChange | `function` | - | - | Callback fired when expansion state changes |
| onClick | `function` | - | - | Click event handler |

### AccordionHeader Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `React.ReactNode` | ✓ | - | Header content (title text or elements) |
| subtitle | `string` | - | - | Optional subtitle text below the main header |
| chevronSize | `"xs" \| "s"` | - | `"xs"` | Size of the expand/collapse chevron icon |

### AccordionDetails Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `React.ReactNode` | ✓ | - | Content to display when accordion is expanded |
| id | `string` | - | - | Unique identifier for the details section |

## Usage Examples

### Basic Accordion

```tsx
import React from 'react';
import { Accordion, AccordionHeader, AccordionDetails } from '@czi-sds/components';

function BasicAccordion() {
  return (
    <Accordion id="basic-accordion">
      <AccordionHeader>
        Laboratory Protocol Overview
      </AccordionHeader>
      <AccordionDetails>
        This section contains detailed information about laboratory protocols,
        including sample preparation, analysis procedures, and quality control
        measures. The content is organized into clear steps that researchers
        can follow to ensure consistent and accurate results.
      </AccordionDetails>
    </Accordion>
  );
}
```

### Multiple Accordions with Sections

```tsx
import React from 'react';
import { Accordion, AccordionHeader, AccordionDetails } from '@czi-sds/components';

function MultipleAccordions() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Accordion id="sample-collection" defaultExpanded>
        <AccordionHeader subtitle="Critical first step">
          Sample Collection Procedures
        </AccordionHeader>
        <AccordionDetails>
          <h4>Materials Required:</h4>
          <ul>
            <li>Sterile collection tubes</li>
            <li>Labeling equipment</li>
            <li>Personal protective equipment</li>
            <li>Sample tracking forms</li>
          </ul>
          <h4>Collection Steps:</h4>
          <ol>
            <li>Verify patient/subject identification</li>
            <li>Prepare collection materials</li>
            <li>Collect sample using appropriate technique</li>
            <li>Label immediately and document</li>
          </ol>
        </AccordionDetails>
      </Accordion>

      <Accordion id="sample-processing" useDivider>
        <AccordionHeader subtitle="Preparation for analysis">
          Sample Processing
        </AccordionHeader>
        <AccordionDetails>
          <p>
            Process samples within 2 hours of collection to maintain integrity.
            Follow standardized protocols for centrifugation, aliquoting, and
            storage conditions.
          </p>
          <h4>Processing Workflow:</h4>
          <ol>
            <li>Centrifuge at 3000g for 10 minutes at 4°C</li>
            <li>Separate serum/plasma from cellular components</li>
            <li>Aliquot into appropriate storage containers</li>
            <li>Store at -80°C until analysis</li>
          </ol>
        </AccordionDetails>
      </Accordion>

      <Accordion id="quality-control" useDivider>
        <AccordionHeader subtitle="Ensuring data reliability">
          Quality Control Measures
        </AccordionHeader>
        <AccordionDetails>
          <p>
            Implement comprehensive quality control at every stage of the process
            to ensure reliable and reproducible results.
          </p>
          <h4>QC Checkpoints:</h4>
          <ul>
            <li>Sample integrity assessment</li>
            <li>Contamination screening</li>
            <li>Instrument calibration verification</li>
            <li>Control sample analysis</li>
            <li>Result validation and review</li>
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
```

### Left-Positioned Toggle with Custom Styling

```tsx
import React from 'react';
import { 
  Accordion, 
  AccordionHeader, 
  AccordionDetails,
  getColors,
  getSpaces 
} from '@czi-sds/components';
import styled from '@emotion/styled';

const StyledAccordionContainer = styled.div`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    
    return `
      .protocol-accordion {
        border: 1px solid ${colors?.primary[200]};
        border-radius: 4px;
        margin-bottom: ${spaces?.s}px;
        
        &:hover {
          border-color: ${colors?.primary[300]};
          background-color: ${colors?.primary[25]};
        }
      }
      
      .critical-section {
        border-color: ${colors?.negative[300]};
        background-color: ${colors?.negative[50]};
        
        .MuiAccordionSummary-root {
          background-color: ${colors?.negative[100]};
          border-radius: 4px 4px 0 0;
        }
      }
    `;
  }}
`;

function CustomStyledAccordions() {
  return (
    <StyledAccordionContainer>
      <Accordion 
        id="equipment-setup" 
        togglePosition="left"
        className="protocol-accordion"
        defaultExpanded
      >
        <AccordionHeader 
          subtitle="Before starting analysis"
          chevronSize="s"
        >
          Equipment Setup and Calibration
        </AccordionHeader>
        <AccordionDetails>
          <h4>Pre-Analysis Checklist:</h4>
          <ul>
            <li>Power on all analytical instruments 30 minutes before use</li>
            <li>Check reagent levels and expiration dates</li>
            <li>Run instrument calibration and quality control samples</li>
            <li>Verify temperature and environmental conditions</li>
            <li>Document all calibration results</li>
          </ul>
        </AccordionDetails>
      </Accordion>

      <Accordion 
        id="safety-protocols" 
        togglePosition="left"
        className="protocol-accordion critical-section"
        useDivider
      >
        <AccordionHeader 
          subtitle="Critical safety information"
          chevronSize="s"
        >
          Safety Protocols and Emergency Procedures
        </AccordionHeader>
        <AccordionDetails>
          <div style={{ color: '#d32f2f', fontWeight: '600', marginBottom: '16px' }}>
            ⚠️ Critical Safety Information - Must Read Before Proceeding
          </div>
          <h4>Personal Protective Equipment (Required):</h4>
          <ul>
            <li>Safety glasses or face shield</li>
            <li>Laboratory coat or apron</li>
            <li>Chemical-resistant gloves</li>
            <li>Closed-toe shoes</li>
          </ul>
          <h4>Emergency Procedures:</h4>
          <ul>
            <li>Chemical spill: Contain, evacuate, notify safety officer</li>
            <li>Eye exposure: Flush with eyewash for 15 minutes minimum</li>
            <li>Fire: Activate alarm, evacuate, call emergency services</li>
            <li>Equipment malfunction: Stop procedure, secure area, report incident</li>
          </ul>
        </AccordionDetails>
      </Accordion>
    </StyledAccordionContainer>
  );
}
```

### Interactive Accordion with Dynamic Content

```tsx
import React, { useState } from 'react';
import { 
  Accordion, 
  AccordionHeader, 
  AccordionDetails,
  Button,
  Tag,
  Icon
} from '@czi-sds/components';

interface ProtocolStep {
  id: string;
  title: string;
  subtitle: string;
  completed: boolean;
  critical: boolean;
  estimatedTime: string;
  instructions: string[];
}

function InteractiveAccordions() {
  const [steps, setSteps] = useState<ProtocolStep[]>([
    {
      id: 'prep',
      title: 'Sample Preparation',
      subtitle: 'Initial processing steps',
      completed: true,
      critical: false,
      estimatedTime: '15 minutes',
      instructions: [
        'Thaw samples at room temperature for 10 minutes',
        'Centrifuge at 2000g for 5 minutes',
        'Transfer supernatant to clean tubes',
        'Label tubes with sample ID and date'
      ]
    },
    {
      id: 'analysis',
      title: 'Analytical Testing',
      subtitle: 'Core analysis procedures',
      completed: false,
      critical: true,
      estimatedTime: '45 minutes',
      instructions: [
        'Calibrate spectrophotometer with blanks',
        'Load samples into instrument',
        'Run analysis protocol #3',
        'Monitor for any error messages',
        'Export raw data files'
      ]
    },
    {
      id: 'validation',
      title: 'Data Validation',
      subtitle: 'Quality control and review',
      completed: false,
      critical: false,
      estimatedTime: '20 minutes',
      instructions: [
        'Review all measurement values',
        'Check for outliers or anomalies',
        'Compare with control samples',
        'Document any deviations',
        'Approve or flag results'
      ]
    }
  ]);

  const toggleStepCompletion = (stepId: string) => {
    setSteps(prev => 
      prev.map(step => 
        step.id === stepId 
          ? { ...step, completed: !step.completed }
          : step
      )
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {steps.map((step) => (
        <Accordion 
          key={step.id}
          id={step.id}
          useDivider
          togglePosition="right"
        >
          <AccordionHeader subtitle={step.subtitle}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              width: '100%'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span>{step.title}</span>
                {step.critical && (
                  <Tag
                    color="negative"
                    label="Critical"
                    sdsStyle="rounded"
                    sdsType="secondary"
                  />
                )}
                {step.completed && (
                  <Tag
                    color="positive"
                    label="Complete"
                    sdsStyle="rounded"
                    sdsType="secondary"
                  />
                )}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>
                  {step.estimatedTime}
                </span>
                <Button
                  sdsType={step.completed ? "primary" : "secondary"}
                  sdsStyle="minimal"
                  startIcon={
                    <Icon 
                      sdsIcon={step.completed ? "CheckCircle" : "Circle"} 
                      sdsSize="s" 
                    />
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStepCompletion(step.id);
                  }}
                  aria-label={step.completed ? "Mark incomplete" : "Mark complete"}
                >
                  {step.completed ? "Completed" : "Pending"}
                </Button>
              </div>
            </div>
          </AccordionHeader>
          
          <AccordionDetails>
            <div style={{ marginBottom: '16px' }}>
              <strong>Instructions:</strong>
            </div>
            <ol style={{ paddingLeft: '20px', margin: 0 }}>
              {step.instructions.map((instruction, index) => (
                <li 
                  key={index}
                  style={{ 
                    marginBottom: '8px',
                    opacity: step.completed ? 0.6 : 1,
                    textDecoration: step.completed ? 'line-through' : 'none'
                  }}
                >
                  {instruction}
                </li>
              ))}
            </ol>
            
            {step.critical && (
              <div style={{ 
                marginTop: '16px', 
                padding: '12px', 
                backgroundColor: '#fff3e0',
                border: '1px solid #ffb74d',
                borderRadius: '4px'
              }}>
                <strong>⚠️ Critical Step:</strong> This step requires special attention
                and cannot be skipped or modified without approval.
              </div>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
```

### Nested Content with Rich Formatting

```tsx
import React from 'react';
import { 
  Accordion, 
  AccordionHeader, 
  AccordionDetails,
  List,
  ListItem,
  Table,
  TableHeader,
  TableRow,
  CellHeader,
  CellBasic
} from '@czi-sds/components';

function NestedContentAccordions() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Accordion id="reagents-materials" defaultExpanded>
        <AccordionHeader subtitle="Complete materials list">
          Required Reagents and Materials
        </AccordionHeader>
        <AccordionDetails>
          <Table>
            <TableHeader>
              <CellHeader>Item</CellHeader>
              <CellHeader>Quantity</CellHeader>
              <CellHeader>Storage</CellHeader>
              <CellHeader>Expiry Check</CellHeader>
            </TableHeader>
            <tbody>
              <TableRow>
                <CellBasic primaryText="Buffer Solution A" />
                <CellBasic primaryText="500 mL" />
                <CellBasic primaryText="4°C" />
                <CellBasic primaryText="✓ Valid" />
              </TableRow>
              <TableRow>
                <CellBasic primaryText="Enzyme Substrate" />
                <CellBasic primaryText="50 mL" />
                <CellBasic primaryText="-20°C" />
                <CellBasic primaryText="✓ Valid" />
              </TableRow>
              <TableRow>
                <CellBasic primaryText="Control Standards" />
                <CellBasic primaryText="3 vials" />
                <CellBasic primaryText="4°C" />
                <CellBasic primaryText="⚠️ Expires in 5 days" />
              </TableRow>
            </tbody>
          </Table>
        </AccordionDetails>
      </Accordion>

      <Accordion id="step-by-step" useDivider>
        <AccordionHeader subtitle="Detailed protocol steps">
          Step-by-Step Procedure
        </AccordionHeader>
        <AccordionDetails>
          <h4>Phase 1: Preparation (15 minutes)</h4>
          <List ordered>
            <ListItem ordered>
              Allow all reagents to reach room temperature
            </ListItem>
            <ListItem ordered>
              Prepare working solutions according to manufacturer specifications
            </ListItem>
            <ListItem ordered>
              Set up analytical instruments and verify calibration
            </ListItem>
          </List>

          <h4>Phase 2: Sample Processing (30 minutes)</h4>
          <List ordered>
            <ListItem ordered>
              Add 100 μL of sample to each well
            </ListItem>
            <ListItem ordered>
              Incubate at 37°C for 15 minutes with gentle agitation
            </ListItem>
            <ListItem ordered>
              Wash 3 times with washing buffer (200 μL each)
            </ListItem>
            <ListItem ordered>
              Add substrate solution (50 μL per well)
            </ListItem>
          </List>

          <h4>Phase 3: Detection (20 minutes)</h4>
          <List ordered>
            <ListItem ordered>
              Incubate in dark conditions for 15 minutes
            </ListItem>
            <ListItem ordered>
              Add stop solution (25 μL per well)
            </ListItem>
            <ListItem ordered>
              Read absorbance at 450 nm within 30 minutes
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion id="troubleshooting" useDivider>
        <AccordionHeader subtitle="Common issues and solutions">
          Troubleshooting Guide
        </AccordionHeader>
        <AccordionDetails>
          <h4>Low Signal or No Signal</h4>
          <List>
            <ListItem>Check reagent expiration dates and storage conditions</ListItem>
            <ListItem>Verify sample concentration and quality</ListItem>
            <ListItem>Ensure proper incubation temperature and timing</ListItem>
            <ListItem>Confirm instrument wavelength settings</ListItem>
          </List>

          <h4>High Background Signal</h4>
          <List>
            <ListItem>Increase washing stringency (additional wash steps)</ListItem>
            <ListItem>Check for contamination in reagents or equipment</ListItem>
            <ListItem>Verify blank controls are properly prepared</ListItem>
            <ListItem>Ensure proper blocking conditions</ListItem>
          </List>

          <h4>Inconsistent Results</h4>
          <List>
            <ListItem>Check pipetting accuracy and precision</ListItem>
            <ListItem>Ensure uniform mixing and incubation conditions</ListItem>
            <ListItem>Verify sample homogeneity</ListItem>
            <ListItem>Review standard curve quality and linearity</ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
```

## Toggle Positioning

### Right Position (Default)
- Expand/collapse chevron positioned on the right side
- Standard layout following common UI patterns
- Content flows naturally from left to right

### Left Position
- Expand/collapse chevron positioned on the left side
- Content automatically indented to align with header text
- Useful for hierarchical navigation or tree-like structures

## Best Practices

### When to Use

- Use Accordion for organizing content into collapsible sections
- Ideal for FAQs, help documentation, and detailed procedures
- Perfect for progressive disclosure of complex information
- Recommended for space-constrained interfaces with optional details

### When Not to Use

- Don't use for critical information that should always be visible
- Avoid for short content that doesn't benefit from collapsing
- Consider Table or List components for structured data display
- Don't use for navigation menus (consider dedicated navigation components)

### Accessibility Guidelines

- Accordion automatically includes proper ARIA attributes and roles
- Header elements receive appropriate focus management
- Keyboard navigation supported (Enter/Space to toggle, Tab to navigate)
- Screen readers announce expansion state and content relationships
- Focus management maintained when expanding/collapsing sections

### Design Guidelines

- Use descriptive headers that clearly indicate section content
- Keep nested content well-organized with proper hierarchy
- Apply consistent spacing and typography throughout sections
- Use dividers sparingly to avoid visual clutter
- Consider default expanded state for important or frequently accessed content

## Related Components

- **List** - Alternative for simple item collections without collapsing
- **Table** - Better for structured tabular data display
- **Card** - Alternative for grouped content without collapsing behavior
- **Dialog** - Alternative for detailed content in overlay format
- **Tabs** - Alternative for switching between different content sections

## Migration Notes

- **Automatic State Management**: Accordion handles expand/collapse state internally with unique IDs
- **Enhanced Accessibility**: Built-in ARIA attributes and keyboard navigation
- **Flexible Positioning**: Toggle can be positioned on left or right side
- **Consistent Styling**: Uses design system tokens for typography and spacing

## API Reference

- [Storybook Stories](https://main--61e887d56582fe003ac9595e.chromatic.com/?path=/story/components-accordion--default) - Interactive examples and testing
- [Material UI Accordion](https://mui.com/material-ui/react-accordion/) - Underlying MUI component documentation
- [AccordionHeader](#accordionheader-props) - Header component with title and subtitle
- [AccordionDetails](#accordiondetails-props) - Content container for expandable sections