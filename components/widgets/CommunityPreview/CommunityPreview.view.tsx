import { Users, Lock, ExternalLink } from 'lucide-react';
import { theme } from '@/lib/theme';
import type { FutureTask } from './index';

export interface CommunityPreviewViewProps {
  futureTasks: FutureTask[];
  onJoinCommunity?: () => void;
  onClose?: () => void;
}

export const CommunityPreviewView = ({
  futureTasks,
  onJoinCommunity,
  onClose,
}: CommunityPreviewViewProps) => {
  const isMobile = window.innerWidth < 768;

  const cardStyle: React.CSSProperties = {
    background: theme.colors.glass.background,
    border: `1px solid ${theme.colors.glass.border}`,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    width: '100%',
    maxWidth: '400px',
    margin: isMobile ? '0 auto' : '0',
  };

  return (
    <div className="card" style={cardStyle}>
      {/* Header */}
      <div
        style={{
          padding: theme.spacing.md,
          borderBottom: `1px solid ${theme.colors.border.subtle}`,
          background: 'linear-gradient(135deg, rgba(40, 40, 45, 0.5), rgba(30, 30, 35, 0.5))',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
          <Users size={20} color={theme.colors.text.primary} />
          <span
            style={{
              fontSize: theme.typography.fontSize.base,
              fontWeight: 700,
              color: theme.colors.text.primary,
            }}
          >
            Community & Future Tasks
          </span>
        </div>
        <p
          style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.secondary,
            marginTop: theme.spacing.xs,
            lineHeight: 1.5,
          }}
        >
          Join the twin3 community and unlock upcoming missions.
        </p>
      </div>

      {/* Future Tasks */}
      <div style={{ padding: '8px 0' }}>
        {futureTasks.map((task) => {
          const TaskIcon = task.icon;
          return (
            <div
              key={task.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 20px',
                borderBottom: `1px solid ${theme.colors.border.subtle}`,
                opacity: 0.6,
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: theme.borderRadius.md,
                  background: theme.colors.glass.background,
                  border: `1px solid ${theme.colors.glass.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative',
                }}
              >
                <TaskIcon size={18} color={theme.colors.text.dim} />
                {task.locked && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-3px',
                      right: '-3px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: 'rgba(107, 114, 128, 0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Lock size={8} color="white" />
                  </div>
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: 600,
                    color: theme.colors.text.secondary,
                    marginBottom: '2px',
                  }}
                >
                  {task.title}
                </div>
                <div
                  style={{
                    fontSize: theme.typography.fontSize.xs,
                    color: theme.colors.text.dim,
                    lineHeight: 1.3,
                  }}
                >
                  {task.description}
                </div>
              </div>

              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: theme.colors.text.dim,
                  fontFamily: theme.typography.fontFamily.sans,
                  whiteSpace: 'nowrap',
                }}
              >
                {task.reward}
              </div>
            </div>
          );
        })}
      </div>

      {/* Community CTA */}
      <div
        style={{
          padding: theme.spacing.md,
          borderTop: `1px solid ${theme.colors.border.subtle}`,
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.sm,
        }}
      >
        <button
          onClick={onJoinCommunity}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: theme.spacing.xs,
            width: '100%',
            padding: theme.spacing.md,
            borderRadius: theme.borderRadius.md,
            background: theme.colors.surface.primary,
            border: '1px solid transparent',
            color: theme.colors.text.inverse,
            fontSize: theme.typography.fontSize.sm,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <ExternalLink size={16} />
          Join Community
        </button>

        {onClose && (
          <button
            onClick={onClose}
            style={{
              width: '100%',
              padding: theme.spacing.sm,
              borderRadius: theme.borderRadius.sm,
              background: 'transparent',
              border: `1px solid ${theme.colors.border.default}`,
              color: theme.colors.text.secondary,
              fontSize: theme.typography.fontSize.sm,
              cursor: 'pointer',
            }}
          >
            Back to Chat
          </button>
        )}
      </div>
    </div>
  );
};
