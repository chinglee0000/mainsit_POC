import React from 'react';

export interface LogoWithTextViewProps {
  isDark: boolean;
  height?: number;
  className?: string;
}

/**
 * LogoWithText View Component
 * 
 * Pure UI component for rendering the Twin3 logo with text.
 * Displays different logo variants based on theme.
 */
export const LogoWithTextView: React.FC<LogoWithTextViewProps> = ({
  isDark,
  height = 28,
  className,
}) => {
  // Dark mode (dark background): use light mode logo
  // Light mode (light background): use dark mode logo
  const src = isDark
    ? '/brands/logo_text_dark mode.svg'
    : '/brands/logo_text_light mode.svg';

  return (
    <img
      src={src}
      alt="twin3.ai"
      className={className}
      style={{
        height: `${height}px`,
        width: 'auto',
        objectFit: 'contain',
      }}
    />
  );
};
