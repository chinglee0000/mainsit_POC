import React, { useState, useCallback, useRef, useEffect } from 'react';
import { TooltipView } from './Tooltip.view';

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

/**
 * Tooltip Component
 * 
 * Logic layer that handles:
 * - Touch device detection
 * - Position calculation
 * - Scroll and resize listeners
 * - Visibility state management
 */
export const Tooltip: React.FC<TooltipProps> = ({ 
  content, 
  children, 
  placement = 'bottom' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Detect touch device on mount
  useEffect(() => {
    const checkTouchDevice = () => {
      const hasHover = window.matchMedia('(hover: hover)').matches;
      const hasPointer = window.matchMedia('(pointer: fine)').matches;
      const isSmallScreen = window.innerWidth < 1024;
      setIsTouchDevice(!hasHover || !hasPointer || isSmallScreen);
    };
    checkTouchDevice();

    const hoverQuery = window.matchMedia('(hover: hover)');
    hoverQuery.addEventListener('change', checkTouchDevice);
    window.addEventListener('resize', checkTouchDevice);

    return () => {
      hoverQuery.removeEventListener('change', checkTouchDevice);
      window.removeEventListener('resize', checkTouchDevice);
    };
  }, []);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const offset = 8;

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = rect.top - offset;
        left = rect.left + rect.width / 2;
        break;
      case 'bottom':
        top = rect.bottom + offset;
        left = rect.left + rect.width / 2;
        break;
      case 'left':
        top = rect.top + rect.height / 2;
        left = rect.left - offset;
        break;
      case 'right':
        top = rect.top + rect.height / 2;
        left = rect.right + offset;
        break;
    }

    setPosition({ top, left });
  }, [placement]);

  const handleMouseEnter = useCallback(() => {
    if (isTouchDevice) return;
    calculatePosition();
    setIsVisible(true);
  }, [calculatePosition, isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleUpdate = () => calculatePosition();
    window.addEventListener('scroll', handleUpdate, true);
    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('scroll', handleUpdate, true);
      window.removeEventListener('resize', handleUpdate);
    };
  }, [isVisible, calculatePosition]);

  return (
    <TooltipView
      content={content}
      children={children}
      placement={placement}
      isVisible={isVisible}
      position={position}
      triggerRef={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export type { TooltipProps };
