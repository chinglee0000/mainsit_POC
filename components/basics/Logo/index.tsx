import React from 'react';
import { LogoView, LogoViewProps } from './Logo.view';

/**
 * Logo Component
 * 
 * Logic layer for the Twin3 logo.
 * Currently passes through to view, but can be extended with:
 * - Analytics tracking
 * - Theme detection
 * - Dynamic variant selection
 */
export const Logo: React.FC<LogoViewProps> = (props) => {
  // Future: Add analytics, theme detection, etc.
  return <LogoView {...props} />;
};

export type { LogoViewProps as LogoProps };
