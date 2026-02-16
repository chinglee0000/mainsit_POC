/**
 * ShareModal Component - Logic Layer (RED ZONE)
 * 
 * Modal for sharing Twin3 on social media platforms.
 * Supports Twitter/X, Telegram, and copy to clipboard.
 */

import { useState, useCallback } from 'react';
import { ShareModalView } from './ShareModal.view';

// ─── Types ──────────────────────────────────────────────
export type SharePlatform = 'twitter' | 'telegram' | 'copy';

export interface ShareModalProps {
  onComplete: () => void;
  onClose: () => void;
  shareText?: string;
  shareUrl?: string;
  rewardPoints?: number;
}

// ─── Default Values ─────────────────────────────────────
const DEFAULT_SHARE_TEXT = "Just discovered my Twin Matrix on twin3! 🎯 Check out my unique human profile across 256 dimensions.";
const DEFAULT_SHARE_URL = "https://twin3.ai";
const DEFAULT_REWARD_POINTS = 30;

// ─── Component ──────────────────────────────────────────
export const ShareModal: React.FC<ShareModalProps> = ({
  onComplete,
  onClose,
  shareText = DEFAULT_SHARE_TEXT,
  shareUrl = DEFAULT_SHARE_URL,
  rewardPoints = DEFAULT_REWARD_POINTS,
}) => {
  const [shared, setShared] = useState(false);

  const handleShare = useCallback((platform: SharePlatform) => {
    if (platform === 'twitter') {
      const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(twitterUrl, '_blank', 'width=550,height=420');
    } else if (platform === 'telegram') {
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
      window.open(telegramUrl, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`).catch(() => {
        // Silently fail if clipboard access is denied
      });
    }

    setShared(true);
    
    setTimeout(() => {
      onComplete();
    }, 1500);
  }, [shareText, shareUrl, onComplete]);

  const handleBackdropClick = useCallback(() => {
    if (!shared) {
      onClose();
    }
  }, [shared, onClose]);

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <ShareModalView
      shared={shared}
      shareText={shareText}
      rewardPoints={rewardPoints}
      onShare={handleShare}
      onClose={onClose}
      onBackdropClick={handleBackdropClick}
      onContentClick={handleContentClick}
    />
  );
};
