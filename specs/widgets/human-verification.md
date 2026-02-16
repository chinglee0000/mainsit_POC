# HumanVerification Widget Specification

## Overview
A comprehensive human verification widget supporting multiple verification methods. Features progress tracking, animated score updates, method selection, verification flow, and failure handling.

## Component Structure
```
HumanVerification/
├── index.tsx                      # Logic layer (RED ZONE)
└── HumanVerification.view.tsx     # View layer (GREEN ZONE)
```

## Props Interface
```typescript
interface HumanVerificationProps {
  onClose?: () => void;              // Callback when widget is closed
  onComplete?: (score: number) => void;  // Callback when verification completes
  initialScore?: number;             // Default: 0
}

type FlowState = 'selecting' | 'verifying' | 'failed' | 'matrix_view';

interface VerificationMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  weight: number;        // 0-1 scale
  available: boolean;
}
```

## Features

### 1. Verification Methods
Three methods available:
- Google reCAPTCHA v3 (weight: 0.3, 🤖)
- Worldcoin Iris Scan (weight: 0.4, 👁️)
- Gitcoin Passport (weight: 0.3, 🛂)

### 2. Score System
- Range: 0-255 (Humanity Index scale)
- Calculation: sum(completed weights) × 255
- Animated count-up (1.5s, cubic ease-out)
- Real-time progress bar

### 3. Flow States
- **Selecting**: Choose verification method
- **Verifying**: Processing verification (with simulate button)
- **Failed**: 20% random failure for demo
- **Matrix View**: View results (placeholder)

### 4. Method Cards
Each method displays:
- Icon or checkmark (if completed)
- Method name and description
- Completion status
- Hover effects (available only)

### 5. Header Display
- Shield icon + "Verify Humanity" title
- Score badge (current/255)
- Progress bar with percentage
- Animated score updates

## Usage Example
```tsx
import { HumanVerification } from '@/components/widgets/HumanVerification';

<HumanVerification
  initialScore={0}
  onComplete={(score) => {
    console.log('Verification complete:', score);
    updateHumanityIndex(score);
  }}
  onClose={() => setShowVerification(false)}
/>
```

## Theme Tokens Used
- `theme.colors.glass.*` - Card backgrounds
- `theme.colors.status.*` - Success, info, warning colors
- `theme.colors.text.*` - Text hierarchy
- `theme.colors.border.*` - Dividers
- `theme.colors.surface.primary` - Button background
- `theme.spacing.*` - Consistent spacing
- `theme.borderRadius.*` - Rounded corners
- `theme.typography.*` - Font styles

## Verification Flow
1. User sees method list with progress
2. Clicks available method
3. Enters verifying state (2s simulation)
4. 80% success → Returns to selection with updated score
5. 20% failure → Shows retry/pick another options
6. Can complete multiple methods
7. "View My Matrix" appears after first completion

## Score Calculation
```
totalWeight = sum of completed method weights
finalScore = totalWeight × 255
```

Example:
- reCAPTCHA (0.3) + Worldcoin (0.4) = 0.7
- Score = 0.7 × 255 = 178.5 ≈ 179

## Visual States
- Available method: Glass background, hover effect
- Completed method: Green background, checkmark
- Verifying: Pulsing lock icon, blue theme
- Failed: Orange warning theme, retry options

## Accessibility
- Clear visual feedback for each state
- Interactive method cards with hover states
- Progress bar for visual tracking
- Icon + text labels throughout
- Keyboard accessible buttons
