import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Icon } from './Icon';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  className?: string;
  disabled?: boolean;
  maxHeight?: string;
}

const FilterDropdown = React.forwardRef<HTMLDivElement, FilterDropdownProps>(
  ({
    label,
    options,
    selectedValues,
    onSelectionChange,
    placeholder = 'Select options...',
    multiple = true,
    className,
    disabled = false,
    maxHeight = '200px',
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    const handleOptionClick = (optionValue: string) => {
      if (multiple) {
        const newSelection = selectedValues.includes(optionValue)
          ? selectedValues.filter(v => v !== optionValue)
          : [...selectedValues, optionValue];
        onSelectionChange(newSelection);
      } else {
        onSelectionChange([optionValue]);
        setIsOpen(false);
      }
    };

    const handleClearAll = () => {
      onSelectionChange([]);
    };

    const getSelectedLabels = () => {
      if (selectedValues.length === 0) return placeholder;
      if (selectedValues.length === 1) {
        const option = options.find(opt => opt.value === selectedValues[0]);
        return option?.label || selectedValues[0];
      }
      return `${selectedValues.length} selected`;
    };

    const getSelectedCount = () => {
      return selectedValues.length;
    };

    return (
      <div ref={ref || dropdownRef} className={cn('relative', className)} {...props}>
        {/* Trigger Button */}
        <Button
          variant="outline"
          onClick={handleToggle}
          disabled={disabled}
          className={cn(
            'w-full justify-between text-left font-normal',
            selectedValues.length > 0 && 'border-blue-500 bg-blue-50 dark:bg-blue-900/50 dark:border-blue-700',
            disabled && 'cursor-not-allowed opacity-50'
          )}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className="truncate">
            {label}: {getSelectedLabels()}
          </span>
          <div className="flex items-center space-x-1">
            {selectedValues.length > 0 && (
              <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-1.5 py-0.5 rounded-full">
                {getSelectedCount()}
              </span>
            )}
            <Icon
              name={isOpen ? 'ChevronUpIcon' : 'ChevronDownIcon'}
              size="sm"
              className="text-gray-400"
            />
          </div>
        </Button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-md shadow-lg"
            role="listbox"
            aria-multiselectable={multiple}
          >
            {/* Header with Clear Button */}
            {selectedValues.length > 0 && (
              <div className="flex items-center justify-between p-2 border-b border-gray-100 dark:border-slate-700">
                <span className="text-sm text-gray-600 dark:text-slate-400">
                  {getSelectedCount()} selected
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  Clear all
                </Button>
              </div>
            )}

            {/* Options List */}
            <div
              className="max-h-48 overflow-y-auto"
              style={{ maxHeight }}
            >
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <button
                    key={option.value}
                    onClick={() => handleOptionClick(option.value)}
                    className={cn(
                      'w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-slate-700 focus:bg-gray-50 dark:focus:bg-slate-700 focus:outline-none',
                      'flex items-center justify-between',
                      isSelected && 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    )}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span className="text-sm">{option.label}</span>
                    <div className="flex items-center space-x-2">
                      {option.count !== undefined && (
                        <span className="text-xs text-gray-400 dark:text-slate-500">
                          ({option.count})
                        </span>
                      )}
                      {isSelected && (
                        <Icon
                          name="CheckCircleIcon"
                          size="sm"
                          className="text-blue-500"
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer with Apply Button (for multiple selection) */}
            {multiple && (
              <div className="p-2 border-t border-gray-100 dark:border-slate-700">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="w-full"
                >
                  Apply Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

FilterDropdown.displayName = 'FilterDropdown';

export { FilterDropdown, type FilterOption, type FilterDropdownProps };
