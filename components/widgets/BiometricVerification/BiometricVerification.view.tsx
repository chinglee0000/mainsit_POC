import { Fingerprint, Smartphone, CheckCircle, X } from 'lucide-react';
import { theme } from '@/lib/theme';
import type { VerificationStatus } from './index';

export interface BiometricVerificationViewProps {
  status: VerificationStatus;
  onClose: () => void;
}

export const BiometricVerificationView = ({
  status,
  onClose,
}: BiometricVerificationViewProps) => {
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
        padding: theme.spacing.md,
        animation: 'fadeIn 0.15s ease-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          background: 'rgba(28, 28, 30, 0.95)',
          border: `1px solid ${theme.colors.border.default}`,
          borderRadius: theme.borderRadius.lg,
          padding: '32px 24px',
          position: 'relative',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          animation: 'slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          textAlign: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {status !== 'success' && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: theme.spacing.sm,
              right: theme.spacing.sm,
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: theme.colors.glass.background,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.colors.text.secondary,
            }}
          >
            <X size={18} />
          </button>
        )}

        {status === 'verifying' && (
          <>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(59, 130, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: `0 auto ${theme.spacing.lg}`,
                animation: 'pulse 2s ease-in-out infinite',
              }}
            >
              <Fingerprint size={40} color={theme.colors.status.info} />
            </div>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 500,
                fontFamily: theme.typography.fontFamily.display,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.sm,
              }}
            >
              Verifying Biometrics
            </h3>
            <p
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
                lineHeight: '1.6',
              }}
            >
              Please use your device's biometric authentication (Face ID, Touch ID, or
              Fingerprint)
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: theme.spacing.xs,
                marginTop: theme.spacing.lg,
              }}
            >
              <Smartphone size={16} color={theme.colors.text.dim} />
              <span
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.dim,
                }}
              >
                Simulating iOS/Android verification...
              </span>
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(34, 197, 94, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: `0 auto ${theme.spacing.lg}`,
              }}
            >
              <CheckCircle size={40} color={theme.colors.status.success} />
            </div>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 500,
                fontFamily: theme.typography.fontFamily.display,
                color: theme.colors.status.success,
                marginBottom: theme.spacing.sm,
              }}
            >
              Verification Complete!
            </h3>
            <p
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
              }}
            >
              +50 Humanity Index points earned
            </p>
          </>
        )}
      </div>
    </div>
  );
};
