'use client';

import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { MainNavigationSidebar } from './MainNavigationSidebar';
import { InsightPriorityQueue } from './InsightPriorityQueue';
import { InteractiveMapContainer } from './InteractiveMapContainer';
import { InsightDetailPanel } from './InsightDetailPanel';
import { RealTimeDataContainer } from './RealTimeDataContainer';
import { AdvancedFilterPanel } from './AdvancedFilterPanel';
import { Icon } from './ui/Icon';
import { SensorData } from '@/lib/types';

const fetchInsights = async () => {
  // Replace with your actual API endpoint
  const res = await fetch('/api/insights');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const insights = await res.json();
  return insights.map((insight: any) => ({
    ...insight,
    timestamp: new Date(insight.timestamp),
  }));
};

const fetchSensors = async (): Promise<SensorData[]> => {
    // Replace with your actual API endpoint
    const res = await fetch('/api/sensors');
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const sensors = await res.json();
    return sensors.map((sensor: any) => ({
        ...sensor,
        lastReading: sensor.lastReading ? {
          ...sensor.lastReading,
          timestamp: new Date(sensor.lastReading.timestamp)
        } : undefined,
    }));
  };

const DashboardContainer: React.FC = () => {
  const [selectedInsightId, setSelectedInsightId] = useState<string | null>(null);

  const { data: insights, isLoading: isLoadingInsights, error: errorInsights } = useQuery('insights', fetchInsights);
  const { data: sensors, isLoading: isLoadingSensors, error: errorSensors } = useQuery('sensors', fetchSensors);

  if (isLoadingInsights || isLoadingSensors) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Icon name="ArrowPathIcon" className="animate-spin h-8 w-8 text-gray-500" />
        <p className="ml-2 text-gray-500">Loading Dashboard...</p>
      </div>
    );
  }

  if (errorInsights || errorSensors) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
        <Icon name="ExclamationTriangleIcon" className="h-8 w-8 text-red-500" />
        <p className="ml-2 text-red-700 dark:text-red-300">Error loading dashboard data. Please try again later.</p>
      </div>
    );
  }

  const selectedInsight = insights?.find((i: any) => i.id === selectedInsightId);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <MainNavigationSidebar
        currentPath="/dashboard"
        user={{ name: 'Admin User', role: 'Admin' }}
        lgu={{ id: '1', name: 'Camarines Sur' }}
        lguOptions={[{ id: '1', name: 'Camarines Sur' }]}
        onLGUChange={() => {}}
        onNavigate={() => {}}
        onLogout={() => {}}
      />
      <main className="flex flex-1 flex-col">
        {/* Advanced Filter Panel */}
        <div className="flex-shrink-0 border-b border-gray-200 dark:border-slate-700">
          <AdvancedFilterPanel />
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-[400px] flex-shrink-0 overflow-y-auto border-r border-gray-200 dark:border-slate-700">
            <InsightPriorityQueue
              insights={insights || []}
              selectedInsightId={selectedInsightId}
              onInsightClick={setSelectedInsightId}
              onInsightAction={() => {}}
            />
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <div className="flex-1">
              <InteractiveMapContainer insights={insights || []} sensors={sensors || []} />
            </div>
            <div className="flex-shrink-0 border-t border-gray-200 dark:border-slate-700">
              <RealTimeDataContainer />
            </div>
          </div>
          <div className="w-[400px] flex-shrink-0 overflow-y-auto border-l border-gray-200 dark:border-slate-700">
            <InsightDetailPanel
              insight={selectedInsight}
            onApprove={() => {}}
            onRescind={() => {}}
            onEditGeometry={() => {}}
            onAddNote={() => {}}
            onClose={() => setSelectedInsightId(null)}
          />
        </div>
        </div>
      </main>
    </div>
  );
};

export { DashboardContainer };
