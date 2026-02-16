/**
 * App Context Store (Zustand)
 * 
 * Global state container for context-aware routing and Twin Matrix state
 * Provides state and actions for managing user context and matrix data
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { emptyMatrixData } from '@/constants/matrix';
import type { AppStore, AppContext, EntrySource, UserStatus, URLContext } from './types';

const initialState: AppContext = {
  entrySource: 'organic',
  urlParams: {},
  userStatus: 'anonymous',
  contextId: 'new_user_organic',
  currentStep: 'welcome',
  completedSteps: [],
};

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        matrixData: emptyMatrixData, // Start with empty matrix

        // Set URL parameters and detect entry source
        setUrlParams: (params: URLContext) => {
          let entrySource: EntrySource = 'organic';

          if (params.taskId) {
            entrySource = 'task_deeplink';
          } else if (params.ref) {
            entrySource = 'kol_referral';
          } else if (params.campaign || params.utm_campaign) {
            entrySource = 'campaign';
          }

          set({
            urlParams: params,
            entrySource,
            referrerKol: params.ref,
            campaignId: params.campaign || params.utm_campaign,
          });
        },

        // Set user status
        setUserStatus: (status: UserStatus, walletAddress?: string) => {
          set({ userStatus: status, walletAddress });
        },

        // Set humanity score after verification
        setHumanityScore: (score: number) => {
          set({ humanityScore: score });
        },

        // Update Twin Matrix data
        updateMatrixData: (data) => {
          set({ matrixData: data });
        },

        // Resolve context based on current state
        resolveContext: () => {
          const { urlParams, userStatus } = get();

          // Priority 1: Check if returning user
          if (userStatus === 'registered' || userStatus === 'premium') {
            set({ contextId: 'returning_user' });
            return 'returning_user';
          }
          
          // Priority 2: Check for task deeplink
          if (urlParams.taskId) {
            set({ contextId: 'new_user_task' });
            return 'new_user_task';
          }
          
          // Priority 3: Check for KOL referral
          if (urlParams.ref) {
            set({ contextId: 'kol_referral' });
            return 'kol_referral';
          }
          
          // Priority 4: Check for campaign
          if (urlParams.campaign || urlParams.utm_campaign) {
            set({ contextId: 'campaign_landing' });
            return 'campaign_landing';
          }
          
          // Default: organic new user
          set({ contextId: 'new_user_organic' });
          return 'new_user_organic';
        },

        // Mark a step as completed
        completeStep: (stepId: string) => {
          const { completedSteps } = get();
          if (!completedSteps.includes(stepId)) {
            set({ completedSteps: [...completedSteps, stepId] });
          }
        },

        // Set current step
        setCurrentStep: (stepId: string) => {
          set({ currentStep: stepId });
        },

        // Reset store to initial state
        reset: () => {
          set({ ...initialState, matrixData: emptyMatrixData });
        },
      }),
      {
        name: 'twin3-context-v3',
        partialize: (state) => ({
          userStatus: state.userStatus,
          walletAddress: state.walletAddress,
          humanityScore: state.humanityScore,
          completedSteps: state.completedSteps,
          matrixData: state.matrixData,
        }),
      }
    ),
    { name: 'twin3-store' }
  )
);

// Selector hooks for common use cases
export const useContextId = () => useAppStore((state) => state.contextId);
export const useUserStatus = () => useAppStore((state) => state.userStatus);
export const useUrlParams = () => useAppStore((state) => state.urlParams);
export const useIsVerified = () => useAppStore((state) => state.userStatus !== 'anonymous');
export const useMatrixData = () => useAppStore((state) => state.matrixData);
export const useUpdateMatrixData = () => useAppStore((state) => state.updateMatrixData);
