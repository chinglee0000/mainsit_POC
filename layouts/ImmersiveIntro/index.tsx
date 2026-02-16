import { useEffect, useState, useRef } from 'react';
import { ImmersiveIntroView } from './ImmersiveIntro.view';

export interface ImmersiveIntroProps {
  onComplete: () => void;
}

export type IntroPhase = 'converge' | 'reveal' | 'video' | 'fadeout';

export const ImmersiveIntro = ({ onComplete }: ImmersiveIntroProps) => {
  const [phase, setPhase] = useState<IntroPhase>('converge');
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Progress animation during converge phase
  useEffect(() => {
    if (phase !== 'converge') return;

    const duration = 4000;
    const interval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      setProgress(Math.min((elapsed / duration) * 100, 100));
      if (elapsed >= duration) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [phase]);

  // Phase transitions
  useEffect(() => {
    const revealTimer = setTimeout(() => setPhase('reveal'), 4000);
    const videoTimer = setTimeout(() => setPhase('video'), 6500);
    return () => {
      clearTimeout(revealTimer);
      clearTimeout(videoTimer);
    };
  }, []);

  // Play video when video phase starts
  useEffect(() => {
    if (phase === 'video' && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked, skip to fadeout
        setPhase('fadeout');
      });
    }
  }, [phase]);

  // Handle fadeout completion
  useEffect(() => {
    if (phase === 'fadeout') {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  const handleVideoEnd = () => {
    setPhase('fadeout');
  };

  const handleSkip = () => {
    if (phase === 'video' && videoRef.current) {
      videoRef.current.pause();
    }
    setPhase('fadeout');
  };

  if (!isVisible) return null;

  return (
    <ImmersiveIntroView
      phase={phase}
      progress={progress}
      videoRef={videoRef}
      onSkip={handleSkip}
      onVideoEnd={handleVideoEnd}
    />
  );
};
