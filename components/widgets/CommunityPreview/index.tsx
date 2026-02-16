import { Users, Zap, Target, Gift } from 'lucide-react';
import { CommunityPreviewView } from './CommunityPreview.view';

export interface CommunityPreviewProps {
  onJoinCommunity?: () => void;
  onClose?: () => void;
}

export interface FutureTask {
  id: string;
  title: string;
  description: string;
  reward: string;
  icon: React.ElementType;
  locked: boolean;
}

const FUTURE_TASKS: FutureTask[] = [
  {
    id: 'social_connect',
    title: 'Connect Social Accounts',
    description: 'Link Twitter, Instagram, or TikTok for identity boost',
    reward: '+100 $twin3',
    icon: Zap,
    locked: true,
  },
  {
    id: 'content_creator',
    title: 'Content Creator Challenge',
    description: 'Complete brand tasks and earn rewards',
    reward: '+500 $twin3',
    icon: Target,
    locked: true,
  },
  {
    id: 'dao_vote',
    title: 'DAO Governance Vote',
    description: 'Participate in community decision-making',
    reward: '+200 $twin3',
    icon: Users,
    locked: true,
  },
  {
    id: 'referral_milestone',
    title: 'Referral Milestone',
    description: 'Invite 10 friends to unlock bonus rewards',
    reward: '+1000 $twin3',
    icon: Gift,
    locked: true,
  },
];

export const CommunityPreview = ({
  onJoinCommunity,
  onClose,
}: CommunityPreviewProps) => {
  return (
    <CommunityPreviewView
      futureTasks={FUTURE_TASKS}
      onJoinCommunity={onJoinCommunity}
      onClose={onClose}
    />
  );
};
