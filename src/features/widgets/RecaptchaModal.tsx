import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

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

interface RecaptchaWidgetProps {
    onVerified?: (token: string) => void;
    onStart?: () => void;
}

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';
// Enable reCAPTCHA if SITE_KEY is provided, regardless of environment
const RECAPTCHA_ENABLED = SITE_KEY && SITE_KEY.length > 0;

// Mock reCAPTCHA Component
const MockRecaptcha: React.FC<{ onVerified: () => void }> = ({ onVerified }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    const handleClick = () => {
        if (isChecked) return;
        
        setIsVerifying(true);
        
        // Simulate verification delay
        setTimeout(() => {
            setIsVerifying(false);
            setIsChecked(true);
            onVerified();
        }, 1500);
    };

    return (
        <div style={{
            width: '304px',
            height: '78px',
            background: '#f9f9f9',
            border: '1px solid #d3d3d3',
            borderRadius: '3px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: '12px',
            boxShadow: '0 0 3px rgba(0,0,0,0.1)',
        }}>
            {/* Checkbox */}
            <div
                onClick={handleClick}
                style={{
                    width: '28px',
                    height: '28px',
                    border: isChecked ? '2px solid #4CAF50' : '2px solid #c1c1c1',
                    borderRadius: '2px',
                    background: isChecked ? '#4CAF50' : '#fff',
                    cursor: isVerifying ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    flexShrink: 0,
                }}
            >
                {isVerifying && (
                    <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid #1a73e8',
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                    }} />
                )}
                {isChecked && !isVerifying && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="white"/>
                    </svg>
                )}
            </div>

            {/* Text */}
            <div style={{ flex: 1 }}>
                <span style={{
                    fontSize: '14px',
                    color: '#000',
                    fontFamily: 'Roboto, sans-serif',
                }}>
                    I'm not a robot
                </span>
            </div>

            {/* reCAPTCHA logo */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '2px',
            }}>
                <img 
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath fill='%231a73e8' d='M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 29C8.82 29 3 23.18 3 16S8.82 3 16 3s13 5.82 13 13-5.82 13-13 13z'/%3E%3Cpath fill='%231a73e8' d='M16 8c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 13c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z'/%3E%3C/svg%3E"
                    alt="reCAPTCHA"
                    style={{ width: '32px', height: '32px' }}
                />
                <div style={{
                    fontSize: '8px',
                    color: '#555',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    lineHeight: 1.2,
                }}>
                    <span style={{ fontWeight: 500 }}>reCAPTCHA</span>
                    <div style={{ display: 'flex', gap: '3px', fontSize: '7px' }}>
                        <a href="#" style={{ color: '#555', textDecoration: 'none' }}>Privacy</a>
                        <span>-</span>
                        <a href="#" style={{ color: '#555', textDecoration: 'none' }}>Terms</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Helper: load reCAPTCHA script (Explicit) ────────────
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

/**
 * Real reCAPTCHA v2 checkbox widget using grecaptcha.render().
 */
export const RecaptchaWidget: React.FC<RecaptchaWidgetProps> = ({
    onVerified,
    onStart,
}) => {
    const [error, setError] = useState<string | null>(null);
    const [useMock, setUseMock] = useState(!RECAPTCHA_ENABLED);
    const containerId = useMemo(() => `recaptcha-${Math.random().toString(36).substr(2, 9)}`, []);
    const widgetIdRef = useRef<number | null>(null);
    const hasRendered = useRef(false);

    useEffect(() => {
        onStart?.();

        // If reCAPTCHA is not enabled, use mock version
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
                setUseMock(true); // Fallback to mock on error
            }
        };

        const timer = setTimeout(initRecaptcha, 200);

        return () => {
            clearTimeout(timer);
        };
    }, [containerId, onVerified, onStart]);

    const handleMockVerified = () => {
        onVerified?.('mock-recaptcha-token');
    };

    return (
        <div style={{
            padding: '4px',
            marginBottom: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--color-text-secondary)',
                fontSize: '13px',
                marginBottom: '4px'
            }}>
                <Shield size={14} className="text-primary" />
                <span>
                    {useMock 
                        ? 'Please complete the verification below:' 
                        : 'Please complete the verification below:'}
                </span>
            </div>

            {/* Show mock or real reCAPTCHA */}
            {useMock ? (
                <MockRecaptcha onVerified={handleMockVerified} />
            ) : (
                <div
                    id={containerId}
                    className="recaptcha-container"
                    style={{
                        minHeight: '78px',
                        minWidth: '304px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                />
            )}

            {error && !useMock && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#ef4444',
                    fontSize: '13px',
                    marginTop: '4px',
                    padding: '8px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    borderRadius: '4px'
                }}>
                    <AlertTriangle size={14} />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export const RecaptchaModal = RecaptchaWidget;
