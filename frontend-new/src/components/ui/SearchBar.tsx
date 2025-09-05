import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Icon } from './Icon';
import { Input } from './Input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  className?: string;
  placeholder?: string;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ value, onChange, onClear, className, ...props }, ref) => {
    return (
      <div className={cn('relative flex items-center', className)}>
        <Icon
          name="MagnifyingGlassIcon"
          size="sm"
          className="absolute left-3 text-gray-400"
        />
        <Input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-10 w-full"
          {...props}
        />
        {value && (
          <Button
            variant="tertiary"
            size="sm"
            onClick={onClear}
            className="absolute right-2 h-7 w-7 p-1"
            aria-label="Clear search"
          >
            <Icon name="XMarkIcon" size="sm" />
          </Button>
        )}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export { SearchBar, type SearchBarProps };
