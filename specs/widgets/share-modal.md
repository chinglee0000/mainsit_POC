# ShareModal Widget Specification

## Overview

The ShareModal widget provides a modal interface for sharing Twin3 on social media platforms. It supports Twitter/X, Telegram, and copy to clipboard functionality, with a success state showing earned reward points.

## Component Structure

```
components/widgets/ShareModal/
├── index.tsx              # Logic Layer (RED ZONE)
├── ShareModal.view.tsx    # View Layer (GREEN ZONE)
```

## Props API

### ShareModal (Logic Layer)

```typescript
type SharePlatform = 'twitter' | 'telegram' | 'copy';

interface ShareModalProps {
  onComplete: () => void;
  onClose: () => void;
  shareText?: string;
  shareUrl?: string;
  rewardPoints?: number;
}
```

### ShareModalView (View Layer)

```typescript
interface ShareModalViewProps {
  shared: boolean;
  shareText: string;
  rewardPoints: number;
  onShare: (platform: SharePlatform) => void;
  onClose: () => void;
  onBackdropClick: () => void;
  onContentClick: (e: React.MouseEvent) => void;
}
```

## Visual Specifications

### Backdrop
- Position: Fixed, full screen
- Background: `rgba(0, 0, 0, 0.7)`
- Backdrop Filter: `blur(4px)`
- Z-Index: `99999`
- Animation: `fadeIn 0.15s ease-out`

### Modal Container
- Max Width: `380px`
- Background: `rgba(28, 28, 30, 0.95)`
- Border: `1px solid rgba(255, 255, 255, 0.1)`
- Border Radius: `16px`
- Padding: `24px`
- Box Shadow: `0 20px 40px rgba(0,0,0,0.6)`
- Animation: `slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)`

### Close Button
- Size: `32px × 32px`
- Position: Absolute top-right
- Background: `rgba(255, 255, 255, 0.1)`
- Border Radius: `50%`
- Hover: `rgba(255, 255, 255, 0.15)`
- Only visible in share options state

## Share Options State

### Header Section
- Display: Flex with `12px` gap
- Margin Bottom: `20px`

