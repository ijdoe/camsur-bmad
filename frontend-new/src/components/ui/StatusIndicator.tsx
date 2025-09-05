import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './Badge';

type StatusType =
  | 'Draft'
  | 'Pending Review'
  | 'Approved'
  | 'Disseminated'
  | 'Rescinded'
  | 'critical'
  | 'warning'
  | 'normal'
  | 'offline'
  | 'inactive';

interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusType;
}

const statusConfig = {
  'Draft': { label: 'Draft', variant: 'secondary' },
  'Pending Review': { label: 'Pending Review', variant: 'default' },
  'Approved': { label: 'Approved', variant: 'default' },
  'Disseminated': { label: 'Disseminated', variant: 'default' },
  'Rescinded': { label: 'Rescinded', variant: 'secondary' },
  'critical': { label: 'Critical', variant: 'destructive' },
  'warning': { label: 'Warning', variant: 'secondary' },
  'normal': { label: 'Normal', variant: 'default' },
  'offline': { label: 'Offline', variant: 'secondary' },
  'inactive': { label: 'Inactive', variant: 'secondary' },
} as const;

const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({ status, className, ...props }, ref) => {
    const config = statusConfig[status];

    if (!config) {
      return null;
    }

    return (
      <Badge
        ref={ref}
        variant={config.variant as any}
        className={cn('capitalize', className)}
        {...props}
      >
        {config.label}
      </Badge>
    );
  }
);

StatusIndicator.displayName = 'StatusIndicator';

export { StatusIndicator, type StatusType, type StatusIndicatorProps };
