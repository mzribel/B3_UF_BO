# Design System

This is a comprehensive design system for the Back Office application. It provides a set of reusable UI components, patterns, and guidelines to ensure consistency across the application.

## Structure

The design system is organized into the following directories:

- **components**: Basic UI components like Button, Input, Card, etc.
- **patterns**: Composite components and UI patterns like Form, Modal, etc.
- **documentation**: Detailed documentation for each component and pattern

## Components

### Base Components

#### Button

A versatile button component with various styles and states.

```vue
<Button variant="primary" size="md">Click me</Button>
```

**Props:**
- `variant`: primary, secondary, success, danger, warning, info, light, dark
- `size`: sm, md, lg
- `disabled`: boolean
- `fullWidth`: boolean
- `type`: button, submit, reset

#### Input

A form input component with support for various input types and states.

```vue
<Input v-model="value" label="Username" placeholder="Enter your username" />
```

**Props:**
- `modelValue`: string or number (for v-model)
- `label`: string
- `placeholder`: string
- `type`: text, password, email, number, tel, url, search, date
- `required`: boolean
- `disabled`: boolean
- `error`: string
- `helpText`: string
- `size`: sm, md, lg
- `fullWidth`: boolean

#### Card

A container component for displaying content in a card format.

```vue
<Card variant="primary" shadow="md">
  <template #header>Card Header</template>
  Card content goes here
  <template #footer>Card Footer</template>
</Card>
```

**Props:**
- `variant`: default, primary, secondary, outlined, flat
- `shadow`: none, sm, md, lg
- `padding`: none, sm, md, lg, xl
- `rounded`: none, sm, md, lg, full
- `fullWidth`: boolean

### Patterns

#### Form

A form component that provides a consistent form experience.

```vue
<Form @submit="handleSubmit" @cancel="handleCancel">
  <Input v-model="username" label="Username" />
  <Input v-model="password" type="password" label="Password" />
</Form>
```

**Props:**
- `loading`: boolean
- `submitLabel`: string
- `cancelLabel`: string
- `showCancel`: boolean
- `inline`: boolean
- `fullWidth`: boolean

**Events:**
- `submit`: emitted when the form is submitted
- `cancel`: emitted when the cancel button is clicked

#### Modal

A modal dialog component for displaying content in a modal.

```vue
<Modal v-model="isModalOpen" title="Modal Title">
  Modal content goes here
  <template #footer>
    <Button @click="isModalOpen = false">Close</Button>
  </template>
</Modal>
```

**Props:**
- `modelValue`: boolean (for v-model)
- `title`: string
- `size`: sm, md, lg, xl, full
- `persistent`: boolean
- `hideClose`: boolean
- `closeOnEsc`: boolean
- `closeOnClickOutside`: boolean

**Events:**
- `update:modelValue`: emitted when the modal is opened or closed
- `close`: emitted when the modal is closed

## Usage Guidelines

### Naming Conventions

All design system components are prefixed with `ds-` in their CSS classes to avoid conflicts with other styles.

### Component Composition

Components can be composed together to create more complex UI elements. For example, a form can contain multiple inputs and buttons.

### Responsive Design

All components are designed to be responsive and work well on all screen sizes. Use the `fullWidth` prop where available to make components take up the full width of their container on smaller screens.

### Accessibility

Components are designed with accessibility in mind. They include proper ARIA attributes, keyboard navigation, and focus management.

## Extending the Design System

To add new components to the design system:

1. Create a new component in the appropriate directory (components or patterns)
2. Follow the naming conventions and styling guidelines
3. Document the component in this README
4. Add the component to the showcase page (if available)