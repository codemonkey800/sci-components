# InputText

## Overview

The InputText component provides a versatile text input field for collecting user data in forms and interfaces. Built on Material UI's TextField component, it supports both single-line text fields and multi-line text areas with customizable styling, validation states, and accessibility features. The component is designed to handle various text input scenarios from simple form fields to complex data entry interfaces.

Key features include single-line and multi-line text input modes, intent-based styling for validation states, label visibility controls, full accessibility support, and seamless integration with form libraries.

## Installation & Import

```tsx
import { InputText } from '@czi-sds/components';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| id | `string` | ✓ | - | Unique identifier for the input element |
| label | `ReactNode` | - | - | Label text or element for the input |
| sdsType | `"textField" \| "textArea"` | - | `"textField"` | Type of input - single line or multi-line |
| value | `unknown` | - | - | Controlled value of the input |
| onChange | `function` | - | - | Callback fired when input value changes |
| placeholder | `string` | - | - | Placeholder text shown when input is empty |
| intent | `"default" \| "negative" \| "notice" \| "positive"` | - | `"default"` | Visual intent/state for styling |
| disabled | `boolean` | - | `false` | If true, disables the input |
| hideLabel | `boolean` | - | `false` | If true, hides the label visually (still accessible) |
| fullWidth | `boolean` | - | `false` | If true, input takes full width of container |
| size | `"small" \| "medium"` | - | `"medium"` | Size of the input field |
| variant | `"filled" \| "outlined" \| "standard"` | - | `"outlined"` | Material UI variant style |
| color | `"primary" \| "secondary" \| "error" \| "info" \| "success" \| "warning"` | - | `"primary"` | Color scheme of the component |
| name | `string` | - | - | Name attribute for form submission |
| onClick | `function` | - | - | Click event handler |
| className | `string` | - | - | CSS class name for custom styling |
| style | `CSSProperties` | - | - | Inline styles object |

## Usage Examples

### Basic Text Field

```tsx
import React, { useState } from 'react';
import { InputText } from '@czi-sds/components';

function BasicTextInput() {
  const [name, setName] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <InputText
      id="basic-name-input"
      label="Full Name"
      placeholder="Enter your full name"
      value={name}
      onChange={handleNameChange}
      sdsType="textField"
    />
  );
}
```

### Multi-line Text Area

```tsx
import React, { useState } from 'react';
import { InputText } from '@czi-sds/components';

function TextAreaExample() {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  return (
    <div style={{ width: '400px' }}>
      <InputText
        id="description-textarea"
        label="Experiment Description"
        placeholder="Describe the experimental setup, methodology, and expected outcomes..."
        value={description}
        onChange={handleDescriptionChange}
        sdsType="textArea"
        rows={6}
        fullWidth
      />
      <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
        Characters: {description.length}
      </p>
    </div>
  );
}
```

### Intent States for Validation

```tsx
import React, { useState, useEffect } from 'react';
import { InputText } from '@czi-sds/components';

function ValidationExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailIntent, setEmailIntent] = useState<'default' | 'negative' | 'positive'>('default');
  const [passwordIntent, setPasswordIntent] = useState<'default' | 'negative' | 'notice' | 'positive'>('default');

  // Email validation
  useEffect(() => {
    if (email === '') {
      setEmailIntent('default');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailIntent('negative');
    } else {
      setEmailIntent('positive');
    }
  }, [email]);

  // Password validation
  useEffect(() => {
    if (password === '') {
      setPasswordIntent('default');
    } else if (password.length < 6) {
      setPasswordIntent('negative');
    } else if (password.length < 8) {
      setPasswordIntent('notice');
    } else {
      setPasswordIntent('positive');
    }
  }, [password]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <InputText
        id="email-input"
        label="Email Address"
        placeholder="Enter your email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        intent={emailIntent}
        fullWidth
      />
      
      <InputText
        id="password-input"
        label="Password"
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        intent={passwordIntent}
        fullWidth
      />

      <div style={{ fontSize: '12px' }}>
        <p style={{ 
          color: emailIntent === 'negative' ? 'red' : emailIntent === 'positive' ? 'green' : '#666',
          margin: '4px 0'
        }}>
          Email: {
            emailIntent === 'negative' ? 'Invalid email format' :
            emailIntent === 'positive' ? 'Valid email address' :
            'Enter a valid email address'
          }
        </p>
        
        <p style={{ 
          color: passwordIntent === 'negative' ? 'red' : 
                passwordIntent === 'notice' ? 'orange' :
                passwordIntent === 'positive' ? 'green' : '#666',
          margin: '4px 0'
        }}>
          Password: {
            passwordIntent === 'negative' ? 'Too short (min 6 characters)' :
            passwordIntent === 'notice' ? 'Weak (8+ characters recommended)' :
            passwordIntent === 'positive' ? 'Strong password' :
            'Enter a secure password'
          }
        </p>
      </div>
    </div>
  );
}
```

### Size Variations

```tsx
import React, { useState } from 'react';
import { InputText } from '@czi-sds/components';

