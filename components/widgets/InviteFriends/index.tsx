/**
 * InviteFriends Component - Logic Layer (RED ZONE)
 * 
 * Card for inviting friends with shareable invite link.
 * Shows invite stats and provides share buttons for social platforms.
 */

import { useState, useCallback } from 'react';
import { InviteFriendsView } from './InviteFriends.view';

// ─── Types ──────────────────────────────────────────────
export type SharePlatform = 'twitter' | 'telegram' | 'other';

export interface InviteFriendsProps {
  inviteCode?: string;
  invitedCount?: number;
  rewardPerInvite?: number;
  onShare?: (platform: SharePlatform) => void;
}

// ─── Default Values ─────────────────────────────────────
const DEFAULT_INVITE_CODE = 'twin3_ABC123';
const DEFAULT_INVITED_COUNT = 0;
const DEFAULT_REWARD_PER_INVITE = 50;

// ─── Component ──────────────────────────────────────────
export const InviteFriends: React.FC<InviteFriendsProps> = ({
  inviteCode = DEFAULT_INVITE_CODE,
  invitedCount = DEFAULT_INVITED_COUNT,
  rewardPerInvite = DEFAULT_REWARD_PER_INVITE,
  onShare,
}) => {
  const [copied, setCopied] = useState(false);
  const inviteUrl = `https://twin3.ai/invite/${inviteCode}`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(inviteUrl).catch(() => {
      // Silently fail if clipboard access is denied
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [inviteUrl]);

  const handleShare = useCallback((platform: SharePlatform) => {
    if (platform === 'twitter') {
      const text = `Join me on Twin3! Use my invite code: ${inviteCode}`;
      const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(inviteUrl)}`;
      window.open(twitterUrl, '_blank', 'width=550,height=420');
    } else if (platform === 'telegram') {
      const text = `Join me on Twin3! Use my invite code: ${inviteCode}`;
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteUrl)}&text=${encodeURIComponent(text)}`;
      window.open(telegramUrl, '_blank');
    } else {
      // For 'other', just copy to clipboard
      handleCopy();
    }
    
    onShare?.(platform);
  }, [inviteCode, inviteUrl, handleCopy, onShare]);

  return (
    <InviteFriendsView
      inviteUrl={inviteUrl}
      invitedCount={invitedCount}
      rewardPerInvite={rewardPerInvite}
      copied={copied}
      onCopy={handleCopy}
      onShare={handleShare}
    />
  );
};

// Export alias for backward compatibility
export const InviteFriendsCard = InviteFriends;
