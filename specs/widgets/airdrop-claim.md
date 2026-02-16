# AirdropClaim Widget Specification

## Overview

The AirdropClaim widget allows users to claim airdrop rewards based on their humanity score. It displays three states: locked (insufficient score), claimable (ready to claim), and claimed (already claimed with confetti animation).

## Component Structure

```
components/widgets/AirdropClaim/
├── index.tsx                  # Logic Layer (RED ZONE)
├── AirdropClaim.view.tsx      # View Layer (GREEN ZONE)
```

## Props API

```typescript
type AirdropState = 'locked' | 'claimable' | 'claimed';

interface AirdropClaimProps {
  score: number;
  threshold?: number;          // Default: 100
  rewardAmount?: number;       // Default: 500
  onClaim?: () => void;
  onGoBack?: () => void;
  hasClaimed?: boolean;        // Default: false
}
```

## States

### 1. Locked State
- Shown when `score < threshold`
- Displays progress bar
- Shows current score vs required score
- "Complete More Verifications" button

### 2. Claimable State
- Shown when `score >= threshold && !claimed`
- Displays reward amount
- "Claim Airdrop" button with gradient
- Hover effects

### 3. Claimed State
- Shown after claiming
- Confetti animation (3 seconds)
- Success message
- "Continue to Dashboard" button

## Visual Specifications

### Card Container
- Max Width: `400px`
- Border Radius: `16px`
- Background: `var(--glass-bg)`
- Border: `1px solid var(--glass-border)`

### Confetti Animation
- 20 particles
- Random colors: purple, green, blue, pink
- Random sizes: 6-12px
- Random shapes: circle or square
- Duration: 1.5-2.5s
- Falls 400px with rotation

### Progress Bar (Locked State)
- Height: `6px`
- Background: `rgba(255, 255, 255, 0.08)`
- Fill: `linear-gradient(90deg, var(--color-info), #7c3aed)`
- Transition: `width 0.5s ease`

### Claim Button (Claimable State)
- Background: `linear-gradient(135deg, var(--color-info), #7c3aed)`
- Hover: `translateY(-2px)` + shadow
- Font Size: `16px`
- Font Weight: 700

## Default Values

- Threshold: `100`
- Reward Amount: `500`
- Has Claimed: `false`

## Dependencies

- `lucide-react`: Icons
- React hooks: `useState`, `useCallback`, `useEffect`

## Notes

- Confetti auto-hides after 3 seconds
- Progress capped at 100%
- All animations use CSS for performance
