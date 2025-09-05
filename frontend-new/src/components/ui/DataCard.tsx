import React from 'react';
import { cn } from '@/lib/utils';
import { Icon, type IconName } from './Icon';

interface DataCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | React.ReactNode;
  icon: IconName;
  status?: 'normal' | 'warning' | 'critical';
}

const DataCard = React.forwardRef<HTMLDivElement, DataCardProps>(
  ({ title, value, icon, status, className, ...props }, ref) => {
    const getStatusColor = () => {
      switch (status) {
        case 'critical':
          return 'text-red-600 dark:text-red-400';
        case 'warning':
          return 'text-yellow-600 dark:text-yellow-400';
        default:
          return 'text-gray-900 dark:text-slate-100';
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700',
          className
        )}
        {...props}
      >
        <div className="flex items-start space-x-3">
          <Icon name={icon} size="sm" className="text-gray-500 dark:text-slate-400 mt-1" />
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-slate-300">{title}</p>
            <p className={cn('text-lg font-semibold', getStatusColor())}>
              {value}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

DataCard.displayName = 'DataCard';

export { DataCard, type DataCardProps };
