# GlobalDashboardWidget Specification

## Overview
A comprehensive task management dashboard with multi-tab interface, statistics display, task list with progress tracking, and custom tooltip system. Manages active, review, and completed tasks.

## Component Structure
```
GlobalDashboardWidget/
├── index.tsx                          # Logic layer (RED ZONE)
└── GlobalDashboardWidget.view.tsx     # View layer (GREEN ZONE)
```

## Props Interface
```typescript
interface GlobalDashboardWidgetProps {
  onViewTask?: (taskId: string) => void;  // Callback when task is clicked
}

type TabType = 'active' | 'review' | 'history';

interface Twin3Task {
  id: string;
  type: 'brand' | 'verification';
  title: string;
  brand: string;
  deadline?: string;
  reward: number;
  progress: { current: number; total: number };
  icon?: React.ElementType;
  iconColor?: string;
  imageUrl?: string;
  status: TabType;
}
```

## Features

### 1. Statistics Display
- Active Quests count (large number)
- Pending Rewards total with lock icon
- Real-time calculation from task data

### 2. Tab Navigation
Three tabs with counts:
- Active: Current tasks in progress
- Review: Tasks under review
- History: Completed tasks

### 3. Task Cards
Each task displays:
- Brand logo/icon in white box
- Task title (with ellipsis + tooltip)
- Brand name (with ellipsis + tooltip)
- Deadline with warning color
- Progress bar (current/total requirements)
- Reward amount (locked or earned)

### 4. Custom Tooltip System
- Hover on truncated text shows full content
- Dark background with blur effect
- Arrow pointer to source
- z-index: 99999 for top layer
- Separate tooltips for title and brand

### 5. Task Interactions
- Click task card to view details
- Hover effects on cards
- Tab switching
- Scrollable task list (380px height)

## Usage Example
```tsx
import { GlobalDashboardWidget } from '@/components/widgets/GlobalDashboardWidget';

<GlobalDashboardWidget
  onViewTask={(taskId) => {
    console.log('View task:', taskId);
    navigateToTask(taskId);
  }}
/>
```

## Theme Tokens Used
- `theme.colors.glass.*` - Card backgrounds
- `theme.colors.brand.primary` - Active tab, primary actions
- `theme.colors.status.*` - Info, success, warning colors
- `theme.colors.text.*` - Text hierarchy
- `theme.colors.border.*` - Dividers and borders
- `theme.colors.surface.primary` - Icon box background
- `theme.spacing.*` - Consistent spacing
- `theme.borderRadius.*` - Rounded corners
- `theme.typography.*` - Font styles

## Task Data Structure
Mock data includes:
- 2 active tasks (X share, Proof of Humanity)
- 1 review task (LinkedIn connection)
- 1 history task (L'Oréal campaign)

## Visual States
- Active tab: Primary color underline, bold text
- Inactive tab: Secondary color, normal weight
- Task hover: Card-hover class effect
- Completed task: Green plus icon
- Pending task: Lock icon

## Responsive Design
- Max width: 420px
- Fixed height task list: 380px
- Scrollable with hidden scrollbar
- Centered in container

## Accessibility
- Semantic tab navigation
- Clickable task cards
- Hover states for interactive elements
- Tooltips for truncated text
- Icon + text labels throughout
