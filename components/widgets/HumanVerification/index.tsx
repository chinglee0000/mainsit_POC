import { useState, useCallback, useEffect } from 'react';
import { HumanVerificationView } from './HumanVerification.view';

export interface HumanVerificationProps {
  onClose?: () => void;
  onComplete?: (score: number) => void;
  initialScore?: number;
}

export type FlowState = 'selecting' | 'verifying' | 'failed' | 'matrix_view';

export interface VerificationMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  weight: number;
  available: boolean;
}

const VERIFICATION_METHODS: VerificationMethod[] = [
  {
    id: 'recaptcha',
    name: 'Google reCAPTCHA v3',
    description: 'Verify you are human with Google',
    icon: '🤖',
    weight: 0.3,
    available: true,
  },
  {
    id: 'worldcoin',
    name: 'Worldcoin',
    description: 'Iris scan verification',
    icon: '👁️',
    weight: 0.4,
    available: true,
  },
  {
    id: 'gitcoin',
    name: 'Gitcoin Passport',
    description: 'Decentralized identity verification',
    icon: '🛂',
    weight: 0.3,
    available: true,
  },
];

export const HumanVerification = ({
  onClose,
  onComplete,
  initialScore = 0,
}: HumanVerificationProps) => {
  const [flowState, setFlowState] = useState<FlowState>('selecting');
  const [score, setScore] = useState(initialScore);
  const [displayScore, setDisplayScore] = useState(initialScore);
  const [completedMethods, setCompletedMethods] = useState<string[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<VerificationMethod | null>(null);

  // Animate score changes
  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;
    const startScore = displayScore;
    const targetScore = score;

    if (startScore === targetScore) return;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const duration = 1500;

      if (progress < duration) {
        const ratio = 1 - Math.pow(1 - progress / duration, 3);
        const current = startScore + (targetScore - startScore) * ratio;
        setDisplayScore(current);
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayScore(targetScore);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [score]);

  const handleMethodSelect = useCallback(
    (methodId: string) => {
      const method = VERIFICATION_METHODS.find((m) => m.id === methodId);
      if (!method || completedMethods.includes(methodId)) return;

      setSelectedMethod(method);
      setFlowState('verifying');
    },
    [completedMethods]
  );

  const handleVerificationComplete = useCallback(() => {
    if (!selectedMethod) return;

    // 20% chance of failure for demo
    const shouldFail = Math.random() < 0.2;
    if (shouldFail) {
      setFlowState('failed');
      return;
    }

    // Add to completed methods
    const newCompletedMethods = [...completedMethods, selectedMethod.id];
    setCompletedMethods(newCompletedMethods);

    // Calculate new score (0-255 scale)
    const totalWeight = newCompletedMethods.reduce((sum, id) => {
      const method = VERIFICATION_METHODS.find((m) => m.id === id);
      return sum + (method?.weight || 0);
    }, 0);

    const newScore = Math.round(totalWeight * 255);
    setScore(newScore);

    // Return to selection
    setTimeout(() => {
      setFlowState('selecting');
      setSelectedMethod(null);
      onComplete?.(newScore);
    }, 300);
  }, [selectedMethod, completedMethods, onComplete]);

  const handleRetry = useCallback(() => {
    setFlowState('verifying');
  }, []);

  const handlePickAnother = useCallback(() => {
    setSelectedMethod(null);
    setFlowState('selecting');
  }, []);

  const handleViewMatrix = useCallback(() => {
    setFlowState('matrix_view');
  }, []);

  return (
    <HumanVerificationView
      flowState={flowState}
      score={score}
      displayScore={displayScore}
      completedMethods={completedMethods}
      selectedMethod={selectedMethod}
      methods={VERIFICATION_METHODS}
      onMethodSelect={handleMethodSelect}
      onVerificationComplete={handleVerificationComplete}
      onRetry={handleRetry}
      onPickAnother={handlePickAnother}
      onViewMatrix={handleViewMatrix}
      onClose={onClose}
    />
  );
};