function SizeVariations() {
  const [smallValue, setSmallValue] = useState('');
  const [mediumValue, setMediumValue] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <InputText
        id="small-input"
        label="Small Input"
        placeholder="This is a small input field..."
        value={smallValue}
        onChange={(e) => setSmallValue(e.target.value)}
        size="small"
        fullWidth
      />
      
      <InputText
        id="medium-input"
        label="Medium Input (Default)"
        placeholder="This is a medium input field..."
        value={mediumValue}
        onChange={(e) => setMediumValue(e.target.value)}
        size="medium"
        fullWidth
      />
    </div>
  );
}
```

### Form Integration with react-hook-form

```tsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText, Button } from '@czi-sds/components';

interface ResearchFormData {
  projectTitle: string;
  principalInvestigator: string;
  institution: string;
  abstract: string;
  keywords: string;
}

function ResearchForm() {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<ResearchFormData>({
    defaultValues: {
      projectTitle: '',
      principalInvestigator: '',
      institution: '',
      abstract: '',
      keywords: ''
    }
  });

  const watchedAbstract = watch('abstract');

  const onSubmit = (data: ResearchFormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '500px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2>Research Project Application</h2>

        <Controller
          name="projectTitle"
          control={control}
          rules={{ required: 'Project title is required' }}
          render={({ field }) => (
            <InputText
              id="project-title"
              label="Project Title"
              placeholder="Enter the project title"
              intent={errors.projectTitle ? 'negative' : 'default'}
              fullWidth
              {...field}
            />
          )}
        />
        {errors.projectTitle && (
          <p style={{ color: 'red', fontSize: '14px', margin: 0 }}>
            {errors.projectTitle.message}
          </p>
        )}

        <Controller
          name="principalInvestigator"
          control={control}
          rules={{ required: 'Principal Investigator name is required' }}
          render={({ field }) => (
            <InputText
              id="principal-investigator"
              label="Principal Investigator"
              placeholder="Enter PI name"
              intent={errors.principalInvestigator ? 'negative' : 'default'}
              fullWidth
              {...field}
            />
          )}
        />
        {errors.principalInvestigator && (
          <p style={{ color: 'red', fontSize: '14px', margin: 0 }}>
            {errors.principalInvestigator.message}
          </p>
        )}

        <Controller
          name="institution"
          control={control}
          rules={{ required: 'Institution is required' }}
          render={({ field }) => (
            <InputText
              id="institution"
              label="Institution"
              placeholder="University or research institution"
              intent={errors.institution ? 'negative' : 'default'}
              fullWidth
              {...field}
            />
          )}
        />
        {errors.institution && (
          <p style={{ color: 'red', fontSize: '14px', margin: 0 }}>
            {errors.institution.message}
          </p>
        )}

        <Controller
          name="abstract"
          control={control}
          rules={{ 
            required: 'Abstract is required',
            minLength: { value: 100, message: 'Abstract must be at least 100 characters' },
            maxLength: { value: 2000, message: 'Abstract cannot exceed 2000 characters' }
          }}
          render={({ field }) => (
            <div>
              <InputText
                id="abstract"
                label="Project Abstract"
                placeholder="Provide a detailed description of your research project..."
                sdsType="textArea"
                rows={8}
                intent={errors.abstract ? 'negative' : 'default'}
                fullWidth
                {...field}
              />
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '12px', 
                color: '#666',
                marginTop: '4px'
              }}>
                <span>{watchedAbstract.length}/2000 characters</span>
                <span>{watchedAbstract.length >= 100 ? '✓' : '⚠'} Min 100 chars</span>
              </div>
            </div>
          )}
        />
        {errors.abstract && (
          <p style={{ color: 'red', fontSize: '14px', margin: 0 }}>
            {errors.abstract.message}
          </p>
        )}

        <Controller
          name="keywords"
          control={control}
          render={({ field }) => (
            <InputText
              id="keywords"
              label="Keywords (Optional)"
              placeholder="Enter keywords separated by commas"
              fullWidth
              {...field}
            />
          )}
        />

        <Button type="submit" sdsStyle="rounded" sdsType="primary" fullWidth>
          Submit Application
        </Button>
      </div>
    </form>
  );
}
```

### Different Input Types

```tsx
import React, { useState } from 'react';
import { InputText } from '@czi-sds/components';

