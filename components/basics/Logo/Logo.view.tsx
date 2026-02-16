import React from 'react';
import { theme } from '@/lib/theme';

export interface LogoViewProps {
  variant?: 'light' | 'dark';
  width?: string | number;
  height?: string | number;
  className?: string;
}

/**
 * Logo View Component
 * 
 * Pure UI component for rendering the Twin3 logo.
 * - light variant: For light backgrounds (dark logo)
 * - dark variant: For dark backgrounds (light logo)
 */
export const LogoView: React.FC<LogoViewProps> = ({
  variant = 'dark',
  width = 28,
  height = 28,
  className,
}) => {
  const src = variant === 'light'
    ? '/brands/twin3-black-circle.png'
    : '/brands/twin3-black-half.png';

  const widthValue = typeof width === 'number' ? `${width}px` : width;
  const heightValue = typeof height === 'number' ? `${height}px` : height;

  return (
    <img
      src={src}
      alt="twin3"
      className={className}
      style={{
        width: widthValue,
        height: heightValue,
        borderRadius: theme.shape.borderRadius,
        objectFit: 'contain',
      }}
    />
  );
};
