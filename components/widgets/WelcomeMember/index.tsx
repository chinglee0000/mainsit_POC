/**
 * WelcomeMember Component - Logic Layer (RED ZONE)
 * 
 * Modal welcoming new members with their member number.
 * Shows congratulations message and member rank with animations.
 */

import { useState, useEffect, useCallback } from 'react';
import { WelcomeMemberView } from './WelcomeMember.view';

// ─── Types ──────────────────────────────────────────────
export interface WelcomeMemberProps {
  memberNumber: number;
  onClose: () => void;
}

// ─── Helper Functions ───────────────────────────────────
export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

export const getOrdinalSuffix = (num: number): string => {
  const lastDigit = num % 10;
  const lastTwoDigits = num % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return 'th';
  }
  
  switch (lastDigit) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

// ─── Component ──────────────────────────────────────────
export const WelcomeMember: React.FC<WelcomeMemberProps> = ({
  memberNumber,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => setShowConfetti(true), 300);
  }, []);

  const handleBackdropClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <WelcomeMemberView
      memberNumber={memberNumber}
      isVisible={isVisible}
      showConfetti={showConfetti}
      onClose={onClose}
      onBackdropClick={handleBackdropClick}
      onContentClick={handleContentClick}
    />
  );
};

// Export alias for backward compatibility
export const WelcomeMemberModal = WelcomeMember;
