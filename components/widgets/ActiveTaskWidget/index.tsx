import { useState } from 'react';
import { ActiveTaskWidgetView } from './ActiveTaskWidget.view';

export interface ActiveTaskWidgetProps {
  taskTitle?: string;
  brandName?: string;
  rewardAmount?: string;
  deadline?: string;
  requirements?: string[];
  onVerify?: (url: string) => void;
}

export type TaskStatus = 'active' | 'submitting' | 'verified';

export const ActiveTaskWidget = ({
  taskTitle = 'Lipstick Filter Challenge',
  brandName = "L'Oréal Paris",
  rewardAmount = '500',
  deadline = '2 days',
  requirements = [
    'Use Filter #666',
    'Mention "Moisturizing"',
    'Tag @lorealparis',
    'Video length 15-60s',
  ],
  onVerify,
}: ActiveTaskWidgetProps) => {
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [status, setStatus] = useState<TaskStatus>('active');
  const [checkedReqs, setCheckedReqs] = useState<number[]>([]);

  const toggleReq = (index: number) => {
    setCheckedReqs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleVerify = () => {
    if (!submissionUrl) return;
    setStatus('submitting');

    // Mock verification delay
    setTimeout(() => {
      setStatus('verified');
      onVerify?.(submissionUrl);
    }, 1500);
  };

  return (
    <ActiveTaskWidgetView
      taskTitle={taskTitle}
      brandName={brandName}
      rewardAmount={rewardAmount}
      deadline={deadline}
      requirements={requirements}
      submissionUrl={submissionUrl}
      status={status}
      checkedReqs={checkedReqs}
      onSubmissionUrlChange={setSubmissionUrl}
      onToggleReq={toggleReq}
      onVerify={handleVerify}
    />
  );
};
