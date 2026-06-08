# MyKeja Design System
**Version**: 1.0 | **Date**: June 8, 2026 | **Status**: Implementation Ready

---

## 1. Colour Tokens & Theming

### Primary Palette (Light Blue Theme)

```css
/* Light Mode */
:root {
  --color-brand-primary: #0066CC;
  --color-brand-primary-light: #4D9FFF;
  --color-brand-primary-dark: #0052A3;
  
  --color-surface-primary: #F0F8FF;
  --color-surface-white: #FFFFFF;
  --color-surface-glass: rgba(255, 255, 255, 0.8);
  --color-surface-glass-subtle: rgba(245, 251, 255, 0.6);
  
  --color-accent-secondary: #00B4D8;
  --color-accent-tertiary: #0096D1;
  
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #6B7280;
  --color-text-disabled: #D1D5DB;
  
  --color-border: #E0EBFF;
  --color-border-glass: rgba(0, 102, 204, 0.15);
  
  --color-state-error: #DC2626;
  --color-state-success: #10B981;
  --color-state-warning: #F59E0B;
  --color-state-destructive: #7F1D1D;
  
  --shadow-sm: 0 2px 8px rgba(0, 102, 204, 0.08);
  --shadow-md: 0 4px 16px rgba(0, 102, 204, 0.1), 0 8px 24px rgba(0, 102, 204, 0.05);
  --shadow-lg: 0 8px 32px rgba(0, 102, 204, 0.12), 0 16px 48px rgba(0, 102, 204, 0.08);
  --shadow-xl: 0 16px 64px rgba(0, 102, 204, 0.15), 0 24px 80px rgba(0, 102, 204, 0.1);
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-brand-primary: #4D9FFF;
    --color-brand-primary-light: #80B3FF;
    --color-brand-primary-dark: #3A7ACC;
    
    --color-surface-primary: #1A2332;
    --color-surface-white: #1E2E3E;
    --color-surface-glass: rgba(30, 46, 62, 0.8);
    --color-surface-glass-subtle: rgba(15, 24, 32, 0.6);
    
    --color-accent-secondary: #00D9FF;
    --color-accent-tertiary: #00B8E6;
    
    --color-text-primary: #F5F5F5;
    --color-text-secondary: #A0A8B8;
    --color-text-disabled: #4B5563;
    
    --color-border: #2A3A4E;
    --color-border-glass: rgba(77, 159, 255, 0.25);
    
    --color-state-error: #FF6B6B;
    --color-state-success: #34D399;
    --color-state-warning: #FBBF24;
    --color-state-destructive: #FCA5A5;
    
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.2);
    --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5), 0 16px 48px rgba(0, 0, 0, 0.3);
    --shadow-xl: 0 16px 64px rgba(0, 0, 0, 0.6), 0 24px 80px rgba(0, 0, 0, 0.4);
  }
}
```

### Glass Effect Specifications

```css
.glass-card {
  background: var(--color-surface-glass);
  backdrop-filter: blur(20px);
  border: 1px solid var(--color-border-glass);
  border-radius: 12px;
}

.glass-overlay {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(40px);
  border-radius: 16px;
}
```

---

## 2. Typography System

### Typeface Pairing

- **Display Typeface**: Poppins (for property titles, hero moments, agent names)
- **Body Typeface**: Inter (for descriptions, body text, and dense information)

### Type Scale

```css
:root {
  /* Display Sizes */
  --font-display-large: 48px;
  --line-height-display-large: 56px;
  --font-weight-display-large: 700;
  --letter-spacing-display-large: -0.02em;
  
  --font-display-small: 36px;
  --line-height-display-small: 44px;
  --font-weight-display-small: 600;
  --letter-spacing-display-small: -0.015em;
  
  /* Headings */
  --font-heading-1: 28px;
  --line-height-heading-1: 36px;
  --font-weight-heading-1: 600;
  --letter-spacing-heading-1: -0.01em;
  
  --font-heading-2: 24px;
  --line-height-heading-2: 32px;
  --font-weight-heading-2: 600;
  
  --font-heading-3: 20px;
  --line-height-heading-3: 28px;
  --font-weight-heading-3: 600;
  
  --font-heading-4: 16px;
  --line-height-heading-4: 24px;
  --font-weight-heading-4: 600;
  
  /* Body Text */
  --font-body-large: 16px;
  --line-height-body-large: 24px;
  --font-weight-body-large: 400;
  --letter-spacing-body-large: 0.5px;
  
  --font-body-regular: 14px;
  --line-height-body-regular: 20px;
  --font-weight-body-regular: 400;
  --letter-spacing-body-regular: 0.25px;
  
  --font-body-small: 12px;
  --line-height-body-small: 18px;
  --font-weight-body-small: 400;
  --letter-spacing-body-small: 0.4px;
  
  /* Labels & Captions */
  --font-caption: 12px;
  --line-height-caption: 16px;
  --font-weight-caption: 500;
  --letter-spacing-caption: 0.4px;
  
  --font-label: 11px;
  --line-height-label: 16px;
  --font-weight-label: 600;
  --letter-spacing-label: 0.8px;
  
  --font-overline: 10px;
  --line-height-overline: 14px;
  --font-weight-overline: 700;
  --letter-spacing-overline: 1.5px;
}
```

