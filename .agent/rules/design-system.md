---
trigger: always_on
---

# Twin3 Design System

## Design Principles

1. **Consistency**: Uniform visual language across all components
2. **Accessibility**: WCAG 2.1 AA compliance minimum
3. **Responsiveness**: Mobile-first, adaptive layouts
4. **Dark Mode First**: Optimized for dark theme, light mode support
5. **Performance**: Smooth animations, fast load times

## Color System

### Primary Colors
- **Primary**: `#1976d2` - Main brand color, CTAs, links
- **Secondary**: `#9c27b0` - Accent color, highlights
- **Error**: `#d32f2f` - Error states, destructive actions
- **Warning**: `#ed6c02` - Warning states, caution
- **Info**: `#0288d1` - Informational messages
- **Success**: `#2e7d32` - Success states, confirmations

### Background Colors (Dark Mode)
- **Default**: `#0a0a0a` - Main background
- **Paper**: `#1c1c1e` - Card backgrounds
- **Elevated**: `#2c2c2e` - Elevated surfaces

### Text Colors
- **Primary**: `#ffffff` - Main text
- **Secondary**: `rgba(255, 255, 255, 0.7)` - Secondary text
- **Disabled**: `rgba(255, 255, 255, 0.38)` - Disabled text

## Typography

### Font Family
- Primary: `Inter`
- Fallback: `Roboto, Helvetica, Arial, sans-serif`

### Type Scale
| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| H1 | 40px | 700 | 1.2 | Page titles |
| H2 | 32px | 700 | 1.3 | Section titles |
| H3 | 28px | 600 | 1.4 | Subsection titles |
| H4 | 24px | 600 | 1.4 | Card titles |
| H5 | 20px | 600 | 1.5 | Small headings |
| H6 | 16px | 600 | 1.5 | Smallest headings |
| Body 1 | 16px | 400 | 1.5 | Main body text |
| Body 2 | 14px | 400 | 1.43 | Secondary text |
| Caption | 12px | 400 | 1.66 | Captions, labels |
| Button | 14px | 500 | 1.75 | Button text |

## Spacing System

Based on 8px grid:
- `spacing(0.5)` = 4px
- `spacing(1)` = 8px
- `spacing(2)` = 16px
- `spacing(3)` = 24px
- `spacing(4)` = 32px
- `spacing(5)` = 40px
- `spacing(6)` = 48px

## Border Radius

- **Default**: 8px
- **Small**: 4px
- **Large**: 12px
- **Round**: 50%

## Shadows

- **sm**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **md**: `0 4px 6px -1px rgba(0, 0, 0, 0.1)`
- **lg**: `0 10px 15px -3px rgba(0, 0, 0, 0.1)`
- **xl**: `0 20px 25px -5px rgba(0, 0, 0, 0.1)`

## Animation

### Duration
- **Shortest**: 150ms - Micro-interactions
- **Short**: 250ms - Simple transitions
- **Standard**: 300ms - Default animations
- **Complex**: 375ms - Complex animations

### Easing
- **easeInOut**: `cubic-bezier(0.4, 0, 0.2, 1)` - Default
- **easeOut**: `cubic-bezier(0.0, 0, 0.2, 1)` - Enter
- **easeIn**: `cubic-bezier(0.4, 0, 1, 1)` - Exit
- **sharp**: `cubic-bezier(0.4, 0, 0.6, 1)` - Snappy

### Animation Usage Guidelines

#### Text Content Animations
**CRITICAL**: Text messages should NOT have entrance animations to prevent visual shifting issues.

- ❌ **DON'T**: Apply `animate-fade-in` or any transform animations to `MessageBubble` or text content containers
- ✅ **DO**: Let text content appear instantly without animation
- **Reason**: Transform animations (translateY, translateX) can cause text to appear to "drift" or "shift" during rendering, especially with:
  - Long text content
  - Multi-line text
  - Dynamic content loading
  - Different font rendering across browsers

