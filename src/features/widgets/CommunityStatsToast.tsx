import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface CommunityStatsToastProps {
    memberCount?: number;
    onClose?: () => void;
}

export const CommunityStatsToast: React.FC<CommunityStatsToastProps> = ({
    memberCount = 29571,
    onClose,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        // Fade in animation after a short delay
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose?.();
        }, 300);
    };

    const formatNumber = (num: number) => {
        return num.toLocaleString('en-US');
    };

    const isMobile = window.innerWidth < 768;

    return (
        <div
            style={{
                width: '100%',
                opacity: isVisible && !isClosing ? 1 : 0,
                maxHeight: isVisible && !isClosing ? '50px' : '0',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'hidden',
                position: 'relative',
                zIndex: 100,
                flexShrink: 0,
            }}
        >
            <div
                style={{
                    width: '100%',
                    padding: isMobile ? '10px 12px' : '12px 16px',
                    background: '#ffffff',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: isMobile ? '8px' : '12px',
                    position: 'relative',
                }}
            >
                {/* Content */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: isMobile ? '6px' : '8px',
                    flex: 1,
                    minWidth: 0,
                }}>
                    <span style={{
                        fontWeight: 700,
                        fontSize: isMobile ? '20px' : '22px',
                        fontFamily: 'var(--font-sans)',
                        color: '#000000',
                        whiteSpace: 'nowrap',
                    }}>
                        {formatNumber(memberCount)}
                    </span>
                    <span style={{
                        fontSize: isMobile ? '14px' : '15px',
                        fontWeight: 500,
                        color: '#374151',
                        whiteSpace: 'nowrap',
                    }}>
                        verified members
                    </span>
                </div>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#9ca3af',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'color 0.2s',
                        flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#6b7280';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#9ca3af';
                    }}
                >
                    <X size={18} strokeWidth={1.5} />
                </button>
            </div>
        </div>
    );
};
