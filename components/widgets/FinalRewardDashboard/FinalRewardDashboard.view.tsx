import { Trophy, Coins, Users, Share2, ArrowRight } from 'lucide-react';
import { theme } from '@/lib/theme';

export interface FinalRewardDashboardViewProps {
  displayTokens: number;
  tokenAmount: number;
  scoreBonus: number;
  missionBonus: number;
  onInviteFriends?: () => void;
  onJoinCommunity?: () => void;
}

export const FinalRewardDashboardView = ({
  displayTokens,
  tokenAmount,
  scoreBonus,
  missionBonus,
  onInviteFriends,
  onJoinCommunity,
}: FinalRewardDashboardViewProps) => {
  return (
    <div
      className="card"
      style={{
        width: '100%',
        maxWidth: '480px',
        padding: 0,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '24px 20px',
          borderBottom: `1px solid ${theme.colors.border.subtle}`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(139, 92, 246, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: `0 auto ${theme.spacing.md}`,
          }}
        >
          <Trophy size={32} color={theme.colors.status.info} />
        </div>
        <h3
          style={{
            fontSize: '24px',
            fontWeight: 500,
            fontFamily: theme.typography.fontFamily.display,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.xs,
          }}
        >
          Congratulations!
        </h3>
        <p
          style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: 300,
            color: theme.colors.text.secondary,
            lineHeight: 1.5,
          }}
        >
          You've completed all missions and earned your airdrop share
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: theme.spacing.lg }}>
        {/* Token Amount */}
        <div
          style={{
            padding: '24px',
            borderRadius: theme.borderRadius.md,
            background: 'rgba(139, 92, 246, 0.08)',
            border: '1px solid rgba(139, 92, 246, 0.15)',
            textAlign: 'center',
            marginBottom: theme.spacing.md,
          }}
        >
          <div
            style={{
              fontSize: theme.typography.fontSize.xs,
              fontWeight: 300,
              color: theme.colors.text.secondary,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: theme.spacing.sm,
            }}
          >
            Your Airdrop Share
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: theme.spacing.sm,
              marginBottom: theme.spacing.xs,
            }}
          >
            <Coins size={32} color={theme.colors.status.info} />
            <div
              style={{
                fontSize: '48px',
                fontWeight: 500,
                fontFamily: theme.typography.fontFamily.display,
                color: theme.colors.status.info,
                lineHeight: 1,
              }}
            >
              {displayTokens.toLocaleString()}
            </div>
          </div>
          <div
            style={{
              fontSize: theme.typography.fontSize.sm,
              fontWeight: 300,
              color: theme.colors.text.secondary,
            }}
          >
            $twin3 tokens
          </div>
        </div>

        {/* Breakdown */}
        <div style={{ marginBottom: theme.spacing.md }}>
          <div
            style={{
              fontSize: theme.typography.fontSize.xs,
              fontWeight: 500,
              color: theme.colors.text.dim,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: theme.spacing.sm,
            }}
          >
            Calculation Breakdown
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.xs,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: theme.spacing.md,
                borderRadius: theme.borderRadius.sm,
                background: theme.colors.glass.background,
                border: `1px solid ${theme.colors.glass.border}`,
              }}
            >
              <span
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: 300,
                  color: theme.colors.text.secondary,
                }}
              >
                Matrix Score Bonus
              </span>
              <span
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: 500,
                  color: theme.colors.text.primary,
                  fontFamily: theme.typography.fontFamily.sans,
                }}
              >
                {scoreBonus} $twin3
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: theme.spacing.md,
                borderRadius: theme.borderRadius.sm,
                background: theme.colors.glass.background,
                border: `1px solid ${theme.colors.glass.border}`,
              }}
            >
              <span
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: 300,
                  color: theme.colors.text.secondary,
                }}
              >
                Mission Completion (4/4)
              </span>
              <span
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: 500,
                  color: theme.colors.text.primary,
                  fontFamily: theme.typography.fontFamily.sans,
                }}
              >
                {missionBonus} $twin3
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: theme.spacing.md,
                borderRadius: theme.borderRadius.sm,
                background: 'rgba(139, 92, 246, 0.08)',
                border: '1px solid rgba(139, 92, 246, 0.15)',
              }}
            >
              <span
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: 500,
                  color: theme.colors.text.primary,
                }}
              >
                Total Earned
              </span>
              <span
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: 500,
                  color: theme.colors.status.info,
                  fontFamily: theme.typography.fontFamily.sans,
                }}
              >
                {tokenAmount.toLocaleString()} $twin3
              </span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div>
          <div
            style={{
              fontSize: theme.typography.fontSize.xs,
              fontWeight: 500,
              color: theme.colors.text.dim,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: theme.spacing.sm,
            }}
          >
            What's Next?
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xs }}>
            {onInviteFriends && (
              <button
                onClick={onInviteFriends}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: theme.spacing.xs,
                  padding: theme.spacing.md,
                  borderRadius: theme.borderRadius.md,
                  background: theme.colors.surface.primary,
                  border: '1px solid transparent',
                  color: theme.colors.text.inverse,
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = theme.colors.text.primary;
                  e.currentTarget.style.border = `1px solid ${theme.colors.text.primary}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = theme.colors.surface.primary;
                  e.currentTarget.style.color = theme.colors.text.inverse;
                  e.currentTarget.style.border = '1px solid transparent';
                }}
              >
                <Users size={16} />
                Invite Friends & Earn More
                <ArrowRight size={16} />
              </button>
            )}

            {onJoinCommunity && (
              <button
                onClick={onJoinCommunity}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: theme.spacing.xs,
                  padding: theme.spacing.md,
                  borderRadius: theme.borderRadius.md,
                  background: 'transparent',
                  border: `1px solid ${theme.colors.border.default}`,
                  color: theme.colors.text.secondary,
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = theme.colors.glass.background;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <Share2 size={16} />
                Join Community
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