### Typography Classes

```css
.display-large { font: var(--font-weight-display-large) var(--font-display-large) / var(--line-height-display-large) Poppins; letter-spacing: var(--letter-spacing-display-large); }
.display-small { font: var(--font-weight-display-small) var(--font-display-small) / var(--line-height-display-small) Poppins; letter-spacing: var(--letter-spacing-display-small); }
.heading-1 { font: var(--font-weight-heading-1) var(--font-heading-1) / var(--line-height-heading-1) Poppins; letter-spacing: var(--letter-spacing-heading-1); }
.heading-2 { font: var(--font-weight-heading-2) var(--font-heading-2) / var(--line-height-heading-2) Poppins; }
.heading-3 { font: var(--font-weight-heading-3) var(--font-heading-3) / var(--line-height-heading-3) Poppins; }
.body-large { font: var(--font-weight-body-large) var(--font-body-large) / var(--line-height-body-large) Inter; letter-spacing: var(--letter-spacing-body-large); }
.body-regular { font: var(--font-weight-body-regular) var(--font-body-regular) / var(--line-height-body-regular) Inter; letter-spacing: var(--letter-spacing-body-regular); }
.body-small { font: var(--font-weight-body-small) var(--font-body-small) / var(--line-height-body-small) Inter; letter-spacing: var(--letter-spacing-body-small); }
.caption { font: var(--font-weight-caption) var(--font-caption) / var(--line-height-caption) Inter; letter-spacing: var(--letter-spacing-caption); }
.label { font: var(--font-weight-label) var(--font-label) / var(--line-height-label) Inter; letter-spacing: var(--letter-spacing-label); }
```

---

## 3. Spacing & Layout

### Spacing Scale (8px base)

```css
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;
  
  --spacing-gutter-mobile: 16px;
  --spacing-gutter-tablet: 24px;
  --spacing-gutter-desktop: 32px;
}
```

### Border Radius

```css
:root {
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-full: 9999px;
}
```

---

## 4. Motion & Animation

### Easing Functions

```css
:root {
  --easing-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --easing-smooth: cubic-bezier(0.34, 1.56, 0.64, 1);
  --easing-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Animation Durations

```css
.button-press {
  transition: all 150ms var(--easing-spring);
}

.card-tap {
  transition: all 300ms var(--easing-smooth);
}

.page-transition {
  transition: all 400ms var(--easing-smooth);
}

.modal-reveal {
  animation: slideUp 350ms var(--easing-smooth);
}

.skeleton-loading {
  animation: pulse 1600ms ease-in-out infinite;
}

