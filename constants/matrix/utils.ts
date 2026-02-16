/**
 * Twin Matrix Utilities
 */

import type { MatrixDimension } from './types';

/**
 * Get dimension from hex ID
 */
export function getDimensionFromHexId(hexId: string): MatrixDimension {
  const decimal = parseInt(hexId, 16);
  
  if (decimal < 64) return 'physical';
  if (decimal < 128) return 'social';
  if (decimal < 192) return 'digital';
  return 'spiritual';
}
