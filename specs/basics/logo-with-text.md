# LogoWithText Component Specification

## 1. Overview
The **LogoWithText** component displays the Twin3 brand logo with accompanying text. It automatically detects and responds to system theme changes (light/dark mode) to display the appropriate logo variant.

## 2. Props API

### Interface: `LogoWithTextProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `height` | `number` | `28` | Logo height in pixels. Width adjusts automatically to maintain aspect ratio. |
| `className` | `string` | `undefined` | Additional CSS classes for custom styling. |

## 3. Visual Specifications

### Theme Detection
- **Dark Mode** (dark background):
  - Image: `/brands/logo_text_dark mode.svg`
  - Shows: Light/white logo with text
  
- **Light Mode** (light background):
  - Image: `/brands/logo_text_light mode.svg`
  - Shows: Dark/black logo with text

### Styling
- **Height**: Configurable (default 28px)
- **Width**: Auto (maintains aspect ratio)
- **Object Fit**: `contain`
- **Format**: SVG (scalable vector graphics)

## 4. Behavior

### Theme Detection
- Automatically detects system color scheme preference
- Listens for theme changes in real-time
- Updates logo variant when theme changes
- Uses `prefers-color-scheme` media query

### Responsive
- Width automatically adjusts based on height
- Maintains aspect ratio
- Scales cleanly at any size (SVG)

## 5. Usage Examples

### Default Usage
```tsx
import { LogoWithText } from '@/components/basics/LogoWithText';

// Default: 28px height, auto theme detection
<LogoWithText />
```

### Custom Height
```tsx
import { LogoWithText } from '@/components/basics/LogoWithText';

// Larger logo
<LogoWithText height={40} />

// Smaller logo
<LogoWithText height={20} />
```

### With Custom Styling
```tsx
import { LogoWithText } from '@/components/basics/LogoWithText';

<LogoWithText 
  height={32}
  className="hover:opacity-80 transition-opacity cursor-pointer"
/>
```

### In Navigation
```tsx
import { LogoWithText } from '@/components/basics/LogoWithText';

<nav>
  <a href="/">
    <LogoWithText height={36} />
  </a>
</nav>
```

## 6. Component Structure

### Files
```
components/basics/LogoWithText/
├── index.tsx                # Logic layer (theme detection)
├── LogoWithText.view.tsx    # View layer (pure UI)
└── LogoWithText.stories.tsx # Storybook stories (future)
```

### Separation of Concerns
- **Logic Layer** (`index.tsx`): 
  - Handles theme detection with `matchMedia`
  - Manages theme change listeners
  - Passes theme state to view
  
- **View Layer** (`LogoWithText.view.tsx`): 
  - Pure UI rendering
  - Receives theme state as prop
  - Displays appropriate logo variant

## 7. Technical Details

### Theme Detection Implementation
```typescript
// Initial theme detection
const [isDark, setIsDark] = useState(() => 
  window.matchMedia('(prefers-color-scheme: dark)').matches
);

// Listen for theme changes
useEffect(() => {
  const matcher = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
  
  matcher.addEventListener('change', handler);
  return () => matcher.removeEventListener('change', handler);
}, []);
```

### Performance
- Minimal re-renders (only on theme change)
- Efficient event listener cleanup
- SVG format for optimal file size
- No external dependencies

## 8. Accessibility

- **Alt Text**: "twin3.ai" - Describes the logo for screen readers
- **Semantic HTML**: Uses `<img>` tag with proper attributes
- **Keyboard Navigation**: Not interactive by default, but can be wrapped in link/button
- **Theme Respect**: Honors user's system theme preference

## 9. Browser Support

- Modern browsers with `matchMedia` support
- Graceful fallback to dark mode if detection fails
- Works with:
  - Chrome/Edge 76+
  - Firefox 69+
  - Safari 12.1+

## 10. Future Enhancements

- [ ] Manual theme override prop
- [ ] Loading state with skeleton
- [ ] Animated logo variant
- [ ] Click analytics tracking
- [ ] Preload both variants for instant switching
- [ ] Support for custom logo variants

## 11. Related Components

- **Logo**: Simple logo without text
- **Header**: Uses LogoWithText in navigation
- **Sidebar**: Uses LogoWithText in sidebar

## 12. Notes

- Logo images are stored in `/public/brands/`
- SVG format ensures crisp rendering at any size
- Automatically responds to OS theme changes
- No manual theme switching required
- Width is always auto to maintain aspect ratio
