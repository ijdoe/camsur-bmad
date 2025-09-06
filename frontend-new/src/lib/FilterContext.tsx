'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface FilterState {
  selectedProvince: string;
  selectedMunicipality: string;
  selectedBarangay: string;
  searchQuery: string;
  selectedStatuses: string[];
  selectedSeverities: string[];
  timeRange: { start: Date | null; end: Date | null };
  customTimeRangeLabel: string;
  sortBy: 'priority' | 'timestamp' | 'severity' | 'confidence';
  sortDirection: 'asc' | 'desc';
}

interface FilterContextType {
  filters: FilterState;
  updateFilters: (updates: Partial<FilterState>) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

const defaultFilters: FilterState = {
  selectedProvince: '',
  selectedMunicipality: '',
  selectedBarangay: '',
  searchQuery: '',
  selectedStatuses: [],
  selectedSeverities: [],
  timeRange: { start: null, end: null },
  customTimeRangeLabel: '',
  sortBy: 'priority',
  sortDirection: 'desc',
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>(() => {
    // Try to load from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lingkod-filters');
      if (saved) {
        try {
          return { ...defaultFilters, ...JSON.parse(saved) };
        } catch (error) {
          console.warn('Failed to parse saved filters:', error);
        }
      }
    }
    return defaultFilters;
  });

  // Save to localStorage whenever filters change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lingkod-filters', JSON.stringify(filters));
    }
  }, [filters]);

  const updateFilters = (updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const hasActiveFilters = filters.searchQuery !== '' ||
    filters.selectedStatuses.length > 0 ||
    filters.selectedSeverities.length > 0 ||
    filters.selectedMunicipality !== '' ||
    filters.selectedProvince !== '' ||
    filters.selectedBarangay !== '' ||
    filters.timeRange.start !== null ||
    filters.timeRange.end !== null;

  return (
    <FilterContext.Provider value={{
      filters,
      updateFilters,
      resetFilters,
      hasActiveFilters,
    }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
