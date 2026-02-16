# Modal Component Specification

## 1. Overview
The **Modal** (also known as **ResponsiveModal**) component displays content in an overlay that adapts to different screen sizes. On desktop, it appears as a centered modal dialog. On mobile, it transforms into a bottom sheet with a pull indicator.

## 2. Props API

### Interface: `ModalProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | Controls modal visibility. |
| `onClose` | `() => void` | - | Callback function when modal should close. |
| `title` | `string` | `undefined` | Optional title displayed in the header. |
| `children` | `React.ReactNode` | - | Content to display in the modal body. |
| `fullHeight` | `boolean` | `false` | On mobile, makes the bottom sheet full height. |

## 3. Visual Specifications

### Desktop Modal
- **Position**: Centered on screen
- **Max Width**: 800px
- **Max Height**: 85vh
- **Background**: `theme.palette.background.paper`
- **Border Radius**: 16px (theme.shape.borderRadius * 2)
- **Border**: 1px solid divider color
- **Shadow**: Extra large shadow
- **Animation**: Fade in + scale (0.95 → 1.0)
- **Duration**: 250ms

### Mobile Bottom Sheet
- **Position**: Bottom of screen
- **Max Height**: 85vh (or 100% if fullHeight)
- **Border Radius**: 20px (top corners only)
- **Pull Indicator**: 40px × 4px bar at top
- **Animation**: Slide up from bottom
- **Duration**: 300ms with custom easing

### Backdrop
- **Background**: `rgba(0, 0, 0, 0.4)`
- **Backdrop Filter**: `blur(4px)`
- **Click**: Closes modal
- **Animation**: Fade in/out

### Header
- **Padding**: 16px 20px
- **Border Bottom**: 1px solid divider
- **Title**: H6 typography
- **Close Button**: Icon button with hover effect

### Body
- **Padding**: 20px
- **Overflow**: Auto scroll
- **Touch Scrolling**: Smooth (-webkit-overflow-scrolling: touch)

## 4. Behavior

### Responsive Breakpoint
- **Mobile**: < 768px (bottom sheet)
- **Desktop**: ≥ 768px (centered modal)
- Automatically detects and updates on resize

### Body Scroll Lock
- Locks body scroll when modal is open
- Restores scroll when modal closes
- Prevents background scrolling

### Animation States
- **Opening**: Fade in + slide/scale animation
- **Closing**: Fade out + slide/scale animation
- **Cleanup**: Removes from DOM after animation completes

### Click Behavior
- **Backdrop Click**: Closes modal
- **Modal Content Click**: Does not close (stops propagation)
- **Close Button**: Closes modal
- **ESC Key**: Not implemented (future enhancement)

## 5. Usage Examples

### Basic Modal
```tsx
import { Modal } from '@/components/basics/Modal';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
>
  <p>Modal content goes here</p>
</Modal>
```

### Full Height Mobile
```tsx
import { Modal } from '@/components/basics/Modal';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Full Screen"
  fullHeight
>
  <div>Full height content on mobile</div>
</Modal>
```

### With Complex Content
```tsx
import { Modal } from '@/components/basics/Modal';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="User Profile"
>
  <div>
    <img src="/avatar.jpg" alt="User" />
    <h3>John Doe</h3>
    <p>Bio information...</p>
    <button>Edit Profile</button>
  </div>
</Modal>
```

### Without Title
```tsx
import { Modal } from '@/components/basics/Modal';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
>
  <div>Content without header title</div>
</Modal>
```

## 6. Component Structure

### Files
```
components/basics/Modal/
├── index.tsx           # Logic layer (device detection, scroll lock)
├── Modal.view.tsx      # View layer (pure UI)
└── Modal.stories.tsx   # Storybook stories (future)
```

### Separation of Concerns
- **Logic Layer** (`index.tsx`):
  - Mobile/desktop detection
  - Animation state management
  - Body scroll lock/unlock
  - Resize listener
  
