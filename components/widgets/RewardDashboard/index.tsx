/**
 * RewardDashboard Component - Logic Layer (RED ZONE)
 * 
 * Displays user's reward balance and completed missions.
 * Includes animated balance counter and action buttons.
 */

import { useState, useEffect } from 'react';
import { RewardDashboardView } from './RewardDashboard.view';

// ─── Types ──────────────────────────────────────────────
export interface CompletedTask {
  id: string;
  name: string;
  reward: number;
  completedAt: string;
}

export interface RewardDashboardProps {
  balance?: number;
  completedTasks?: CompletedTask[];
  onInvite?: () => void;
  onCommunity?: () => void;
}

// ─── Component ──────────────────────────────────────────
export const RewardDashboard: React.FC<RewardDashboardProps> = ({
  balance = 500,
  completedTasks = [
    { id: '1', name: 'Airdrop Claim', reward: 500, completedAt: 'Just now' },
  ],
  onInvite,
  onCommunity,
}) => {
  const [displayBalance, setDisplayBalance] = useState(0);

  // Animate balance count-up with easing
  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    let raf: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const ratio = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - ratio, 3);
      setDisplayBalance(Math.round(balance * eased));

      if (ratio < 1) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [balance]);

  return (
    <RewardDashboardView
      displayBalance={displayBalance}
      completedTasks={completedTasks}
      onInvite={onInvite}
      onCommunity={onCommunity}
    />
  );
};
