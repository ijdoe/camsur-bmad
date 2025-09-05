import React from 'react';
import { cn } from '@/lib/utils';
import * as HIcons from '@heroicons/react/24/outline';

export type IconName = keyof typeof HIcons;

interface IconProps {
  name: IconName;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 'md', className }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  const IconComponent = HIcons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return React.createElement('div', {
      className: cn('inline-flex items-center justify-center', sizeClasses[size], className),
    }, '?');
  }

  return React.createElement(IconComponent, {
    className: cn(sizeClasses[size], className),
  });
};

export { Icon };
