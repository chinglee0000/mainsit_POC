# BiometricVerification Widget Specification

## Overview
A modal that simulates biometric verification (Face ID, Touch ID, Fingerprint) for humanity index boost. Features auto-start verification, animated states, and success feedback.

## Component Structure
```
BiometricVerification/
├── index.tsx                          # Logic layer (RED ZONE)
└── BiometricVerification.view.tsx     # View layer (GREEN ZONE)
```

## Props Interface
```typescript
interface BiometricVerificationProps {
  onComplete: () => void;  // Callback when verification succeeds
  onClose: () => void;     // Callback when modal is closed
}

type VerificationStatus = 'idle' | 'verifying' | 'success';
```

## Features

### 1. Auto-Start Verification
- Modal opens with 'idle' state
- After 500ms, automatically starts verification
- Transitions to 'verifying' state

### 2. Verification States
- **Verifying**: Pulsing fingerprint icon, instruction text
- **Success**: Green checkmark, success message, reward info

### 3. Simulation Flow
- Verifying state lasts 2 seconds
- Success state shows for 1.5 seconds
- Auto-closes and calls onComplete

### 4. Modal Behavior
- Full-screen overlay with backdrop blur
- Click outside to close (except during success)
- Close button in top-right (hidden on success)
- Prevents click-through to background

## Usage Example
```tsx
import { BiometricVerification } from '@/components/widgets/BiometricVerification';

{showBiometric && (
  <BiometricVerification
    onComplete={() => {
      setShowBiometric(false);
      updateHumanityIndex(+50);
    }}
    onClose={() => setShowBiometric(false)}
  />
)}
```

## Theme Tokens Used
- `theme.colors.status.info` - Blue for verifying state
- `theme.colors.status.success` - Green for success state
- `theme.colors.text.*` - Text hierarchy
- `theme.colors.border.default` - Modal border
- `theme.colors.glass.background` - Close button
- `theme.spacing.*` - Consistent spacing
- `theme.borderRadius.lg` - Modal corners
- `theme.typography.*` - Font styles

## Animation Details
- Fade-in overlay: 0.15s ease-out
- Slide-up modal: 0.2s cubic-bezier(0.16, 1, 0.3, 1)
- Pulse animation on fingerprint: 2s infinite

## Timing Sequence
1. Modal opens (idle)
2. +500ms → Start verification
3. +2000ms → Show success
4. +1500ms → Call onComplete and close

## Accessibility
- Modal overlay prevents background interaction
- Clear visual feedback for each state
- Icon + text labels for clarity
- Keyboard accessible (ESC to close)
