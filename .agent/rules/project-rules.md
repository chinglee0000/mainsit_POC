---
trigger: always_on
---

# Twin3 Project Rules & Boundaries

## Language Guidelines
- All text and code comments must be in English
- Agent responses can be in Traditional Chinese

## Core Concepts
- **Spec-Driven**: Specifications serve as the Single Source of Truth
- **View-Logic Separation**: Clear separation between UI and business logic
- **Theme First**: Always use theme tokens, never hardcode visual values
- **Boundary Control**: Clearly defined editable vs. restricted zones

## Directory Structure

### App Layer (`app/`)
- Next.js App Router pages
- `page.tsx` - Server-side logic, data fetching (RED ZONE)
- `page.view.tsx` - Client-side UI rendering (GREEN ZONE)
- `layout.tsx` - Layout components
- `providers.tsx` - Context providers

### Components (`components/`)
- **basics/**: Shared UI primitives (Logo, Button, Modal, Tooltip)
  - Pattern: `ComponentName/index.tsx` (logic) + `ComponentName.view.tsx` (UI)
- **widgets/**: Business feature components
  - Pattern: Same as basics, but with business logic

### Layouts (`layouts/`)
- Reusable layout components
- Pattern: `LayoutName/index.tsx` + `LayoutName.view.tsx`

### Constants (`constants/`)
- Static data and configuration
- Interaction inventory, verification methods, matrix data

### Library (`lib/`)
- **theme.ts**: Theme configuration (MUST USE)
- **utils.ts**: Utility functions
- **validations/**: Zod schemas (YELLOW ZONE)

### Specifications (`specs/`)
- **basics/**: Specs for basic components
- **widgets/**: Specs for widget components
- Each component MUST have a corresponding spec file

## Permission Boundaries

### 🟢 GREEN ZONE (Safe to Edit)
- All `*.view.tsx` files
- All `*.stories.tsx` files
- `components/**`
- `layouts/**`
- `constants/**`
- `public/**`
- `styles/**`

### 🟡 YELLOW ZONE (Proceed with Caution)
- `types/**`
- `lib/validations/**`
- `package.json`

### 🔴 RED ZONE (Strictly Prohibited)
- `app/page.tsx` (Server logic)
- All `index.tsx` files (Business logic)
- `lib/web3/**` (if exists)
- `next.config.ts`
- `tsconfig.json`

## Component Pattern

### Basic Component Structure
```
components/basics/Button/
├── index.tsx           # Logic Layer (RED ZONE)
├── Button.view.tsx     # View Layer (GREEN ZONE)
└── Button.stories.tsx  # Storybook (GREEN ZONE)
```

### Logic Layer (index.tsx)
- Handles state management
- API calls and data processing
- Event handlers with business logic
- Passes processed data to View

### View Layer (*.view.tsx)
- Pure UI rendering
- Receives props from Logic layer
- Uses theme tokens only
- No business logic

## Theme Rules

### ✅ DO
```typescript
// Use theme tokens
<div style={{ 
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
  padding: theme.spacing(2)
}}>
```

### ❌ DON'T
```typescript
// Never hardcode values
<div style={{ 
  backgroundColor: '#1976d2',
  color: '#ffffff',
  padding: '16px'
}}>
```

## Spec-Driven Development

Every component MUST have a spec file in `specs/` containing:
1. **Overview**: Component purpose and description
2. **Props API**: Interface and prop definitions
3. **Visual Specifications**: Design tokens, variants, states
4. **Usage Examples**: Code examples

## Collaboration Patterns

### 👨‍💻 Engineer (RED ZONE)
- Focus: Business logic, data flow, API integration
- Files: `index.tsx`, `page.tsx`, `lib/`
- Mode: Strict, type-safe, test-driven

### 🎨 Designer/PM (GREEN ZONE)
- Focus: UI details, user experience, layout
- Files: `*.view.tsx`, `*.stories.tsx`
- Mode: Fast iteration, visual-first

## Import Conventions

```typescript
// Absolute imports using @/ alias
import { Button } from '@/components/basics/Button';
import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';

// Relative imports only within same feature
import { ButtonView } from './Button.view';
```

## Code Quality Standards

- TypeScript strict mode enabled
- No `any` types without explicit reason
- Proper error handling
- Meaningful variable names
- Comments for complex logic only
- ESLint and Prettier configured

## Testing Strategy

- Unit tests for business logic
- Storybook for component visual testing
- Integration tests for critical flows
- Property-based tests where applicable

## Git Workflow

- Feature branches from `main`
- Descriptive commit messages
- PR reviews required
- CI/CD checks must pass

## Performance Guidelines

- Lazy load heavy components
- Optimize images and assets
- Minimize bundle size
- Use React.memo strategically
- Avoid unnecessary re-renders
