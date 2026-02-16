/**
 * InviteFriends View - UI Layer (GREEN ZONE)
 * 
 * Pure UI rendering for invite friends card.
 * Displays invite stats, link, and share buttons.
 */

import React from 'react';
import { UserPlus, Copy, Check, Share2, Twitter, MessageCircle } from 'lucide-react';
import type { SharePlatform } from './index';

// ─── Types ──────────────────────────────────────────────
export interface InviteFriendsViewProps {
  inviteUrl: string;
  invitedCount: number;
  rewardPerInvite: number;
  copied: boolean;
  onCopy: () => void;
  onShare: (platform: SharePlatform) => void;
}

// ─── Shared Styles ──────────────────────────────────────
const cardStyle: React.CSSProperties = {
  background: 'var(--glass-bg)',
  border: '1px solid var(--glass-border)',
  borderRadius: '16px',
  overflow: 'hidden',
  width: '100%',
  maxWidth: '400px',
  margin: window.innerWidth < 768 ? '0 auto' : '0',
};

// ─── Component ──────────────────────────────────────────
export const InviteFriendsView: React.FC<InviteFriendsViewProps> = ({
  inviteUrl,
  invitedCount,
  rewardPerInvite,
  copied,
  onCopy,
  onShare,
}) => {
  return (
    <div className="card" style={cardStyle}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        background: 'linear-gradient(135deg, rgba(40, 40, 45, 0.5), rgba(30, 30, 35, 0.5))',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserPlus size={20} color="#ffffff" />
          <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            Invite Friends
          </span>
        </div>
        <p style={{
          fontSize: '13px',
          color: 'var(--color-text-secondary)',
          marginTop: '8px',
          lineHeight: 1.5,
        }}>
          Share your invite link and earn bonus $twin3 for each friend who joins.
        </p>
      </div>

      {/* Invite Stats */}
      <div style={{
        padding: '20px',
        display: 'flex',
        gap: '12px',
      }}>
        {/* Invited Count */}
        <div style={{
          flex: 1,
          padding: '14px',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 800,
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-sans)',
          }}>
            {invitedCount}
          </div>
          <div style={{
            fontSize: '11px',
            color: 'var(--color-text-dim)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Invited
          </div>
        </div>

        {/* Reward Per Invite */}
        <div style={{
          flex: 1,
          padding: '14px',
          borderRadius: '12px',
          background: 'rgba(245, 158, 11, 0.08)',
          border: '1px solid rgba(245, 158, 11, 0.15)',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 800,
            color: 'var(--color-info)',
            fontFamily: 'var(--font-sans)',
          }}>
            +{rewardPerInvite}
          </div>
          <div style={{
            fontSize: '11px',
            color: 'var(--color-text-dim)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Per Invite
          </div>
        </div>
      </div>

      {/* Invite Link */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 14px',
          borderRadius: '10px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
          <div style={{
            flex: 1,
            fontSize: '12px',
            fontFamily: 'var(--font-sans)',
            color: 'var(--color-text-secondary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {inviteUrl}
          </div>
          <button
            onClick={onCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              borderRadius: '8px',
              background: copied ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.1)',
              border: '1px solid ' + (copied ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255, 255, 255, 0.15)'),
              color: copied ? '#22c55e' : 'var(--color-text-primary)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.2s ease',
            }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Share Buttons */}
      <div style={{
        padding: '12px 20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        gap: '10px',
      }}>
        {/* Twitter Button */}
        <button
          onClick={() => onShare('twitter')}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '10px',
            borderRadius: '10px',
            background: 'rgba(29, 161, 242, 0.15)',
            border: '1px solid rgba(29, 161, 242, 0.2)',
            color: '#1DA1F2',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(29, 161, 242, 0.25)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(29, 161, 242, 0.15)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Twitter size={14} />
          Twitter
        </button>

        {/* Telegram Button */}
        <button
          onClick={() => onShare('telegram')}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '10px',
            borderRadius: '10px',
            background: 'rgba(0, 136, 204, 0.15)',
            border: '1px solid rgba(0, 136, 204, 0.2)',
            color: '#0088CC',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(0, 136, 204, 0.25)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(0, 136, 204, 0.15)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <MessageCircle size={14} />
          Telegram
        </button>

        {/* Other Button */}
        <button
          onClick={() => onShare('other')}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '10px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'var(--color-text-secondary)',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Share2 size={14} />
          Other
        </button>
      </div>
    </div>
  );
};
