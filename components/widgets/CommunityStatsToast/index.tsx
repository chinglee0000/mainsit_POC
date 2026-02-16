import { useState, useEffect } from 'react';
import { CommunityStatsToastView } from './CommunityStatsToast.view';

export interface CommunityStatsToastProps {
  memberCount?: number;
  onClose?: () => void;
}

export const CommunityStatsToast = ({
  memberCount = 29571,
  onClose,
}: CommunityStatsToastProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  return (
    <CommunityStatsToastView
      memberCount={memberCount}
      formattedCount={formatNumber(memberCount)}
      isVisible={isVisible}
      isClosing={isClosing}
      onClose={handleClose}
    />
  );
};
