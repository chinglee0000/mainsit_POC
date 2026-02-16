/**
 * ShareModal View - UI Layer (GREEN ZONE)
 * 
 * Pure UI rendering for share modal.
 * Displays share options and success state.
 */

import React from 'react';
import { Share2, Twitter, MessageCircle, Copy, CheckCircle, X } from 'lucide-react';
import type { SharePlatform } from './index';

// ─── Types ──────────────────────────────────────────────
export interface ShareModalViewProps {
  shared: boolean;
  shareText: string;
  rewardPoints: number;
  onShare: (platform: SharePlatform) => void;
  onClose: () => void;
  onBackdropClick: () => void;
  onContentClick: (e: React.MouseEvent) => void;
}

// ─── Component ──────────────────────────────────────────
export const ShareModalView: React.FC<ShareModalViewProps> = ({
  shared,
  shareText,
  rewardPoints,
  onShare,
  onClose,
  onBackdropClick,
  onContentClick,
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.15s ease-out',
      }}
      onClick={onBackdropClick}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          background: 'rgba(28, 28, 30, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '24px',
          position: 'relative',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          animation: 'slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={onContentClick}
      >
        {/* Close Button */}
        {!shared && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-secondary)',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; }}
          >
            <X size={18} />
          </button>
        )}

        {/* Share Options State */}
        {!shared ? (
          <>
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(59, 130, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Share2 size={24} color="#3b82f6" />
              </div>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 500,
                  fontFamily: 'Montserrat, sans-serif',
                  color: 'white',
                  marginBottom: '4px',
                }}>
                  Share Twin3
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: 'rgba(255, 255, 255, 0.6)',
                }}>
                  Earn +{rewardPoints} points
                </p>
              </div>
            </div>

            {/* Share Text Preview */}
            <p style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.6',
              marginBottom: '24px',
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}>
              {shareText}
            </p>

            {/* Share Buttons */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}>
              {/* Twitter/X Button */}
              <button
                onClick={() => onShare('twitter')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'rgba(29, 161, 242, 0.15)',
                  border: '1px solid rgba(29, 161, 242, 0.3)',
                  color: '#1DA1F2',
                  fontSize: '14px',
                  fontWeight: 500,
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
                <Twitter size={18} />
                Share on X (Twitter)
              </button>

              {/* Telegram Button */}
              <button
                onClick={() => onShare('telegram')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'rgba(0, 136, 204, 0.15)',
                  border: '1px solid rgba(0, 136, 204, 0.3)',
                  color: '#0088CC',
                  fontSize: '14px',
                  fontWeight: 500,
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
                <MessageCircle size={18} />
                Share on Telegram
              </button>

              {/* Copy Link Button */}
              <button
                onClick={() => onShare('copy')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--color-text-secondary)',
                  fontSize: '14px',
                  fontWeight: 500,
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
                <Copy size={18} />
                Copy Link
              </button>
            </div>
          </>
        ) : (
          /* Success State */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(34, 197, 94, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <CheckCircle size={40} color="#22c55e" />
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 500,
              fontFamily: 'Montserrat, sans-serif',
              color: '#22c55e',
              marginBottom: '12px',
            }}>
              Shared Successfully!
            </h3>
            <p style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.7)',
            }}>
              +{rewardPoints} Humanity Index points earned
            </p>
          </div>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
