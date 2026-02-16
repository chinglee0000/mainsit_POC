# CommunityPreview Widget Specification

## Overview
A preview card showcasing upcoming community tasks and missions. Displays locked future tasks with rewards and provides a call-to-action to join the community.

## Component Structure
```
CommunityPreview/
├── index.tsx                    # Logic layer (RED ZONE)
└── CommunityPreview.view.tsx    # View layer (GREEN ZONE)
```

## Props Interface
```typescript
interface CommunityPreviewProps {
  onJoinCommunity?: () => void;  // Callback when "Join Community" is clicked
  onClose?: () => void;          // Callback when "Back to Chat" is clicked
}

interface FutureTask {
  id: string;
  title: string;
  description: string;
  reward: string;
  icon: React.ElementType;
  locked: boolean;
}
```

## Features

### 1. Future Tasks Display
Four upcoming tasks are shown:
- Connect Social Accounts (+100 $twin3)
- Content Creator Challenge (+500 $twin3)
- DAO Governance Vote (+200 $twin3)
- Referral Milestone (+1000 $twin3)

### 2. Task Card Elements
- Icon with lock badge overlay
- Task title and description
- Reward amount
- Dimmed appearance (locked state)

### 3. Actions
- "Join Community" button with external link icon
- Optional "Back to Chat" button
- Hover effects on interactive elements

### 4. Responsive Design
- Max width: 400px
- Centered on mobile
- Glass morphism card style

## Usage Example
```tsx
import { CommunityPreview } from '@/components/widgets/CommunityPreview';

<CommunityPreview
  onJoinCommunity={() => window.open('https://community.twin3.ai')}
  onClose={() => setShowPreview(false)}
/>
```

## Theme Tokens Used
- `theme.colors.glass.*` - Card background and borders
- `theme.colors.text.*` - Text hierarchy
- `theme.colors.border.*` - Dividers
- `theme.colors.surface.primary` - Button background
- `theme.spacing.*` - Consistent spacing
- `theme.borderRadius.*` - Rounded corners
- `theme.typography.*` - Font sizes and families

## Visual Hierarchy
1. Header with Users icon and title
2. Description text
3. List of 4 future tasks (dimmed, locked)
4. Primary CTA button (Join Community)
5. Secondary button (Back to Chat)

## Behavior
- All tasks are locked by default
- Tasks show lock icon badge
- Join Community button opens external link
- Back to Chat button closes the preview
- Hover effects provide visual feedback

## Accessibility
- Semantic button elements
- Clear visual hierarchy
- Hover states for interactive elements
- Icon + text labels for clarity
