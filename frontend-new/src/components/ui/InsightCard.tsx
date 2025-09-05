import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Icon } from './Icon';

interface InsightCardData {
  id: string;
  insightType: string;
  affectedArea: string;
  severity: number; // 1-5 scale
  confidence: number; // 0-100 percentage
  timestamp: Date;
  status: 'Draft' | 'Pending Review' | 'Approved' | 'Disseminated' | 'Rescinded';
  geometry?: any; // GeoJSON.Polygon
}

interface InsightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  insight: InsightCardData;
  onClick?: () => void;
  className?: string;
}

const insightCardVariants = cva(
  'relative cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg border bg-white shadow-sm hover:shadow-md',
  {
    variants: {
      severity: {
        1: 'border-l-4 border-l-green-500', // Low severity
        2: 'border-l-4 border-l-green-500',
        3: 'border-l-4 border-l-yellow-500', // Medium severity
        4: 'border-l-4 border-l-red-500', // High severity
        5: 'border-l-4 border-l-red-500',
      },
      status: {
        'Draft': 'bg-gray-50',
        'Pending Review': '',
        'Approved': 'bg-green-50 border-green-200',
        'Disseminated': 'bg-blue-50 border-blue-200',
        'Rescinded': 'bg-gray-50 border-gray-200',
      },
    },
    defaultVariants: {
      severity: 1,
      status: 'Pending Review',
    },
  }
);

const statusIconMap = {
  'Draft': 'InformationCircleIcon',
  'Pending Review': 'BellIcon',
  'Approved': 'CheckCircleIcon',
  'Disseminated': 'PlayIcon',
  'Rescinded': 'XCircleIcon',
} as const;

const statusColorMap = {
  'Draft': 'text-gray-500',
  'Pending Review': 'text-blue-500',
  'Approved': 'text-green-500',
  'Disseminated': 'text-blue-500',
  'Rescinded': 'text-gray-500',
} as const;

const InsightCard = React.forwardRef<HTMLDivElement, InsightCardProps>(
  ({ insight, onClick, className, ...props }, ref) => {
    const formatTimestamp = (date: Date) => {
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

      if (diffInMinutes < 1) return 'Just now';
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
      return date.toLocaleDateString();
    };

    const getSeverityLabel = (severity: number) => {
      if (severity <= 2) return 'Low';
      if (severity <= 3) return 'Medium';
      return 'High';
    };

    const getSeverityColor = (severity: number) => {
      if (severity <= 2) return 'text-green-600';
      if (severity <= 3) return 'text-yellow-600';
      return 'text-red-600';
    };

    return (
      <div
        ref={ref}
        className={cn(
          insightCardVariants({
            severity: insight.severity as any,
            status: insight.status,
            className
          })
        )}
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={`Review insight: ${insight.insightType} for ${insight.affectedArea}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
        {...props}
      >
        {/* Status Icon */}
        <div className="absolute top-3 right-3">
          <Icon
            name={statusIconMap[insight.status]}
            className={cn('h-5 w-5', statusColorMap[insight.status])}
          />
        </div>

        {/* Status Badge */}
        {insight.status !== 'Pending Review' && (
          <div className="absolute top-3 left-3">
            <span className={cn(
              'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
              insight.status === 'Approved' && 'bg-green-100 text-green-800',
              insight.status === 'Disseminated' && 'bg-blue-100 text-blue-800',
              insight.status === 'Rescinded' && 'bg-gray-100 text-gray-800',
              insight.status === 'Draft' && 'bg-gray-100 text-gray-800'
            )}>
              {insight.status}
            </span>
          </div>
        )}

        <div className="p-4 pt-12">
          {/* Insight Type */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {insight.insightType}
          </h3>

          {/* Affected Area */}
          <p className="text-sm text-gray-600 mb-3">
            {insight.affectedArea}
          </p>

          {/* Severity and Confidence */}
          <div className="flex items-center justify-between text-xs mb-4">
            <span className={cn('font-medium', getSeverityColor(insight.severity))}>
              {getSeverityLabel(insight.severity)} Severity
            </span>
            <span className="text-gray-500">
              {insight.confidence}% confidence
            </span>
          </div>

          {/* Timestamp */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {formatTimestamp(insight.timestamp)}
            </span>

            {/* Quick Action Button */}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
            >
              Review
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

InsightCard.displayName = 'InsightCard';

export { InsightCard, type InsightCardData, type InsightCardProps };
