# Tooltip Component Specification

## 1. Overview
The **Tooltip** component displays contextual information when users hover over an element. It uses React Portal for rendering outside the DOM hierarchy and includes smart touch device detection to prevent tooltips on mobile devices.

## 2. Props API

### Interface: `TooltipProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | - | The text content to display in the tooltip. |
| `children` | `React.ReactNode` | - | The trigger element that shows the tooltip on hover. |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Position of the tooltip relative to the trigger element. |

## 3. Visual Specifications

### Styling
- **Background**: `rgba(28, 28, 30, 0.95)` with backdrop blur
- **Border**: `1px solid` divider color
- **Border Radius**: `6px` (theme.shape.borderRadius - 2)
- **Padding**: `6px 12px` (theme.spacing)
- **Font Size**: `12px` (caption)
- **Font Weight**: `500`
- **Text Color**: White (theme.palette.text.primary)
- **Shadow**: Large shadow (theme.shadows.lg)
- **Z-Index**: `99999` (top layer)

### Placement
- **Top**: Above trigger, centered horizontally
- **Bottom**: Below trigger, centered horizontally (default)
- **Left**: Left of trigger, centered vertically
- **Right**: Right of trigger, centered vertically
- **Offset**: 8px from trigger element

## 4. Behavior

### Show/Hide Logic
- **Desktop**: Shows on mouse enter, hides on mouse leave
- **Touch Devices**: Disabled (no tooltip on mobile/tablet)
- **Pointer Events**: None (tooltip doesn't block interactions)

### Touch Device Detection
Detects touch devices using:
- `(hover: hover)` media query
- `(pointer: fine)` media query
- Screen width < 1024px
- Listens for device changes (e.g., connecting mouse to tablet)

### Position Updates
- Recalculates position on scroll
- Recalculates position on window resize
- Ensures tooltip stays aligned with trigger

### Portal Rendering
- Renders to `document.body`
- Avoids z-index and overflow issues
- Maintains proper stacking context

## 5. Usage Examples

### Basic Usage
```tsx
import { Tooltip } from '@/components/basics/Tooltip';

<Tooltip content="This is a helpful tip">
  <button>Hover me</button>
</Tooltip>
```

### Different Placements
```tsx
import { Tooltip } from '@/components/basics/Tooltip';

// Top placement
<Tooltip content="Top tooltip" placement="top">
  <span>Hover for top tooltip</span>
</Tooltip>

// Left placement
<Tooltip content="Left tooltip" placement="left">
  <span>Hover for left tooltip</span>
</Tooltip>

// Right placement
<Tooltip content="Right tooltip" placement="right">
  <span>Hover for right tooltip</span>
</Tooltip>
```

### With Icons
```tsx
import { Tooltip } from '@/components/basics/Tooltip';
import { Info } from 'lucide-react';

<Tooltip content="Additional information about this feature">
  <Info size={16} />
</Tooltip>
```

### With Buttons
```tsx
import { Tooltip } from '@/components/basics/Tooltip';

<Tooltip content="Click to save your changes">
  <button className="btn-primary">
    Save
  </button>
</Tooltip>
```

## 6. Component Structure

### Files
```
components/basics/Tooltip/
├── index.tsx           # Logic layer (positioning, device detection)
├── Tooltip.view.tsx    # View layer (pure UI)
└── Tooltip.stories.tsx # Storybook stories (future)
```

### Separation of Concerns
- **Logic Layer** (`index.tsx`):
  - Touch device detection
  - Position calculation
  - Scroll/resize listeners
  - Visibility state management
  
- **View Layer** (`Tooltip.view.tsx`):
  - Pure UI rendering
  - Portal creation
  - Transform calculations
  - Receives all state as props

## 7. Design Tokens Used

- `theme.spacing()` - Padding
- `theme.palette.divider` - Border color
- `theme.palette.text.primary` - Text color
- `theme.shape.borderRadius` - Border radius
- `theme.typography.caption.fontSize` - Font size
- `theme.shadows.lg` - Box shadow

## 8. Accessibility

### Keyboard Navigation
- Tooltip trigger is keyboard focusable
- Can be enhanced with focus events for keyboard users

### Screen Readers
- Content is visible to screen readers
- Consider adding `aria-describedby` for better semantics

### Touch Devices
- Disabled on touch devices (prevents accidental triggers)
- Prevents poor UX on mobile

## 9. Performance

### Optimizations
- Uses `useCallback` for stable function references
- Efficient event listener cleanup
- Only updates position when visible
- Minimal re-renders

### Event Listeners
- Scroll listener with capture phase
- Resize listener for window changes
- Media query listeners for device detection
- All properly cleaned up on unmount

## 10. Browser Support

- Modern browsers with Portal support (React 16.8+)
- `matchMedia` support for device detection
- Backdrop filter support (graceful degradation)

## 11. Future Enhancements

- [ ] Add delay prop for show/hide timing
- [ ] Support for rich content (HTML/React nodes)
- [ ] Arrow/pointer on tooltip
- [ ] Keyboard focus support
- [ ] `aria-describedby` integration
- [ ] Max width prop
- [ ] Animation transitions
- [ ] Boundary detection (prevent overflow)

## 12. Related Components

- **MatrixTooltip**: Specialized tooltip for Twin Matrix
- **Button**: Often used with tooltips
- **Icon buttons**: Common tooltip use case

## 13. Technical Notes

### Portal Benefits
- Avoids z-index conflicts
- Bypasses overflow: hidden containers
- Maintains proper stacking context
- Renders at document root

### Touch Device Detection
Uses multiple signals for accuracy:
1. Hover capability check
2. Pointer precision check
3. Screen size check
4. Dynamic updates on device changes

### Position Calculation
- Uses `getBoundingClientRect()` for accurate positioning
- Accounts for scroll position
- Centers tooltip relative to trigger
- 8px offset for visual separation

## 14. Common Patterns

### Info Icons
```tsx
<Tooltip content="Explanation text">
  <Info size={16} className="text-gray-400" />
</Tooltip>
```

### Disabled Buttons
```tsx
<Tooltip content="Please fill all required fields">
  <button disabled>Submit</button>
</Tooltip>
```

### Truncated Text
```tsx
<Tooltip content={fullText}>
  <span className="truncate">{truncatedText}</span>
</Tooltip>
```