function InputTypeExamples() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    number: '',
    url: '',
    tel: '',
    search: ''
  });

  const handleChange = (field: keyof typeof formData) => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [field]: event.target.value }));
    };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <h3>Different Input Types</h3>
      
      <InputText
        id="email-type"
        label="Email"
        type="email"
        placeholder="user@example.com"
        value={formData.email}
        onChange={handleChange('email')}
        fullWidth
      />
      
      <InputText
        id="password-type"
        label="Password"
        type="password"
        placeholder="Enter password"
        value={formData.password}
        onChange={handleChange('password')}
        fullWidth
      />
      
      <InputText
        id="number-type"
        label="Sample Count"
        type="number"
        placeholder="1000"
        value={formData.number}
        onChange={handleChange('number')}
        min="1"
        max="10000"
        fullWidth
      />
      
      <InputText
        id="url-type"
        label="Dataset URL"
        type="url"
        placeholder="https://example.com/dataset"
        value={formData.url}
        onChange={handleChange('url')}
        fullWidth
      />
      
      <InputText
        id="tel-type"
        label="Phone Number"
        type="tel"
        placeholder="+1 (555) 123-4567"
        value={formData.tel}
        onChange={handleChange('tel')}
        fullWidth
      />
    </div>
  );
}
```

### Hidden Label Example

```tsx
import React, { useState } from 'react';
import { InputText } from '@czi-sds/components';

function HiddenLabelExample() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userInput, setUserInput] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h4>Visible Label (Default)</h4>
        <InputText
          id="visible-label"
          label="Search Query"
          placeholder="Enter search terms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
        />
      </div>

      <div>
        <h4>Hidden Label (Accessible but not visible)</h4>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
          The label is hidden visually but still accessible to screen readers:
        </p>
        <InputText
          id="hidden-label"
          label="User Input Field"
          hideLabel={true}
          placeholder="This input has a hidden label"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          fullWidth
        />
      </div>
    </div>
  );
}
```

### Disabled State

```tsx
import React, { useState } from 'react';
import { InputText, Button } from '@czi-sds/components';

function DisabledInputExample() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('This field can be enabled/disabled');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <div>
        <Button 
          onClick={() => setIsEnabled(!isEnabled)}
          sdsStyle="rounded"
          sdsType={isEnabled ? "primary" : "secondary"}
        >
          {isEnabled ? "Disable" : "Enable"} Input
        </Button>
      </div>

      <InputText
        id="toggleable-input"
        label="Experiment Name"
        placeholder={isEnabled ? "Enter experiment name" : "Input is disabled"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={!isEnabled}
        fullWidth
      />

      <InputText
        id="readonly-info"
        label="System Information"
        value="This field is always disabled"
        disabled={true}
        fullWidth
      />

      <p style={{ fontSize: '14px', color: '#666' }}>
        {isEnabled 
          ? "Input is enabled - you can edit the text"
          : "Input is disabled - enable it using the button above"
        }
      </p>
    </div>
  );
}
```

### With Theme Integration

```tsx
import React, { useState } from 'react';
import { InputText, getColors, getSpaces } from '@czi-sds/components';
import styled from '@emotion/styled';

const FormSection = styled.div`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    
    return `
      background-color: ${colors?.gray[100]};
      padding: ${spaces?.l}px;
      border-radius: 12px;
      border: 1px solid ${colors?.gray[300]};
      margin-bottom: ${spaces?.l}px;
    `;
  }}
`;

const FormTitle = styled.h3`
  ${(props) => {
    const colors = getColors(props);
    
    return `
      color: ${colors?.gray[800]};
      margin-top: 0;
      margin-bottom: 16px;
    `;
  }}
`;

