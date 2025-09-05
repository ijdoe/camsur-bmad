'use client';

import React from 'react';
import { useQuery } from 'react-query';
import { RealTimeDataPanels } from './RealTimeDataPanels';
import { Icon } from './ui/Icon';

const fetchSensorReadings = async () => {
  // Replace with your actual API endpoint
  const res = await fetch('/api/sensors');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const sensors = await res.json();
  return sensors.map((sensor: any) => ({
    ...sensor,
    lastUpdate: new Date(sensor.lastUpdate),
  }));
};

const fetchCCTVEvents = async () => {
  // Replace with your actual API endpoint
  const res = await fetch('/api/cctv-events');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const events = await res.json();
  return events.map((event: any) => ({
    ...event,
    timestamp: new Date(event.timestamp),
  }));
};

const fetchCommunityReports = async () => {
  // Replace with your actual API endpoint
  const res = await fetch('/api/community-reports');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const reports = await res.json();
  return reports.map((report: any) => ({
    ...report,
    timestamp: new Date(report.timestamp),
  }));
};

const RealTimeDataContainer: React.FC = () => {
  const { data: sensorReadings, isLoading: isLoadingSensors, error: errorSensors } = useQuery('sensorReadings', fetchSensorReadings);
  const { data: cctvEvents, isLoading: isLoadingCCTV, error: errorCCTV } = useQuery('cctvEvents', fetchCCTVEvents);
  const { data: communityReports, isLoading: isLoadingCommunity, error: errorCommunity } = useQuery('communityReports', fetchCommunityReports);

  if (isLoadingSensors || isLoadingCCTV || isLoadingCommunity) {
    return (
      <div className="flex items-center justify-center h-64">
        <Icon name="ArrowPathIcon" className="animate-spin h-8 w-8 text-gray-500" />
        <p className="ml-2 text-gray-500">Loading Real-time Data...</p>
      </div>
    );
  }

  if (errorSensors || errorCCTV || errorCommunity) {
    return (
      <div className="flex items-center justify-center h-64 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <Icon name="ExclamationTriangleIcon" className="h-8 w-8 text-red-500" />
        <p className="ml-2 text-red-700 dark:text-red-300">Error loading data. Please try again later.</p>
      </div>
    );
  }

  return (
    <RealTimeDataPanels
      sensorReadings={sensorReadings || []}
      cctvEvents={cctvEvents || []}
      communityReports={communityReports || []}
      onRefresh={() => {
        // Invalidate and refetch queries
      }}
    />
  );
};

export { RealTimeDataContainer };
