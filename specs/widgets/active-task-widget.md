# ActiveTaskWidget Specification

## Overview
A widget for managing active brand collaboration tasks. Features requirement checklist, submission form, verification flow, and success state with pending reward display.

## Component Structure
```
ActiveTaskWidget/
├── index.tsx                      # Logic layer (RED ZONE)
└── ActiveTaskWidget.view.tsx      # View layer (GREEN ZONE)
```

## Props Interface
```typescript
interface ActiveTaskWidgetProps {
  taskTitle?: string;           // Default: "Lipstick Filter Challenge"
  brandName?: string;            // Default: "L'Oréal Paris"
  rewardAmount?: string;         // Default: "500"
  deadline?: string;             // Default: "2 days"
  requirements?: string[];       // Default: 4 requirements
  onVerify?: (url: string) => void;  // Callback when verification completes
}

type TaskStatus = 'active' | 'submitting' | 'verified';
```

## Features

### 1. Task Status Display
- Active badge with deadline countdown
- Pending reward amount with lock icon
- Brand name and task title
- Status-based UI changes

### 2. Requirements Checklist
- Interactive checkboxes
- Click to toggle completion
- Visual strikethrough for checked items
- Opacity change for completed items

### 3. Submission Flow
- URL input field for proof
- Verify button (disabled when empty)
- Submitting state (1.5s delay)
- Success state with celebration

### 4. Success State
- Large checkmark icon with glow
- "Submission Verified!" message
- Pending reward card
- 24-hour release notice

## Usage Example
```tsx
import { ActiveTaskWidget } from '@/components/widgets/ActiveTaskWidget';

<ActiveTaskWidget
  taskTitle="Lipstick Filter Challenge"
  brandName="L'Oréal Paris"
  rewardAmount="500"
  deadline="2 days"
  requirements={[
    'Use Filter #666',
    'Mention "Moisturizing"',
    'Tag @lorealparis',
    'Video length 15-60s'
  ]}
  onVerify={(url) => {
    console.log('Verified:', url);
    updateTaskStatus('completed');
  }}
/>
```

## Theme Tokens Used
- `theme.colors.glass.*` - Card backgrounds
- `theme.colors.status.success` - Green for verified
- `theme.colors.brand.primary` - Primary actions
- `theme.colors.text.*` - Text hierarchy
- `theme.colors.border.*` - Dividers and inputs
- `theme.spacing.*` - Consistent spacing
- `theme.borderRadius.*` - Rounded corners
- `theme.typography.*` - Font styles

## State Flow
1. Active: Show task details, checklist, submission form
2. User enters URL and clicks verify
3. Submitting: Button shows "Verifying..." (1.5s)
4. Verified: Show success state with pending reward
5. Callback fires with submission URL

## Visual States
- Active: Blue badge, white card, interactive elements
- Submitting: Disabled button, loading text
- Verified: Green theme, celebration icon, reward card

## Accessibility
- Interactive checklist with click handlers
- Disabled state for invalid submissions
- Clear visual feedback for each state
- Icon + text labels throughout
