import { Upload, CheckCircle, Clock, Check, Lock } from 'lucide-react';
import { theme } from '@/lib/theme';
import type { TaskStatus } from './index';

export interface ActiveTaskWidgetViewProps {
  taskTitle: string;
  brandName: string;
  rewardAmount: string;
  deadline?: string;
  requirements: string[];
  submissionUrl: string;
  status: TaskStatus;
  checkedReqs: number[];
  onSubmissionUrlChange: (url: string) => void;
  onToggleReq: (index: number) => void;
  onVerify: () => void;
}

export const ActiveTaskWidgetView = ({
  taskTitle,
  brandName,
  rewardAmount,
  deadline,
  requirements,
  submissionUrl,
  status,
  checkedReqs,
  onSubmissionUrlChange,
  onToggleReq,
  onVerify,
}: ActiveTaskWidgetViewProps) => {
  if (status === 'verified') {
    return (
      <div
        className="card animate-fade-in"
        style={{
          padding: '32px',
          background: theme.colors.glass.background,
          border: `1px solid ${theme.colors.glass.border}`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(48, 209, 88, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: `0 auto ${theme.spacing.lg}`,
            boxShadow: '0 0 20px rgba(48, 209, 88, 0.2)',
          }}
        >
          <CheckCircle size={32} color={theme.colors.status.success} />
        </div>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 600,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.xs,
          }}
        >
          Submission Verified!
        </h3>
        <p
          style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.secondary,
            marginBottom: theme.spacing.lg,
          }}
        >
          Reward will be released within 24 hours.
        </p>
        <div
          style={{
            padding: theme.spacing.md,
            background: theme.colors.glass.background,
            borderRadius: theme.borderRadius.md,
            border: `1px solid ${theme.colors.border.default}`,
          }}
        >
          <div
            style={{
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.text.secondary,
              marginBottom: '4px',
            }}
          >
            Pending Reward
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: theme.colors.text.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: theme.spacing.xs,
            }}
          >
            <Lock size={18} color={theme.colors.text.dim} />
            {rewardAmount} $twin3
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="card animate-fade-in"
      style={{
        background: theme.colors.glass.background,
        border: `1px solid ${theme.colors.glass.border}`,
        overflow: 'hidden',
      }}
    >
      {/* Header Status */}
      <div
        style={{
          padding: theme.spacing.md,
          borderBottom: `1px solid ${theme.colors.border.subtle}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
          <div
            style={{
              padding: '4px 8px',
              background: 'rgba(59, 130, 246, 0.15)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 600,
              color: '#60A5FA',
            }}
          >
            ACTIVE
          </div>
          {deadline && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.text.secondary,
              }}
            >
              <Clock size={12} />
              {deadline} left
            </div>
          )}
        </div>
        <div
          style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: 600,
            color: theme.colors.brand.primary,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Lock size={14} color={theme.colors.text.dim} />
          {rewardAmount} $twin3 pending
        </div>
      </div>

      <div style={{ padding: theme.spacing.lg }}>
        {/* Task Info */}
        <div style={{ marginBottom: theme.spacing.lg }}>
          <div
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.secondary,
              marginBottom: '4px',
            }}
          >
            {brandName}
          </div>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.sm,
            }}
          >
            {taskTitle}
          </h2>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '20px',
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.dim,
            }}
          >
            <Lock size={12} color={theme.colors.text.dim} />
            {rewardAmount} $twin3 pending
          </div>
        </div>

        {/* Requirements Checklist */}
        <div style={{ marginBottom: theme.spacing.lg }}>
          <div
            style={{
              fontSize: theme.typography.fontSize.xs,
              fontWeight: 500,
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing.sm,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Requirements
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
            {requirements.map((req, i) => (
              <div
                key={i}
                onClick={() => onToggleReq(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm,
                  cursor: 'pointer',
                  opacity: checkedReqs.includes(i) ? 0.5 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: checkedReqs.includes(i) ? 'none' : '2px solid rgba(255, 255, 255, 0.2)',
                    background: checkedReqs.includes(i) ? theme.colors.brand.primary : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {checkedReqs.includes(i) && <Check size={12} color="#000000" strokeWidth={3} />}
                </div>
                <span
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.primary,
                    textDecoration: checkedReqs.includes(i) ? 'line-through' : 'none',
                  }}
                >
                  {req}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Submission Area */}
        <div
          style={{
            padding: theme.spacing.md,
            background: theme.colors.glass.background,
            borderRadius: theme.borderRadius.md,
            border: `1px solid ${theme.colors.border.subtle}`,
          }}
        >
          <div
            style={{
              fontSize: theme.typography.fontSize.sm,
              fontWeight: 500,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.sm,
            }}
          >
            Submit Proof
          </div>
          <div style={{ display: 'flex', gap: theme.spacing.xs, marginBottom: theme.spacing.sm }}>
            <input
              type="text"
              placeholder="Paste Instagram post URL..."
              value={submissionUrl}
              onChange={(e) => onSubmissionUrlChange(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(0, 0, 0, 0.2)',
                border: `1px solid ${theme.colors.border.default}`,
                borderRadius: theme.borderRadius.xs,
                padding: theme.spacing.sm,
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSize.sm,
                outline: 'none',
              }}
            />
          </div>
          <button
            onClick={onVerify}
            disabled={!submissionUrl || status === 'submitting'}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: theme.spacing.sm,
              fontSize: theme.typography.fontSize.sm,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: theme.spacing.xs,
              opacity: !submissionUrl || status === 'submitting' ? 0.6 : 1,
            }}
          >
            {status === 'submitting' ? (
              'Verifying...'
            ) : (
              <>
                <Upload size={16} />
                Verify Submission
              </>
            )}
          </button>
          <div
            style={{
              fontSize: '11px',
              color: theme.colors.text.dim,
              marginTop: theme.spacing.xs,
              textAlign: 'center',
            }}
          >
            AI will verify content requirements automatically
          </div>
        </div>
      </div>
    </div>
  );
};
