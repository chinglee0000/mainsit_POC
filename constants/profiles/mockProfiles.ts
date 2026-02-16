/**
 * POC Flow Mock Data for HumanVerification Widget
 * 
 * Creates matrix data matching POC_FLOW.md requirements:
 * - Initial: Only trait 00 (Humanity Index = 135/255)
 * - KOL: Travel KOL with multiple traits from spec
 */

import type { KOLProfile } from './types';

/**
 * Travel KOL Profile Info
 */
export const travelKOLProfile: KOLProfile = {
  name: 'TravelWithMia',
  followers: '5,000',
  niche: 'Travel Content Creator',
  gender: 'Female',
  verified: true,
};

// Re-export matrix data from matrix constants
export { travelKOLMatrixData, initialMatrixData } from '../matrix';
