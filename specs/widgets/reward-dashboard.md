## RewardDashboard Widget Specification

## Overview

The RewardDashboard widget displays the user's reward balance and completed missions. It features an animated balance counter and action buttons for inviting friends and accessing the community.

## Component Structure

```
components/widgets/RewardDashboard/
├── index.tsx                      # Logic Layer (RED ZONE)
├── RewardDashboard.view.tsx       # View Layer (GREEN ZONE)
```

## Props API

### RewardDashboard (Logic Layer)

```typescript
interface CompletedTask {
  id: string;
  name: string;
  reward: number;
  completedAt: string;
}

interface RewardDashboardProps {
  balance?: number;
  completedTasks?: CompletedTask[];
  onInvite?: () => void;
  onCommunity?: () => void;
}
```

### RewardDashboardView (View Layer)

```typescript
interface RewardDashboardViewProps {
  displayBalance: number;
  completedTasks: CompletedTask[];
  onInvite?: () => void;
  onCommunity?: () => void;
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
- Icon: Wallet (20px, white)
- Title: "Reward Dashboard" (16px, bold)

### Balance Section
- Padding: `24px 20px`
- Text Align: Center
- Border Bottom: `1px solid rgba(255, 255, 255, 0.06)`

#### Balance Label
- Font Size: `12px`
- Color: `var(--color-text-secondary)`
- Font Weight: 500
- Text Transform: Uppercase
- Letter Spacing: `0.1em`
- Content: "Total Balance"

#### Balance Amount
- Font Size: `36px`
- Font Weight: 800
- Color: `var(--color-info)`
- Font Family: `var(--font-sans)`
- Line Height: 1.1
- Format: Comma-separated thousands

#### Currency Label
- Font Size: `14px`
- Color: `var(--color-text-secondary)`
- Font Weight: 500
- Content: "$twin3"

### Completed Tasks Section
- Padding: `12px 0`

#### Section Header
- Padding: `8px 20px`
- Font Size: `12px`
- Font Weight: 600
- Color: `var(--color-text-dim)`
- Text Transform: Uppercase
- Letter Spacing: `0.05em`
- Content: "Completed Missions"

#### Task Item
- Display: Flex
- Align Items: Center
- Gap: `12px`
- Padding: `12px 20px`
- Border Bottom: `1px solid rgba(255, 255, 255, 0.04)`

##### Task Icon Box
- Size: `36px × 36px`
- Border Radius: `10px`
- Background: `rgba(34, 197, 94, 0.15)`
- Icon: CheckCircle (18px, #22c55e)

##### Task Name
- Font Size: `14px`
- Font Weight: 600
- Color: `var(--color-text-primary)`

##### Task Time
- Font Size: `12px`
- Color: `var(--color-text-dim)`
- Icon: Clock (10px)
- Gap: `4px`

##### Task Reward
- Font Size: `13px`
- Font Weight: 700
- Color: `var(--color-info)`
- Font Family: `var(--font-sans)`
- Format: "+{amount}"

### Action Buttons
- Padding: `12px 20px`
- Border Top: `1px solid rgba(255, 255, 255, 0.06)`
- Display: Flex
- Gap: `10px`

#### Invite Friends Button (Primary)
- Flex: 1
- Padding: `10px 16px`
- Border Radius: `12px`
- Background: `#ffffff`
- Border: `1px solid transparent`
- Color: `#000000`
- Font Size: `13px`
- Font Weight: 600
- Icon: ArrowUpRight (14px)
- Hover: `translateY(-1px)`

#### Community Button (Secondary)
- Flex: 1
- Padding: `10px 16px`
- Border Radius: `12px`
- Background: `transparent`
- Border: `1px solid rgba(255, 255, 255, 0.12)`
- Color: `var(--color-text-secondary)`
- Font Size: `13px`
- Font Weight: 500
- Icon: Trophy (14px)

## Animations

### Balance Count-Up
- Duration: 1500ms
- Easing: Ease out cubic
- Formula: `1 - Math.pow(1 - ratio, 3)`
- Updates: Every animation frame
- Rounds to nearest integer

### Button Hover
- Transform: `translateY(-1px)`
- Transition: `all 0.2s ease`

## Behavior

### Balance Animation
1. Component mounts or balance changes
2. Starts from 0 (or previous value)
3. Animates to target balance over 1.5 seconds
4. Uses cubic ease-out for smooth deceleration
5. Displays comma-separated thousands

### Task List
- Displays all completed tasks
- Shows task name, completion time, and reward
- Each task has a green checkmark icon
- Tasks are separated by subtle borders

### Action Buttons
- Invite Friends: Calls `onInvite` callback
- Community: Calls `onCommunity` callback
- Buttons only render if callbacks are provided
- Hover effects for better UX

## Default Values

### Balance
- Default: `500`

### Completed Tasks
- Default: Single task
  ```typescript
  [
    {
      id: '1',
      name: 'Airdrop Claim',
      reward: 500,
      completedAt: 'Just now'
    }
  ]
  ```

## Integration Example

```typescript
import { RewardDashboard } from '@/components/widgets/RewardDashboard';

function App() {
  const handleInvite = () => {
    console.log('Opening invite modal');
  };

  const handleCommunity = () => {
    console.log('Opening community page');
  };

  const tasks = [
    {
      id: '1',
      name: 'Airdrop Claim',
      reward: 500,
      completedAt: 'Just now'
    },
    {
      id: '2',
      name: 'Verify Humanity',
      reward: 250,
      completedAt: '5 minutes ago'
    }
  ];

  return (
    <RewardDashboard
      balance={750}
      completedTasks={tasks}
      onInvite={handleInvite}
      onCommunity={handleCommunity}
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

- Semantic HTML structure
- Proper button elements
- Icon labels for screen readers
- Sufficient color contrast
- Touch-friendly targets (minimum 44px)

## Dependencies

- `lucide-react`: Icons (Wallet, Trophy, CheckCircle, ArrowUpRight, Clock)
- React hooks: `useState`, `useEffect`
- `requestAnimationFrame` for smooth animations

## Notes

- Balance animation uses RAF for 60fps smoothness
- Cubic easing provides natural deceleration
- Task list is scrollable if many tasks
- Currency symbol is hardcoded as "$twin3"
- All colors use CSS variables for theming
- Responsive design adapts to screen size

## Future Enhancements

- Pagination for long task lists
- Filter/sort completed tasks
- Export transaction history
- Multiple currency support
- Real-time balance updates
- Task detail modal
- Reward history chart
