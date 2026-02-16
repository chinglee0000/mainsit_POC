/**
 * HumanVerification Constants
 * 
 * Widget states and animation durations
 */

export const WIDGET_STATES = {
  INITIAL: 'initial',
  SELECTING: 'selecting_method',
  VERIFYING: 'verifying',
  WIDGET_FAILED: 'widget_failed',
  COMPLETE: 'verification_complete',
  MATRIX_VIEW: 'matrix_view',
  SIMULATE_KOL: 'simulate_kol',
} as const;

export const ANIMATION_DURATION = {
  VERIFICATION: 2500,
  FADE_OUT: 300,
  FADE_IN: 300,
  PULSE: 2000,
} as const;

export type FlowState =
  | 'initial'
  | 'selecting_method'
  | 'verifying'
  | 'widget_failed'
  | 'verification_complete'
  | 'matrix_view'
  | 'simulate_kol';

export interface VerificationMethod {
  id: string;
  name: string;
  icon: string;
  weight: number;
  description?: string;
  estimatedTime?: string;
  humanityIndexBoost?: number;
}

export type MethodCardVariant = 'default' | 'selected' | 'completed';
