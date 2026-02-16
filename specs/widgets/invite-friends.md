# InviteFriends Widget Specification

## Overview

The InviteFriends widget provides a card interface for users to invite friends to Twin3. It displays invite statistics, a shareable invite link with copy functionality, and quick share buttons for social platforms.

## Component Structure

```
components/widgets/InviteFriends/
├── index.tsx                  # Logic Layer (RED ZONE)
├── InviteFriends.view.tsx     # View Layer (GREEN ZONE)
```

## Props API

### InviteFriends (Logic Layer)

```typescript
type SharePlatform = 'twitter' | 'telegram' | 'other';

interface InviteFriendsProps {
  inviteCode?: string;
  invitedCount?: number;
  rewardPerInvite?: number;
  onShare?: (platform: SharePlatform) => void;
}
```

### InviteFriendsView (View Layer)

```typescript
interface InviteFriendsViewProps {
  inviteUrl: string;
  invitedCount: number;
  rewardPerInvite: number;
  copied: boolean;
  onCopy: () => void;
  onShare: (platform: SharePlatform) => void;
}
```

## Visual Specifications

### Card Container
- Background: `var(--glass-bg)`
- Border: `1px solid var(--glass-border)`
- Border Radius: `16px`
- Max Width: `400px`
- Responsive: Full width on mobile, left-aligned on desktop

### Header
- Padding: `16px 20px`
- Border Bottom: `1px solid rgba(255, 255, 255, 0.06)`
- Background: `linear-gradient(135deg, rgba(40, 40, 45, 0.5), rgba(30, 30, 35, 0.5))`

#### Title
- Icon: UserPlus (20px, white)
- Font Size: `16px`
- Font Weight: 700
- Color: `var(--color-text-primary)`

#### Description
- Font Size: `13px`
- Color: `var(--color-text-secondary)`
- Line Height: 1.5
- Margin Top: `8px`

### Invite Stats Section
- Padding: `20px`
- Display: Flex with `12px` gap

#### Invited Count Card
- Flex: 1
- Padding: `14px`
- Border Radius: `12px`
- Background: `rgba(255, 255, 255, 0.04)`
- Border: `1px solid rgba(255, 255, 255, 0.06)`
- Text Align: Center

##### Count Number
- Font Size: `24px`
- Font Weight: 800
- Color: `var(--color-text-primary)`
- Font Family: `var(--font-sans)`

##### Label
- Font Size: `11px`
- Color: `var(--color-text-dim)`
- Text Transform: Uppercase
- Letter Spacing: `0.05em`

#### Reward Per Invite Card
- Flex: 1
- Padding: `14px`
- Border Radius: `12px`
- Background: `rgba(245, 158, 11, 0.08)`
- Border: `1px solid rgba(245, 158, 11, 0.15)`
- Text Align: Center

##### Reward Number
- Font Size: `24px`
- Font Weight: 800
- Color: `var(--color-info)`
- Font Family: `var(--font-sans)`
- Format: "+{amount}"

### Invite Link Section
- Padding: `0 20px 16px`

#### Link Container
- Display: Flex with `8px` gap
- Padding: `10px 14px`
- Border Radius: `10px`
- Background: `rgba(255, 255, 255, 0.04)`
- Border: `1px solid rgba(255, 255, 255, 0.08)`

#### URL Display
- Flex: 1
- Font Size: `12px`
- Font Family: `var(--font-sans)`
- Color: `var(--color-text-secondary)`
- Overflow: Hidden
- Text Overflow: Ellipsis
- White Space: Nowrap

#### Copy Button
- Padding: `6px 12px`
- Border Radius: `8px`
- Font Size: `12px`
- Font Weight: 600
- Flex Shrink: 0
- Transition: `all 0.2s ease`

##### Default State
- Background: `rgba(255, 255, 255, 0.1)`
- Border: `1px solid rgba(255, 255, 255, 0.15)`
- Color: `var(--color-text-primary)`
- Icon: Copy (12px)
- Text: "Copy"

##### Copied State
- Background: `rgba(34, 197, 94, 0.15)`
- Border: `1px solid rgba(34, 197, 94, 0.3)`
- Color: `#22c55e`
- Icon: Check (12px)
- Text: "Copied!"
- Duration: 2 seconds

### Share Buttons Section
- Padding: `12px 20px`
- Border Top: `1px solid rgba(255, 255, 255, 0.06)`
- Display: Flex with `10px` gap

#### Button Common Styles
- Flex: 1
- Padding: `10px`
- Border Radius: `10px`
- Font Size: `12px`
- Font Weight: 600
- Icon Size: `14px`
- Gap: `6px`
- Transition: `all 0.2s ease`
- Hover: `translateY(-1px)` + lighter background

