# View Components

This directory contains components that are specifically designed to be used in views. These components help to separate business logic from presentation logic, making views simpler and more focused on layout.

## Components

### LoginForm

A form component for handling user authentication.

**Usage:**
```vue
<template>
  <LoginForm @login-success="handleSuccess" @login-error="handleError" />
</template>
```

**Props:**
- None

**Events:**
- `login-success`: Emitted when login is successful
- `login-error`: Emitted when login fails, with the error message as payload

### DashboardCard

A card component for the dashboard that handles navigation.

**Usage:**
```vue
<template>
  <DashboardCard 
    title="Card Title" 
    description="Card description text" 
    route="/route-path" 
  />
</template>
```

**Props:**
- `title`: The title of the card
- `description`: The description text for the card
- `route`: The route to navigate to when the card is clicked

### PageLayout

A layout component that provides a consistent structure for pages.

**Usage:**
```vue
<template>
  <PageLayout 
    title="Page Title" 
    description="Page description text"
  >
    <!-- Page content goes here -->
  </PageLayout>
</template>
```

**Props:**
- `title`: The title of the page (required)
- `description`: The description text for the page (optional)
- `useCard`: Whether to wrap the content in a Card component (default: true)
- `cardVariant`: The variant of the Card component (default: 'default')
- `cardShadow`: The shadow of the Card component (default: 'md')
- `cardPadding`: The padding of the Card component (default: 'lg')

## Guidelines for View Development

1. **Separate Business Logic from Presentation Logic**
   - Views should focus on layout and composition of components
   - Business logic should be extracted into components or composables

2. **Use the Design System**
   - Use components from the design system (Button, Input, Card, etc.)
   - Use CSS variables from the theme instead of hardcoded values

3. **Use the PageLayout Component**
   - Use the PageLayout component to provide a consistent structure for pages
   - Pass the title and description as props

4. **Create View-Specific Components**
   - If a view has complex logic, extract it into a component in this directory
   - Name the component with a clear, descriptive name that indicates its purpose

5. **Use Composables for Shared Logic**
   - If multiple views share the same logic, extract it into a composable
   - Place composables in a separate directory (e.g., `composables`)

## Example: Refactoring a View

**Before:**
```vue
<template>
  <div class="my-view">
    <h1>My View</h1>
    <p class="description">Description text</p>
    
    <div class="content">
      <!-- Complex content with business logic -->
    </div>
  </div>
</template>

<script setup>
// Business logic here
</script>

<style scoped>
/* Custom styles here */
</style>
```

**After:**
```vue
<template>
  <PageLayout 
    title="My View" 
    description="Description text"
  >
    <MyViewContent />
  </PageLayout>
</template>

<script setup>
import PageLayout from '../components/views/PageLayout.vue';
import MyViewContent from '../components/views/MyViewContent.vue';
</script>
```

With the business logic extracted into `MyViewContent.vue`.