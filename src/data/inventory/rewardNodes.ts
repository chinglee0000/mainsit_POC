/**
 * Reward & Airdrop Flow Nodes
 * 
 * Reward dashboard, airdrop claims, and incentive flows
 */

import type { InteractionNode } from '../../types/a2ui';

export const rewardNodes: InteractionNode[] = [
    {
        id: 'airdrop_claim',
        triggers: ['claim', 'airdrop', 'token'],
        response: {
            text: "**Airdrop Status**\nLet's check if you're eligible to claim your $twin3 tokens.",
            delay: 500,
            widget: 'airdrop_claim'
        },
        suggestedActions: [
            { label: 'How to increase score?', payload: 'matrix' },
            { label: 'Check Leaderboard', payload: 'leaderboard' }
        ]
    },

    {
        id: 'show_rewards',
        triggers: ['rewards', 'balance', 'dashboard'],
        response: {
            text: "**Your Rewards**\nHere's your current $twin3 balance and completed missions.",
            delay: 500,
            widget: 'reward_dashboard'
        },
        suggestedActions: [
            { label: 'Invite Friends', payload: 'invite_friends' },
            { label: 'Join Community', payload: 'community_preview' }
        ]
    },

    {
        id: 'invite_friends',
        triggers: ['invite', 'referral', 'share'],
        response: {
            text: "**Invite Friends**\nShare your unique invite link to earn bonus $twin3 tokens.",
            delay: 500,
            widget: 'invite_friends'
        },
        suggestedActions: [
            { label: 'View Rewards', payload: 'show_rewards' },
            { label: 'Join Community', payload: 'community_preview' }
        ]
    },

    {
        id: 'community_preview',
        triggers: ['community', 'future', 'upcoming'],
        response: {
            text: "**Community & Upcoming Tasks**\nExplore the twin3 community and preview future earning opportunities.",
            delay: 500,
            widget: 'community_preview'
        },
        suggestedActions: [
            { label: 'View Rewards', payload: 'show_rewards' },
            { label: 'Invite Friends', payload: 'invite_friends' }
        ]
    },

    {
        id: 'airdrop_tasks',
        triggers: ['boost', 'tasks', 'missions'],
        response: {
            text: "**Complete Missions to Maximize Your Airdrop**\n\nThe total airdrop pool is 10,000 $twin3. Your share is calculated based on your Matrix score and completed missions.\n\nComplete all 4 missions below to maximize your rewards!",
            delay: 500,
            widget: 'airdrop_task_dashboard'
        },
        suggestedActions: [
            { label: 'View My Matrix', payload: 'twin_matrix' }
        ]
    },

    {
        id: 'final_reward',
        triggers: ['final', 'complete'],
        response: {
            text: "**All Missions Complete!**\n\nCalculating your airdrop share...",
            delay: 500,
            widget: 'final_reward_dashboard'
        },
        suggestedActions: [
            { label: 'Invite Friends', payload: 'invite_friends' },
            { label: 'Join Community', payload: 'community_preview' }
        ]
    }
];
