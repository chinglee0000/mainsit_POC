# AirdropTaskDashboard Widget Specification

## Overview
A comprehensive dashboard for managing airdrop missions. Displays task list with completion tracking, potential token rewards, progress visualization, and upcoming mission previews.

## Component Structure
```
AirdropTaskDashboard/
├── index.tsx                          # Logic layer (RED ZONE)
└── AirdropTaskDashboard.view.tsx      # View layer (GREEN ZONE)
```

## Props Interface
```typescript
interface AirdropTaskDashboardProps {
  matrixScore: number;                                    // User's matrix score
  onAllTasksComplete: (totalScore: number, totalReward: number) => void;
  onBiometricClick?: () => void;                         // Callback for biometric task
  onShareClick?: () => void;                             // Callback for share task
}

interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  icon?: React.ElementType;
  iconUrl?: string;
  completed: boolean;
}
```

## Features

### 1. Task Management
Six airdrop tasks:
- Boost Humanity Index (biometric, +50)
- Share twin3 (social share, +30)
- Follow on X (+20)
- Join Telegram (+20)
- Join Discord (+20)
- Invite Friends (+30, coming soon)

### 2. Reward Calculation
- Total pool: 5,000,000 $twin3
- Score bonus: (matrixScore / 255) × 1500
- Task bonus: completedTasks × 100
- Real-time potential share display

### 3. Progress Tracking
- Visual progress bar
- Completion counter (X/6 Complete)
- Individual task status (pending/completed)
- All-complete celebration message

### 4. Task Interactions
- Click to complete external tasks (X, Telegram, Discord)
- Callback for modal tasks (biometric, share)
- Auto-complete after external link opens
- Disabled state for coming soon tasks

### 5. Upcoming Missions Preview
- Toggle to show/hide
- Three locked future missions
- Descriptions and lock icons
- "Stay tuned" message

## Usage Example
```tsx
import { AirdropTaskDashboard } from '@/components/widgets/AirdropTaskDashboard';

<AirdropTaskDashboard
  matrixScore={180}
  onAllTasksComplete={(score, reward) => {
    console.log(`Total: ${score}, Reward: ${reward}`);
    showFinalDashboard();
  }}
  onBiometricClick={() => setShowBiometric(true)}
  onShareClick={() => setShowShare(true)}
/>
```

## Theme Tokens Used
- `theme.colors.glass.*` - Card backgrounds
- `theme.colors.status.info` - Purple accent
- `theme.colors.status.success` - Green for completed
- `theme.colors.text.*` - Text hierarchy
- `theme.colors.border.*` - Dividers
- `theme.spacing.*` - Consistent spacing
- `theme.borderRadius.*` - Rounded corners
- `theme.typography.*` - Font styles

## Task Flow
1. User clicks task
2. For external tasks: Opens link → Auto-completes after 1s
3. For modal tasks: Fires callback → Parent shows modal
4. Task marked as completed
5. Progress updates
6. When all complete: Fires onAllTasksComplete after 1s

## Visual States
- Pending: Glass background, white icon, reward amount
- Completed: Green background, checkmark icon, checkmark text
- Hover: Slightly brighter background (pending only)
- All complete: Success message with gift icon

## Accessibility
- Clickable task cards with hover states
- Clear visual feedback for completion
- Icon + text labels for all tasks
- Progress bar for visual tracking
