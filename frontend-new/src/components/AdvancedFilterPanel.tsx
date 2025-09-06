'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/Button';
import { FilterDropdown } from './ui/FilterDropdown';
import { Icon } from './ui/Icon';
import { useFilters } from '@/lib/FilterContext';
import type { FilterState } from '@/lib/FilterContext';

interface LocationOption {
  value: string;
  label: string;
}

interface TimeRangeOption {
  value: string;
  label: string;
  start?: Date;
  end?: Date;
}

// Mock location data for Camarines Sur
const provinces: LocationOption[] = [
  { value: 'camarines-sur', label: 'Camarines Sur' }
];

const municipalities: LocationOption[] = [
  { value: 'naga', label: 'Naga City' },
  { value: 'iriga', label: 'Iriga City' },
  { value: 'libmanan', label: 'Libmanan' },
  { value: 'pili', label: 'Pili' },
  { value: 'nabua', label: 'Nabua' },
  { value: 'bula', label: 'Bula' },
  { value: 'balatan', label: 'Balatan' },
  { value: 'bato', label: 'Bato' },
  { value: 'bombon', label: 'Bombon' },
  { value: 'buhi', label: 'Buhi' }
];

const barangays: LocationOption[] = [
  { value: 'san-roque', label: 'San Roque' },
  { value: 'san-antonio', label: 'San Antonio' },
  { value: 'san-jose', label: 'San Jose' },
  { value: 'san-miguel', label: 'San Miguel' },
  { value: 'san-rafael', label: 'San Rafael' },
  { value: 'san-vicente', label: 'San Vicente' },
  { value: 'santa-cruz', label: 'Santa Cruz' },
  { value: 'santa-elena', label: 'Santa Elena' },
  { value: 'santa-rosa', label: 'Santa Rosa' },
  { value: 'santo-domingo', label: 'Santo Domingo' }
];

const timeRangeOptions: TimeRangeOption[] = [
  { value: '1h', label: 'Last 1 hour', start: new Date(Date.now() - 60 * 60 * 1000), end: new Date() },
  { value: '6h', label: 'Last 6 hours', start: new Date(Date.now() - 6 * 60 * 60 * 1000), end: new Date() },
  { value: '24h', label: 'Last 24 hours', start: new Date(Date.now() - 24 * 60 * 60 * 1000), end: new Date() },
  { value: '7d', label: 'Last 7 days', start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), end: new Date() },
  { value: 'custom', label: 'Custom Range' }
];

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'disseminated', label: 'Disseminated' }
];

const severityOptions = [
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' }
];

interface SavedFilter {
  id: string;
  name: string;
  filters: FilterState;
  createdAt: Date;
}

interface AdvancedFilterPanelProps {
  className?: string;
}

