# ImmersiveIntro Layout Specification

## Overview
A cinematic intro sequence with light convergence animation, logo reveal, and optional video playback. Features 4 phases with smooth transitions and skip functionality.

## Component Structure
```
ImmersiveIntro/
├── index.tsx                    # Logic layer (RED ZONE)
└── ImmersiveIntro.view.tsx      # View layer (GREEN ZONE)
```

## Props Interface
```typescript
interface ImmersiveIntroProps {
  onComplete: () => void;  // Callback when intro completes
}

type IntroPhase = 'converge' | 'reveal' | 'video' | 'fadeout';
```

## Features

### 1. Four-Phase Animation
- **Converge** (0-4s): Lights converge from corners to center
- **Reveal** (4-7s): Logo emerges with breathing effect
- **Video** (7s+): Plays intro video (skippable)
- **Fadeout**: Smooth transition out

### 2. Light Convergence
Four light sources from corners:
- Top-left, top-right, bottom-left, bottom-right
- Staggered animation delays (0s, 0.1s, 0.15s, 0.2s)
- Converge to center with scale and opacity changes
- Central burst effect on reveal

### 3. Progress Indicator
- Animated progress bar (0-100%)
- "Your experience is being computed..." text
- Animated dots (...) effect
- Only visible during converge phase

### 4. Logo Display
- Uses Logo basic component
- Blur-to-focus transition
- Scale animation (0.8 → 1)
- Breathing glow effect during reveal
- Radial gradient backdrop

### 5. Video Playback
- Auto-plays intro video
- Handles autoplay blocking gracefully
- Skip instruction overlay
- Ends on video completion or skip

### 6. Skip Functionality
- Click anywhere to skip
- Pauses video if playing
- Jumps to fadeout phase
- Smooth transition to app

## Usage Example
```tsx
import { ImmersiveIntro } from '@/layouts/ImmersiveIntro';

{showIntro && (
  <ImmersiveIntro
    onComplete={() => {
      setShowIntro(false);
      console.log('Intro completed');
    }}
  />
)}
```

## Visual Elements

### Background
- Dark base: #030308
- Small pixel grid (10px × 10px)
- Grid lines overlay
- Full-screen fixed positioning

### Animations
- Converge: 4s cubic-bezier(0.4, 0, 0.2, 1)
- Reveal: 0.6s cubic-bezier(0.16, 1, 0.3, 1)
- Fadeout: 0.8s ease-out
- Logo breathe: 3s ease-in-out infinite

### Light Effects
- Radial gradients with blur
- Mix-blend-mode: screen
- Opacity transitions
- Staggered timing

## Phase Timing
```
0s ────────── 4s ─── 6.5s ──────── End
   Converge    Reveal  Video      Fadeout
```

## Responsive Design
- Video: max-width 90%, max-height 80%
- Logo: Fixed 100×100px
- Progress bar: Fixed 200px width
- Text: Responsive font sizes

## Accessibility
- Click-to-skip functionality
- Visual progress indicator
- Clear instruction text
- Handles autoplay blocking

## Performance
- CSS animations (GPU accelerated)
- Cleanup on unmount
- Efficient timer management
- Smooth 60fps animations
