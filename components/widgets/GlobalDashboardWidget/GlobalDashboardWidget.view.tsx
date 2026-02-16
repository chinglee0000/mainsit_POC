import { Target, ChevronRight, Lock, Plus } from 'lucide-react';
import { theme } from '@/lib/theme';
import type { TabType, Twin3Task } from './index';

export interface GlobalDashboardWidgetViewProps {
  activeTab: TabType;
  filteredTasks: Twin3Task[];
  totalPending: number;
  activeCount: number;
  hoveredTooltip: { id: string; type: 'title' | 'brand' } | null;
  onTabChange: (tab: TabType) => void;
  onViewTask?: (taskId: string) => void;
  onHoverTooltip: (tooltip: { id: string; type: 'title' | 'brand' } | null) => void;
  getTaskCount: (tab: TabType) => number;
}

const formatTabLabel = (tab: TabType) => {
  switch (tab) {
    case 'active':
      return 'Active';
    case 'review':
      return 'Review';
    case 'history':
      return 'History';
  }
};

export const GlobalDashboardWidgetView = ({
  activeTab,
  filteredTasks,
  totalPending,
  activeCount,
  hoveredTooltip,
  onTabChange,
  onViewTask,
  onHoverTooltip,
  getTaskCount,
}: GlobalDashboardWidgetViewProps) => {
  return (
    <div
      className="card animate-fade-in"
      style={{
        background: theme.colors.glass.background,
        border: `1px solid ${theme.colors.glass.border}`,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '420px',
        margin: '0 auto',
      }}
    >
      {/* Stats Pulse Row */}
      <div
        style={{
          padding: theme.spacing.lg,
          borderBottom: `1px solid ${theme.colors.border.subtle}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.secondary,
              marginBottom: '4px',
            }}
          >
            Active Quests
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: 600,
              color: theme.colors.text.primary,
              lineHeight: 1,
            }}
          >
            {activeCount}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.secondary,
              marginBottom: '4px',
            }}
          >
            Pending Rewards
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: 600,
              color: theme.colors.text.primary,
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.xs,
              justifyContent: 'flex-end',
              lineHeight: 1,
            }}
          >
            <Lock size={24} color={theme.colors.text.dim} strokeWidth={2.5} />
            {totalPending}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          padding: `0 ${theme.spacing.lg}`,
          borderBottom: `1px solid ${theme.colors.border.subtle}`,
          display: 'flex',
          gap: theme.spacing.lg,
        }}
      >
        {(['active', 'review', 'history'] as TabType[]).map((tab) => {
          const count = getTaskCount(tab);
          const isActive = activeTab === tab;

          return (
            <div
              key={tab}
              onClick={() => onTabChange(tab)}
              style={{
                padding: `${theme.spacing.md} 0`,
                borderBottom: isActive
                  ? `2px solid ${theme.colors.brand.primary}`
                  : '2px solid transparent',
                color: isActive ? theme.colors.text.primary : theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s',
              }}
            >
              {formatTabLabel(tab)}
              {count > 0 && tab !== 'history' && (
                <span
                  style={{
                    background: isActive
                      ? theme.colors.text.primary
                      : 'rgba(255, 255, 255, 0.1)',
                    color: isActive ? theme.colors.background.base : theme.colors.text.secondary,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  {count}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Task List */}
      <div
        className="scrollbar-hide"
        style={{
          padding: theme.spacing.lg,
          height: '380px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.sm,
        }}
      >
        {filteredTasks.length === 0 ? (
          <div
            style={{
              padding: '32px',
              textAlign: 'center',
              color: theme.colors.text.secondary,
              fontSize: theme.typography.fontSize.sm,
            }}
          >
            No tasks in this section
          </div>
        ) : (
          filteredTasks.map((task) => {
            const progressPercent = (task.progress.current / task.progress.total) * 100;

            return (
              <div
                key={task.id}
                onClick={() => onViewTask?.(task.id)}
                className="card-hover"
                style={{
                  padding: theme.spacing.md,
                  background: theme.colors.glass.background,
                  border: `1px solid ${theme.colors.border.subtle}`,
                  borderRadius: theme.borderRadius.md,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.md,
                }}
              >
                {/* Icon Box */}
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: theme.borderRadius.sm,
                    overflow: 'hidden',
                    background: theme.colors.surface.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {task.imageUrl ? (
                    <img
                      src={task.imageUrl}
                      alt={task.brand}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        padding: '8px',
                      }}
                    />
                  ) : task.icon ? (
                    <task.icon size={20} color={task.iconColor || 'white'} />
                  ) : (
                    <Target size={20} />
                  )}
                </div>

                {/* Middle Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Task Title with Tooltip */}
                  <div
                    style={{ marginBottom: '6px', position: 'relative' }}
                    onMouseEnter={() => onHoverTooltip({ id: task.id, type: 'title' })}
                    onMouseLeave={() => onHoverTooltip(null)}
                  >
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        fontWeight: 500,
                        color: theme.colors.text.primary,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {task.title}
                    </div>
                    {/* Tooltip */}
                    {hoveredTooltip?.id === task.id && hoveredTooltip?.type === 'title' && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          marginBottom: theme.spacing.xs,
                          padding: '6px 12px',
                          background: 'rgba(17, 24, 39, 0.9)',
                          backdropFilter: 'blur(12px)',
                          color: theme.colors.text.primary,
                          fontSize: theme.typography.fontSize.xs,
                          borderRadius: theme.borderRadius.xs,
                          whiteSpace: 'nowrap',
                          zIndex: 99999,
                          pointerEvents: 'none',
                          border: `1px solid ${theme.colors.border.default}`,
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        {task.title}
                        <div
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: '50%',
                            marginLeft: '-4px',
                            borderWidth: '4px',
                            borderStyle: 'solid',
                            borderColor: 'rgba(17, 24, 39, 0.9) transparent transparent transparent',
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Metadata Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: theme.spacing.xs,
                      fontSize: '11px',
                      color: theme.colors.text.secondary,
                      marginBottom: theme.spacing.xs,
                    }}
                  >
                    {/* Brand with Tooltip */}
                    <div
                      style={{ maxWidth: '80px', position: 'relative' }}
                      onMouseEnter={() => onHoverTooltip({ id: task.id, type: 'brand' })}
                      onMouseLeave={() => onHoverTooltip(null)}
                    >
                      <span
                        style={{
                          display: 'block',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {task.brand}
                      </span>
                      {hoveredTooltip?.id === task.id && hoveredTooltip?.type === 'brand' && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            marginBottom: theme.spacing.xs,
                            padding: '6px 12px',
                            background: 'rgba(17, 24, 39, 0.9)',
                            backdropFilter: 'blur(12px)',
                            color: theme.colors.text.primary,
                            fontSize: theme.typography.fontSize.xs,
                            borderRadius: theme.borderRadius.xs,
                            whiteSpace: 'nowrap',
                            zIndex: 99999,
                            pointerEvents: 'none',
                            border: `1px solid ${theme.colors.border.default}`,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          {task.brand}
                          <div
                            style={{
                              position: 'absolute',
                              top: '100%',
                              left: '50%',
                              marginLeft: '-4px',
                              borderWidth: '4px',
                              borderStyle: 'solid',
                              borderColor:
                                'rgba(17, 24, 39, 0.9) transparent transparent transparent',
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {task.deadline && (
                      <>
                        <span>•</span>
                        <span
                          style={{
                            color:
                              task.deadline.includes('left') && parseInt(task.deadline) <= 2
                                ? theme.colors.status.warning
                                : 'inherit',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {task.deadline.replace('Submitted ', '')}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
                    <div
                      style={{
                        flex: 1,
                        height: '4px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${progressPercent}%`,
                          height: '100%',
                          background:
                            task.type === 'verification'
                              ? theme.colors.status.info
                              : theme.colors.brand.primary,
                          borderRadius: '2px',
                        }}
                      />
                    </div>
                    <div style={{ fontSize: '10px', color: theme.colors.text.dim }}>
                      {task.progress.current}/{task.progress.total} reqs
                    </div>
                  </div>
                </div>

                {/* Right Content: Reward */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '6px',
                  }}
                >
                  <div
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      fontWeight: 600,
                      color:
                        task.status === 'history'
                          ? theme.colors.status.success
                          : theme.colors.text.primary,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '2px',
                    }}
                  >
                    {task.status === 'history' ? (
                      <Plus size={12} strokeWidth={3} />
                    ) : (
                      <Lock size={12} color={theme.colors.text.dim} strokeWidth={2.5} />
                    )}
                    {task.reward}
                  </div>
                  <div style={{ fontSize: '10px', color: theme.colors.text.dim }}>$twin3</div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: theme.spacing.sm,
          borderTop: `1px solid ${theme.colors.border.subtle}`,
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.text.secondary,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          View Ranking <ChevronRight size={12} />
        </span>
      </div>
    </div>
  );
};
