import React, { useState, useMemo } from 'react';
import { InsightCard } from './ui/InsightCard';
import { SearchBar } from './ui/SearchBar';
import { FilterDropdown } from './ui/FilterDropdown';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';
import { cn } from '@/lib/utils';

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
  description?: string;
  evidence?: any[];
  recommendations?: any[];
  notes?: string[];
}

interface InsightPriorityQueueProps {
  insights: Insight[];
  onInsightClick: (insightId: string) => void;
  onInsightAction: (insightId: string, action: string) => void;
  className?: string;
  loading?: boolean;
}

type SortOption = 'priority' | 'timestamp' | 'severity' | 'confidence';
type SortDirection = 'asc' | 'desc';

const InsightPriorityQueue: React.FC<InsightPriorityQueueProps> = ({
  insights,
  onInsightClick,
  onInsightAction,
  className,
  loading = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLGUs, setSelectedLGUs] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedSeverities, setSelectedSeverities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('priority');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Extract unique values for filters
  const lguOptions = useMemo(() => {
    const uniqueLGUs = [...new Set(insights.map(insight => insight.lgu).filter(Boolean))];
    return uniqueLGUs.map(lgu => ({ value: lgu!, label: lgu!, count: insights.filter(i => i.lgu === lgu).length }));
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

      const matchesLGU = selectedLGUs.length === 0 || selectedLGUs.includes(insight.lgu || '');
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(insight.status);
      const matchesSeverity = selectedSeverities.length === 0 || selectedSeverities.includes(insight.severity.toString());

      return matchesSearch && matchesLGU && matchesStatus && matchesSeverity;
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
  }, [insights, searchQuery, selectedLGUs, selectedStatuses, selectedSeverities, sortBy, sortDirection]);

  const handleSortChange = (newSortBy: SortOption) => {
    if (sortBy === newSortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortDirection('desc');
    }
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedLGUs([]);
    setSelectedStatuses([]);
    setSelectedSeverities([]);
  };

  return (
    <div className={cn('flex flex-col h-full bg-white', className)}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Insight Priority Queue</h2>
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="flex-1 justify-center"
            >
              <Icon name="QueueListIcon" size="sm" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="flex-1 justify-center"
            >
              <Icon name="Squares2X2Icon" size="sm" />
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          <SearchBar
            placeholder="Search insights, areas, or types..."
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
          />

          <div className="flex flex-wrap gap-2">
            <FilterDropdown
              label="LGU"
              options={lguOptions}
              selectedValues={selectedLGUs}
              onSelectionChange={setSelectedLGUs}
              placeholder="All LGUs"
            />
            <FilterDropdown
              label="Status"
              options={statusOptions}
              selectedValues={selectedStatuses}
              onSelectionChange={setSelectedStatuses}
              placeholder="All Statuses"
            />
            <FilterDropdown
              label="Severity"
              options={severityOptions}
              selectedValues={selectedSeverities}
              onSelectionChange={setSelectedSeverities}
              placeholder="All Levels"
            />
            {(selectedLGUs.length > 0 || selectedStatuses.length > 0 || selectedSeverities.length > 0 || searchQuery) && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            )}
          </div>
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
              variant="ghost"
              size="sm"
              onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
            >
              <Icon
                name={sortDirection === 'asc' ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                size="sm"
              />
            </Button>
          </div>
          <span className="text-sm text-gray-600">
            {filteredAndSortedInsights.length} of {insights.length} insights
          </span>
        </div>
      </div>

      {/* Insights List/Grid */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading insights...</div>
          </div>
        ) : filteredAndSortedInsights.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Icon name="InformationCircleIcon" size="lg" className="mb-2" />
            <p>No insights match your filters</p>
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="mt-2">
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
                onClick={() => onInsightClick(insight.id)}
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