- **View Layer** (`Modal.view.tsx`):
  - Pure UI rendering
  - Receives all state as props
  - Handles styling and layout
  - No side effects

## 7. Design Tokens Used

- `theme.palette.background.paper` - Modal background
- `theme.palette.divider` - Borders
- `theme.palette.text.primary` - Title color
- `theme.palette.text.secondary` - Close button color
- `theme.palette.action.hover` - Button hover state
- `theme.shape.borderRadius` - Border radius
- `theme.spacing()` - Padding and margins
- `theme.typography.h6` - Title typography
- `theme.shadows.xl` - Box shadow
- `theme.transitions.duration` - Animation timing
- `theme.transitions.easing` - Animation easing

## 8. Accessibility

### Keyboard Navigation
- Close button is keyboard focusable
- Should trap focus within modal (future enhancement)
- ESC key to close (future enhancement)

### Screen Readers
- Modal content is accessible
- Should add `role="dialog"` (future enhancement)
- Should add `aria-modal="true"` (future enhancement)
- Should add `aria-labelledby` for title (future enhancement)

### Focus Management
- Should focus first interactive element on open (future enhancement)
- Should restore focus on close (future enhancement)

## 9. Performance

### Optimizations
- Removes from DOM when not visible
- Uses CSS transforms for smooth animations
- Efficient resize listener with cleanup
- Minimal re-renders

### Animation Performance
- Uses `transform` and `opacity` (GPU accelerated)
- Avoids layout thrashing
- Smooth 60fps animations

## 10. Browser Support

- Modern browsers with CSS transforms
- Backdrop filter support (graceful degradation)
- Touch scrolling on iOS
- Resize observer for responsive behavior

## 11. Future Enhancements

- [ ] ESC key to close
- [ ] Focus trap within modal
- [ ] Focus restoration on close
- [ ] ARIA attributes for accessibility
- [ ] Swipe down to close on mobile
- [ ] Multiple modal stacking
- [ ] Custom animation variants
- [ ] Portal rendering option
- [ ] Prevent scroll on iOS Safari
- [ ] Custom breakpoint prop

## 12. Related Components

- **Tooltip**: Smaller overlay for hints
- **Drawer**: Side panel variant
- **Dialog**: Confirmation dialogs

## 13. Mobile Considerations

### Bottom Sheet
- Pull indicator for visual affordance
- Smooth slide-up animation
- Touch-friendly close button
- Optimized for one-handed use

### iOS Safari
- Handles viewport height correctly
- Smooth touch scrolling
- Prevents background scroll

### Android
- Material Design bottom sheet style
- Proper backdrop behavior
- Smooth animations

## 14. Common Patterns

### Confirmation Dialog
```tsx
<Modal isOpen={isOpen} onClose={onClose} title="Confirm Action">
  <p>Are you sure you want to proceed?</p>
  <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
    <button onClick={onClose}>Cancel</button>
    <button onClick={handleConfirm}>Confirm</button>
  </div>
</Modal>
```

### Form Modal
```tsx
<Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
  <form onSubmit={handleSubmit}>
    <input type="text" placeholder="Name" />
    <input type="email" placeholder="Email" />
    <button type="submit">Save</button>
  </form>
</Modal>
```

### Image Gallery
```tsx
<Modal isOpen={isOpen} onClose={onClose} fullHeight>
  <img src={selectedImage} alt="Gallery" style={{ width: '100%' }} />
</Modal>
```

## 15. Technical Notes

### Z-Index Layers
- Backdrop: 1000
- Modal Content: 1001
- Ensures proper stacking

### Body Scroll Lock
- Sets `overflow: hidden` on body
- Restores original overflow on close
- Prevents iOS scroll issues

### Animation Timing
- Desktop: 250ms (faster, more responsive)
- Mobile: 300ms (smoother, more natural)
- Custom easing for bottom sheet

### Responsive Detection
- Uses `window.innerWidth < 768`
- Updates on window resize
- Cleans up listeners properly
