import { Logo } from '@/components/basics/Logo';
import type { IntroPhase } from './index';

export interface ImmersiveIntroViewProps {
  phase: IntroPhase;
  progress: number;
  videoRef: React.RefObject<HTMLVideoElement>;
  onSkip: () => void;
  onVideoEnd: () => void;
}

export const ImmersiveIntroView = ({
  phase,
  progress,
  videoRef,
  onSkip,
  onVideoEnd,
}: ImmersiveIntroViewProps) => {
  const isRevealed = phase === 'reveal' || phase === 'video' || phase === 'fadeout';
  const isVideoPhase = phase === 'video';
  const isConvergePhase = phase === 'converge';
  const isRevealPhase = phase === 'reveal';

  return (
    <div
      onClick={onSkip}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#030308',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        opacity: phase === 'fadeout' ? 0 : 1,
        transition: 'opacity 0.8s ease-out',
        overflow: 'hidden',
      }}
    >
      {/* Small Pixel Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 9px, rgba(60, 80, 100, 0.2) 9px, rgba(60, 80, 100, 0.2) 10px),
            repeating-linear-gradient(90deg, transparent, transparent 9px, rgba(60, 80, 100, 0.2) 9px, rgba(60, 80, 100, 0.2) 10px)
          `,
          backgroundSize: '10px 10px',
          opacity: isVideoPhase ? 0.3 : phase === 'fadeout' ? 0 : 1,
          transition: 'opacity 0.8s ease-out',
        }}
      />

      {/* Converging Lights */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          mixBlendMode: 'screen',
          opacity: isConvergePhase || isRevealPhase ? 1 : 0,
          transition: 'opacity 0.6s ease-out',
        }}
      >
        {/* Top-left */}
        <div
          style={{
            position: 'absolute',
            width: '60vw',
            height: '60vh',
            background:
              'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 40%, transparent 70%)',
            filter: 'blur(40px)',
            animation: 'converge-tl 4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          }}
        />
        {/* Top-right */}
        <div
          style={{
            position: 'absolute',
            width: '55vw',
            height: '55vh',
            background:
              'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 40%, transparent 70%)',
            filter: 'blur(45px)',
            animation: 'converge-tr 4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            animationDelay: '0.1s',
            opacity: 0,
          }}
        />
        {/* Bottom-left */}
        <div
          style={{
            position: 'absolute',
            width: '50vw',
            height: '50vh',
            background:
              'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.15) 40%, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'converge-bl 4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            animationDelay: '0.15s',
            opacity: 0,
          }}
        />
        {/* Bottom-right */}
        <div
          style={{
            position: 'absolute',
            width: '58vw',
            height: '58vh',
            background:
              'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.2) 40%, transparent 70%)',
            filter: 'blur(42px)',
            animation: 'converge-br 4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            animationDelay: '0.2s',
            opacity: 0,
          }}
        />

        {/* Central glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '40vw',
            height: '40vh',
            background:
              'radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.3) 35%, transparent 60%)',
            transform: 'translate(-50%, -50%) scale(0)',
            filter: 'blur(30px)',
            animation: isRevealPhase
              ? 'center-burst 0.6s ease-out forwards, center-pulse 3s ease-in-out 0.6s infinite'
              : 'none',
          }}
        />
      </div>

      {/* Grid Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '10px 10px',
          pointerEvents: 'none',
          zIndex: 5,
          opacity: isConvergePhase || isRevealPhase ? 1 : 0,
          transition: 'opacity 0.6s ease-out',
        }}
      />

      {/* Logo */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          opacity: isRevealPhase ? 1 : 0,
          transform: isRevealPhase ? 'scale(1)' : 'scale(0.8)',
          filter: isRevealPhase ? 'blur(0px)' : 'blur(15px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '-35px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 60%)',
            filter: 'blur(20px)',
            animation:
              isRevealed && !isVideoPhase ? 'logo-breathe 3s ease-in-out infinite' : 'none',
          }}
        />
        <Logo width={100} height={100} variant="dark" />
      </div>

      {/* Loading Text + Progress Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '38%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          opacity: isRevealed ? 0 : 1,
          transform: isRevealed ? 'translateY(-10px)' : 'translateY(0)',
          transition: 'all 0.5s ease-out',
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
          }}
        >
          Your experience is being computed
          <span style={{ animation: 'dots 1.5s steps(4, end) infinite' }}>...</span>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            width: '200px',
            height: '2px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '1px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.7))',
              borderRadius: '1px',
              transition: 'width 0.05s linear',
            }}
          />
        </div>
      </div>

      {/* Video Player */}
      {isVideoPhase && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 15,
            animation: 'fade-in 0.8s ease-out forwards',
          }}
        >
          <video
            ref={videoRef}
            src="/videos/twin3_60s_highlight ver.mp4"
            onEnded={onVideoEnd}
            style={{
              maxWidth: '90%',
              maxHeight: '80%',
              borderRadius: '8px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
            }}
            playsInline
          />
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              fontSize: '9px',
              fontWeight: 400,
              letterSpacing: '0.35em',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
            }}
          >
            Click anywhere to skip
          </div>
        </div>
      )}

      {/* Instruction */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          fontSize: '9px',
          fontWeight: 400,
          letterSpacing: '0.35em',
          color: 'rgba(255,255,255,0.4)',
          textTransform: 'uppercase',
          opacity: isRevealed && !isVideoPhase ? 1 : 0,
          transform: isRevealed ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.8s ease-out 0.3s',
          zIndex: 10,
        }}
      >
        Press Anywhere to Begin
      </div>

      <style>{`
        @keyframes converge-tl {
          0% { top: -30%; left: -30%; transform: scale(1); opacity: 0.4; }
          50% { opacity: 0.7; }
          100% { top: 25%; left: 25%; transform: scale(0.3); opacity: 0; }
        }
        @keyframes converge-tr {
          0% { top: -30%; right: -30%; transform: scale(1); opacity: 0.35; }
          50% { opacity: 0.65; }
          100% { top: 25%; right: 25%; transform: scale(0.3); opacity: 0; }
        }
        @keyframes converge-bl {
          0% { bottom: -30%; left: -30%; transform: scale(1); opacity: 0.3; }
          50% { opacity: 0.6; }
          100% { bottom: 25%; left: 25%; transform: scale(0.3); opacity: 0; }
        }
        @keyframes converge-br {
          0% { bottom: -30%; right: -30%; transform: scale(1); opacity: 0.35; }
          50% { opacity: 0.65; }
          100% { bottom: 25%; right: 25%; transform: scale(0.3); opacity: 0; }
        }
        @keyframes center-burst {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
        }
        @keyframes center-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.08); opacity: 0.9; }
        }
        @keyframes logo-breathe {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.04); opacity: 0.6; }
        }
        @keyframes dots {
          0%, 20% { opacity: 0; }
          40% { opacity: 1; }
          60% { opacity: 1; }
          80%, 100% { opacity: 0.5; }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
