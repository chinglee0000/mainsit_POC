import { useState } from 'react';
import { Trophy, CheckCircle, Coins, Users, Share2, Fingerprint, Gift } from 'lucide-react';
import { AirdropTaskDashboardView } from './AirdropTaskDashboard.view';

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  icon?: React.ElementType;
  iconUrl?: string;
  completed: boolean;
}

export interface AirdropTaskDashboardProps {
  matrixScore: number;
  onAllTasksComplete: (totalScore: number, totalReward: number) => void;
  onBiometricClick?: () => void;
  onShareClick?: () => void;
}

const INITIAL_TASKS: Task[] = [
  {
    id: 'biometric',
    title: 'Boost Humanity Index',
    description: 'Complete biometric verification',
    reward: 50,
    icon: Fingerprint,
    completed: false,
  },
  {
    id: 'share',
    title: 'Share twin3',
    description: 'Share your twin Matrix on social media',
    reward: 30,
    icon: Share2,
    completed: false,
  },
  {
    id: 'follow_x',
    title: 'Follow on X',
    description: 'Follow @twin3_ai on X (Twitter)',
    reward: 20,
    iconUrl: '/brands/x-white.png',
    completed: false,
  },
  {
    id: 'join_tg',
    title: 'Join Telegram',
    description: 'Join the twin3 Telegram community',
    reward: 20,
    iconUrl: '/brands/telegram_logo.svg',
    completed: false,
  },
  {
    id: 'join_discord',
    title: 'Join Discord',
    description: 'Join the twin3 Discord server',
    reward: 20,
    iconUrl: '/brands/Discord-Symbol-White.svg',
    completed: false,
  },
  {
    id: 'invite_friends',
    title: 'Invite Friends',
    description: 'Invite 3 friends to join twin3',
    reward: 30,
    icon: Users,
    completed: false,
  },
];

export const AirdropTaskDashboard = ({
  matrixScore,
  onAllTasksComplete,
  onBiometricClick,
  onShareClick,
}: AirdropTaskDashboardProps) => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [showPreview, setShowPreview] = useState(false);

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalReward = tasks.reduce((sum, t) => sum + (t.completed ? t.reward : 0), 0);
  const allCompleted = completedCount === tasks.length;

  // Calculate potential token share from airdrop pool
  const calculateTokenShare = (score: number, tasksCompleted: number) => {
    const scoreBonus = Math.round((score / 255) * 1500);
    const taskBonus = tasksCompleted * 100;
    return scoreBonus + taskBonus;
  };

  const potentialTokens = calculateTokenShare(matrixScore + totalReward, completedCount);

  const handleTaskClick = (taskId: string) => {
    if (taskId === 'biometric') {
      onBiometricClick?.();
    } else if (taskId === 'share') {
      onShareClick?.();
    } else if (taskId === 'follow_x') {
      window.open('https://x.com/twin3_ai', '_blank');
      setTimeout(() => completeTask(taskId), 1000);
    } else if (taskId === 'join_tg') {
      window.open('https://t.me/twin3_ai', '_blank');
      setTimeout(() => completeTask(taskId), 1000);
    } else if (taskId === 'join_discord') {
      window.open('https://discord.gg/G9hneaBRrh', '_blank');
      setTimeout(() => completeTask(taskId), 1000);
    } else if (taskId === 'invite_friends') {
      // Coming soon - do nothing for now
      return;
    }
  };

  const completeTask = (taskId: string) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, completed: true } : t)));

    const updatedTasks = tasks.map((t) => (t.id === taskId ? { ...t, completed: true } : t));
    const newCompletedCount = updatedTasks.filter((t) => t.completed).length;
    const newTotalReward = updatedTasks.reduce(
      (sum, t) => sum + (t.completed ? t.reward : 0),
      0
    );

    if (newCompletedCount === tasks.length) {
      setTimeout(() => {
        onAllTasksComplete(
          matrixScore + newTotalReward,
          calculateTokenShare(matrixScore + newTotalReward, newCompletedCount)
        );
      }, 1000);
    }
  };

  return (
    <AirdropTaskDashboardView
      tasks={tasks}
      completedCount={completedCount}
      totalReward={totalReward}
      allCompleted={allCompleted}
      potentialTokens={potentialTokens}
      showPreview={showPreview}
      onTaskClick={handleTaskClick}
      onTogglePreview={() => setShowPreview(!showPreview)}
    />
  );
};
