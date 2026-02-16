# TwinMatrix Widget Specification

## Overview
A comprehensive 16×16 matrix visualization representing 256 human traits across 4 dimensions. Features interactive grid, progress tracking, dimension statistics, and trait detail modals.

## Component Structure
```
TwinMatrix/
├── index.tsx              # Logic layer (RED ZONE)
├── TwinMatrix.view.tsx    # View layer (GREEN ZONE)
└── types.ts               # Type definitions
```

## Props Interface
```typescript
interface TwinMatrixProps {
  data?: TwinMatrixData;     // Matrix data (uses mock if not provided)
  onExplore?: () => void;    // Callback for "Boost Your Score" button
}

interface TwinMatrixData {
  totalTraits: number;       // 256
  discoveredTraits: number;
  journeyProgress: number;   // Percentage
  avgStrength: number;
  humanityIndex: number;
  dimensions: {
    physical: MatrixDimensionStats;
    digital: MatrixDimensionStats;
    social: MatrixDimensionStats;
    spiritual: MatrixDimensionStats;
  };
  traits: MatrixTrait[];     // 256 traits
}

interface MatrixTrait {
  id: string;                // Hex: "00" to "FF"
  dimension: 'physical' | 'digital' | 'social' | 'spiritual';
  discovered: boolean;
  strength?: number;         // 0-255
  position: { row: number; col: number };
  name?: string;
  description?: string;
  unlockedAt?: string;
  unlockedBy?: string;
}
```

## Features

### 1. Matrix Grid (16×16)
- 256 cells representing traits
- 4 quadrants for 4 dimensions:
  - Physical: Top-left (rows 0-7, cols 0-7) - Red
  - Digital: Top-right (rows 0-7, cols 8-15) - Blue
  - Social: Bottom-left (rows 8-15, cols 0-7) - Yellow
  - Spiritual: Bottom-right (rows 8-15, cols 8-15) - Teal
- Color intensity based on strength (3 levels)
- Hover effects on discovered traits
- Click to view trait details

### 2. Color System
Each dimension has 3 strength levels:
- Level 1 (0-85): Light color
- Level 2 (86-170): Medium color
- Level 3 (171-255): Deep color

### 3. Progress Tracking
- Overall completion percentage
- Discovered traits count (X/256)
- Progress bar visualization

### 4. Dimension Statistics
Four progress bars showing:
- Dimension name
- Score (0-255)
- Percentage completion
- Color-coded progress

### 5. Interactive Modals
- Trait detail modal (click discovered trait)
- Info modal (click info icon)
- Touch device detection
- Portal-based rendering

### 6. Touch Device Support
- Detects hover capability
- Detects pointer precision
- Adapts interactions for mobile

## Usage Example
```tsx
import { TwinMatrix } from '@/components/widgets/TwinMatrix';

<TwinMatrix
  data={matrixData}
  onExplore={() => {
    console.log('Boost score clicked');
    navigateToTasks();
  }}
/>
```

## Theme Tokens Used
- `theme.colors.glass.*` - Card and cell backgrounds
- `theme.colors.text.*` - Text hierarchy
- `theme.colors.border.*` - Dividers
- `theme.colors.surface.primary` - Button background
- `theme.spacing.*` - Consistent spacing
- `theme.borderRadius.*` - Rounded corners
- `theme.typography.*` - Font styles

## Dimension Colors
```typescript
physical: '#D02800'   // Red
digital: '#3F88C5'    // Blue
social: '#FFBA08'     // Yellow
spiritual: '#1A9E8F'  // Teal
```

## Grid Layout
- 16×16 grid with 2px gaps
- Aspect ratio 1:1 (square)
- Responsive sizing
- 2px border radius per cell

## Modal Behavior
- Full-screen overlay with backdrop blur
- Click outside to close
- Close button in top-right
- Smooth fade-in animation
- Portal rendering to body

## Accessibility
- Semantic button elements
- ARIA labels for info button
- Keyboard accessible modals
- Clear visual hierarchy
- Icon + text labels

## Mock Data
If no data provided, creates mock with:
- 256 traits (all undiscovered except "00")
- Trait "00" = Humanity Index (strength: 180)
- 1 discovered trait
- 0% journey progress
- Proper dimension distribution
