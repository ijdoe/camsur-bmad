import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Icon } from './Icon';
import { Input } from './Input';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  showClearButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({
    placeholder = 'Search insights, areas, or data...',
    value = '',
    onChange,
    onSearch,
    onClear,
    className,
    disabled = false,
    autoFocus = false,
    showClearButton = true,
    size = 'md',
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setInternalValue(value);
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(newValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };

    const handleSearch = () => {
      const query = internalValue.trim();
      if (query) {
        onSearch?.(query);
      }
    };

    const handleClear = () => {
      setInternalValue('');
      onChange?.('');
      onClear?.();
      inputRef.current?.focus();
    };

    const sizeClasses = {
      sm: 'h-8 text-sm',
      md: 'h-10 text-base',
      lg: 'h-12 text-lg',
    };

    return (
      <div className={cn('relative flex items-center', className)}>
        {/* Search Icon */}
        <div className="absolute left-3 z-10">
          <Icon
            name="MagnifyingGlassIcon"
            size="md"
            className="text-gray-400"
          />
        </div>

        {/* Input Field */}
        <Input
          ref={ref || inputRef}
          type="text"
          placeholder={placeholder}
          value={internalValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          autoFocus={autoFocus}
          className={cn(
            'pl-10 pr-10 transition-colors',
            sizeClasses[size],
            'focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
            disabled && 'cursor-not-allowed'
          )}
          {...props}
        />

        {/* Clear/Search Buttons */}
        <div className="absolute right-2 flex items-center space-x-1">
          {showClearButton && internalValue && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              disabled={disabled}
              className="h-6 w-6 p-0 hover:bg-gray-100"
              aria-label="Clear search"
            >
              <Icon name="XMarkIcon" size="sm" className="text-gray-400" />
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSearch}
            disabled={disabled || !internalValue.trim()}
            className="h-6 w-6 p-0 hover:bg-gray-100"
            aria-label="Search"
          >
            <Icon name="MagnifyingGlassIcon" size="sm" className="text-gray-400" />
          </Button>
        </div>
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export { SearchBar, type SearchBarProps };