#### Icon Box
- Size: `48px × 48px`
- Border Radius: `12px`
- Background: `rgba(59, 130, 246, 0.15)`
- Icon: Share2 (24px, #3b82f6)

#### Title
- Font Size: `18px`
- Font Weight: 500
- Font Family: Montserrat
- Color: White

#### Reward Text
- Font Size: `13px`
- Color: `rgba(255, 255, 255, 0.6)`
- Format: "Earn +{points} points"

### Share Text Preview
- Font Size: `14px`
- Color: `rgba(255, 255, 255, 0.8)`
- Line Height: 1.6
- Padding: `12px`
- Background: `rgba(255, 255, 255, 0.04)`
- Border: `1px solid rgba(255, 255, 255, 0.06)`
- Border Radius: `8px`
- Margin Bottom: `24px`

### Share Buttons
- Display: Flex column with `10px` gap
- Padding: `14px`
- Border Radius: `12px`
- Font Size: `14px`
- Font Weight: 500
- Icon Size: `18px`
- Gap: `10px`
- Transition: `all 0.2s ease`
- Hover: `translateY(-1px)`

#### Twitter/X Button
- Background: `rgba(29, 161, 242, 0.15)`
- Border: `1px solid rgba(29, 161, 242, 0.3)`
- Color: `#1DA1F2`
- Hover Background: `rgba(29, 161, 242, 0.25)`
- Icon: Twitter

#### Telegram Button
- Background: `rgba(0, 136, 204, 0.15)`
- Border: `1px solid rgba(0, 136, 204, 0.3)`
- Color: `#0088CC`
- Hover Background: `rgba(0, 136, 204, 0.25)`
- Icon: MessageCircle

#### Copy Link Button
- Background: `rgba(255, 255, 255, 0.06)`
- Border: `1px solid rgba(255, 255, 255, 0.1)`
- Color: `var(--color-text-secondary)`
- Hover Background: `rgba(255, 255, 255, 0.1)`
- Icon: Copy

## Success State

### Container
- Text Align: Center
- Padding: `20px 0`

### Success Icon
- Size: `80px × 80px`
- Border Radius: `50%`
- Background: `rgba(34, 197, 94, 0.15)`
- Icon: CheckCircle (40px, #22c55e)
- Margin: `0 auto 24px`

### Success Title
- Font Size: `20px`
- Font Weight: 500
- Font Family: Montserrat
- Color: `#22c55e`
- Margin Bottom: `12px`
- Text: "Shared Successfully!"

### Reward Message
- Font Size: `14px`
- Color: `rgba(255, 255, 255, 0.7)`
- Format: "+{points} Humanity Index points earned"

## Behavior

### Share Flow

1. **Initial State**
   - Shows share options
   - Close button visible
   - Backdrop clickable to close

2. **User Clicks Share Button**
   - Opens platform-specific share dialog
   - Sets `shared` state to true
   - Transitions to success state

3. **Success State**
   - Shows success animation
   - Displays earned points
   - Close button hidden
   - Auto-closes after 1.5 seconds
   - Calls `onComplete` callback

### Platform-Specific Behavior

#### Twitter/X
- Opens Twitter intent URL in new window
- Window size: `550×420`
- URL format: `https://x.com/intent/tweet?text={text}&url={url}`

#### Telegram
- Opens Telegram share URL in new tab
- URL format: `https://t.me/share/url?url={url}&text={text}`

#### Copy to Clipboard
- Uses `navigator.clipboard.writeText()`
- Copies text + URL with line break
- Silently fails if clipboard access denied

### Close Behavior
- Backdrop click: Closes modal (only in share options state)
- Close button: Closes modal
- Success state: Auto-closes after 1.5s
- Calls `onClose` callback

## Default Values

### Share Text
```
"Just discovered my Twin Matrix on twin3! 🎯 Check out my unique human profile across 256 dimensions."
```

### Share URL
```
https://twin3.ai
```

### Reward Points
```
30
```

## Animations

### Fade In (Backdrop)
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```
Duration: `0.15s ease-out`

### Slide Up (Modal)
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
Duration: `0.2s cubic-bezier(0.16, 1, 0.3, 1)`

### Button Hover
- Transform: `translateY(-1px)`
- Background: Lighter shade
- Transition: `all 0.2s ease`

## Integration Example

```typescript
import { ShareModal } from '@/components/widgets/ShareModal';

function App() {
  const [showShare, setShowShare] = useState(false);

  const handleComplete = () => {
    console.log('Share completed');
    setShowShare(false);
    // Update user points
  };

  const handleClose = () => {
    console.log('Share cancelled');
    setShowShare(false);
  };

  return (
    <>
      <button onClick={() => setShowShare(true)}>
        Share Twin3
      </button>

      {showShare && (
        <ShareModal
          onComplete={handleComplete}
          onClose={handleClose}
          shareText="Custom share text"
          shareUrl="https://custom-url.com"
          rewardPoints={50}
        />
      )}
    </>
  );
}
```

## Accessibility

### Keyboard Navigation
- Close button is focusable
- All share buttons are focusable
- Tab order: Close → Twitter → Telegram → Copy

### Screen Readers
- Modal has proper ARIA labels
- Success state announces completion
- Button labels are descriptive

### Focus Management
- Focus trapped within modal
- Focus returns to trigger on close
- Escape key closes modal (if implemented)

## Security Considerations

### URL Encoding
- All share text and URLs are properly encoded
- Prevents XSS attacks through share content

### Clipboard Access
- Gracefully handles denied clipboard permissions
- No error shown to user on failure

### External Links
- Opens in new window/tab
- Uses `_blank` target
- Includes security attributes (if needed)

## Browser Compatibility

### Clipboard API
- Modern browsers: Full support
- Older browsers: Silently fails
- No polyfill needed (graceful degradation)

### Window.open
- Universal support
- Popup blockers may prevent opening
- User must allow popups for share to work

## Performance

### Modal Rendering
- Renders only when visible
- No background rendering
- Lightweight component

### Animations
- CSS animations (GPU accelerated)
- No JavaScript animation loops
- Smooth 60fps performance

## Testing

### Manual Testing
```typescript
// Test all share platforms
<ShareModal
  onComplete={() => console.log('Complete')}
  onClose={() => console.log('Close')}
/>

// Test custom values
<ShareModal
  shareText="Custom text"
  shareUrl="https://example.com"
  rewardPoints={100}
  onComplete={() => {}}
  onClose={() => {}}
/>
```

### Edge Cases
- Clipboard permission denied
- Popup blocker enabled
- Network offline
- Very long share text
- Special characters in text

## Dependencies

- `lucide-react`: Icons (Share2, Twitter, MessageCircle, Copy, CheckCircle, X)
- React hooks: `useState`, `useCallback`
- Browser APIs: `navigator.clipboard`, `window.open`

## Notes

- Modal uses fixed positioning for full-screen overlay
- Z-index is very high (99999) to ensure it's on top
- Success state auto-closes to improve UX
- Backdrop click is disabled in success state
- All share actions are tracked via callbacks
- No external analytics dependencies

## Future Enhancements

- Facebook share support
- LinkedIn share support
- WhatsApp share support
- Custom share image/preview
- Share analytics tracking
- Copy success toast notification
- Keyboard shortcuts (Escape to close)
- Focus trap implementation
- Share count display
- Social proof (X people shared)
- Referral code generation
- QR code for mobile sharing
