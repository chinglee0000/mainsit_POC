/**
 * Twin Matrix Types
 */

export type MatrixDimension = 'physical' | 'social' | 'digital' | 'spiritual';

export interface MatrixTrait {
  id: string;
  dimension: MatrixDimension;
  discovered: boolean;
  strength?: number;
  position: { row: number; col: number };
  name?: string;
  description?: string;
  unlockedBy?: string;
  unlockedAt?: string;
}

export interface DimensionStats {
  discovered: number;
  total: number;
  percentage: number;
}

export interface TwinMatrixData {
  totalTraits: 256;
  discoveredTraits: number;
  journeyProgress: number;
  avgStrength: number;
  humanityIndex: number;
  dimensions: {
    physical: DimensionStats;
    social: DimensionStats;
    digital: DimensionStats;
    spiritual: DimensionStats;
  };
  traits: MatrixTrait[];
  recentlyUnlockedTrait?: string;
}