#### Twitter Button
- Background: `rgba(29, 161, 242, 0.15)`
- Border: `1px solid rgba(29, 161, 242, 0.2)`
- Color: `#1DA1F2`
- Hover Background: `rgba(29, 161, 242, 0.25)`
- Icon: Twitter

#### Telegram Button
- Background: `rgba(0, 136, 204, 0.15)`
- Border: `1px solid rgba(0, 136, 204, 0.2)`
- Color: `#0088CC`
- Hover Background: `rgba(0, 136, 204, 0.25)`
- Icon: MessageCircle

#### Other Button
- Background: `rgba(255, 255, 255, 0.06)`
- Border: `1px solid rgba(255, 255, 255, 0.1)`
- Color: `var(--color-text-secondary)`
- Hover Background: `rgba(255, 255, 255, 0.1)`
- Icon: Share2

## Behavior

### Invite URL Generation
- Format: `https://twin3.ai/invite/{inviteCode}`
- Automatically generated from invite code

### Copy to Clipboard
1. User clicks "Copy" button
2. URL copied to clipboard
3. Button changes to "Copied!" with green styling
4. Reverts to "Copy" after 2 seconds
5. Silently fails if clipboard access denied

### Share Platforms

#### Twitter/X
- Opens Twitter intent URL in new window
- Window size: `550×420`
- Share text: "Join me on Twin3! Use my invite code: {code}"
- Includes invite URL

#### Telegram
- Opens Telegram share URL in new tab
- Share text: "Join me on Twin3! Use my invite code: {code}"
- Includes invite URL

#### Other
- Copies invite URL to clipboard
- Same behavior as copy button

### Callbacks
- `onShare`: Called when user shares via any platform
- Receives platform name as parameter

## Default Values

### Invite Code
```
twin3_ABC123
```

### Invited Count
```
0
```

### Reward Per Invite
```
50
```

## Integration Example

```typescript
import { InviteFriends } from '@/components/widgets/InviteFriends';

function App() {
  const handleShare = (platform: SharePlatform) => {
    console.log('Shared on:', platform);
    // Track analytics
  };

  return (
    <InviteFriends
      inviteCode="twin3_XYZ789"
      invitedCount={5}
      rewardPerInvite={100}
      onShare={handleShare}
    />
  );
}
```

## Responsive Behavior

### Desktop (≥768px)
- Card aligned to left
- Full button text visible
- Comfortable spacing

### Mobile (<768px)
- Card centered
- Maintains readability
- Touch-friendly button sizes

## Accessibility

### Keyboard Navigation
- All buttons are focusable
- Tab order: Copy → Twitter → Telegram → Other

### Screen Readers
- Descriptive button labels
- Stats have proper labels
- Link is readable

### Copy Feedback
- Visual feedback (color change)
- Text change ("Copy" → "Copied!")
- Icon change (Copy → Check)

## Security Considerations

### URL Encoding
- Invite code and text properly encoded
- Prevents XSS through share content

### Clipboard Access
- Gracefully handles denied permissions
- No error shown to user on failure

### External Links
- Opens in new window/tab
- Uses `_blank` target

## Browser Compatibility

### Clipboard API
- Modern browsers: Full support
- Older browsers: Silently fails
- No polyfill needed

### Window.open
- Universal support
- Popup blockers may prevent opening

## Performance

### State Management
- Minimal state (only copied flag)
- Efficient re-renders
- No unnecessary computations

### Animations
- CSS transitions (GPU accelerated)
- Smooth hover effects

## Testing

### Manual Testing
```typescript
// Test with custom values
<InviteFriends
  inviteCode="TEST123"
  invitedCount={10}
  rewardPerInvite={75}
  onShare={(platform) => console.log(platform)}
/>

// Test edge cases
<InviteFriends
  inviteCode="very-long-invite-code-that-might-overflow"
  invitedCount={999}
  rewardPerInvite={9999}
/>
```

### Edge Cases
- Very long invite codes
- Large numbers (999+)
- Clipboard permission denied
- Popup blocker enabled
- Network offline

## Dependencies

- `lucide-react`: Icons (UserPlus, Copy, Check, Share2, Twitter, MessageCircle)
- React hooks: `useState`, `useCallback`
- Browser APIs: `navigator.clipboard`, `window.open`

## Notes

- Copy button provides immediate visual feedback
- Share buttons open platform-specific dialogs
- "Other" button copies to clipboard as fallback
- All share actions tracked via callback
- Invite URL format is customizable
- Stats display is flexible (any numbers)

## Future Enhancements

- QR code generation for invite link
- Share history tracking
- Referral leaderboard
- Custom share messages
- Email share option
- WhatsApp share support
- Copy success toast notification
- Share analytics dashboard
- Invite code validation
- Custom reward tiers
- Social proof (X people invited)
- Invite expiration dates
- Bulk invite generation
