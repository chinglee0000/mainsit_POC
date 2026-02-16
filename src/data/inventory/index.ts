/**
 * Interaction Inventory - Modular Index
 * 
 * Combines all node modules into a single inventory
 */

import type { InteractionInventory } from '../../types/a2ui';

// Import node modules
import { welcomeNodes } from './welcomeNodes';
import { verificationNodes } from './verificationNodes';
import { taskNodes } from './taskNodes';
import { rewardNodes } from './rewardNodes';
import { faqNodes } from './faqNodes';
import { infoNodes, fallbackNode } from './infoNodes';

// Combine all nodes
export const INTERACTION_INVENTORY: InteractionInventory = [
    ...welcomeNodes,
    ...verificationNodes,
    ...taskNodes,
    ...rewardNodes,
    ...faqNodes,
    ...infoNodes,
    fallbackNode,
];

// Re-export individual modules for direct access
export { welcomeNodes } from './welcomeNodes';
export { verificationNodes } from './verificationNodes';
export { taskNodes } from './taskNodes';
export { rewardNodes } from './rewardNodes';
export { faqNodes } from './faqNodes';
export { infoNodes, fallbackNode } from './infoNodes';
