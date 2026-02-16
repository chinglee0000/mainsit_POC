import { Trophy, CheckCircle, Coins, Gift, ArrowRight, Lock } from 'lucide-react';
import { theme } from '@/lib/theme';
import type { Task } from './index';

export interface AirdropTaskDashboardViewProps {
  tasks: Task[];
  completedCount: number;
  totalReward: number;
  allCompleted: boolean;
  potentialTokens: number;
  showPreview: boolean;
  onTaskClick: (taskId: string) => void;
  onTogglePreview: () => void;
}

export const AirdropTaskDashboardView = ({
  tasks,
  completedCount,
  totalReward,
  allCompleted,
  potentialTokens,
  showPreview,
  onTaskClick,
  onTogglePreview,
}: AirdropTaskDashboardViewProps) => {
  const isMobile = window.innerWidth < 768;

  const cardStyle: React.CSSProperties = {
    background: theme.colors.glass.background,
    border: `1px solid ${theme.colors.glass.border}`,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    width: '100%',
    maxWidth: '480px',
    margin: isMobile ? '0 auto' : '0',
  };

  return (
    <div className="card" style={cardStyle}>
      {/* Header */}
      <div
        style={{
          padding: '16px 20px 12px',
          borderBottom: `1px solid ${theme.colors.border.subtle}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.xs,
            marginBottom: '4px',
          }}
        >
          <Trophy size={18} color={theme.colors.status.info} />
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 500,
              fontFamily: theme.typography.fontFamily.display,
              color: theme.colors.text.primary,
              margin: 0,
            }}
          >
            Airdrop Missions
          </h3>
        </div>
        <p
          style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: 300,
            color: theme.colors.text.secondary,
            margin: 0,
          }}
        >
          Complete tasks to maximize your share
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: theme.spacing.lg }}>
        {/* Pool Info */}
        <div
          style={{
            padding: theme.spacing.md,
            borderRadius: theme.borderRadius.md,
            background: 'rgba(139, 92, 246, 0.08)',
            border: '1px solid rgba(139, 92, 246, 0.15)',
            marginBottom: theme.spacing.md,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: theme.spacing.xs,
            }}
          >
            <span
              style={{
                fontSize: theme.typography.fontSize.xs,
                fontWeight: 300,
                color: theme.colors.text.secondary,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Total Airdrop Pool
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Coins size={16} color={theme.colors.status.info} />
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 500,
                  color: theme.colors.status.info,
                  fontFamily: theme.typography.fontFamily.sans,
                }}
              >
                5,000,000
              </span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontSize: theme.typography.fontSize.xs,
                fontWeight: 300,
                color: theme.colors.text.secondary,
              }}
            >
              Your Potential Share
            </span>
            <span
              style={{
                fontSize: theme.typography.fontSize.base,
                fontWeight: 500,
                color: theme.colors.status.info,
                fontFamily: theme.typography.fontFamily.sans,
              }}
            >
              ~{potentialTokens} $twin3
            </span>
          </div>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: theme.spacing.md }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: theme.typography.fontSize.sm,
              marginBottom: theme.spacing.xs,
            }}
          >
            <span style={{ color: theme.colors.text.secondary, fontWeight: 300 }}>
              Mission Progress
            </span>
            <span style={{ fontWeight: 500, color: theme.colors.text.primary }}>
              {completedCount}/{tasks.length} Complete
            </span>
          </div>
          <div
            style={{
              width: '100%',
              height: '8px',
              background: theme.colors.glass.background,
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(completedCount / tasks.length) * 100}%`,
                height: '100%',
                background: `linear-gradient(90deg, ${theme.colors.status.info}, #7c3aed)`,
                borderRadius: '4px',
                transition: 'width 0.5s ease',
              }}
            />
          </div>
        </div>

        {/* Task List */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing.xs,
            marginBottom: theme.spacing.md,
          }}
        >
          {tasks.map((task) => {
            const TaskIcon = task.icon;

            return (
              <div
                key={task.id}
                onClick={() => !task.completed && onTaskClick(task.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm,
                  padding: theme.spacing.md,
                  background: task.completed
                    ? 'rgba(34, 197, 94, 0.08)'
                    : theme.colors.glass.background,
                  border: task.completed
                    ? '1px solid rgba(34, 197, 94, 0.2)'
                    : `1px solid ${theme.colors.glass.border}`,
                  borderRadius: theme.borderRadius.md,
                  cursor: task.completed ? 'default' : 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!task.completed) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!task.completed) {
                    e.currentTarget.style.background = theme.colors.glass.background;
                  }
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: theme.borderRadius.sm,
                    background: task.completed
                      ? 'rgba(34, 197, 94, 0.15)'
                      : theme.colors.glass.background,
                    border: `1px solid ${
                      task.completed ? 'rgba(34, 197, 94, 0.3)' : theme.colors.glass.border
                    }`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {task.completed ? (
                    <CheckCircle size={20} color={theme.colors.status.success} />
                  ) : task.iconUrl ? (
                    <img
                      src={task.iconUrl}
                      alt={task.title}
                      style={{
                        width: task.id === 'follow_x' ? '20px' : '24px',
                        height: task.id === 'follow_x' ? '20px' : '24px',
                        objectFit: 'contain',
                        opacity: 0.9,
                      }}
                    />
                  ) : TaskIcon ? (
                    <TaskIcon size={20} color={theme.colors.text.primary} style={{ opacity: 0.9 }} />
                  ) : null}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      fontWeight: 500,
                      color: theme.colors.text.primary,
                      marginBottom: '2px',
                    }}
                  >
                    {task.title}
                  </div>
                  <div
                    style={{
                      fontSize: theme.typography.fontSize.xs,
                      fontWeight: 300,
                      color: theme.colors.text.dim,
                    }}
                  >
                    {task.description}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: 500,
                    color: task.completed ? theme.colors.status.success : theme.colors.status.info,
                    fontFamily: theme.typography.fontFamily.sans,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {task.completed ? '✓' : `+${task.reward}`}
                </div>
              </div>
            );
          })}
        </div>

        {/* All Complete Message */}
        {allCompleted && (
          <div
            style={{
              padding: theme.spacing.md,
              borderRadius: theme.borderRadius.md,
              background: 'rgba(34, 197, 94, 0.08)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: theme.spacing.xs,
              marginBottom: theme.spacing.md,
            }}
          >
            <Gift size={16} color={theme.colors.status.success} />
            <span
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: 500,
                color: theme.colors.status.success,
              }}
            >
              All missions complete! Calculating rewards...
            </span>
          </div>
        )}

        {/* Preview Button */}
        {!showPreview && (
          <button
            onClick={onTogglePreview}
            style={{
              width: '100%',
              padding: theme.spacing.md,
              borderRadius: theme.borderRadius.md,
              background: theme.colors.glass.background,
              border: `1px solid ${theme.colors.border.default}`,
              color: theme.colors.text.secondary,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: theme.spacing.xs,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = theme.colors.glass.background;
              e.currentTarget.style.borderColor = theme.colors.border.default;
            }}
          >
            <ArrowRight size={16} />
            Preview Upcoming Missions
          </button>
        )}

        {/* Upcoming Preview */}
        {showPreview && (
          <div
            style={{
              marginTop: theme.spacing.xs,
              padding: theme.spacing.md,
              borderRadius: theme.borderRadius.md,
              background: 'rgba(255, 255, 255, 0.02)',
              border: `1px solid ${theme.colors.border.subtle}`,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: theme.spacing.sm,
              }}
            >
              <span
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: 500,
                  color: theme.colors.text.primary,
                }}
              >
                Upcoming Missions
              </span>
              <button
                onClick={onTogglePreview}
                style={{
                  background: 'none',
                  border: 'none',
                  color: theme.colors.text.dim,
                  fontSize: theme.typography.fontSize.xs,
                  cursor: 'pointer',
                  padding: '4px 8px',
                }}
              >
                Hide
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xs }}>
              {['Complete Daily Check-in', 'Explore twin Matrix', 'Participate in Community Events'].map(
                (title, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: theme.spacing.sm,
                      padding: theme.spacing.sm,
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: `1px solid ${theme.colors.border.subtle}`,
                      borderRadius: theme.borderRadius.sm,
                      opacity: 0.6,
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: theme.borderRadius.xs,
                        background: theme.colors.glass.background,
                        border: `1px solid ${theme.colors.glass.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Lock size={18} color={theme.colors.text.dim} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: theme.typography.fontSize.sm,
                          fontWeight: 500,
                          color: theme.colors.text.secondary,
                          marginBottom: '2px',
                        }}
                      >
                        {title}
                      </div>
                      <div
                        style={{
                          fontSize: '11px',
                          color: theme.colors.text.dim,
                        }}
                      >
                        {i === 0 && 'Check in daily for 7 consecutive days'}
                        {i === 1 && 'Unlock 5 cells in your twin Matrix'}
                        {i === 2 && 'Join and participate in twin3 events'}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            <div
              style={{
                marginTop: theme.spacing.sm,
                padding: theme.spacing.sm,
                borderRadius: theme.borderRadius.xs,
                background: 'rgba(139, 92, 246, 0.06)',
                border: '1px solid rgba(139, 92, 246, 0.1)',
                fontSize: '11px',
                color: theme.colors.text.dim,
                textAlign: 'center',
                lineHeight: 1.5,
              }}
            >
              More missions will be available soon. Stay tuned!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
