import { useState, useEffect } from 'react';
import { FinalRewardDashboardView } from './FinalRewardDashboard.view';

export interface FinalRewardDashboardProps {
  matrixScore: number;
  tokenAmount: number;
  onInviteFriends?: () => void;
  onJoinCommunity?: () => void;
}

export const FinalRewardDashboard = ({
  matrixScore,
  tokenAmount,
  onInviteFriends,
  onJoinCommunity,
}: FinalRewardDashboardProps) => {
  const [displayTokens, setDisplayTokens] = useState(0);

  // Animate token count-up
  useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();
    let raf: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const ratio = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - ratio, 3);
      setDisplayTokens(Math.round(tokenAmount * eased));

      if (ratio < 1) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);
  }, [tokenAmount]);

  const scoreBonus = Math.round((matrixScore / 255) * 5000);
  const missionBonus = 4 * 250;

  return (
    <FinalRewardDashboardView
      displayTokens={displayTokens}
      tokenAmount={tokenAmount}
      scoreBonus={scoreBonus}
      missionBonus={missionBonus}
      onInviteFriends={onInviteFriends}
      onJoinCommunity={onJoinCommunity}
    />
  );
};
