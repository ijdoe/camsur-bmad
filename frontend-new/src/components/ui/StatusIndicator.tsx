import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

type StatusType =
  | 'normal'
  | 'warning'
  | 'critical'
  | 'draft'
  | 'pending'
  | 'approved'
  | 'disseminated'
  | 'rescinded'
  | 'active'
  | 'inactive'
  | 'online'
  | 'offline'
  | 'maintenance';

interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusType;
  label?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outlined' | 'dot';
}

const statusConfig = {
  normal: {
    label: 'Normal',
    color: 'green',
    icon: 'CheckCircleIcon',
  },
  warning: {
    label: 'Warning',
    color: 'yellow',
    icon: 'ExclamationTriangleIcon',
  },
  critical: {
    label: 'Critical',
    color: 'red',
    icon: 'XCircleIcon',
  },
  draft: {
    label: 'Draft',
    color: 'gray',
    icon: 'InformationCircleIcon',
  },
  pending: {
    label: 'Pending',
    color: 'blue',
    icon: 'BellIcon',
  },
  approved: {
    label: 'Approved',
    color: 'green',
    icon: 'CheckCircleIcon',
  },
  disseminated: {
    label: 'Disseminated',
    color: 'blue',
    icon: 'PlayIcon',
  },
  rescinded: {
    label: 'Rescinded',
    color: 'gray',
    icon: 'XCircleIcon',
  },
  active: {
    label: 'Active',
    color: 'green',
    icon: 'CheckCircleIcon',
  },
  inactive: {
    label: 'Inactive',
    color: 'gray',
    icon: 'XCircleIcon',
  },
  online: {
    label: 'Online',
    color: 'green',
    icon: 'CheckCircleIcon',
  },
  offline: {
    label: 'Offline',
    color: 'red',
    icon: 'XCircleIcon',
  },
  maintenance: {
    label: 'Maintenance',
    color: 'yellow',
    icon: 'CogIcon',
  },
} as const;

const statusIndicatorVariants = cva(
  'inline-flex items-center gap-1.5 font-medium transition-colors',
  {
    variants: {
      variant: {
        filled: '',
        outlined: 'border',
        dot: 'gap-2',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs rounded',
        md: 'px-2.5 py-1 text-sm rounded-md',
        lg: 'px-3 py-1.5 text-base rounded-lg',
      },
      color: {
        green: '',
        yellow: '',
        red: '',
        blue: '',
        gray: '',
      },
    },
    compoundVariants: [
      // Filled variant colors
      {
        variant: 'filled',
        color: 'green',
        class: 'bg-green-100 text-green-800',
      },
      {
        variant: 'filled',
        color: 'yellow',
        class: 'bg-yellow-100 text-yellow-800',
      },
      {
        variant: 'filled',
        color: 'red',
        class: 'bg-red-100 text-red-800',
      },
      {
        variant: 'filled',
        color: 'blue',
        class: 'bg-blue-100 text-blue-800',
      },
      {
        variant: 'filled',
        color: 'gray',
        class: 'bg-gray-100 text-gray-800',
      },
      // Outlined variant colors
      {
        variant: 'outlined',
        color: 'green',
        class: 'border-green-200 text-green-800 bg-green-50',
      },
      {
        variant: 'outlined',
        color: 'yellow',
        class: 'border-yellow-200 text-yellow-800 bg-yellow-50',
      },
      {
        variant: 'outlined',
        color: 'red',
        class: 'border-red-200 text-red-800 bg-red-50',
      },
      {
        variant: 'outlined',
        color: 'blue',
        class: 'border-blue-200 text-blue-800 bg-blue-50',
      },
      {
        variant: 'outlined',
        color: 'gray',
        class: 'border-gray-200 text-gray-800 bg-gray-50',
      },
      // Dot variant colors
      {
        variant: 'dot',
        color: 'green',
        class: 'text-green-700',
      },
      {
        variant: 'dot',
        color: 'yellow',
        class: 'text-yellow-700',
      },
      {
        variant: 'dot',
        color: 'red',
        class: 'text-red-700',
      },
      {
        variant: 'dot',
        color: 'blue',
        class: 'text-blue-700',
      },
      {
        variant: 'dot',
        color: 'gray',
        class: 'text-gray-700',
      },
    ],
    defaultVariants: {
      variant: 'filled',
      size: 'md',
    },
  }
);

const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({
    status,
    label,
    showIcon = true,
    size = 'md',
    variant = 'filled',
    className,
    ...props
  }, ref) => {
    const config = statusConfig[status];
    if (!config) {
      // Handle invalid status gracefully
      return (
        <div ref={ref} className={cn('inline-flex items-center gap-1.5 font-medium text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-800', className)} {...props}>
          <Icon name="InformationCircleIcon" size="sm" />
          <span>{status}</span>
        </div>
      );
    }
    const displayLabel = label || config.label;

    if (variant === 'dot') {
      return (
        <div
          ref={ref}
          className={cn(
            statusIndicatorVariants({ variant, size, color: config.color }),
            className
          )}
          {...props}
        >
          <div
            className={cn(
              'w-2 h-2 rounded-full',
              config.color === 'green' && 'bg-green-500',
              config.color === 'yellow' && 'bg-yellow-500',
              config.color === 'red' && 'bg-red-500',
              config.color === 'blue' && 'bg-blue-500',
              config.color === 'gray' && 'bg-gray-500'
            )}
          />
          <span>{displayLabel}</span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          statusIndicatorVariants({ variant, size, color: config.color }),
          className
        )}
        {...props}
      >
        {showIcon && (
          <Icon
            name={config.icon}
            size={size === 'sm' ? 'sm' : 'md'}
            className={cn(
              config.color === 'green' && 'text-green-600',
              config.color === 'yellow' && 'text-yellow-600',
              config.color === 'red' && 'text-red-600',
              config.color === 'blue' && 'text-blue-600',
              config.color === 'gray' && 'text-gray-600'
            )}
          />
        )}
        <span>{displayLabel}</span>
      </div>
    );
  }
);

StatusIndicator.displayName = 'StatusIndicator';

export { StatusIndicator, type StatusType, type StatusIndicatorProps };