#### Widget/Component Animations
Widgets and interactive components CAN have entrance animations:

- ✅ Cards, modals, tooltips: Use `animate-fade-in` or `animate-fade-in-scale`
- ✅ Widgets (twin_matrix, wallet_binding, etc.): Can use subtle entrance animations
- ✅ Interactive elements: Hover, click, and state transitions

#### Animation Classes Reference
```css
/* Text Content - NO ANIMATION */
.message-bubble {
  /* No animation class */
}

/* Widgets & Cards - WITH ANIMATION */
.card {
  /* Can use: animate-fade-in, animate-fade-in-scale */
}

/* Available Animation Classes */
.animate-fade-in          /* Fade + slight Y movement - USE WITH CAUTION */
.animate-fade-in-scale    /* Fade + scale - Safe for cards/widgets */
.animate-slide-down       /* Expanding sections */
.animate-spring-grow-glow /* Special effects (Matrix unlock) */
```

#### When to Use Animations
1. **User-triggered actions**: Modals, dropdowns, tooltips
2. **State changes**: Loading → Success, Empty → Filled
3. **New content**: Cards appearing, list items adding
4. **Feedback**: Success/error messages, notifications

#### When NOT to Use Animations
1. **Text messages**: Chat bubbles, conversation text
2. **Critical content**: Error messages, important alerts
3. **Performance-sensitive**: Long lists, frequent updates
4. **Accessibility concerns**: Users with motion sensitivity

#### Testing Animations
Before adding animations to new components:
1. Test with long text content (100+ characters)
2. Test with multi-line content (3+ lines)
3. Test on different screen sizes (mobile, tablet, desktop)
4. Test in different browsers (Chrome, Safari, Firefox)
5. Check for visual "drift" or "shift" during animation
6. Verify smooth 60fps performance

## Component States

### Interactive States
1. **Default**: Normal state
2. **Hover**: Mouse over (desktop only)
3. **Active**: Being clicked/pressed
4. **Focus**: Keyboard focus
5. **Disabled**: Non-interactive

### Visual Feedback
- Hover: Subtle background change
- Active: Slight scale or color shift
- Focus: Visible outline (accessibility)
- Disabled: Reduced opacity, no pointer events

## Iconography

### Icon Library
- **Primary**: Lucide React
- **Size**: 16px, 20px, 24px
- **Stroke Width**: 1.5px
- **Style**: Rounded corners

### Usage
- Use semantic icons
- Consistent sizing within context
- Proper color contrast
- Accessible labels

## Layout

### Breakpoints
- **xs**: 0px - Mobile
- **sm**: 640px - Small tablet
- **md**: 768px - Tablet
- **lg**: 1024px - Desktop
- **xl**: 1280px - Large desktop
- **2xl**: 1536px - Extra large

### Container
- Max width: 1280px
- Padding: 16px (mobile), 24px (tablet), 32px (desktop)

### Grid
- 12-column grid system
- Gap: 16px (mobile), 24px (desktop)

## Accessibility

### Color Contrast
- Text on background: Minimum 4.5:1
- Large text: Minimum 3:1
- Interactive elements: Minimum 3:1

### Focus Indicators
- Visible focus ring
- 2px solid outline
- Color: Primary or high contrast

### Keyboard Navigation
- All interactive elements focusable
- Logical tab order
- Escape to close modals
- Arrow keys for navigation

### Screen Readers
- Semantic HTML
- ARIA labels where needed
- Alt text for images
- Descriptive link text

## Best Practices

### DO
✅ Use theme tokens consistently
✅ Follow spacing system
✅ Maintain color contrast
✅ Test in both light and dark modes
✅ Provide keyboard navigation
✅ Use semantic HTML
✅ Optimize for performance

### DON'T
❌ Hardcode colors or spacing
❌ Use pixel values directly
❌ Ignore accessibility
❌ Create custom colors without approval
❌ Use inline styles excessively
❌ Forget responsive design
❌ Skip animation performance testing
