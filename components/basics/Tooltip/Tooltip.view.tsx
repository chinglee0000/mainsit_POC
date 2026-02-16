import React from 'react';
import { createPortal } from 'react-dom';
import { theme } from '@/lib/theme';

export interface TooltipViewProps {
  content: string;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  isVisible: boolean;
  position: { top: number; left: number };
  triggerRef: React.RefObject<HTMLDivElement>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

/**
 * Tooltip View Component
 * 
 * Pure UI component for rendering tooltips.
 * Uses portal to render outside DOM hierarchy.
 */
export const TooltipView: React.FC<TooltipViewProps> = ({
  content,
  children,
  placement = 'bottom',
  isVisible,
  position,
  triggerRef,
  onMouseEnter,
  onMouseLeave,
}) => {
  const getTransform = () => {
    switch (placement) {
      case 'top':
        return 'translate(-50%, -100%)';
      case 'bottom':
        return 'translate(-50%, 0)';
      case 'left':
        return 'translate(-100%, -50%)';
      case 'right':
        return 'translate(0, -50%)';
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        style={{ display: 'inline-flex' }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </div>
      {isVisible && createPortal(
        <div
          style={{
            position: 'fixed',
            top: position.top,
            left: position.left,
            transform: getTransform(),
            padding: `${theme.spacing(0.75)} ${theme.spacing(1.5)}`,
            background: 'rgba(28, 28, 30, 0.95)',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: `${theme.shape.borderRadius - 2}px`,
            fontSize: theme.typography.caption.fontSize,
            fontWeight: 500,
            color: theme.palette.text.primary,
            whiteSpace: 'nowrap',
            zIndex: 99999,
            pointerEvents: 'none',
            boxShadow: theme.shadows.lg,
          }}
        >
          {content}
        </div>,
        document.body
      )}
    </>
  );
};
