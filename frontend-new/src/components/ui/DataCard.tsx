import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';
import { StatusIndicator } from './StatusIndicator';
import { Button } from './Button';
import { Skeleton } from './Loading';

interface DataCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value?: string | number;
  subtitle?: string;
  status?: 'normal' | 'warning' | 'critical' | 'offline';
  icon?: string;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
  metadata?: Array<{
    label: string;
    value: string | number;
  }>;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'ghost';
  }>;
  variant?: 'default' | 'compact' | 'detailed';
  loading?: boolean;
}

const dataCardVariants = cva(
  'bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'p-6',
        compact: 'p-4',
        detailed: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const DataCard = React.forwardRef<HTMLDivElement, DataCardProps>(
  ({
    title,
    value,
    subtitle,
    status,
    icon,
    trend,
    metadata = [],
    actions = [],
    variant = 'default',
    loading = false,
    className,
    ...props
  }, ref) => {
    const getTrendIcon = (direction: 'up' | 'down' | 'neutral') => {
      switch (direction) {
        case 'up':
          return 'ChevronUpIcon';
        case 'down':
          return 'ChevronDownIcon';
        default:
          return 'MinusIcon';
      }
    };

    const getTrendColor = (direction: 'up' | 'down' | 'neutral') => {
      switch (direction) {
        case 'up':
          return 'text-green-600';
        case 'down':
          return 'text-red-600';
        default:
          return 'text-gray-600';
      }
    };

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(dataCardVariants({ variant }), className)}
          {...props}
        >
          <div className="animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(dataCardVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="flex-shrink-0">
                <Icon name={icon as any} size="lg" className="text-gray-600" />
              </div>
            )}
            <div>
              <h3 className="text-sm font-medium text-gray-900">{title}</h3>
              {subtitle && (
                <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
              )}
            </div>
          </div>

          {status && (
            <StatusIndicator
              status={status}
              size="sm"
              variant="filled"
            />
          )}
        </div>

        {/* Value and Trend */}
        {(value !== undefined || trend) && (
          <div className="mb-4">
            {value !== undefined && (
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </div>
            )}

            {trend && (
              <div className="flex items-center space-x-1">
                <Icon
                  name={getTrendIcon(trend.direction) as any}
                  size="sm"
                  className={getTrendColor(trend.direction)}
                />
                <span className={cn(
                  'text-sm font-medium',
                  getTrendColor(trend.direction)
                )}>
                  {trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Metadata */}
        {metadata.length > 0 && variant === 'detailed' && (
          <div className="space-y-2 mb-4">
            {metadata.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{item.label}:</span>
                <span className="font-medium text-gray-900">
                  {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        {actions.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'outline'}
                size="sm"
                onClick={action.onClick}
                className="text-xs"
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

DataCard.displayName = 'DataCard';

export { DataCard, type DataCardProps };
