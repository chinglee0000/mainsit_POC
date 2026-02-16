import React from 'react';
import { X } from 'lucide-react';
import { theme } from '@/lib/theme';

export interface ModalViewProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  fullHeight?: boolean;
  isMobile: boolean;
  animateIn: boolean;
}

/**
 * Modal View Component
 * 
 * Pure UI component for rendering responsive modals.
 * - Desktop: Centered modal with backdrop
 * - Mobile: Bottom sheet with pull indicator
 */
export const ModalView: React.FC<ModalViewProps> = ({
  isOpen,
  onClose,
  title,
  children,
  fullHeight = false,
  isMobile,
  animateIn,
}) => {
  if (!isOpen && !animateIn) return null;

  // Mobile Bottom Sheet styles
  const mobileStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    top: fullHeight ? 0 : 'auto',
    maxHeight: fullHeight ? '100%' : '85vh',
    background: theme.palette.background.paper,
    backdropFilter: 'blur(20px) saturate(180%)',
    borderTopLeftRadius: `${theme.shape.borderRadius * 2.5}px`,
    borderTopRightRadius: `${theme.shape.borderRadius * 2.5}px`,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows.xl,
    transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
    transition: `transform ${theme.transitions.duration.standard}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
  };

  // Desktop Modal styles
  const desktopStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: '800px',
    maxHeight: '85vh',
    background: theme.palette.background.paper,
    backdropFilter: 'blur(20px) saturate(180%)',
    borderRadius: `${theme.shape.borderRadius * 2}px`,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows.xl,
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'scale(1)' : 'scale(0.95)',
    transition: `all ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeOut}`,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: isMobile ? 'flex-end' : 'center',
        justifyContent: 'center',
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          opacity: isOpen ? 1 : 0,
          transition: `opacity ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
        }}
      />

      {/* Modal Content */}
      <div
        style={isMobile ? mobileStyle : desktopStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: theme.spacing(2),
            borderBottom: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          {/* Mobile Pull Indicator */}
          {isMobile && (
            <div
              style={{
                position: 'absolute',
                top: theme.spacing(1),
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '2px',
              }}
            />
          )}

          <h2
            style={{
              fontSize: theme.typography.h6.fontSize,
              fontWeight: theme.typography.h6.fontWeight,
              color: theme.palette.text.primary,
              margin: isMobile ? `${theme.spacing(1.5)} 0 0 0` : 0,
            }}
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            style={{
              padding: theme.spacing(1),
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: isMobile ? theme.spacing(1.5) : 0,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: theme.palette.text.secondary,
              transition: `background ${theme.transitions.duration.shortest}ms`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.palette.action.hover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: theme.spacing(2.5),
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
