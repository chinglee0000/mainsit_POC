---
trigger: always_on
---

# Code Conventions

## File Naming

### Components
- PascalCase for component files: `Button.tsx`, `TwinMatrix.tsx`
- View files: `Button.view.tsx`
- Story files: `Button.stories.tsx`
- Test files: `Button.test.tsx`

### Utilities and Configs
- camelCase for utility files: `utils.ts`, `theme.ts`
- kebab-case for config files: `tsconfig.json`, `next.config.ts`

### Directories
- kebab-case: `twin-matrix/`, `human-verification/`
- Exception: Component directories use PascalCase: `Button/`, `TwinMatrix/`

## TypeScript

### Type Definitions
```typescript
// Use interface for object shapes
interface ButtonProps {
  variant: 'contained' | 'outlined' | 'text';
  size?: 'sm' | 'regular' | 'lg';
  onClick?: () => void;
}

// Use type for unions, intersections, utilities
type ButtonVariant = 'contained' | 'outlined' | 'text';
type ExtendedProps = ButtonProps & { customProp: string };
```

### Naming Conventions
- Interfaces: PascalCase with descriptive names
- Types: PascalCase
- Enums: PascalCase for name, UPPER_SNAKE_CASE for values
- Generics: Single uppercase letter or descriptive PascalCase

```typescript
// Good
interface UserProfile { }
type UserId = string;
enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

// Generic
function identity<T>(arg: T): T { }
function mapArray<TInput, TOutput>(arr: TInput[]): TOutput[] { }
```

### Avoid `any`
```typescript
// ❌ Bad
function process(data: any) { }

// ✅ Good
function process(data: unknown) {
  if (typeof data === 'string') {
    // Type narrowing
  }
}

// ✅ Better
interface ProcessData {
  id: string;
  value: number;
}
function process(data: ProcessData) { }
```

## React Components

### Function Components
```typescript
// ✅ Preferred: Arrow function with explicit return type
export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

// ✅ Also acceptable: Function declaration
export function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}
```

### Animation Classes Usage

**CRITICAL RULE**: Do NOT apply animation classes to text content containers.

```typescript
// ❌ BAD: Animation on text message container
export const MessageBubble: React.FC<Props> = ({ message }) => {
  return (
    <div className="animate-fade-in"> {/* ❌ Causes text drift */}
      <div>{message.content}</div>
    </div>
  );
};

// ✅ GOOD: No animation on text container
export const MessageBubble: React.FC<Props> = ({ message }) => {
  return (
    <div> {/* ✅ Text appears instantly */}
      <div>{message.content}</div>
    </div>
  );
};

// ✅ GOOD: Animation on widget/card containers
export const Widget: React.FC<Props> = ({ children }) => {
  return (
    <div className="card animate-fade-in-scale"> {/* ✅ Safe for widgets */}
      {children}
    </div>
  );
};
```

**Why?**
- Transform animations (translateY, translateX) cause visual "drift" with text
- Long or multi-line text amplifies the shifting effect
- Different browsers render text differently during animations
- Users perceive text movement as jarring and unprofessional

**When to animate:**
- ✅ Cards, modals, tooltips
- ✅ Widgets and interactive components
- ✅ Images and icons
- ✅ Loading states and skeletons

**When NOT to animate:**
- ❌ Text messages (chat bubbles, notifications)
- ❌ Paragraphs and long-form content
- ❌ Form labels and input text
- ❌ Error messages and alerts

### Props Destructuring
```typescript
// ✅ Good: Destructure in parameter
export const Button: React.FC<ButtonProps> = ({ 
  variant = 'contained',
  size = 'regular',
  children,
  ...rest 
}) => {
  return <button {...rest}>{children}</button>;
};
```

### Hooks
```typescript
// Custom hooks start with 'use'
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  // ...
  return [value, setValue] as const;
}

// Hook rules
// 1. Only call at top level
// 2. Only call from React functions
// 3. Name starts with 'use'
```

## Imports

### Order
```typescript
// 1. External libraries
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// 2. Internal absolute imports (@/)
import { Button } from '@/components/basics/Button';
import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';

// 3. Relative imports
import { ButtonView } from './Button.view';
import type { ButtonProps } from './types';

// 4. Styles
import './Button.css';
```

