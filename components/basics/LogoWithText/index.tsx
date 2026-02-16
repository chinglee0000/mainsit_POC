import React, { useEffect, useState } from 'react';
import { LogoWithTextView, LogoWithTextViewProps } from './LogoWithText.view';

export interface LogoWithTextProps {
  className?: string;
  height?: number;
}

/**
 * LogoWithText Component
 * 
 * Logic layer that handles theme detection and passes to view.
 * Automatically switches between light and dark mode versions.
 */
export const LogoWithText: React.FC<LogoWithTextProps> = ({
  className,
  height = 28,
}) => {
  const [isDark, setIsDark] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const matcher = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    
    matcher.addEventListener('change', handler);
    return () => matcher.removeEventListener('change', handler);
  }, []);

  return (
    <LogoWithTextView 
      isDark={isDark}
      height={height}
      className={className}
    />
  );
};

export type { LogoWithTextProps };
