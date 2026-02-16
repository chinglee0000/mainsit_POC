/**
 * Verification Flow Nodes
 * 
 * Humanity verification journey
 */

import type { InteractionNode } from './types';

export const verificationNodes: InteractionNode[] = [
  {
    id: 'verify_human',
    triggers: ['verify', 'verification', 'prove', 'human'],
    response: {
      text: "**Connect Your Identity**\nFirst, let's bind your account. Choose a wallet connection method to get started.",
      delay: 500,
      widget: 'wallet_binding'
    },
    suggestedActions: [
      { label: 'What is SBT?', payload: 'sbt_info' },
      { label: 'Why Verify Humanity?', payload: 'why_verify' }
    ]
  },

  {
    id: 'binding_success',
    triggers: [],
    response: {
      text: "**Verify Humanity**\nGreat! Your identity is bound. Before your SBT can be minted, we need a quick verification to confirm you're a real human.",
      delay: 500,
      widget: 'recaptcha'
    },
    suggestedActions: [
      { label: 'Why Verify Humanity?', payload: 'why_verify' },
      { label: 'What is SBT?', payload: 'sbt_info' }
    ]
  },

  {
    id: 'verification_required',
    triggers: [],
    response: {
      text: "**Verification Required**\nPlease complete a humanity check to proceed with this task.",
      delay: 600,
      widget: 'human_verification'
    },
    suggestedActions: [
      { label: 'What is SBT?', payload: 'sbt_info' },
      { label: 'Mint Free SBT', payload: 'verify_human' }
    ]
  },

  {
    id: 'verification_success',
    triggers: ['verified', 'success'],
    response: {
      text: "**Verification Complete** — You are now a Verified Human.\n\nYour Twin Matrix is being initialized...",
      delay: 500,
      widget: 'twin_matrix'
    },
    suggestedActions: [
      { label: 'View My Matrix', payload: 'twin_matrix' },
      { label: 'What is SBT?', payload: 'sbt_info' }
    ]
  }
];