function ThemedInputs() {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    organization: ''
  });

  const handleInputChange = (field: keyof typeof profileData) => 
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setProfileData(prev => ({ ...prev, [field]: event.target.value }));
    };

  return (
    <div style={{ width: '500px' }}>
      <FormSection>
        <FormTitle>Personal Information</FormTitle>
        
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <InputText
            id="first-name"
            label="First Name"
            placeholder="Enter first name"
            value={profileData.firstName}
            onChange={handleInputChange('firstName')}
            fullWidth
          />
          
          <InputText
            id="last-name"
            label="Last Name"
            placeholder="Enter last name"
            value={profileData.lastName}
            onChange={handleInputChange('lastName')}
            fullWidth
          />
        </div>

        <InputText
          id="email-themed"
          label="Email Address"
          type="email"
          placeholder="user@institution.edu"
          value={profileData.email}
          onChange={handleInputChange('email')}
          fullWidth
        />
      </FormSection>

      <FormSection>
        <FormTitle>Professional Details</FormTitle>
        
        <InputText
          id="organization"
          label="Organization"
          placeholder="University or research institution"
          value={profileData.organization}
          onChange={handleInputChange('organization')}
          fullWidth
        />
        
        <div style={{ marginTop: '16px' }}>
          <InputText
            id="bio-themed"
            label="Professional Biography"
            placeholder="Describe your research interests and background..."
            sdsType="textArea"
            rows={6}
            value={profileData.bio}
            onChange={handleInputChange('bio')}
            fullWidth
          />
          <div style={{ 
            fontSize: '12px', 
            color: '#666', 
            textAlign: 'right',
            marginTop: '4px'
          }}>
            {profileData.bio.length} characters
          </div>
        </div>
      </FormSection>
    </div>
  );
}
```

## Variations

### SDS Type Variations

- **textField**: Single-line text input for names, emails, short responses
- **textArea**: Multi-line text input for descriptions, comments, longer content

### Intent Variations

- **default**: Standard neutral appearance
- **positive**: Green accent for valid/successful input
- **notice**: Yellow/orange accent for warnings or important information
- **negative**: Red accent for errors or invalid input

### Size Variations

- **small**: Compact size for dense interfaces
- **medium**: Standard size for most use cases (default)

## Component States

- **Default**: Normal interactive state ready for input
- **Focused**: Active state when input receives focus with visible focus ring
- **Filled**: State when input contains text
- **Disabled**: Non-interactive state when `disabled={true}`
- **Error**: Visual state when validation fails or intent is "negative"

## Best Practices

### When to Use

- Use for text data entry in forms and data collection interfaces
- Ideal for names, descriptions, comments, and free-form text input
- Perfect for scientific data entry requiring detailed descriptions
- Recommended for user-generated content and configuration settings

### When Not to Use

- Avoid for selecting from predefined options (use InputDropdown instead)
- Don't use for boolean choices (use InputCheckbox or InputToggle)
- Consider InputSearch for search-specific functionality
- Avoid for numeric input requiring precision controls (use InputSlider)

### Accessibility Guidelines

- Always provide meaningful labels via the `label` prop
- Use proper `id` attributes for screen reader association
- Component includes built-in ARIA attributes and roles
- Supports full keyboard navigation (Tab, arrow keys in text areas)
- Error states are properly announced to assistive technologies
- Hidden labels maintain accessibility while providing cleaner visuals

### Form Integration Best Practices

- Use controlled components with proper state management
- Implement proper validation with clear error messaging
- Provide helpful placeholder text that doesn't replace labels
- Use appropriate input types (email, password, url, etc.) for better UX
- Consider character limits and validation for longer text inputs

### Design Guidelines

- Maintain consistent input sizing across related form fields
- Use appropriate intent colors to communicate validation states
- Provide adequate spacing between form elements
- Consider full-width inputs for better mobile experience
- Group related inputs logically within your forms

## Related Components

- **InputSearch** - Use for search-specific functionality with built-in search icon
- **InputDropdown** - Use for selecting from predefined text options
- **InputCheckbox** - Use for boolean text confirmations
- **Autocomplete** - Use for searchable text input with suggestions

## Migration Notes

### From Legacy Input Components

- **Intent System**: Replace separate color/validation props with `intent` prop
- **Type Variants**: Use `sdsType` to distinguish between text field and text area
- **Label Control**: New `hideLabel` prop for accessible label hiding

### Breaking Changes

- `sdsType` prop required to differentiate between text field and text area modes
- Improved accessibility requires proper `id` and `label` props
- Updated styling system uses SDS design tokens

## API Reference

- [Storybook Stories](https://main--64ad2577a2c26e0097ff24a6.chromatic.com/?path=/story/components-inputs-inputtext--default) - Interactive examples and testing
- [Material UI TextField](https://mui.com/material-ui/react-text-field/) - Underlying MUI component documentation
- [Design Tokens](https://zeroheight.com/2a1e5182b/p/6145b2-design-tokens) - Available theme tokens and values