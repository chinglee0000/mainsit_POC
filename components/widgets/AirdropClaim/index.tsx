/**
 * AirdropClaim Component - Logic Layer (RED ZONE)
 * 
 * Card for claiming airdrop rewards based on humanity score.
 * Shows locked, claimable, or claimed states with animations.
 */

import { useState, useCallback, useEffect } from 'react';
import { AirdropClaimView } from './AirdropClaim.view';

// ─── Types ──────────────────────────────────────────────
export type AirdropState = 'locked' | 'claimable' | 'claimed';

export interface AirdropClaimProps {
  score: number;
  threshold?: number;
  rewardAmount?: number;
  onClaim?: () => void;
  onGoBack?: () => void;
  hasClaimed?: boolean;
}

// ─── Default Values ─────────────────────────────────────
const DEFAULT_THRESHOLD = 100;
const DEFAULT_REWARD_AMOUNT = 500;

// ─── Component ──────────────────────────────────────────
export const AirdropClaim: React.FC<AirdropClaimProps> = ({
  score,
  threshold = DEFAULT_THRESHOLD,
  rewardAmount = DEFAULT_REWARD_AMOUNT,
  onClaim,
  onGoBack,
  hasClaimed = false,
}) => {
  const [claimed, setClaimed] = useState(hasClaimed);
  const [showConfetti, setShowConfetti] = useState(false);

  const canClaim = score >= threshold && !claimed;
  const locked = score < threshold;
  
  const state: AirdropState = locked ? 'locked' : claimed ? 'claimed' : 'claimable';
  const progress = Math.min((score / threshold) * 100, 100);

  const handleClaim = useCallback(() => {
    if (!canClaim) return;
    
    setClaimed(true);
    setShowConfetti(true);
    onClaim?.();
    
    setTimeout(() => setShowConfetti(false), 3000);
  }, [canClaim, onClaim]);

  // Update claimed state if prop changes
  useEffect(() => {
    setClaimed(hasClaimed);
  }, [hasClaimed]);

  return (
    <AirdropClaimView
      state={state}
      score={score}
      threshold={threshold}
      rewardAmount={rewardAmount}
      progress={progress}
      showConfetti={showConfetti}
      onClaim={handleClaim}
      onGoBack={onGoBack}
    />
  );
};

// Export alias for backward compatibility
export const AirdropClaimCard = AirdropClaim;
