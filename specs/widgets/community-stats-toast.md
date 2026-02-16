# CommunityStatsToast Widget Specification

## Overview
A collapsible toast notification that displays the total number of verified community members. Features smooth fade-in animation and can be dismissed by the user.

## Component Structure
```
CommunityStatsToast/
├── index.tsx                      # Logic layer (RED ZONE)
└── CommunityStatsToast.view.tsx   # View layer (GREEN ZONE)
```

## Props Interface
```typescript
interface CommunityStatsToastProps {
  memberCount?: number;  // Default: 29571
  onClose?: () => void;  // Callback when toast is closed
}
```

## Features

### 1. Animation States
- Fade-in after 500ms delay
- Smooth height transition (0 → 50px)
- Fade-out on close with 300ms delay

### 2. Display
- Large bold member count (formatted with commas)
- "verified members" label
- Close button (X icon)

### 3. Responsive Design
- Mobile: Smaller padding and font sizes
- Desktop: Larger spacing and text

### 4. Styling
- White background with subtle border
- Fixed at top of container
- z-index: 100 for overlay positioning

## Usage Example
```tsx
import { CommunityStatsToast } from '@/components/widgets/CommunityStatsToast';

<CommunityStatsToast
  memberCount={29571}
  onClose={() => console.log('Toast closed')}
/>
```

## Theme Tokens Used
- `theme.colors.surface.primary` - Background
- `theme.colors.border.subtle` - Border
- `theme.colors.text.primary` - Member count
- `theme.colors.text.secondary` - Label text
- `theme.colors.text.dim` - Close button
- `theme.spacing.*` - Consistent spacing
- `theme.typography.fontFamily.sans` - Font family

## Behavior
1. Component mounts with opacity 0 and maxHeight 0
2. After 500ms, fades in to opacity 1 and maxHeight 50px
3. User clicks close button
4. Fades out over 300ms
5. Calls onClose callback after animation completes

## Accessibility
- Semantic button for close action
- Hover states for interactive elements
- Smooth transitions for visual feedback
