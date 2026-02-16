import { useState, useEffect } from 'react';
import { BiometricVerificationView } from './BiometricVerification.view';

export interface BiometricVerificationProps {
  onComplete: () => void;
  onClose: () => void;
}

export type VerificationStatus = 'idle' | 'verifying' | 'success';

export const BiometricVerification = ({
  onComplete,
  onClose,
}: BiometricVerificationProps) => {
  const [status, setStatus] = useState<VerificationStatus>('idle');

  const handleVerify = () => {
    setStatus('verifying');

    // Simulate biometric verification
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onComplete();
      }, 1500);
    }, 2000);
  };

  useEffect(() => {
    if (status === 'idle') {
      // Auto-start verification after modal opens
      setTimeout(() => handleVerify(), 500);
    }
  }, []);

  return (
    <BiometricVerificationView
      status={status}
      onClose={onClose}
    />
  );
};
