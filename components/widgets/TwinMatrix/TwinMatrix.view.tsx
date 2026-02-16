import { ArrowRight, Info, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { theme } from '@/lib/theme';
import type { MatrixTrait, TwinMatrixData } from './types';

export interface TwinMatrixViewProps {
  data: TwinMatrixData;
  selectedTrait: MatrixTrait | null;
  showInfoModal: boolean;
  isTouchDevice: boolean;
  onCellClick: (trait: MatrixTrait) => void;
  onCloseTraitModal: () => void;
  onToggleInfoModal: () => void;
  onExplore?: () => void;
}

const DIMENSION_COLORS = {
  physical: '#D02800',
  digital: '#3F88C5',
  social: '#FFBA08',
  spiritual: '#1A9E8F',
};

const getTraitColor = (dimension: string, strength: number) => {
  const baseColor = DIMENSION_COLORS[dimension as keyof typeof DIMENSION_COLORS];
  
  if (strength <= 85) {
    // Light version
    return dimension === 'physical' ? '#FF6B6B' :
           dimension === 'digital' ? '#74C0FC' :
           dimension === 'social' ? '#FFE066' : '#63E6BE';
  } else if (strength <= 170) {
    // Medium version
    return dimension === 'physical' ? '#E63946' :
           dimension === 'digital' ? '#4DABF7' :
           dimension === 'social' ? '#FFD43B' : '#38D9A9';
  }
  
  return baseColor;
};

export const TwinMatrixView = ({
  data,
  selectedTrait,
  showInfoModal,
  isTouchDevice,
  onCellClick,
  onCloseTraitModal,
  onToggleInfoModal,
  onExplore,
}: TwinMatrixViewProps) => {
  return (
    <div
      className="card"
      style={{
        width: '100%',
        maxWidth: '480px',
        minHeight: '600px',
        padding: 0,
        overflow: 'visible',
      }}
    >
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
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 500,
              color: theme.colors.text.primary,
              margin: 0,
              fontFamily: theme.typography.fontFamily.display,
            }}
          >
            Twin Matrix Growth
          </h3>
          <button
            type="button"
            onClick={onToggleInfoModal}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Matrix information"
          >
            <Info size={14} color={theme.colors.text.secondary} />
          </button>
        </div>
        <p
          style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.secondary,
            margin: 0,
            fontWeight: 300,
          }}
        >
          {data.discoveredTraits} / {data.totalTraits} Traits Discovered
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: theme.spacing.lg }}>
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
              Twin Matrix Completion
            </span>
            <span style={{ fontWeight: 500, color: theme.colors.text.primary }}>
              {data.journeyProgress}%
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
                width: `${data.journeyProgress}%`,
                height: '100%',
                background: theme.colors.text.primary,
                borderRadius: '4px',
                transition: 'width 0.5s ease',
              }}
            />
          </div>
        </div>

        {/* Matrix Grid - 16x16 */}
        <div
          style={{
            width: '100%',
            aspectRatio: '1',
            display: 'grid',
            gridTemplateColumns: 'repeat(16, 1fr)',
            gridTemplateRows: 'repeat(16, 1fr)',
            gap: '2px',
            background: theme.colors.glass.background,
            padding: '2px',
            borderRadius: theme.borderRadius.sm,
            marginBottom: theme.spacing.md,
          }}
        >
          {data.traits.map((trait) => (
            <div
              key={trait.id}
              onClick={() => trait.discovered && onCellClick(trait)}
              style={{
                background: trait.discovered
                  ? getTraitColor(trait.dimension, trait.strength || 0)
                  : 'rgba(255, 255, 255, 0.05)',
                borderRadius: '2px',
                cursor: trait.discovered ? 'pointer' : 'default',
                transition: 'all 0.2s',
                opacity: trait.discovered ? 1 : 0.3,
              }}
              onMouseEnter={(e) => {
                if (trait.discovered) {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.zIndex = '10';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.zIndex = '1';
              }}
            />
          ))}
        </div>

        {/* Dimension Progress */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: theme.spacing.sm,
            marginBottom: theme.spacing.md,
          }}
        >
          {(['physical', 'digital', 'social', 'spiritual'] as const).map((key) => {
            const dim = data.dimensions[key];
            const color = DIMENSION_COLORS[key];
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            const percentage = dim.percentage;
            const score255 = Math.round((percentage / 100) * 255);

            return (
              <div key={key}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: theme.typography.fontSize.xs,
                    marginBottom: '6px',
                  }}
                >
                  <span style={{ fontWeight: 500, color: theme.colors.text.primary }}>
                    {label}
                  </span>
                  <span style={{ color: theme.colors.text.secondary, fontWeight: 300 }}>
                    {score255}/255
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        width: '100%',
                        height: '6px',
                        background: theme.colors.glass.background,
                        borderRadius: '3px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${percentage}%`,
                          height: '100%',
                          background: percentage < 5 ? '#374151' : color,
                          borderRadius: '3px',
                          transition: 'width 0.5s ease',
                        }}
                      />
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: theme.typography.fontSize.xs,
                      fontWeight: 500,
                      color: theme.colors.text.primary,
                      minWidth: '32px',
                      textAlign: 'right',
                    }}
                  >
                    {percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore Button */}
        <button
          onClick={onExplore}
          style={{
            width: '100%',
            padding: theme.spacing.md,
            borderRadius: theme.borderRadius.md,
            background: theme.colors.surface.primary,
            border: '1px solid transparent',
            color: theme.colors.text.inverse,
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
          Boost Your Score
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Trait Detail Modal */}
      {selectedTrait &&
        createPortal(
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
            onClick={onCloseTraitModal}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '320px',
                background: 'rgba(28, 28, 30, 0.95)',
                border: `1px solid ${theme.colors.border.default}`,
                borderRadius: theme.borderRadius.lg,
                padding: theme.spacing.lg,
                position: 'relative',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onCloseTraitModal}
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

              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.sm,
                }}
              >
                {selectedTrait.name || `Trait ${selectedTrait.id}`}
              </h3>
              <p
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  lineHeight: '1.6',
                  color: theme.colors.text.secondary,
                  margin: 0,
                }}
              >
                {selectedTrait.description || 'No description available'}
              </p>
              <div
                style={{
                  marginTop: theme.spacing.md,
                  padding: theme.spacing.sm,
                  background: theme.colors.glass.background,
                  borderRadius: theme.borderRadius.sm,
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.dim,
                }}
              >
                Strength: {selectedTrait.strength || 0}/255
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Info Modal */}
      {showInfoModal &&
        createPortal(
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
            onClick={onToggleInfoModal}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '320px',
                background: 'rgba(28, 28, 30, 0.95)',
                border: `1px solid ${theme.colors.border.default}`,
                borderRadius: theme.borderRadius.lg,
                padding: theme.spacing.lg,
                position: 'relative',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onToggleInfoModal}
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

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.xs,
                  marginBottom: theme.spacing.md,
                }}
              >
                <Info size={20} color={theme.colors.text.primary} />
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: theme.colors.text.primary,
                    margin: 0,
                  }}
                >
                  About Twin Matrix
                </h3>
              </div>

              <p
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  lineHeight: '1.6',
                  color: theme.colors.text.secondary,
                  margin: 0,
                }}
              >
                Your Twin Matrix represents your unique human experience profile across 256
                dimensions, organized into 4 key areas: <strong>Physical</strong>,{' '}
                <strong>Social</strong>, <strong>Digital</strong>, and <strong>Spiritual</strong>{' '}
                traits.
              </p>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
