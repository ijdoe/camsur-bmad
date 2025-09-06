import React, { useState, useMemo } from 'react';
import { InsightCard } from './ui/InsightCard';
import { FilterDropdown } from './ui/FilterDropdown';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';
import { cn } from '@/lib/utils';
import { useFilters } from '@/lib/FilterContext';

interface Insight {
  id: string;
  insightType: string;
  affectedArea: string;
  severity: number;
  confidence: number;
  timestamp: Date;
  status: 'Draft' | 'Pending Review' | 'Approved' | 'Disseminated' | 'Rescinded';
  geometry?: any;
  hotspotScore?: number;
  lgu?: string;
  municipality?: string;
  description?: string;
  evidence?: any[];
  recommendations?: any[];
  notes?: string[];
}

interface InsightPriorityQueueProps {
  insights: Insight[];
  selectedInsightId: string | null;
  onInsightClick: (insightId: string) => void;
  onInsightAction: (insightId: string, action: string) => void;
  className?: string;
  loading?: boolean;
}

type SortOption = 'priority' | 'timestamp' | 'severity' | 'confidence';
type SortDirection = 'asc' | 'desc';

const InsightPriorityQueue: React.FC<InsightPriorityQueueProps> = ({
  insights,
  selectedInsightId,
  onInsightClick,
  onInsightAction,
  className,
  loading = false,
}) => {
  const { filters, updateFilters, resetFilters } = useFilters();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Use global filter state directly
  const searchQuery = filters.searchQuery;
  const selectedStatuses = filters.selectedStatuses;
  const selectedSeverities = filters.selectedSeverities;
  const sortBy = filters.sortBy;
  const sortDirection = filters.sortDirection;
  const selectedMunicipalities = filters.selectedMunicipality ? [filters.selectedMunicipality] : [];

  // Extract unique values for filters
  const municipalityOptions = useMemo(() => {
    const uniqueMunicipalities = [...new Set(insights.map(insight => insight.municipality).filter(Boolean))];
    return uniqueMunicipalities.map(municipality => ({
      value: municipality!,
      label: municipality!,
      count: insights.filter(i => i.municipality === municipality).length
    }));
  }, [insights]);

  const statusOptions = useMemo(() => {
    const statuses = ['Draft', 'Pending Review', 'Approved', 'Disseminated', 'Rescinded'];
    return statuses.map(status => ({
      value: status,
      label: status,
      count: insights.filter(i => i.status === status).length
    }));
  }, [insights]);

  const severityOptions = useMemo(() => {
    const severities = [1, 2, 3, 4, 5];
    return severities.map(severity => ({
      value: severity.toString(),
      label: `Level ${severity}`,
      count: insights.filter(i => i.severity === severity).length
    }));
  }, [insights]);

  // Filter and sort insights
  const filteredAndSortedInsights = useMemo(() => {
    let filtered = insights.filter(insight => {
      const matchesSearch = !searchQuery ||
        insight.insightType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        insight.affectedArea.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesMunicipality = selectedMunicipalities.length === 0 || selectedMunicipalities.includes(insight.municipality || '');
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(insight.status);
      const matchesSeverity = selectedSeverities.length === 0 || selectedSeverities.includes(insight.severity.toString());

      return matchesSearch && matchesMunicipality && matchesStatus && matchesSeverity;
    });

    // Sort insights
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'priority':
          aValue = a.hotspotScore || 0;
          bValue = b.hotspotScore || 0;
          break;
        case 'timestamp':
          aValue = a.timestamp.getTime();
          bValue = b.timestamp.getTime();
          break;
        case 'severity':
          aValue = a.severity;
          bValue = b.severity;
          break;
        case 'confidence':
          aValue = a.confidence;
          bValue = b.confidence;
          break;
        default:
          return 0;
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [insights, searchQuery, selectedMunicipalities, selectedStatuses, selectedSeverities, sortBy, sortDirection]);

  const handleSortChange = (newSortBy: SortOption) => {
    if (sortBy === newSortBy) {
      updateFilters({ sortDirection: sortDirection === 'asc' ? 'desc' : 'asc' });
    } else {
      updateFilters({ sortBy: newSortBy, sortDirection: 'desc' });
    }
  };

  const clearAllFilters = () => {
    resetFilters();
  };

  return (
    <div className={cn('flex flex-col h-full bg-white dark:bg-slate-900', className)}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Insight Priority Queue</h2>
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'tertiary'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="flex-1 justify-center"
            >
              <Icon name="QueueListIcon" size="sm" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'tertiary'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="flex-1 justify-center"
            >
              <Icon name="Squares2X2Icon" size="sm" />
            </Button>
          </div>
        </div>

        {/* Compact Filter Summary */}
        <div className="text-sm text-gray-600 dark:text-slate-400">
          {filteredAndSortedInsights.length} of {insights.length} insights
          {(selectedMunicipalities.length > 0 || selectedStatuses.length > 0 || selectedSeverities.length > 0 || searchQuery) && (
            <span className="ml-2 text-blue-600 dark:text-blue-400">
              • Filtered
            </span>
          )}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <FilterDropdown
              label="Sort by"
              options={[
                { value: 'priority', label: 'Priority' },
                { value: 'timestamp', label: 'Timestamp' },
                { value: 'severity', label: 'Severity' },
                { value: 'confidence', label: 'Confidence' },
              ]}
              selectedValues={[sortBy]}
              onSelectionChange={(values) => handleSortChange(values[0] as SortOption)}
              placeholder="Sort by"
            />
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => updateFilters({ sortDirection: sortDirection === 'asc' ? 'desc' : 'asc' })}
            >
              <Icon
                name={sortDirection === 'asc' ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                size="sm"
              />
            </Button>
          </div>
          <span className="text-sm text-gray-600 dark:text-slate-400">
            {filteredAndSortedInsights.length} of {insights.length} insights
          </span>
        </div>
      </div>

      {/* Insights List/Grid */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500 dark:text-slate-400">Loading insights...</div>
          </div>
        ) : filteredAndSortedInsights.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-slate-400">
            <Icon name="InformationCircleIcon" size="lg" className="mb-2" />
            <p>No insights match your filters</p>
            <Button variant="tertiary" size="sm" onClick={clearAllFilters} className="mt-2">
              Clear filters
            </Button>
          </div>
        ) : (
          <div className={cn(
            'p-4',
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'space-y-3'
          )}>
            {filteredAndSortedInsights.map((insight) => (
              <InsightCard
                key={insight.id}
                insight={insight}
                isSelected={insight.id === selectedInsightId}
                onClick={() => onInsightClick(insight.id)}
                onAction={onInsightAction}
                viewMode={viewMode}
                className={viewMode === 'grid' ? 'h-auto' : ''}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { InsightPriorityQueue };
export type { Insight };
