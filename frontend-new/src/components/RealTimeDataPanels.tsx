import React, { useState, useEffect } from 'react';
import { DataCard } from './ui/DataCard';
import { StatusIndicator } from './ui/StatusIndicator';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';
import { cn } from '@/lib/utils';

interface SensorReading {
  id: string;
  name: string;
  type: 'AWLG' | 'ARG' | 'AWS' | 'CCTV';
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical' | 'offline';
  location: string;
  lastUpdate: Date;
  trend?: 'up' | 'down' | 'stable';
  threshold?: {
    warning: number;
    critical: number;
  };
}

interface CCTVEvent {
  id: string;
  cameraId: string;
  cameraName: string;
  location: string;
  eventType: 'motion' | 'intrusion' | 'flooding' | 'traffic' | 'other';
  description: string;
  timestamp: Date;
  confidence: number;
  thumbnail?: string;
  videoUrl?: string;
}

interface CommunityReport {
  id: string;
  author: string;
  location: string;
  category: 'flood' | 'landslide' | 'fire' | 'accident' | 'other';
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  verified: boolean;
  tags: string[];
  attachments?: string[];
}

interface RealTimeDataPanelsProps {
  sensorReadings: SensorReading[];
  cctvEvents: CCTVEvent[];
  communityReports: CommunityReport[];
  onSensorClick?: (sensor: SensorReading) => void;
  onCCTVEventClick?: (event: CCTVEvent) => void;
  onCommunityReportClick?: (report: CommunityReport) => void;
  onRefresh?: () => void;
  className?: string;
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
}

