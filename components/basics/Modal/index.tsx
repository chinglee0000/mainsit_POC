import React, { useEffect, useState } from 'react';
import { ModalView } from './Modal.view';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  fullHeight?: boolean;
}

/**
 * Modal Component
 * 
 * Logic layer that handles:
 * - Mobile/desktop detection
 * - Animation state management
 * - Body scroll lock
 * - Responsive behavior
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  fullHeight = false,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle animation and body scroll lock
  useEffect(() => {
    if (isOpen) {
      setAnimateIn(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setAnimateIn(false), 300);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <ModalView
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      children={children}
      fullHeight={fullHeight}
      isMobile={isMobile}
      animateIn={animateIn}
    />
  );
};

export type { ModalProps };

// Export as ResponsiveModal for backward compatibility
export { Modal as ResponsiveModal };
