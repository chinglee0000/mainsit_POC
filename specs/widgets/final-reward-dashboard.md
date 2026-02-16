# FinalRewardDashboard Widget Specification

## Overview
A celebration dashboard displayed after completing all airdrop missions. Shows total tokens earned with animated count-up, breakdown of rewards, and next steps for continued engagement.

## Component Structure
```
FinalRewardDashboard/
├── index.tsx                        # Logic layer (RED ZONE)
└── FinalRewardDashboard.view.tsx    # View layer (GREEN ZONE)
```

## Props Interface
```typescript
interface FinalRewardDashboardProps {
  matrixScore: number;        // User's matrix score (0-255)
  tokenAmount: number;         // Total tokens earned
  onInviteFriends?: () => void;  // Callback for invite action
  onJoinCommunity?: () => void;  // Callback for community action
}
```

## Features

### 1. Animated Token Display
- Count-up animation over 2 seconds
- Eased animation (cubic ease-out)
- Large display with Coins icon
- Formatted with thousand separators

### 2. Reward Breakdown
Three calculation rows:
- Matrix Score Bonus (based on score/255 * 5000)
- Mission Completion (4 missions × 250 tokens)
- Total Earned (highlighted)

### 3. Next Steps Actions
- Primary: "Invite Friends & Earn More" button
- Secondary: "Join Community" button
- Both with hover effects

### 4. Visual Design
- Trophy icon in circular badge
- Purple accent color scheme
- Glass morphism cards
- Celebration theme

## Usage Example
```tsx
import { FinalRewardDashboard } from '@/components/widgets/FinalRewardDashboard';

<FinalRewardDashboard
  matrixScore={180}
  tokenAmount={4530}
  onInviteFriends={() => navigate('/invite')}
  onJoinCommunity={() => window.open('https://community.twin3.ai')}
/>
```

## Theme Tokens Used
- `theme.colors.status.info` - Purple accent
- `theme.colors.text.*` - Text hierarchy
- `theme.colors.glass.*` - Card backgrounds
- `theme.colors.border.*` - Dividers
- `theme.colors.surface.primary` - Button background
- `theme.spacing.*` - Consistent spacing
- `theme.borderRadius.*` - Rounded corners
- `theme.typography.*` - Font styles

## Animation Details
- Duration: 2000ms
- Easing: Cubic ease-out (1 - (1 - t)³)
- Uses requestAnimationFrame for smooth animation
- Cleanup on unmount

## Behavior
1. Component mounts with displayTokens at 0
2. Animation starts immediately
3. Tokens count up to final amount
4. User can click action buttons
5. Callbacks fire on button clicks

## Accessibility
- Semantic heading structure
- Clear visual hierarchy
- Interactive buttons with hover states
- Icon + text labels for clarity
