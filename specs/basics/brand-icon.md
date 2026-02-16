# BrandIcon Component Specification

## Overview

The BrandIcon component provides a unified interface for displaying brand logos and icons throughout the application. It ensures consistent sizing, styling, and accessibility for all brand assets.

## Component Structure

```
components/basics/BrandIcon/
├── index.tsx              # Logic Layer (RED ZONE)
├── BrandIcon.view.tsx     # View Layer (GREEN ZONE)
```

## Props API

### BrandIcon (Logic Layer)

```typescript
type BrandName =
  | 'metamask'
  | 'metamask-logo'
  | 'telegram'
  | 'discord-black'
  | 'discord-blurple'
  | 'discord-white'
  | 'linkedin-black'
  | 'linkedin-white'
  | 'x-black'
  | 'x-white'
  | 'twin3-circle'
  | 'twin3-half'
  | 'twin3-text-dark'
  | 'twin3-text-light'
  | 'dior'
  | 'loreal'
  | 'starbucks';

type BrandIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

interface BrandIconProps {
  brand: BrandName;
  size?: BrandIconSize;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}
```

### BrandIconView (View Layer)

```typescript
interface BrandIconViewProps {
  src: string;
  alt: string;
  size: number;
  className?: string;
  style?: React.CSSProperties;
}
```

## Supported Brands

### Wallets & Crypto
- `metamask` - MetaMask fox icon (SVG)
- `metamask-logo` - MetaMask logo with text (SVG)

### Social & Communication
- `telegram` - Telegram logo (SVG)
- `discord-black` - Discord symbol black (SVG)
- `discord-blurple` - Discord symbol blurple (SVG)
- `discord-white` - Discord symbol white (SVG)
- `linkedin-black` - LinkedIn black (PNG)
- `linkedin-white` - LinkedIn white (PNG)
- `x-black` - X (Twitter) black (PNG)
- `x-white` - X (Twitter) white (PNG)

### Twin3 Branding
- `twin3-circle` - Twin3 circular logo (PNG)
- `twin3-half` - Twin3 half logo (PNG)
- `twin3-text-dark` - Twin3 logo with text for dark mode (SVG)
- `twin3-text-light` - Twin3 logo with text for light mode (SVG)

### Partner Brands
- `dior` - Dior logo (PNG)
- `loreal` - L'Oréal logo (PNG)
- `starbucks` - Starbucks logo (PNG)

## Size Specifications

### Predefined Sizes
- `xs`: 16px
- `sm`: 20px
- `md`: 24px (default)
- `lg`: 32px
- `xl`: 48px

### Custom Size
- Any number value in pixels

## Visual Specifications

### Image Rendering
- Object Fit: `contain`
- Display: `block`
- Width: Based on size prop
- Height: Based on size prop (maintains aspect ratio)

### Default Styling
- No background
- No border
- No padding
- Transparent background support

## Usage Examples

### Basic Usage

```typescript
import { BrandIcon } from '@/components/basics/BrandIcon';

// Default size (md = 24px)
<BrandIcon brand="metamask" />

// With predefined size
<BrandIcon brand="telegram" size="lg" />

// With custom size
<BrandIcon brand="discord-blurple" size={40} />

// With custom alt text
<BrandIcon brand="metamask" alt="Connect with MetaMask" />
```

### In Wallet Connection

```typescript
<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
  <BrandIcon brand="metamask" size="lg" />
  <span>Connect MetaMask</span>
</div>
```

### In Social Links

```typescript
<div style={{ display: 'flex', gap: '16px' }}>
  <BrandIcon brand="x-white" size="sm" />
  <BrandIcon brand="discord-white" size="sm" />
  <BrandIcon brand="telegram" size="sm" />
</div>
```

### With Custom Styling

```typescript
<BrandIcon
  brand="twin3-circle"
  size="xl"
  style={{
    borderRadius: '50%',
    border: '2px solid white',
    padding: '4px',
  }}
/>
```

### Responsive Size

```typescript
const iconSize = window.innerWidth < 768 ? 'sm' : 'lg';

<BrandIcon brand="metamask" size={iconSize} />
```

