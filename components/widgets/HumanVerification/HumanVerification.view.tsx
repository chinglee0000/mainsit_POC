import { Shield, AlertTriangle, RefreshCw, ArrowLeft, CheckCircle, Lock } from 'lucide-react';
import { theme } from '@/lib/theme';
import type { FlowState, VerificationMethod } from './index';

export interface HumanVerificationViewProps {
  flowState: FlowState;
  score: number;
  displayScore: number;
  completedMethods: string[];
  selectedMethod: VerificationMethod | null;
  methods: VerificationMethod[];
  onMethodSelect: (methodId: string) => void;
  onVerificationComplete: () => void;
  onRetry: () => void;
  onPickAnother: () => void;
  onViewMatrix: () => void;
  onClose?: () => void;
}

export const HumanVerificationView = ({
  flowState,
  displayScore,
  completedMethods,
  selectedMethod,
  methods,
  onMethodSelect,
  onVerificationComplete,
  onRetry,
  onPickAnother,
  onViewMatrix,
  onClose,
}: HumanVerificationViewProps) => {
  const isMobile = window.innerWidth < 768;

  const cardStyle: React.CSSProperties = {
    background: theme.colors.glass.background,
    border: `1px solid ${theme.colors.glass.border}`,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    width: '100%',
    maxWidth: '380px',
    margin: isMobile ? '0 auto' : '0',
  };

  const renderHeader = () => (
    <div
      style={{
        padding: theme.spacing.md,
        borderBottom: `1px solid ${theme.colors.border.subtle}`,
        background: 'linear-gradient(135deg, rgba(40, 40, 45, 0.5), rgba(30, 30, 35, 0.5))',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '96px',
          height: '96px',
          background: 'rgba(255, 255, 255, 0.05)',
          filter: 'blur(40px)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Title row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: theme.spacing.sm,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
          <Shield size={20} color={theme.colors.text.primary} />
          <div
            style={{
              fontSize: theme.typography.fontSize.base,
              fontWeight: 700,
              color: theme.colors.text.primary,
              lineHeight: 1.2,
            }}
          >
            Verify Humanity
          </div>
        </div>
        {/* Score badge */}
        <div
          style={{
            padding: '4px 10px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 700,
            fontFamily: theme.typography.fontFamily.sans,
            color: theme.colors.text.primary,
          }}
        >
          SCORE: {Math.round(displayScore)}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ position: 'relative', zIndex: 1, padding: '0 4px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.text.secondary,
            marginBottom: '6px',
          }}
        >
          <span>Humanity Index</span>
          <span style={{ fontWeight: 600 }}>
            {Math.round(displayScore)}/255
          </span>
        </div>
        <div
          style={{
            width: '100%',
            height: '6px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '3px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${(displayScore / 255) * 100}%`,
              height: '100%',
              background: theme.colors.text.primary,
              borderRadius: '3px',
              transition: 'width 0.5s ease',
            }}
          />
        </div>
      </div>
    </div>
  );

  // Selecting state
  if (flowState === 'selecting') {
    return (
      <div className="card animate-fade-in" style={cardStyle}>
        {renderHeader()}
        <div style={{ padding: '8px 0' }}>
          {methods.map((method) => {
            const isCompleted = completedMethods.includes(method.id);
            const isAvailable = method.available && !isCompleted;

            return (
              <div
                key={method.id}
                onClick={() => isAvailable && onMethodSelect(method.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm,
                  padding: theme.spacing.md,
                  borderBottom: `1px solid ${theme.colors.border.subtle}`,
                  cursor: isAvailable ? 'pointer' : 'default',
                  opacity: isCompleted ? 0.5 : 1,
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (isAvailable) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: theme.borderRadius.sm,
                    background: isCompleted
                      ? 'rgba(34, 197, 94, 0.15)'
                      : theme.colors.glass.background,
                    border: `1px solid ${
                      isCompleted ? 'rgba(34, 197, 94, 0.3)' : theme.colors.glass.border
                    }`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0,
                  }}
                >
                  {isCompleted ? (
                    <CheckCircle size={20} color={theme.colors.status.success} />
                  ) : (
                    method.icon
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      fontWeight: 600,
                      color: theme.colors.text.primary,
                      marginBottom: '2px',
                    }}
                  >
                    {method.name}
                  </div>
                  <div
                    style={{
                      fontSize: theme.typography.fontSize.xs,
                      color: theme.colors.text.dim,
                    }}
                  >
                    {method.description}
                  </div>
                </div>

                {isCompleted && (
                  <div
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      fontWeight: 600,
                      color: theme.colors.status.success,
                    }}
                  >
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: theme.spacing.sm,
            borderTop: `1px solid ${theme.colors.border.subtle}`,
            display: 'flex',
            gap: theme.spacing.sm,
          }}
        >
          {completedMethods.length > 0 && (
            <button
              onClick={onViewMatrix}
              style={{
                flex: 1,
                padding: theme.spacing.sm,
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
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              View My Matrix
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              style={{
                flex: completedMethods.length > 0 ? 'none' : 1,
                padding: theme.spacing.sm,
                borderRadius: theme.borderRadius.sm,
                background: 'transparent',
                border: `1px solid ${theme.colors.border.default}`,
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.sm,
                cursor: 'pointer',
              }}
            >
              {completedMethods.length > 0 ? 'Later' : 'Skip for now'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Verifying state
  if (flowState === 'verifying') {
    return (
      <div className="card animate-fade-in" style={cardStyle}>
        {renderHeader()}
        <div style={{ padding: '32px 24px', textAlign: 'center' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(59, 130, 246, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: `0 auto ${theme.spacing.lg}`,
              animation: 'pulse 2s ease-in-out infinite',
            }}
          >
            <Lock size={32} color={theme.colors.status.info} />
          </div>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 500,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.xs,
            }}
          >
            Verifying...
          </h3>
          <p
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.secondary,
              lineHeight: 1.6,
            }}
          >
            Completing {selectedMethod?.name || 'verification'}
          </p>
          <button
            onClick={onVerificationComplete}
            style={{
              marginTop: theme.spacing.lg,
              padding: theme.spacing.sm,
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.text.dim,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            (Click to simulate completion)
          </button>
        </div>
      </div>
    );
  }

  // Failed state
  if (flowState === 'failed') {
    return (
      <div className="card animate-fade-in" style={cardStyle}>
        <div
          style={{
            padding: theme.spacing.md,
            borderBottom: `1px solid ${theme.colors.border.subtle}`,
            background: 'linear-gradient(135deg, rgba(80, 30, 20, 0.5), rgba(60, 20, 15, 0.5))',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
            <AlertTriangle size={20} color={theme.colors.status.warning} />
            <span
              style={{
                fontSize: theme.typography.fontSize.base,
                fontWeight: 700,
                color: theme.colors.status.warning,
              }}
            >
              Verification Failed
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
            {selectedMethod?.name || 'Verification'} could not be completed. This can happen due
            to network issues or service unavailability.
          </p>
        </div>

        <div
          style={{
            padding: theme.spacing.md,
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing.sm,
          }}
        >
          <button
            onClick={onRetry}
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
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <RefreshCw size={16} />
            Try Again
          </button>

          <button
            onClick={onPickAnother}
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
            }}
          >
            <ArrowLeft size={16} />
            Pick Another Method
          </button>
        </div>
      </div>
    );
  }

  return null;
};
