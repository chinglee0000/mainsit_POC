/**
 * BrandIcon View - UI Layer (GREEN ZONE)
 * 
 * Pure UI rendering for brand icon/logo display.
 */

import React from 'react';

// ─── Types ──────────────────────────────────────────────
export interface BrandIconViewProps {
  src: string;
  alt: string;
  size: number;
  className?: string;
  style?: React.CSSProperties;
}

// ─── Component ──────────────────────────────────────────
export const BrandIconView: React.FC<BrandIconViewProps> = ({
  src,
  alt,
  size,
  className,
  style,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: 'contain',
        display: 'block',
        ...style,
      }}
    />
  );
};
