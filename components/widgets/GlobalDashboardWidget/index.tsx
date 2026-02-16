import { useState } from 'react';
import { Target, ChevronRight, Lock, Plus } from 'lucide-react';
import { GlobalDashboardWidgetView } from './GlobalDashboardWidget.view';

export interface GlobalDashboardWidgetProps {
  onViewTask?: (taskId: string) => void;
}

export type TabType = 'active' | 'review' | 'history';

export interface Twin3Task {
  id: string;
  type: 'brand' | 'verification';
  title: string;
  brand: string;
  deadline?: string;
  reward: number;
  progress: { current: number; total: number };
  icon?: React.ElementType;
  iconColor?: string;
  imageUrl?: string;
  status: TabType;
}

const MOCK_TASKS: Twin3Task[] = [
  // Active Tasks
  {
    id: 'share_on_x',
    type: 'brand',
    title: 'Share your Twin Matrix',
    brand: 'X (Twitter)',
    deadline: '24h left',
    reward: 200,
    progress: { current: 1, total: 2 },
    imageUrl: '/brands/x-black.png',
    iconColor: '#000000',
    status: 'active',
  },
  {
    id: 'proof_of_humanity',
    type: 'verification',
    title: 'Proof of Humanity',
    brand: 'twin3 protocol',
    reward: 100,
    progress: { current: 1, total: 3 },
    imageUrl: '/brands/twin3-black-half.png',
    iconColor: '#3B82F6',
    status: 'active',
  },
  // In Review
  {
    id: 'connect_linkedin',
    type: 'verification',
    title: 'Connect Professional Identity',
    brand: 'LinkedIn',
    deadline: '1h ago',
    reward: 500,
    progress: { current: 1, total: 1 },
    imageUrl: '/brands/linkedin-black.png',
    iconColor: '#0077B5',
    status: 'review',
  },
  // History
  {
    id: 'loreal_campaign',
    type: 'brand',
    title: 'Lipstick Challenge',
    brand: "L'Oréal Paris",
    deadline: 'Dec 15',
    reward: 500,
    progress: { current: 4, total: 4 },
    imageUrl: '/brands/loreal.png',
    iconColor: '#E1306C',
    status: 'history',
  },
];

export const GlobalDashboardWidget = ({ onViewTask }: GlobalDashboardWidgetProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('active');
  const [hoveredTooltip, setHoveredTooltip] = useState<{
    id: string;
    type: 'title' | 'brand';
  } | null>(null);

  const filteredTasks = MOCK_TASKS.filter((t) => t.status === activeTab);

  // Calculate Stats
  const totalPending = MOCK_TASKS.filter((t) => t.status !== 'history').reduce(
    (sum, t) => sum + t.reward,
    0
  );
  const activeCount = MOCK_TASKS.filter((t) => t.status === 'active').length;

  const getTaskCount = (tab: TabType) => MOCK_TASKS.filter((t) => t.status === tab).length;

  return (
    <GlobalDashboardWidgetView
      activeTab={activeTab}
      filteredTasks={filteredTasks}
      totalPending={totalPending}
      activeCount={activeCount}
      hoveredTooltip={hoveredTooltip}
      onTabChange={setActiveTab}
      onViewTask={onViewTask}
      onHoverTooltip={setHoveredTooltip}
      getTaskCount={getTaskCount}
    />
  );
};
