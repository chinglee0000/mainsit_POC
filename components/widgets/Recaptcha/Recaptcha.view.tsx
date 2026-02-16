/**
 * Recaptcha View - UI Layer (GREEN ZONE)
 * 
 * Pure UI rendering for reCAPTCHA verification widget.
 * Displays either real Google reCAPTCHA or mock checkbox.
 */

import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────
export interface RecaptchaViewProps {
  useMock: boolean;
  mockChecked: boolean;
  mockVerifying: boolean;
  containerId: string;
  error: string | null;
  onMockClick: () => void;
}

// ─── Mock Recaptcha Component ───────────────────────────
const MockRecaptcha: React.FC<{ 
  isChecked: boolean; 
  isVerifying: boolean; 
  onClick: () => void;
}> = ({ isChecked, isVerifying, onClick }) => {
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
        onClick={onClick}
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
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#555', textDecoration: 'none' }}>Privacy</a>
            <span>-</span>
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#555', textDecoration: 'none' }}>Terms</a>
          </div>
        </div>
      </div>

      {/* Spin animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// ─── Main View Component ────────────────────────────────
export const RecaptchaView: React.FC<RecaptchaViewProps> = ({
  useMock,
  mockChecked,
  mockVerifying,
  containerId,
  error,
  onMockClick,
}) => {
  return (
    <div style={{
      padding: '4px',
      marginBottom: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: 'var(--color-text-secondary)',
        fontSize: '13px',
        marginBottom: '4px'
      }}>
        <Shield size={14} style={{ color: 'var(--color-primary)' }} />
        <span>
          {useMock 
            ? 'Please complete the verification below:' 
            : 'Please complete the verification below:'}
        </span>
      </div>

      {/* reCAPTCHA Widget */}
      {useMock ? (
        <MockRecaptcha 
          isChecked={mockChecked}
          isVerifying={mockVerifying}
          onClick={onMockClick}
        />
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

      {/* Error Message */}
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
