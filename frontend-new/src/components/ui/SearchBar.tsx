'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Icon } from './Icon';
import { Input } from './Input';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'history' | 'suggestion';
}

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  className?: string;
  placeholder?: string;
  suggestions?: string[];
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ value, onChange, onClear, className, placeholder = 'Search insights...', suggestions = [], ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Load search history from localStorage
    useEffect(() => {
      const saved = localStorage.getItem('lingkod-search-history');
      if (saved) {
        try {
          setSearchHistory(JSON.parse(saved));
        } catch (error) {
          console.warn('Failed to parse search history:', error);
        }
      }
    }, []);

    // Save search history to localStorage
    const saveToHistory = (query: string) => {
      if (query.trim()) {
        const updated = [query, ...searchHistory.filter(h => h !== query)].slice(0, 10);
        setSearchHistory(updated);
        localStorage.setItem('lingkod-search-history', JSON.stringify(updated));
      }
    };

    // Generate suggestions based on current input
    const getSuggestions = (): SearchSuggestion[] => {
      if (!value.trim()) {
        return searchHistory.slice(0, 5).map((text, index) => ({
          id: `history-${index}`,
          text,
          type: 'history' as const
        }));
      }

      const filtered = suggestions.filter(s =>
        s.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);

      return filtered.map((text, index) => ({
        id: `suggestion-${index}`,
        text,
        type: 'suggestion' as const
      }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
      setShowSuggestions(true);
    };

    const handleSuggestionClick = (suggestion: SearchSuggestion) => {
      onChange(suggestion.text);
      setShowSuggestions(false);
      if (suggestion.type === 'history') {
        // Don't save history items again
      } else {
        saveToHistory(suggestion.text);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        setShowSuggestions(false);
        saveToHistory(value);
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    };

    const handleFocus = () => {
      setIsFocused(true);
      setShowSuggestions(true);
    };

    const handleBlur = () => {
      // Delay hiding suggestions to allow for clicks
      setTimeout(() => {
        setIsFocused(false);
        setShowSuggestions(false);
      }, 200);
    };

    const handleClear = () => {
      onClear();
      setShowSuggestions(false);
    };

    const currentSuggestions = getSuggestions();

    return (
      <div ref={containerRef} className={cn('relative flex items-center', className)}>
        <Icon
          name="MagnifyingGlassIcon"
          size="sm"
          className="absolute left-3 text-gray-400"
        />
        <Input
          ref={ref}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10 w-full"
          placeholder={placeholder}
          {...props}
        />
        {value && (
          <Button
            variant="tertiary"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 h-7 w-7 p-1"
            aria-label="Clear search"
          >
            <Icon name="XMarkIcon" size="sm" />
          </Button>
        )}

        {/* Suggestions Dropdown */}
        {showSuggestions && currentSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-md shadow-lg max-h-64 overflow-y-auto">
            {currentSuggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-slate-700 focus:bg-gray-50 dark:focus:bg-slate-700 focus:outline-none flex items-center space-x-2"
              >
                <Icon
                  name={suggestion.type === 'history' ? 'ClockIcon' : 'MagnifyingGlassIcon'}
                  size="sm"
                  className="text-gray-400 flex-shrink-0"
                />
                <span className="text-sm text-gray-900 dark:text-white truncate">
                  {suggestion.text}
                </span>
                {suggestion.type === 'history' && (
                  <span className="text-xs text-gray-500 dark:text-slate-400 ml-auto">
                    Recent
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export { SearchBar, type SearchBarProps, type SearchSuggestion };
