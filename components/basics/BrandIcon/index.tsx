/**
 * BrandIcon Component - Logic Layer (RED ZONE)
 * 
 * Displays brand logos and icons with consistent sizing and styling.
 * Supports various brands including MetaMask, Telegram, Discord, social media, etc.
 */

import { BrandIconView } from './BrandIcon.view';

// ─── Types ──────────────────────────────────────────────
export type BrandName =
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

export type BrandIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export interface BrandIconProps {
  brand: BrandName;
  size?: BrandIconSize;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

// ─── Brand Path Mapping ─────────────────────────────────
const BRAND_PATHS: Record<BrandName, string> = {
  'metamask': '/brands/MetaMask-icon-fox.svg',
  'metamask-logo': '/brands/MetaMask-logo-white.svg',
  'telegram': '/brands/telegram_logo.svg',
  'discord-black': '/brands/Discord-Symbol-Black.svg',
  'discord-blurple': '/brands/Discord-Symbol-Blurple.svg',
  'discord-white': '/brands/Discord-Symbol-White.svg',
  'linkedin-black': '/brands/linkedin-black.png',
  'linkedin-white': '/brands/linkedin-white.png',
  'x-black': '/brands/x-black.png',
  'x-white': '/brands/x-white.png',
  'twin3-circle': '/brands/twin3-black-circle.png',
  'twin3-half': '/brands/twin3-black-half.png',
  'twin3-text-dark': '/brands/logo_text_dark mode.svg',
  'twin3-text-light': '/brands/logo_text_light mode.svg',
  'dior': '/brands/dior.png',
  'loreal': '/brands/loreal.png',
  'starbucks': '/brands/starbucks.png',
};

// ─── Size Mapping ───────────────────────────────────────
const SIZE_MAP: Record<Exclude<BrandIconSize, number>, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
};

// ─── Helper Functions ───────────────────────────────────
export const getBrandPath = (brand: BrandName): string => {
  return BRAND_PATHS[brand];
};

export const getBrandSize = (size: BrandIconSize): number => {
  return typeof size === 'number' ? size : SIZE_MAP[size];
};

export const getBrandAlt = (brand: BrandName, customAlt?: string): string => {
  if (customAlt) return customAlt;
  
  // Generate default alt text from brand name
  return brand
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// ─── Component ──────────────────────────────────────────
export const BrandIcon: React.FC<BrandIconProps> = ({
  brand,
  size = 'md',
  alt,
  className,
  style,
}) => {
  const path = getBrandPath(brand);
  const sizeValue = getBrandSize(size);
  const altText = getBrandAlt(brand, alt);

  return (
    <BrandIconView
      src={path}
      alt={altText}
      size={sizeValue}
      className={className}
      style={style}
    />
  );
};
