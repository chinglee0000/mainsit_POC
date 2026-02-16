# WalletBinding Widget Specification

## Overview

The WalletBinding widget handles the wallet connection and identity binding process for Twin3 verification. It supports both self-custody wallets (MetaMask, WalletConnect) and custodial SBT wallets created via Telegram bot.

## Component Structure

```
components/widgets/WalletBinding/
├── index.tsx                    # Logic Layer (RED ZONE)
├── WalletBinding.view.tsx       # View Layer (GREEN ZONE)
```

## Props API

### WalletBinding (Logic Layer)

```typescript
interface WalletBindingProps {
  onBindingComplete?: (walletAddress: string, bindingType: BindingType) => void;
  onClose?: () => void;
  forceConflict?: boolean;  // For demo/dev purposes
}

type BindingType = 'self-custody' | 'no-wallet';
type BindingStep = 'choose' | 'connecting' | 'conflict' | 'success';
```

### WalletBindingView (View Layer)

```typescript
interface WalletBindingViewProps {
  step: BindingStep;
  bindingType: BindingType | null;
  progress: number;
  walletAddress: string;
  showWalletModal: boolean;
  showWhyWallet: boolean;
  mockData: {
    walletAddress: string;
    fullAddress: string;
    tgWallet: string;
    conflictAddress: string;
  };
  onChoose: (type: BindingType) => void;
  onRetry: () => void;
  onSwitchWallet: () => void;
  onOpenWalletModal: () => void;
  onCloseWalletModal: () => void;
  onToggleWhyWallet: () => void;
  onOpenTelegram: () => void;
}
```

## Visual Specifications

### Card Container
- Background: `var(--glass-bg)`
- Border: `1px solid var(--glass-border)`
- Border Radius: `16px`
- Max Width: `400px`
- Responsive: Full width on mobile

### Header
- Padding: `16px 20px`
- Border Bottom: `1px solid rgba(255, 255, 255, 0.06)`
- Background: `linear-gradient(135deg, rgba(40, 40, 45, 0.5), rgba(30, 30, 35, 0.5))`

### Color Variants by Step

#### Choose (Default)
- Header: Default gradient
- Icon: `var(--color-text-primary)`

#### Connecting
- Header: Default gradient with pulse animation
- Spinner: `var(--color-primary)`

#### Conflict (Error)
- Header: `linear-gradient(135deg, rgba(80, 30, 20, 0.5), rgba(60, 20, 15, 0.5))`
- Icon: `#f59e0b` (warning yellow)

#### Success
- Header: `linear-gradient(135deg, rgba(20, 60, 30, 0.5), rgba(15, 50, 25, 0.5))`
- Icon: `#22c55e` (success green)

## Workflow Steps

### Step 1: Choose Binding Type

User selects between two options:

1. **Self-Custody Wallet**
   - Opens wallet connection modal
   - Shows MetaMask (installed) and WalletConnect (recommended)
   - Desktop: Shows "What is a Wallet?" education panel
   - Mobile: Shows simplified footer with learn more link

2. **No Wallet? No Problem**
   - Opens Telegram bot link in new tab
   - Creates custodial SBT wallet via Telegram

### Step 2: Connecting

Shows connection progress:
- Animated spinner and connection line
- Progress bar (0-100%)
- Duration: 2s for self-custody, 3s for Telegram
- Auto-advances to conflict or success

### Step 3: Conflict (Optional)

Shown when wallet is already bound to another account:
- Displays conflicting wallet address
- Options:
  - Switch Wallet (returns to choose step)
  - Try Again (retries connection)
  - Login with existing account (link)

### Step 4: Success

Shows successful binding:
- Success checkmark animation
- Displays full wallet address
- Auto-proceeds to verification after 2.5s
- Calls `onBindingComplete` callback

## Wallet Connection Modal

### Desktop Layout (≥768px)
- Two-panel design
- Left: Wallet list (240px width)
- Right: Educational content

### Mobile Layout (<768px)
- Single column
- Wallet list on top
- Footer with learn more link

### Wallet Options

#### Installed Section
- MetaMask (with icon)
- Shows "Recent" badge

#### Recommended Section
- WalletConnect (with icon)
- Hover effect on all options

### Educational Content (Desktop Only)

Two info blocks:
1. **Your Digital Asset Home**
   - Icon: Briefcase
   - Explains wallet storage functionality

2. **A New Way to Log In**
   - Icon: Key
   - Explains wallet as authentication

CTA Buttons:
- Primary: "Get a Wallet"
- Secondary: "Learn More" (link to ethereum.org)

## Animations

### Fade In
```css
animation: fade-in 0.2s ease-out
```

### Pulse Ring (Connecting)
```css
@keyframes pulse-ring {
  0%, 100% { 
    transform: scale(0.95);
    opacity: 1;
  }
  50% { 
    transform: scale(1.05);
    opacity: 0.3;
  }
}
```

### Spin (Loading)
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

### Slide Right (Connection Line)
```css
@keyframes slide-right {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(300%); }
}
```

### Bounce (Success Dots)
```css
animation: bounce 1s infinite
animation-delay: 0ms, 150ms, 300ms
```

## Responsive Behavior

### Desktop (≥768px)
- Modal: 90% width, max 680px
- Two-panel layout
- Educational content visible

### Mobile (<768px)
- Modal: 92% width, max 360px
- Single column layout
- Simplified footer
- Smaller font sizes for addresses

## Accessibility

- All buttons have proper hover states
- Focus states for keyboard navigation
- Semantic HTML structure
- Alt text for all images
- Color contrast meets WCAG AA standards

## Integration Example

```typescript
import { WalletBinding } from '@/components/widgets/WalletBinding';

function VerificationFlow() {
  const handleBindingComplete = (address: string, type: BindingType) => {
    console.log('Wallet bound:', address, type);
    // Proceed to next verification step
  };

  return (
    <WalletBinding
      onBindingComplete={handleBindingComplete}
      forceConflict={false}
    />
  );
}
```

## Mock Data

For development and testing:

```typescript
const MOCK_WALLET_ADDRESS = '0x1a2B...9cDe';
const MOCK_FULL_ADDRESS = '0x1a2B3c4D5e6F7a8B9c0D1e2F3a4B5c6D7e8F9cDe';
const MOCK_TG_WALLET = 'twin3_sbt_0xAb...Ef12';
const MOCK_CONFLICT_ADDRESS = '0x9fE...3bA1';
```

## External Links

- Telegram Bot: `https://t.me/twin3_ai`
- Wallet Education: `https://ethereum.org/wallets`

## Dependencies

- `lucide-react`: Icons
- `@/lib/theme`: Theme tokens
- React hooks: `useState`, `useCallback`, `useEffect`, `useRef`

## Notes

- Uses CSS variables for theming
- Supports both MetaMask and WalletConnect
- Includes educational content for Web3 newcomers
- Handles conflict scenarios gracefully
- Auto-advances through workflow steps
- Responsive design for all screen sizes
