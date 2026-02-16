/**
 * Widget Types
 * 
 * Type definitions for dynamic widget rendering
 */

/**
 * Widget Type Constants
 * 
 * Controls dynamic UI rendering in the chat interface
 */
export const WidgetType = {
  NONE: 'none',
  TASK_CARD: 'task_card',
  TASK_DETAIL: 'task_detail',
  WALLET_CONNECT: 'wallet_connect',
  WALLET_BINDING: 'wallet_binding',
  TWIN_MATRIX: 'twin_matrix',
  VERIFICATION: 'verification',
  FEATURE_GRID: 'feature_grid',
  INSTAGRAM_CONNECT: 'instagram_connect',
  ACTIVE_TASK: 'active_task',
  GLOBAL_DASHBOARD: 'global_dashboard',
  HUMAN_VERIFICATION: 'human_verification',
  AIRDROP_CLAIM: 'airdrop_claim',
  REWARD_DASHBOARD: 'reward_dashboard',
  INVITE_FRIENDS: 'invite_friends',
  COMMUNITY_PREVIEW: 'community_preview',
  RECAPTCHA: 'recaptcha',
  AIRDROP_TASK_DASHBOARD: 'airdrop_task_dashboard',
  FINAL_REWARD_DASHBOARD: 'final_reward_dashboard',
} as const;

export type WidgetType = typeof WidgetType[keyof typeof WidgetType];

/**
 * A2UI Component Interface
 * 
 * Generic component structure for A2UI protocol
 */
export interface A2UIComponent {
  id: string;
  component: Record<string, any>;
}
