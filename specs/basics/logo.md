# Logo Component Specification

## 1. Overview
The **Logo** component displays the Twin3 brand logo with support for light and dark variants. It's a foundational UI element used across the application for brand identity.

## 2. Props API

### Interface: `LogoProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'light' \| 'dark'` | `'dark'` | Logo variant based on background. `light` for light backgrounds (shows dark logo), `dark` for dark backgrounds (shows light logo). |
| `width` | `string \| number` | `28` | Logo width. Numbers are converted to pixels. |
| `height` | `string \| number` | `28` | Logo height. Numbers are converted to pixels. |
| `className` | `string` | `undefined` | Additional CSS classes for custom styling. |

## 3. Visual Specifications

### Variants
- **Light Variant** (`variant="light"`):
  - Image: `/brands/twin3-black-circle.png`
  - Usage: On light backgrounds
  - Shows: Dark/black logo

- **Dark Variant** (`variant="dark"`):
  - Image: `/brands/twin3-black-half.png`
  - Usage: On dark backgrounds (default)
  - Shows: Light/white logo

### Styling
- **Border Radius**: `theme.shape.borderRadius` (8px)
- **Object Fit**: `contain` (maintains aspect ratio)
- **Default Size**: 28x28 pixels

## 4. Usage Examples

### Default Usage (Dark Variant)
```tsx
import { Logo } from '@/components/basics/Logo';

// Default: 28x28px, dark variant
<Logo />
```

### Light Variant (For Light Backgrounds)
```tsx
import { Logo } from '@/components/basics/Logo';

<Logo variant="light" />
```

### Custom Size
```tsx
import { Logo } from '@/components/basics/Logo';

// Numeric size (pixels)
<Logo width={40} height={40} />

// String size (any CSS unit)
<Logo width="3rem" height="3rem" />
```

### With Custom Styling
```tsx
import { Logo } from '@/components/basics/Logo';

<Logo 
  variant="dark"
  width={48}
  height={48}
  className="hover:opacity-80 transition-opacity"
/>
```

## 5. Component Structure

### Files
```
components/basics/Logo/
├── index.tsx           # Logic layer (exports)
├── Logo.view.tsx       # View layer (pure UI)
└── Logo.stories.tsx    # Storybook stories (future)
```

### Separation of Concerns
- **Logic Layer** (`index.tsx`): Can be extended with analytics, theme detection, or dynamic variant selection
- **View Layer** (`Logo.view.tsx`): Pure UI rendering, receives props and displays logo

## 6. Design Tokens Used

- `theme.shape.borderRadius` - Border radius (8px)

## 7. Accessibility

- **Alt Text**: "twin3" - Describes the logo for screen readers
- **Semantic HTML**: Uses `<img>` tag with proper attributes
- **Keyboard Navigation**: Not interactive, no focus needed

## 8. Future Enhancements

- [ ] Add loading state with skeleton
- [ ] Support for animated logo variant
- [ ] Automatic theme detection
- [ ] Click analytics tracking
- [ ] SVG version for better scaling
- [ ] Lazy loading for performance

## 9. Related Components

- **LogoWithText**: Logo with accompanying text
- **Header**: Uses Logo in navigation
- **Sidebar**: Uses Logo in sidebar navigation

## 10. Notes

- Logo images are stored in `/public/brands/`
- Maintains aspect ratio with `object-fit: contain`
- Supports both pixel and CSS unit sizing
- Default variant optimized for dark mode (primary theme)