### Absolute vs Relative
```typescript
// ✅ Use absolute imports for cross-feature
import { Button } from '@/components/basics/Button';

// ✅ Use relative imports within same feature
import { ButtonView } from './Button.view';
import { useButtonLogic } from './useButtonLogic';
```

## Naming

### Variables
```typescript
// camelCase for variables and functions
const userName = 'John';
const isActive = true;
const getUserData = () => { };

// Boolean variables: is/has/should prefix
const isLoading = false;
const hasError = true;
const shouldRender = false;
```

### Constants
```typescript
// UPPER_SNAKE_CASE for true constants
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = 'https://api.example.com';

// camelCase for configuration objects
const apiConfig = {
  baseUrl: 'https://api.example.com',
  timeout: 5000,
};
```

### Functions
```typescript
// Verb + Noun pattern
function getUserById(id: string) { }
function calculateTotal(items: Item[]) { }
function validateEmail(email: string) { }

// Event handlers: handle + Event
function handleClick() { }
function handleSubmit() { }
function handleInputChange() { }
```

## Comments

### When to Comment
```typescript
// ✅ Good: Explain WHY, not WHAT
// Retry 3 times because API is occasionally flaky
const MAX_RETRY_COUNT = 3;

// ✅ Good: Complex logic explanation
// Calculate weighted score based on multiple factors:
// - User engagement (40%)
// - Content quality (30%)
// - Recency (30%)
function calculateScore(metrics: Metrics) { }

// ❌ Bad: Obvious comments
// Set the name variable to 'John'
const name = 'John';
```

### JSDoc for Public APIs
```typescript
/**
 * Fetches user data from the API
 * @param userId - The unique identifier of the user
 * @returns Promise resolving to user data
 * @throws {ApiError} When the API request fails
 */
export async function fetchUser(userId: string): Promise<User> {
  // Implementation
}
```

## Error Handling

### Try-Catch
```typescript
// ✅ Good: Specific error handling
try {
  const data = await fetchData();
  return data;
} catch (error) {
  if (error instanceof ApiError) {
    console.error('API Error:', error.message);
  } else {
    console.error('Unexpected error:', error);
  }
  throw error;
}
```

### Error Types
```typescript
// Define custom error classes
class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
```

## Async/Await

### Prefer async/await over .then()
```typescript
// ✅ Good
async function fetchUserData(id: string) {
  try {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}

// ❌ Avoid
function fetchUserData(id: string) {
  return fetch(`/api/users/${id}`)
    .then(response => response.json())
    .catch(error => {
      console.error('Failed to fetch user:', error);
      throw error;
    });
}
```

## Code Organization

### File Structure
```typescript
// 1. Imports
import React from 'react';

// 2. Types/Interfaces
interface Props { }

// 3. Constants
const DEFAULT_VALUE = 10;

// 4. Helper functions
function helper() { }

// 5. Main component
export function Component() { }

// 6. Exports
export type { Props };
```

### Component Size
- Keep components under 300 lines
- Extract complex logic to custom hooks
- Split large components into smaller ones
- Use composition over inheritance

## Performance

### Memoization
```typescript
// Use React.memo for expensive components
export const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Complex rendering */}</div>;
});

// Use useMemo for expensive calculations
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.value - b.value);
}, [data]);

// Use useCallback for stable function references
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);
```

### Avoid Premature Optimization
- Profile before optimizing
- Focus on user-perceived performance
- Optimize critical paths first

## Testing

### Test File Naming
- `Component.test.tsx` for unit tests
- `Component.integration.test.tsx` for integration tests
- `Component.e2e.test.tsx` for end-to-end tests

### Test Structure
```typescript
describe('Button', () => {
  it('renders with default props', () => {
    // Arrange
    const { getByText } = render(<Button>Click me</Button>);
    
    // Act
    const button = getByText('Click me');
    
    // Assert
    expect(button).toBeInTheDocument();
  });
});
```

## Git Commits

### Commit Message Format
```
type(scope): subject

body (optional)

footer (optional)
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```
feat(button): add loading state
fix(modal): prevent scroll when open
docs(readme): update installation steps
refactor(utils): simplify date formatting
```