export const AdvancedFilterPanel: React.FC<AdvancedFilterPanelProps> = ({ className }) => {
  const { filters, updateFilters, resetFilters, hasActiveFilters } = useFilters();
  const [isExpanded, setIsExpanded] = useState(false);
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newFilterName, setNewFilterName] = useState('');

  // Load saved filters from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('lingkod-saved-filters');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert date strings back to Date objects
        const filtersWithDates = parsed.map((filter: any) => ({
          ...filter,
          createdAt: new Date(filter.createdAt)
        }));
        setSavedFilters(filtersWithDates);
      } catch (error) {
        console.warn('Failed to parse saved filters:', error);
      }
    }
  }, []);

  // Save filters to localStorage whenever savedFilters changes
  useEffect(() => {
    localStorage.setItem('lingkod-saved-filters', JSON.stringify(savedFilters));
  }, [savedFilters]);

  const handleTimeRangeChange = (value: string) => {
    const option = timeRangeOptions.find(opt => opt.value === value);
    if (option) {
      if (value === 'custom') {
        updateFilters({
          timeRange: { start: null, end: null },
          customTimeRangeLabel: 'Custom Range'
        });
      } else {
        updateFilters({
          timeRange: { start: option.start || null, end: option.end || null },
          customTimeRangeLabel: option.label
        });
      }
    }
  };

  const handleLocationChange = (type: 'province' | 'municipality' | 'barangay', value: string) => {
    if (type === 'province') {
      updateFilters({
        selectedProvince: value,
        selectedMunicipality: '',
        selectedBarangay: ''
      });
    } else if (type === 'municipality') {
      updateFilters({
        selectedMunicipality: value,
        selectedBarangay: ''
      });
    } else {
      updateFilters({ selectedBarangay: value });
    }
  };

  const getCurrentTimeRangeLabel = () => {
    if (filters.customTimeRangeLabel) return filters.customTimeRangeLabel;
    if (filters.timeRange.start && filters.timeRange.end) {
      return 'Custom Range';
    }
    return 'All Time';
  };

  const saveCurrentFilter = () => {
    if (!hasActiveFilters) return;

    setNewFilterName('');
    setShowSaveDialog(true);
  };

  const confirmSaveFilter = () => {
    if (!newFilterName.trim()) return;

    const newFilter: SavedFilter = {
      id: `filter-${Date.now()}`,
      name: newFilterName.trim(),
      filters: { ...filters },
      createdAt: new Date()
    };

    setSavedFilters(prev => [newFilter, ...prev]);
    setShowSaveDialog(false);
    setNewFilterName('');
  };

  const loadSavedFilter = (savedFilter: SavedFilter) => {
    updateFilters(savedFilter.filters);
  };

  const deleteSavedFilter = (filterId: string) => {
    setSavedFilters(prev => prev.filter(f => f.id !== filterId));
  };

  return (
    <div className={cn('bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="AdjustmentsHorizontalIcon" size="sm" className="text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
          {hasActiveFilters && (
            <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="tertiary"
              size="sm"
              onClick={resetFilters}
              className="text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="tertiary"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <Icon
              name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'}
              size="sm"
            />
          </Button>
        </div>
      </div>

      {/* Quick Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Location Filter */}
        <FilterDropdown
          label="Location"
          options={[
            ...provinces.map(p => ({ value: `province-${p.value}`, label: p.label })),
            ...municipalities.map(m => ({ value: `municipality-${m.value}`, label: m.label })),
            ...barangays.map(b => ({ value: `barangay-${b.value}`, label: b.label }))
          ]}
          selectedValues={[
            ...(filters.selectedProvince ? [`province-${filters.selectedProvince}`] : []),
            ...(filters.selectedMunicipality ? [`municipality-${filters.selectedMunicipality}`] : []),
            ...(filters.selectedBarangay ? [`barangay-${filters.selectedBarangay}`] : [])
          ]}
          onSelectionChange={(values) => {
            // Handle location selection logic
            const province = values.find(v => v.startsWith('province-'))?.replace('province-', '');
            const municipality = values.find(v => v.startsWith('municipality-'))?.replace('municipality-', '');
            const barangay = values.find(v => v.startsWith('barangay-'))?.replace('barangay-', '');

            updateFilters({
              selectedProvince: province || '',
              selectedMunicipality: municipality || '',
              selectedBarangay: barangay || ''
            });
          }}
          placeholder="Select location..."
          multiple
        />

        {/* Time Range Filter */}
        <FilterDropdown
          label="Time Range"
          options={timeRangeOptions.map(opt => ({ value: opt.value, label: opt.label }))}
          selectedValues={filters.customTimeRangeLabel ? [filters.customTimeRangeLabel.toLowerCase().replace(/\s+/g, '-')] : []}
          onSelectionChange={(values) => {
            if (values.length > 0) {
              handleTimeRangeChange(values[0]);
            } else {
              updateFilters({
                timeRange: { start: null, end: null },
                customTimeRangeLabel: ''
              });
            }
          }}
          placeholder={getCurrentTimeRangeLabel()}
        />

        {/* Status Filter */}
        <FilterDropdown
          label="Status"
          options={statusOptions}
          selectedValues={filters.selectedStatuses}
          onSelectionChange={(values) => updateFilters({ selectedStatuses: values })}
          placeholder="Select status..."
          multiple
        />

        {/* Severity Filter */}
        <FilterDropdown
          label="Severity"
          options={severityOptions}
          selectedValues={filters.selectedSeverities}
          onSelectionChange={(values) => updateFilters({ selectedSeverities: values })}
          placeholder="Select severity..."
          multiple
        />
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-gray-200 dark:border-slate-700 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Filter Presets */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Quick Presets</h4>
              <div className="space-y-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    updateFilters({
                      selectedSeverities: ['critical'],
                      timeRange: { start: new Date(Date.now() - 24 * 60 * 60 * 1000), end: new Date() },
                      customTimeRangeLabel: 'Last 24 hours'
                    });
                  }}
                  className="w-full justify-start"
                >
                  My Critical Alerts
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    updateFilters({
                      timeRange: { start: new Date(Date.now() - 24 * 60 * 60 * 1000), end: new Date() },
                      customTimeRangeLabel: 'Last 24 hours'
                    });
                  }}
                  className="w-full justify-start"
                >
                  Today's Activity
                </Button>
              </div>
            </div>

            {/* Saved Filters */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Saved Filters</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {savedFilters.length === 0 ? (
                  <Button
                    variant="tertiary"
                    size="sm"
                    className="w-full justify-start text-gray-500"
                    disabled
                  >
                    No saved filters
                  </Button>
                ) : (
                  savedFilters.map((savedFilter) => (
                    <div key={savedFilter.id} className="flex items-center space-x-2">
                      <Button
                        variant="tertiary"
                        size="sm"
                        onClick={() => loadSavedFilter(savedFilter)}
                        className="flex-1 justify-start text-left"
                        title={`Load ${savedFilter.name}`}
                      >
                        {savedFilter.name}
                      </Button>
                      <Button
                        variant="tertiary"
                        size="sm"
                        onClick={() => deleteSavedFilter(savedFilter.id)}
                        className="p-1 h-6 w-6"
                        title="Delete filter"
                      >
                        <Icon name="XMarkIcon" size="sm" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Filter Actions */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Actions</h4>
              <div className="space-y-2">
                <Button
                  variant="tertiary"
                  size="sm"
                  onClick={saveCurrentFilter}
                  disabled={!hasActiveFilters}
                  className="w-full justify-start"
                >
                  Save Current Filter
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Filter Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-96 max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Save Filter
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Filter Name
              </label>
              <input
                type="text"
                value={newFilterName}
                onChange={(e) => setNewFilterName(e.target.value)}
                placeholder="Enter a name for this filter..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    confirmSaveFilter();
                  } else if (e.key === 'Escape') {
                    setShowSaveDialog(false);
                  }
                }}
                autoFocus
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                variant="tertiary"
                size="sm"
                onClick={() => setShowSaveDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={confirmSaveFilter}
                disabled={!newFilterName.trim()}
              >
                Save Filter
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