## Helper Functions

### getBrandPath
Returns the file path for a brand:
```typescript
getBrandPath('metamask') // '/brands/MetaMask-icon-fox.svg'
```

### getBrandSize
Converts size prop to pixel value:
```typescript
getBrandSize('md') // 24
getBrandSize(40)   // 40
```

### getBrandAlt
Generates default alt text:
```typescript
getBrandAlt('metamask')        // 'Metamask'
getBrandAlt('discord-blurple') // 'Discord Blurple'
getBrandAlt('x-black', 'X')    // 'X' (custom)
```

## Accessibility

### Alt Text
- Auto-generated from brand name if not provided
- Capitalizes each word
- Removes hyphens
- Example: `discord-white` → "Discord White"

### Best Practices
- Always provide meaningful alt text for context
- Use empty alt (`alt=""`) for decorative icons
- Ensure sufficient color contrast with background

## File Format Support

### SVG (Recommended)
- Scalable without quality loss
- Smaller file size
- Better for icons and logos
- Supports transparency

### PNG
- Good for complex images
- Supports transparency
- Fixed resolution

## Integration with Existing Components

### WalletBinding Component

Before:
```typescript
<img src="/brands/MetaMask-icon-fox.svg" alt="MetaMask" style={{ width: '100%', height: '100%' }} />
```

After:
```typescript
<BrandIcon brand="metamask" size={36} />
```

### Benefits
- Centralized brand asset management
- Type-safe brand names
- Consistent sizing
- Automatic alt text generation
- Easier to update brand assets

## Asset Management

### Adding New Brands

1. Add image to `public/brands/` directory
2. Add brand name to `BrandName` type
3. Add path mapping to `BRAND_PATHS`
4. Update documentation

Example:
```typescript
// 1. Add to type
export type BrandName = 
  | 'existing-brands'
  | 'new-brand';

// 2. Add to mapping
const BRAND_PATHS: Record<BrandName, string> = {
  // ...existing
  'new-brand': '/brands/new-brand.svg',
};
```

### Updating Brand Assets

1. Replace file in `public/brands/`
2. Keep same filename
3. No code changes needed
4. Clear browser cache if needed

## Performance Considerations

- Images are loaded from public directory (no bundling)
- Browser caching applies
- Use SVG when possible for smaller file size
- Consider lazy loading for many icons

## Theme Support

### Dark/Light Mode
Use appropriate brand variants:
```typescript
const theme = useTheme();

<BrandIcon 
  brand={theme === 'dark' ? 'twin3-text-dark' : 'twin3-text-light'} 
  size="lg"
/>
```

### Color Variants
Some brands have multiple color variants:
- Discord: black, blurple, white
- LinkedIn: black, white
- X: black, white

Choose based on background color for optimal contrast.

## Error Handling

### Missing Brand
- TypeScript will catch invalid brand names at compile time
- Runtime: Will attempt to load path, browser shows broken image if missing

### Missing File
- Browser handles missing images gracefully
- Alt text displays as fallback
- Console warning in development

## Testing

### Visual Testing
```typescript
// Test all sizes
['xs', 'sm', 'md', 'lg', 'xl'].map(size => (
  <BrandIcon key={size} brand="metamask" size={size} />
))

// Test all brands
Object.keys(BRAND_PATHS).map(brand => (
  <BrandIcon key={brand} brand={brand} size="md" />
))
```

### Accessibility Testing
- Verify alt text is present
- Check with screen reader
- Ensure keyboard navigation works (if interactive)

## Dependencies

- React
- No external dependencies
- Uses standard HTML `<img>` element

## Notes

- All brand assets are in `public/brands/` directory
- Paths are relative to public directory
- Component is purely presentational
- No network requests (local assets only)
- Supports all standard img attributes via style prop
- Type-safe brand names prevent typos
- Centralized management simplifies updates

## Future Enhancements

- Lazy loading support
- Placeholder while loading
- Error fallback component
- Brand color extraction
- Animated brand icons
- SVG sprite sheet optimization
- WebP format support
- Automatic dark/light mode detection
