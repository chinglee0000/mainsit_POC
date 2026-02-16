import { X } from 'lucide-react';
import { theme } from '@/lib/theme';

export interface CommunityStatsToastViewProps {
  memberCount: number;
  formattedCount: string;
  isVisible: boolean;
  isClosing: boolean;
  onClose: () => void;
}

export const CommunityStatsToastView = ({
  formattedCount,
  isVisible,
  isClosing,
  onClose,
}: CommunityStatsToastViewProps) => {
  const isMobile = window.innerWidth < 768;

  return (
    <div
      style={{
        width: '100%',
        opacity: isVisible && !isClosing ? 1 : 0,
        maxHeight: isVisible && !isClosing ? '50px' : '0',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 100,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: '100%',
          padding: isMobile ? theme.spacing.sm : theme.spacing.md,
          background: theme.colors.surface.primary,
          borderBottom: `1px solid ${theme.colors.border.subtle}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: isMobile ? theme.spacing.xs : theme.spacing.sm,
          position: 'relative',
        }}
      >
        {/* Content */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? '6px' : theme.spacing.xs,
            flex: 1,
            minWidth: 0,
          }}
        >
          <span
            style={{
              fontWeight: 700,
              fontSize: isMobile ? '20px' : '22px',
              fontFamily: theme.typography.fontFamily.sans,
              color: theme.colors.text.primary,
              whiteSpace: 'nowrap',
            }}
          >
            {formattedCount}
          </span>
          <span
            style={{
              fontSize: isMobile ? '14px' : '15px',
              fontWeight: 500,
              color: theme.colors.text.secondary,
              whiteSpace: 'nowrap',
            }}
          >
            verified members
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: theme.colors.text.dim,
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = theme.colors.text.secondary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = theme.colors.text.dim;
          }}
        >
          <X size={18} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};
