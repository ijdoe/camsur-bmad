import React from 'react';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { cn } from '@/lib/utils';

const alertVariants = {
  success: {
    container: 'bg-green-50 border-green-200 text-green-800',
    icon: 'text-green-400',
    iconComponent: CheckCircleIcon,
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    icon: 'text-yellow-400',
    iconComponent: ExclamationTriangleIcon,
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-800',
    icon: 'text-red-400',
    iconComponent: XCircleIcon,
  },
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-800',
    icon: 'text-blue-400',
    iconComponent: InformationCircleIcon,
  },
};

const alertTypes = {
  toast: 'fixed top-4 right-4 z-50 max-w-sm border-l-4 p-4 shadow-lg rounded-md',
  inline: 'w-full border p-4 rounded-md',
  banner: 'w-full border-b px-4 py-3',
};

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof alertVariants;
  type?: keyof typeof alertTypes;
  title?: string;
  message: string;
  onDismiss?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'info',
      type = 'inline',
      title,
      message,
      onDismiss,
      ...props
    },
    ref
  ) => {
    const {
      container: variantContainer,
      icon: iconColor,
      iconComponent: Icon,
    } = alertVariants[variant];
    const typeContainer = alertTypes[type];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(variantContainer, typeContainer, className)}
        {...props}
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <Icon className={cn('w-5 h-5', iconColor)} />
          </div>
          <div className="ml-3">
            {title && (
              <h3 className="text-sm font-medium">{title}</h3>
            )}
            <p className={cn('text-sm', title && 'mt-1')}>{message}</p>
          </div>
          {onDismiss && (
            <div className="ml-auto pl-3">
              <button
                onClick={onDismiss}
                className={cn(
                  'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  iconColor
                )}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert };
