import { useState, useEffect } from 'react';
import { TwinMatrixView } from './TwinMatrix.view';
import type { MatrixTrait, TwinMatrixData } from './types';

export interface TwinMatrixProps {
  data?: TwinMatrixData;
  onExplore?: () => void;
}

// Mock data for demonstration
const createMockData = (): TwinMatrixData => {
  const traits: MatrixTrait[] = [];
  
  // Create 256 traits (16x16 grid)
  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 16; col++) {
      const id = (row * 16 + col).toString(16).toUpperCase().padStart(2, '0');
      
      // Determine dimension based on quadrant
      let dimension: 'physical' | 'digital' | 'social' | 'spiritual';
      if (row < 8 && col < 8) dimension = 'physical';
      else if (row < 8 && col >= 8) dimension = 'digital';
      else if (row >= 8 && col < 8) dimension = 'social';
      else dimension = 'spiritual';
      
      // First trait (00) is discovered by default
      const discovered = id === '00';
      
      traits.push({
        id,
        dimension,
        discovered,
        strength: discovered ? 180 : 0,
        position: { row, col },
        name: discovered ? 'Humanity Index' : undefined,
        description: discovered ? 'Measures authenticity and trustworthiness' : undefined,
      });
    }
  }
  
  return {
    totalTraits: 256,
    discoveredTraits: 1,
    journeyProgress: 0,
    avgStrength: 70,
    humanityIndex: 180,
    dimensions: {
      physical: { discovered: 1, total: 64, percentage: 2 },
      digital: { discovered: 0, total: 64, percentage: 0 },
      social: { discovered: 0, total: 64, percentage: 0 },
      spiritual: { discovered: 0, total: 64, percentage: 0 },
    },
    traits,
  };
};

export const TwinMatrix = ({ data, onExplore }: TwinMatrixProps) => {
  const [matrixData] = useState<TwinMatrixData>(data || createMockData());
  const [selectedTrait, setSelectedTrait] = useState<MatrixTrait | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device
  useEffect(() => {
    const checkTouchDevice = () => {
      const hasHover = window.matchMedia('(hover: hover)').matches;
      const hasPointer = window.matchMedia('(pointer: fine)').matches;
      const isSmallScreen = window.innerWidth < 1024;
      setIsTouchDevice(!hasHover || !hasPointer || isSmallScreen);
    };
    
    checkTouchDevice();
    
    const hoverQuery = window.matchMedia('(hover: hover)');
    hoverQuery.addEventListener('change', checkTouchDevice);
    window.addEventListener('resize', checkTouchDevice);
    
    return () => {
      hoverQuery.removeEventListener('change', checkTouchDevice);
      window.removeEventListener('resize', checkTouchDevice);
    };
  }, []);

  return (
    <TwinMatrixView
      data={matrixData}
      selectedTrait={selectedTrait}
      showInfoModal={showInfoModal}
      isTouchDevice={isTouchDevice}
      onCellClick={setSelectedTrait}
      onCloseTraitModal={() => setSelectedTrait(null)}
      onToggleInfoModal={() => setShowInfoModal(!showInfoModal)}
      onExplore={onExplore}
    />
  );
};

export * from './types';