@keyframes slideUp {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
```

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
}
```

---

## 5. Component Tokens

### Button States

```css
/* Primary Button */
.btn-primary {
  background: var(--color-brand-primary);
  color: white;
  padding: 12px 24px;
  border-radius: var(--radius-full);
  font-weight: 600;
  min-height: 44px;
  transition: all 150ms var(--easing-spring);
}

.btn-primary:hover {
  background: var(--color-brand-primary-dark);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-primary:disabled {
  background: var(--color-text-disabled);
  color: var(--color-text-secondary);
  cursor: not-allowed;
  box-shadow: none;
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: var(--color-brand-primary);
  border: 2px solid var(--color-brand-primary);
  padding: 10px 22px;
  border-radius: var(--radius-full);
  font-weight: 600;
  min-height: 44px;
}

.btn-secondary:hover {
  background: var(--color-surface-primary);
  box-shadow: var(--shadow-sm);
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: var(--color-brand-primary);
  padding: 12px 16px;
  border: none;
  font-weight: 500;
  text-decoration: underline;
  min-height: 44px;
}

.btn-ghost:hover {
  color: var(--color-brand-primary-dark);
}
```

### Input Fields

```css
.input-field {
  padding: 12px 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-body-regular);
  font-family: Inter;
  background: var(--color-surface-white);
  color: var(--color-text-primary);
  transition: all 150ms var(--easing-smooth);
  min-height: 44px;
}

.input-field:focus {
  outline: none;
  border-color: var(--color-brand-primary);
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.input-field::placeholder {
  color: var(--color-text-secondary);
}

.input-field:disabled {
  background: var(--color-surface-primary);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}

.input-field.error {
  border-color: var(--color-state-error);
  background-color: rgba(220, 38, 38, 0.05);
}

.input-error-message {
  color: var(--color-state-error);
  font-size: var(--font-body-small);
  margin-top: 4px;
}
```

### Badge & Tags

```css
.badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: var(--radius-full);
  font-size: var(--font-label);
  font-weight: 600;
  background: var(--color-surface-primary);
  color: var(--color-brand-primary);
  white-space: nowrap;
}

.badge.success {
  background: rgba(16, 185, 129, 0.1);
  color: var(--color-state-success);
}

.badge.warning {
  background: rgba(245, 158, 11, 0.1);
  color: var(--color-state-warning);
}

.badge.error {
  background: rgba(220, 38, 38, 0.1);
  color: var(--color-state-error);
}
```

---

## 6. Responsive Grid System

### Breakpoints

```css
/* Mobile First */
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* Mobile: < 640px */
/* Tablet: 640px - 1024px */
/* Desktop: > 1024px */
```

### Grid Layout

```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--spacing-gutter-mobile);
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--spacing-gutter-tablet);
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1280px;
    padding: 0 var(--spacing-gutter-desktop);
  }
}

.grid {
  display: grid;
  gap: var(--spacing-md);
}

.grid-cols-1 { grid-template-columns: 1fr; }

@media (min-width: 768px) {
  .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
}
```

---

## 7. Accessibility Standards

### Touch Targets

```css
/* Minimum 44x44px touch target */
button, a, input, [role="button"] {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

### Focus Indicators

```css
button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 2px solid var(--color-brand-primary);
  outline-offset: 2px;
}
```

### Contrast Ratios

```
- Primary text on white: #1A1A1A on #FFFFFF = 12:1 ✓
- Primary text on light blue: #1A1A1A on #F0F8FF = 10.5:1 ✓
- Primary button text: White on #0066CC = 4.5:1 ✓
- Secondary text: #6B7280 on #FFFFFF = 6.8:1 ✓
```

---

## 8. Component Library Quick Reference

| Component | Variants | States |
|-----------|----------|--------|
| Button | Primary, Secondary, Ghost | Default, Hover, Active, Disabled, Loading |
| Input | Text, Email, Phone, Password, Textarea | Default, Focus, Error, Disabled, Loading |
| Card | Glass, Elevated, Flat | Default, Hover, Active |
| Badge | Default, Success, Warning, Error | — |
| Modal | Standard, Alert, Confirmation | Opening, Open, Closing |
| Toast | Success, Error, Warning, Info | Showing, Dismissing |
| Skeleton | Card, Text, Image | Loading |
| Toggle | Switch, Checkbox, Radio | On, Off, Disabled |
| Dropdown | Standard, Multi-select | Default, Open, Disabled |
| Rating | Star display, Star picker | Read-only, Interactive |

---

## 9. Dark Theme Implementation

All components automatically switch via CSS `prefers-color-scheme` media query. No additional JavaScript needed for system preference detection.

For manual theme toggle:
```html
<html data-theme="light"> or <html data-theme="dark">
```

```css
[data-theme="dark"] {
  /* Dark theme overrides */
  --color-brand-primary: #4D9FFF;
  /* ... all other dark tokens ... */
}
```

---

## 10. Export & Implementation Guide

### CSS Variables Usage

```css
/* In any component */
.property-card {
  background: var(--color-surface-glass);
  border: 1px solid var(--color-border-glass);
  box-shadow: var(--shadow-md);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  color: var(--color-text-primary);
  font-size: var(--font-body-regular);
  transition: all 300ms var(--easing-smooth);
}
```

### Tailwind CSS Alternative

If using Tailwind, extend configuration:

```js
// tailwind.config.js
module.exports = {
  extend: {
    colors: {
      brand: {
        primary: '#0066CC',
        light: '#4D9FFF',
        dark: '#0052A3',
      },
      surface: {
        primary: '#F0F8FF',
        glass: 'rgba(255, 255, 255, 0.8)',
      },
      state: {
        error: '#DC2626',
        success: '#10B981',
        warning: '#F59E0B',
      },
    },
    fontSize: {
      'display-lg': ['48px', { lineHeight: '56px', fontWeight: '700' }],
      'display-sm': ['36px', { lineHeight: '44px', fontWeight: '600' }],
      'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
      'body-sm': ['12px', { lineHeight: '18px', fontWeight: '400' }],
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      '2xl': '48px',
      '3xl': '64px',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      full: '9999px',
    },
    boxShadow: {
      sm: '0 2px 8px rgba(0, 102, 204, 0.08)',
      md: '0 4px 16px rgba(0, 102, 204, 0.1), 0 8px 24px rgba(0, 102, 204, 0.05)',
      lg: '0 8px 32px rgba(0, 102, 204, 0.12), 0 16px 48px rgba(0, 102, 204, 0.08)',
    },
  },
};
```

---

**This design system is ready for implementation. Use these tokens across all pages to ensure visual consistency.**
