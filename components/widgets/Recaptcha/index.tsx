/**
 * Recaptcha Component - Logic Layer (RED ZONE)
 * 
 * Handles Google reCAPTCHA v2 checkbox verification.
 * Falls back to mock implementation when reCAPTCHA is disabled or unavailable.
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { RecaptchaView } from './Recaptcha.view';

// ─── Types ──────────────────────────────────────────────
declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      render: (container: string | HTMLElement, options: any) => number;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      reset: (widgetId?: number) => void;
    };
    onRecaptchaLoad?: () => void;
  }
}

export interface RecaptchaProps {
  onVerified?: (token: string) => void;
  onStart?: () => void;
}

// ─── Configuration ──────────────────────────────────────
const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';
// Enable reCAPTCHA if SITE_KEY is provided, regardless of environment
const RECAPTCHA_ENABLED = SITE_KEY && SITE_KEY.length > 0;

// ─── Helper: Load reCAPTCHA Script ─────────────────────
function loadRecaptchaScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.grecaptcha?.render) {
      resolve();
      return;
    }

    const scriptId = 'recaptcha-script-v2';
    if (document.getElementById(scriptId)) {
      const check = () => {
        if (window.grecaptcha?.render) resolve();
        else setTimeout(check, 100);
      };
      check();
      return;
    }

    window.onRecaptchaLoad = () => {
      resolve();
    };

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit&hl=en`;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error('reCAPTCHA script failed to load'));
    document.head.appendChild(script);

    setTimeout(() => reject(new Error('reCAPTCHA script load timed out')), 15000);
  });
}

// ─── Component ──────────────────────────────────────────
export const Recaptcha: React.FC<RecaptchaProps> = ({
  onVerified,
  onStart,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [useMock, setUseMock] = useState(!RECAPTCHA_ENABLED);
  const [mockChecked, setMockChecked] = useState(false);
  const [mockVerifying, setMockVerifying] = useState(false);
  
  const containerId = useMemo(() => `recaptcha-${Math.random().toString(36).substr(2, 9)}`, []);
  const widgetIdRef = useRef<number | null>(null);
  const hasRendered = useRef(false);

  // Initialize reCAPTCHA
  useEffect(() => {
    onStart?.();

    if (!RECAPTCHA_ENABLED) {
      setUseMock(true);
      return;
    }

    const initRecaptcha = async () => {
      try {
        if (!SITE_KEY) {
          throw new Error('reCAPTCHA Site Key is missing in env');
        }

        await loadRecaptchaScript();

        if (hasRendered.current) return;

        window.grecaptcha?.ready(() => {
          const container = document.getElementById(containerId);
          if (!container) return;

          const renderedId = window.grecaptcha?.render(containerId, {
            sitekey: SITE_KEY,
            theme: 'light',
            callback: (token: string) => {
              onVerified?.(token);
            },
            'expired-callback': () => {
              window.grecaptcha?.reset(widgetIdRef.current!);
            },
            'error-callback': () => {
              setError('reCAPTCHA encountered an error');
            }
          });
          if (renderedId !== undefined) {
            widgetIdRef.current = renderedId;
          }
          hasRendered.current = true;
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load reCAPTCHA');
        setUseMock(true);
      }
    };

    const timer = setTimeout(initRecaptcha, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [containerId, onVerified, onStart]);

  // Mock verification handler
  const handleMockClick = () => {
    if (mockChecked) return;
    
    setMockVerifying(true);
    
    setTimeout(() => {
      setMockVerifying(false);
      setMockChecked(true);
      onVerified?.('mock-recaptcha-token');
    }, 1500);
  };

  return (
    <RecaptchaView
      useMock={useMock}
      mockChecked={mockChecked}
      mockVerifying={mockVerifying}
      containerId={containerId}
      error={error}
      onMockClick={handleMockClick}
    />
  );
};

// Export alias for backward compatibility
export const RecaptchaModal = Recaptcha;