const RealTimeDataPanels: React.FC<RealTimeDataPanelsProps> = ({
  sensorReadings,
  cctvEvents,
  communityReports,
  onSensorClick,
  onCCTVEventClick,
  onCommunityReportClick,
  onRefresh,
  className,
  autoRefresh = true,
  refreshInterval = 30000, // 30 seconds
}) => {
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<'sensors' | 'cctv' | 'community'>('sensors');

  useEffect(() => {
    setLastRefresh(new Date());
    if (autoRefresh) {
      const interval = setInterval(() => {
        handleRefresh();
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  const handleRefresh = () => {
    setLastRefresh(new Date());
    onRefresh?.();
  };

  const getSensorStatusColor = (status: SensorReading['status']) => {
    switch (status) {
      case 'critical': return 'critical';
      case 'warning': return 'warning';
      case 'normal': return 'normal';
      case 'offline': return 'offline';
      default: return 'inactive';
    }
  };

  const getEventTypeColor = (type: CCTVEvent['eventType']) => {
    switch (type) {
      case 'intrusion': return 'critical';
      case 'flooding': return 'critical';
      case 'motion': return 'warning';
      case 'traffic': return 'warning';
      case 'other': return 'normal';
      default: return 'normal';
    }
  };

  const getUrgencyColor = (urgency: CommunityReport['urgency']) => {
    switch (urgency) {
      case 'critical': return 'critical';
      case 'high': return 'warning';
      case 'medium': return 'warning';
      case 'low': return 'normal';
      default: return 'normal';
    }
  };

  const sensorStats = {
    total: sensorReadings.length,
    critical: sensorReadings.filter(s => s.status === 'critical').length,
    warning: sensorReadings.filter(s => s.status === 'warning').length,
    normal: sensorReadings.filter(s => s.status === 'normal').length,
    offline: sensorReadings.filter(s => s.status === 'offline').length,
  };

  const recentCCTVEvents = cctvEvents.slice(0, 5);
  const recentCommunityReports = communityReports.slice(0, 5);

  return (
    <div className={cn('bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Real-time Data</h2>
        <div className="flex items-center space-x-2">
          {lastRefresh && (
            <span className="text-xs text-gray-500 dark:text-slate-400">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </span>
          )}
          <Button
            variant="tertiary"
            size="sm"
            onClick={handleRefresh}
            disabled={!onRefresh}
          >
            <Icon name="ArrowPathIcon" size="sm" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-slate-700">
        {[
          { id: 'sensors', label: 'Sensors', count: sensorReadings.length, icon: 'CogIcon' },
          { id: 'cctv', label: 'CCTV Events', count: cctvEvents.length, icon: 'EyeIcon' },
          { id: 'community', label: 'Community', count: communityReports.length, icon: 'UserIcon' },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'secondary' : 'tertiary'}
            size="sm"
            className={cn(
              "flex-1 rounded-none border-b-2 relative",
              activeTab === tab.id ? "border-blue-500" : "border-transparent"
            )}
            onClick={() => setActiveTab(tab.id as any)}
          >
            <Icon name={tab.icon as any} size="sm" className="mr-2" />
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
                {tab.count}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 450px)' }}>
        {activeTab === 'sensors' && (
          <div className="space-y-4">
            {/* Sensor Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{sensorStats.total}</div>
                <div className="text-sm text-gray-600 dark:text-slate-400">Total Sensors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{sensorStats.critical}</div>
                <div className="text-sm text-gray-600 dark:text-slate-400">Critical</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{sensorStats.warning}</div>
                <div className="text-sm text-gray-600 dark:text-slate-400">Warning</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{sensorStats.normal}</div>
                <div className="text-sm text-gray-600 dark:text-slate-400">Normal</div>
              </div>
            </div>

            {/* Sensor Readings */}
            <div className="space-y-3">
              {sensorReadings.slice(0, 6).map((sensor) => (
                <div
                  key={sensor.id}
                  className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  onClick={() => onSensorClick?.(sensor)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon name="CogIcon" size="sm" />
                      <span className="font-medium text-gray-900 dark:text-slate-100">{sensor.name}</span>
                      <StatusIndicator status={getSensorStatusColor(sensor.status)} />
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                        {sensor.value} {sensor.unit}
                      </div>
                      {sensor.trend && (
                        <div className={cn(
                          'text-sm flex items-center',
                          sensor.trend === 'up' && 'text-red-600 dark:text-red-400',
                          sensor.trend === 'down' && 'text-green-600 dark:text-green-400',
                          sensor.trend === 'stable' && 'text-gray-600 dark:text-slate-400'
                        )}>
                          <Icon
                            name={sensor.trend === 'up' ? 'ChevronUpIcon' : sensor.trend === 'down' ? 'ChevronDownIcon' : 'MinusIcon'}
                            size="sm"
                            className="mr-1"
                          />
                          {sensor.trend === 'up' ? 'Rising' : sensor.trend === 'down' ? 'Falling' : 'Stable'}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-slate-400">
                    {sensor.location} • Updated {sensor.lastUpdate.toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cctv' && (
          <div className="space-y-3">
            {recentCCTVEvents.length > 0 ? (
              recentCCTVEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  onClick={() => onCCTVEventClick?.(event)}
                >
                  <div className="flex items-start space-x-3">
                    {event.thumbnail && (
                      <img
                        src={event.thumbnail}
                        alt="Event thumbnail"
                        className="w-16 h-16 rounded object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900 dark:text-slate-100">{event.cameraName}</span>
                        <StatusIndicator status={getEventTypeColor(event.eventType)} />
                      </div>
                      <p className="text-sm text-gray-700 dark:text-slate-300 mb-2">{event.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-slate-400">
                        <span>{event.location}</span>
                        <span>{event.timestamp.toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-slate-500 mt-1">
                        Confidence: {event.confidence}%
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-slate-400">
                <Icon name="EyeIcon" size="lg" className="mb-2" />
                <p>No recent CCTV events</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'community' && (
          <div className="space-y-3">
            {recentCommunityReports.length > 0 ? (
              recentCommunityReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  onClick={() => onCommunityReportClick?.(report)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <Icon name="UserIcon" size="sm" />
                          <span className="font-medium text-gray-900 dark:text-slate-100">{report.author}</span>
                          {report.verified && (
                            <Icon name="CheckCircleIcon" size="sm" className="text-green-600 dark:text-green-400" />
                          )}
                        </div>
                        <StatusIndicator status={getUrgencyColor(report.urgency)} />
                      </div>
                      <p className="text-sm text-gray-700 dark:text-slate-300 mb-2">{report.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-slate-400 mb-2">
                        <span>{report.location}</span>
                        <span>{report.timestamp.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {report.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-slate-400">
                <Icon name="UserIcon" size="lg" className="mb-2" />
                <p>No recent community reports</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { RealTimeDataPanels };
export type { SensorReading, CCTVEvent, CommunityReport };
