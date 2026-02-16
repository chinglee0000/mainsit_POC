/**
 * WalletBinding Component - Logic Layer (RED ZONE)
 * 
 * Handles wallet connection and binding logic for Twin3 identity verification.
 * Supports both self-custody wallets (MetaMask) and custodial SBT wallets via Telegram.
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { WalletBindingView } from './WalletBinding.view';

// ─── Types ─────────────────────────────────────────────────
export type BindingStep = 'choose' | 'connecting' | 'conflict' | 'success';
export type BindingType = 'self-custody' | 'no-wallet';

export interface WalletBindingProps {
  onBindingComplete?: (walletAddress: string, bindingType: BindingType) => void;
  onClose?: () => void;
  forceConflict?: boolean;
}

// ─── Mock Data ─────────────────────────────────────────────
const MOCK_WALLET_ADDRESS = '0x1a2B...9cDe';
const MOCK_FULL_ADDRESS = '0x1a2B3c4D5e6F7a8B9c0D1e2F3a4B5c6D7e8F9cDe';
const MOCK_TG_WALLET = 'twin3_sbt_0xAb...Ef12';
const MOCK_CONFLICT_ADDRESS = '0x9fE...3bA1';

// ─── Component ─────────────────────────────────────────────
export const WalletBinding: React.FC<WalletBindingProps> = ({
  onBindingComplete,
  forceConflict = false,
}) => {
  const [step, setStep] = useState<BindingStep>('choose');
  const [bindingType, setBindingType] = useState<BindingType | null>(null);
  const [progress, setProgress] = useState(0);
  const [walletAddress, setWalletAddress] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showWhyWallet, setShowWhyWallet] = useState(false);
  const hasNotifiedParent = useRef(false);

  // Simulate connection progress
  useEffect(() => {
    if (step !== 'connecting') return;

    const duration = bindingType === 'self-custody' ? 2000 : 3000;
    const startTime = Date.now();
    let raf: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        raf = requestAnimationFrame(animate);
      } else {
        const shouldConflict = forceConflict;
        setTimeout(() => {
          if (shouldConflict) {
            setStep('conflict');
          } else {
            const addr = bindingType === 'self-custody' ? MOCK_WALLET_ADDRESS : MOCK_TG_WALLET;
            setWalletAddress(addr);
            setStep('success');
          }
        }, 300);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [step, bindingType, forceConflict]);

  // After success, notify parent after brief display
  useEffect(() => {
    if (step !== 'success') {
      hasNotifiedParent.current = false;
      return;
    }
    if (hasNotifiedParent.current) return;
    hasNotifiedParent.current = true;
    const timer = setTimeout(() => {
      onBindingComplete?.(walletAddress, bindingType!);
    }, 2500);
    return () => clearTimeout(timer);
  }, [step, walletAddress, bindingType, onBindingComplete]);

  const handleChoose = useCallback((type: BindingType) => {
    setBindingType(type);
    setProgress(0);
    setStep('connecting');
  }, []);

  const handleRetry = useCallback(() => {
    setProgress(0);
    setStep('connecting');
  }, []);

  const handleSwitchWallet = useCallback(() => {
    setStep('choose');
    setBindingType(null);
    setProgress(0);
  }, []);

  const handleOpenWalletModal = useCallback(() => {
    setShowWalletModal(true);
  }, []);

  const handleCloseWalletModal = useCallback(() => {
    setShowWalletModal(false);
  }, []);

  const handleToggleWhyWallet = useCallback(() => {
    setShowWhyWallet(prev => !prev);
  }, []);

  const handleOpenTelegram = useCallback(() => {
    window.open('https://t.me/twin3_ai', '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <WalletBindingView
      step={step}
      bindingType={bindingType}
      progress={progress}
      walletAddress={walletAddress}
      showWalletModal={showWalletModal}
      showWhyWallet={showWhyWallet}
      mockData={{
        walletAddress: MOCK_WALLET_ADDRESS,
        fullAddress: MOCK_FULL_ADDRESS,
        tgWallet: MOCK_TG_WALLET,
        conflictAddress: MOCK_CONFLICT_ADDRESS,
      }}
      onChoose={handleChoose}
      onRetry={handleRetry}
      onSwitchWallet={handleSwitchWallet}
      onOpenWalletModal={handleOpenWalletModal}
      onCloseWalletModal={handleCloseWalletModal}
      onToggleWhyWallet={handleToggleWhyWallet}
      onOpenTelegram={handleOpenTelegram}
    />
  );
};
