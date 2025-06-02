# Theme System Documentation

This document provides an overview of the centralized theme system for the back office application.

## Overview

The theme system is designed to provide a consistent look and feel across the entire application by centralizing colors, spacing, typography, and other design elements in a single file. This makes it easier to maintain and update the application's visual design.

## Files

- `theme.css`: The main theme file that defines all CSS variables used throughout the application.
- `style.css`: Contains additional global styles that are not theme-specific.

## Usage

### Importing the Theme

The theme is automatically imported in `main.ts` and is available throughout the application.

### Using Theme Variables

Use the CSS variables defined in `theme.css` instead of hardcoded values in your component styles:

```css
/* Instead of this */
.my-component {
  color: #42b883;
  padding: 1rem;
}

/* Use this */
.my-component {
  color: var(--primary-color);
  padding: var(--space-md);
}
```

## Available Variables

### Colors

- **Primary Colors**
  - `--primary-color`: Main brand color (#42b883)
  - `--primary-dark`: Darker version of primary color (#5b4bc4)
  - `--primary-light`: Lighter version of primary color (#64E9EE)

- **Secondary Colors**
  - `--secondary-color`: Secondary brand color (#6c5ce7)
  - `--secondary-dark`: Darker version of secondary color (#093A3E)
  - `--secondary-light`: Lighter version of secondary color (#3AAFB9)

- **Text Colors**
  - `--text-light`: Light text color for dark backgrounds (#ffffff)
  - `--text-dark`: Dark text color for light backgrounds (#2d3436)
  - `--text-muted`: Muted text color for secondary information (#636e72)
  - `--text-link`: Color for links (#3AAFB9)
  - `--text-highlight`: Highlighted text color (#97C8EB)

- **Background Colors**
  - `--bg-dark`: Dark background color (#222222)
  - `--bg-light`: Light background color (#ffffff)
  - `--bg-muted`: Muted background color (#f9f9f9)
  - `--bg-header`: Header background color (#093A3E)
  - `--bg-footer`: Footer background color (#2c3e50)

- **Status Colors**
  - `--success`: Success color (#42b883)
  - `--warning`: Warning color (#fdcb6e)
  - `--error`: Error color (#e74c3c)
  - `--error-light`: Light error background (#ffebee)
  - `--error-dark`: Dark error text (#c62828)

### Spacing

- `--space-xs`: Extra small spacing (0.5rem)
- `--space-sm`: Small spacing (0.75rem)
- `--space-md`: Medium spacing (1rem)
- `--space-lg`: Large spacing (1.5rem)
- `--space-xl`: Extra large spacing (2rem)

### Typography

- `--font-family`: Main font family ('Arial', sans-serif)
- `--font-size-sm`: Small font size (0.875rem)
- `--font-size-md`: Medium font size (1rem)
- `--font-size-lg`: Large font size (1.5rem)
- `--font-weight-normal`: Normal font weight (400)
- `--font-weight-medium`: Medium font weight (500)
- `--font-weight-bold`: Bold font weight (700)
- `--line-height`: Default line height (1.6)

### Other

- **Border Radius**
  - `--radius-sm`: Small border radius (4px)
  - `--radius-md`: Medium border radius (8px)
  - `--radius-lg`: Large border radius (12px)

- **Shadows**
  - `--shadow-sm`: Small shadow (0 2px 4px rgba(0, 0, 0, 0.1))
  - `--shadow-md`: Medium shadow (0 4px 6px rgba(0, 0, 0, 0.1))
  - `--shadow-focus`: Focus shadow (0 0 0 2px rgba(108, 92, 231, 0.2))

## Utility Classes

The theme also provides utility classes for common styling needs:

- `.text-error`, `.text-success`, `.text-warning`: Text colors for different states
- `.bg-error`, `.bg-success`, `.bg-warning`: Background colors for different states

## Extending the Theme

To add new variables to the theme:

1. Add the new variable to `theme.css` in the appropriate section
2. Use a consistent naming convention (e.g., `--component-element-state`)
3. Document the new variable in this README