# Recaptcha Widget Specification

## Overview

The Recaptcha widget provides Google reCAPTCHA v2 checkbox verification for human identity validation. It automatically falls back to a mock implementation when reCAPTCHA is disabled, unavailable, or running on local IP addresses.

## Component Structure

```
components/widgets/Recaptcha/
├── index.tsx              # Logic Layer (RED ZONE)
├── Recaptcha.view.tsx     # View Layer (GREEN ZONE)
```

## Props API

### Recaptcha (Logic Layer)

```typescript
interface RecaptchaProps {
  onVerified?: (token: string) => void;
  onStart?: () => void;
}
```

### RecaptchaView (View Layer)

```typescript
interface RecaptchaViewProps {
  useMock: boolean;
  mockChecked: boolean;
  mockVerifying: boolean;
  containerId: string;
  error: string | null;
  onMockClick: () => void;
}
```

## Visual Specifications

### Container
- Padding: `4px`
- Margin Bottom: `16px`
- Display: Flex column with `8px` gap

### Header
- Icon: Shield (14px)
- Color: `var(--color-text-secondary)`
- Font Size: `13px`
- Gap: `8px`

### reCAPTCHA Widget Dimensions
- Width: `304px`
- Height: `78px`
- Border Radius: `3px` (mock) / `4px` (real container)

### Mock reCAPTCHA Styling

#### Container
- Background: `#f9f9f9`
- Border: `1px solid #d3d3d3`
- Box Shadow: `0 0 3px rgba(0,0,0,0.1)`
- Padding: `0 12px`
- Gap: `12px`

#### Checkbox
- Size: `28px × 28px`
- Border: `2px solid #c1c1c1` (unchecked) / `2px solid #4CAF50` (checked)
- Background: `#fff` (unchecked) / `#4CAF50` (checked)
- Border Radius: `2px`

#### Spinner (Verifying State)
- Size: `16px × 16px`
- Border: `2px solid #1a73e8`
- Border Top: `transparent`
- Animation: `spin 0.8s linear infinite`

#### Checkmark (Checked State)
- SVG icon: White checkmark
- Size: `20px × 20px`

#### Text
- Font: `Roboto, sans-serif`
- Size: `14px`
- Color: `#000`
- Content: "I'm not a robot"

#### Logo
- reCAPTCHA icon: `32px × 32px`
- Brand text: `8px` font size
- Links: Privacy & Terms (`7px` font size)

### Real reCAPTCHA Container
- Min Height: `78px`
- Min Width: `304px`
- Background: `rgba(255, 255, 255, 0.03)`
- Border Radius: `4px`

### Error Message
- Background: `rgba(239, 68, 68, 0.1)`
- Color: `#ef4444`
- Font Size: `13px`
- Padding: `8px`
- Border Radius: `4px`
- Icon: AlertTriangle (14px)

## Behavior

### Initialization

1. Component checks if reCAPTCHA is enabled:
   - Site key exists in environment variables
   - Not running on local IP address
   
2. If enabled:
   - Loads Google reCAPTCHA script
   - Renders real reCAPTCHA widget
   - Handles callbacks and errors
   
3. If disabled or error:
   - Falls back to mock implementation
   - Simulates verification with 1.5s delay

### Mock Verification Flow

1. User clicks checkbox
2. Shows spinner animation (1.5s)
3. Displays checkmark
4. Calls `onVerified` with mock token

### Real reCAPTCHA Flow

1. Google reCAPTCHA widget loads
2. User completes verification
3. Calls `onVerified` with real token
4. Handles expiration and errors automatically

## Configuration

### Environment Variables

```bash
VITE_RECAPTCHA_SITE_KEY=your_site_key_here
```

### Local IP Detection

Automatically disables reCAPTCHA for:
- `192.168.x.x`
- `10.x.x.x`
- `172.16-31.x.x`
- `127.0.0.1`
- `localhost`

## Script Loading

### Script URL
```
https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit&hl=en
```

### Parameters
- `onload`: Callback function name
- `render`: `explicit` (manual rendering)
- `hl`: Language code (`en`)

### Timeout
- 15 seconds maximum load time
- Falls back to mock on timeout

## Callbacks

### onVerified
Called when verification completes successfully:
```typescript
onVerified?: (token: string) => void
```

- Real reCAPTCHA: Returns actual token
- Mock: Returns `'mock-recaptcha-token'`

### onStart
Called when component initializes:
```typescript
onStart?: () => void
```

## Error Handling

### Error States
1. Missing site key
2. Script load failure
3. Script load timeout
4. reCAPTCHA runtime error
5. Expired token

### Error Display
- Shows error message with AlertTriangle icon
- Red background with transparency
- Only shown for real reCAPTCHA errors
- Mock mode doesn't show errors

## Animations

### Spin (Loading)
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

Duration: `0.8s linear infinite`

## Accessibility

- Checkbox has proper cursor states
- Links have proper href attributes
- Alt text for logo image
- Semantic HTML structure
- Keyboard accessible (native reCAPTCHA)

## Integration Example

```typescript
import { Recaptcha } from '@/components/widgets/Recaptcha';

function VerificationForm() {
  const handleVerified = (token: string) => {
    console.log('Verified with token:', token);
    // Send token to backend for verification
  };

  const handleStart = () => {
    console.log('reCAPTCHA started');
  };

  return (
    <Recaptcha
      onVerified={handleVerified}
      onStart={handleStart}
    />
  );
}
```

## Backend Verification

After receiving the token, verify it on your backend:

```typescript
// Example backend verification
const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: `secret=${SECRET_KEY}&response=${token}`
});

const data = await response.json();
if (data.success) {
  // Verification passed
}
```

## Mock vs Real Comparison

| Feature | Mock | Real |
|---------|------|------|
| Requires API Key | No | Yes |
| Network Request | No | Yes |
| Verification Time | 1.5s | Varies |
| Token | `'mock-recaptcha-token'` | Real token |
| Bot Protection | None | Full |
| Use Case | Development/Testing | Production |

## Dependencies

- `lucide-react`: Icons (Shield, AlertTriangle)
- Google reCAPTCHA v2 API
- Environment variables support

## Notes

- Automatically detects local development environment
- Graceful fallback to mock implementation
- No configuration needed for development
- Production requires valid site key
- Supports both checkbox and invisible modes (checkbox implemented)
- Script loaded only once per page
- Widget ID tracked for reset functionality
- Expired tokens automatically reset

## Backward Compatibility

Export alias provided for existing code:
```typescript
export const RecaptchaModal = Recaptcha;
```

## Future Enhancements

- Support for reCAPTCHA v3 (invisible)
- Custom theme support
- Multiple language support
- Analytics integration
- Retry mechanism for failed loads
