import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Icon } from './Icon';
import { StatusIndicator } from './StatusIndicator';

interface InsightCardData {
  id: string;
  insightType: string;
  affectedArea: string;
  severity: number;
  confidence: number;
  timestamp: Date;
  status: 'Draft' | 'Pending Review' | 'Approved' | 'Disseminated' | 'Rescinded';
  hotspotScore?: number;
}

interface InsightCardProps extends React.HTMLAttributes<HTMLButtonElement> {
  insight: InsightCardData;
  isSelected: boolean;
  onAction: (insightId: string, action: string) => void;
  className?: string;
  viewMode?: 'list' | 'grid';
}

const insightCardVariants = cva(
  'relative w-full text-left p-4 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg border bg-white dark:bg-slate-800 shadow-sm hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-700/50',
  {
    variants: {
      isSelected: {
        true: 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 shadow-md',
        false: 'border-gray-200 dark:border-slate-700',
      },
    },
    defaultVariants: {
      isSelected: false,
    },
  }
);

const InsightCard = React.forwardRef<HTMLButtonElement, InsightCardProps>(
  ({ insight, isSelected, onClick, onAction, className, viewMode = 'list', ...props }, ref) => {
    const formatTimestamp = (date: Date) => {
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

      if (diffInMinutes < 1) return 'Just now';
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
      return date.toLocaleDateString();
    };

    const fullAriaLabel = `Insight: ${insight.insightType} for ${insight.affectedArea}. Severity Level ${insight.severity}. Confidence ${insight.confidence}%. Status: ${insight.status}. Press to view details.`;

    return (
      <button
        ref={ref}
        className={cn(insightCardVariants({ isSelected, className }))}
        onClick={onClick}
        aria-label={fullAriaLabel}
        {...props}
      >
        {/* Grip Handle */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300 dark:bg-slate-600 rounded-l-lg" />

        <div className="pl-2 flex flex-col min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-2 gap-2">
            <h3 className={cn("font-semibold text-gray-900 dark:text-slate-100 flex-1 min-w-0", viewMode === 'list' ? 'text-base' : 'text-sm')}>
              <span className="block truncate">{insight.insightType}</span>
            </h3>
            <Button
              variant="tertiary"
              size="sm"
              className="h-7 w-7 p-1 flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                onAction(insight.id, 'menu');
              }}
              aria-label={`Actions for insight ${insight.id}`}
            >
              <Icon name="EllipsisVerticalIcon" size="sm" />
            </Button>
          </div>

          {/* Content Body */}
          <div className="mb-3">
            <p className={cn("text-gray-600 dark:text-slate-300", viewMode === 'list' ? 'text-sm' : 'text-xs')}>
              <span className="block truncate">{insight.affectedArea}</span>
            </p>
            <div className={cn("flex items-center space-x-3 text-xs text-gray-500 dark:text-slate-400 mt-2", viewMode === 'grid' && 'flex-wrap gap-x-2')}>
              <div className="flex items-center">
                <Icon name="ExclamationTriangleIcon" size="sm" className="mr-1" />
                <span>S{insight.severity}</span>
              </div>
              <div className="flex items-center">
                <Icon name="ChartBarIcon" size="sm" className="mr-1" />
                <span>{insight.confidence}%</span>
              </div>
              {insight.hotspotScore && (
                <div className="flex items-center">
                  <Icon name="FireIcon" size="sm" className="mr-1" />
                  <span>{insight.hotspotScore}</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <StatusIndicator status={insight.status as any} />
            <span className="text-xs text-gray-500 dark:text-slate-400">
              {formatTimestamp(insight.timestamp)}
            </span>
          </div>
        </div>
      </button>
    );
  }
);

InsightCard.displayName = 'InsightCard';

export { InsightCard, type InsightCardData, type InsightCardProps };
