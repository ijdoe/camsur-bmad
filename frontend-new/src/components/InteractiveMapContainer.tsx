import React, { useState, useCallback } from 'react';
import MapComponent from './MapComponent';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';
import { StatusIndicator } from './ui/StatusIndicator';
import { cn } from '@/lib/utils';

interface MapLayer {
  id: string;
  name: string;
  visible: boolean;
  type: 'boundary' | 'sensor' | 'alert' | 'overlay';
}

interface SensorData {
  id: string;
  name: string;
  coordinates: [number, number];
  status: 'critical' | 'warning' | 'normal' | 'offline';
  type: 'AWLG' | 'ARG' | 'AWS' | 'CCTV';
  lastReading?: {
    value: number;
    unit: string;
    timestamp: Date;
  };
}

interface InsightOverlay {
  id: string;
  geometry: any; // GeoJSON
  severity: number;
  status: 'Draft' | 'Pending Review' | 'Approved' | 'Disseminated' | 'Rescinded';
  description: string;
}

interface InteractiveMapContainerProps {
  sensors: SensorData[];
  insights: InsightOverlay[];
  lguBoundaries?: any; // GeoJSON
  onSensorClick?: (sensor: SensorData) => void;
  onInsightClick?: (insight: InsightOverlay) => void;
  onMapClick?: (coordinates: [number, number]) => void;
  className?: string;
  height?: string;
}

const InteractiveMapContainer: React.FC<InteractiveMapContainerProps> = ({
  sensors,
  insights,
  lguBoundaries,
  onSensorClick,
  onInsightClick,
  onMapClick,
  className,
  height = '600px',
}) => {
  const [layers, setLayers] = useState<MapLayer[]>([
    { id: 'lgu-boundaries', name: 'LGU Boundaries', visible: true, type: 'boundary' },
    { id: 'sensors', name: 'Sensors', visible: true, type: 'sensor' },
    { id: 'alerts', name: 'Active Alerts', visible: true, type: 'alert' },
    { id: 'satellite', name: 'Satellite Imagery', visible: false, type: 'overlay' },
  ]);

  const [selectedSensor, setSelectedSensor] = useState<SensorData | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<InsightOverlay | null>(null);
  const [showControls, setShowControls] = useState(true);

  const toggleLayer = useCallback((layerId: string) => {
    setLayers(prevLayers =>
      prevLayers.map(layer =>
        layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
      )
    );
  }, []);

  const handleSensorClick = useCallback((sensor: SensorData) => {
    setSelectedSensor(sensor);
    setSelectedInsight(null);
    onSensorClick?.(sensor);
  }, [onSensorClick]);

  const handleInsightClick = useCallback((insight: InsightOverlay) => {
    setSelectedInsight(insight);
    setSelectedSensor(null);
    onInsightClick?.(insight);
  }, [onInsightClick]);

  const handleMapClick = useCallback((coordinates: [number, number]) => {
    setSelectedSensor(null);
    setSelectedInsight(null);
    onMapClick?.(coordinates);
  }, [onMapClick]);

  const getSensorStatusColor = (status: SensorData['status']) => {
    switch (status) {
      case 'critical': return 'critical';
      case 'warning': return 'warning';
      case 'normal': return 'normal';
      case 'offline': return 'offline';
      default: return 'inactive';
    }
  };

  const sensorStats = {
    total: sensors.length,
    critical: sensors.filter(s => s.status === 'critical').length,
    warning: sensors.filter(s => s.status === 'warning').length,
    normal: sensors.filter(s => s.status === 'normal').length,
    offline: sensors.filter(s => s.status === 'offline').length,
  };

  return (
    <div className={cn('relative bg-white rounded-lg border border-gray-200 overflow-hidden', className)}>
      {/* Map Container */}
      <div style={{ height }} className="relative">
        <MapComponent />

        {/* Controls Toggle */}
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-4 right-4 z-10 shadow-lg"
          onClick={() => setShowControls(!showControls)}
        >
          <Icon name="CogIcon" size="sm" className="mr-2" />
          {showControls ? 'Hide' : 'Show'} Controls
        </Button>
      </div>

      {/* Side Panel */}
      {showControls && (
        <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-64">
          {/* Layer Controls */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Map Layers</h3>
            <div className="space-y-2">
              {layers.map((layer) => (
                <label key={layer.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={layer.visible}
                    onChange={() => toggleLayer(layer.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{layer.name}</span>
                  <div className={cn(
                    'w-3 h-3 rounded-full',
                    layer.type === 'boundary' && 'bg-blue-500',
                    layer.type === 'sensor' && 'bg-green-500',
                    layer.type === 'alert' && 'bg-red-500',
                    layer.type === 'overlay' && 'bg-purple-500'
                  )} />
                </label>
              ))}
            </div>
          </div>

          {/* Sensor Statistics */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Sensor Status</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{sensorStats.total}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-red-600">{sensorStats.critical}</div>
                <div className="text-xs text-gray-600">Critical</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-yellow-600">{sensorStats.warning}</div>
                <div className="text-xs text-gray-600">Warning</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">{sensorStats.normal}</div>
                <div className="text-xs text-gray-600">Normal</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Icon name="EyeIcon" size="sm" className="mr-2" />
                Zoom to Alerts
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Icon name="MapIcon" size="sm" className="mr-2" />
                Reset View
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Icon name="ArrowPathIcon" size="sm" className="mr-2" />
                Refresh Data
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Selected Item Details */}
      {(selectedSensor || selectedInsight) && (
        <div className="absolute bottom-4 left-4 right-4 z-10 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-md">
          {selectedSensor && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900">{selectedSensor.name}</h4>
                <StatusIndicator status={getSensorStatusColor(selectedSensor.status)} />
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>ID: {selectedSensor.id}</div>
                <div>Type: {selectedSensor.type}</div>
                {selectedSensor.lastReading && (
                  <div>
                    Last Reading: {selectedSensor.lastReading.value} {selectedSensor.lastReading.unit}
                    <span className="text-gray-400 ml-1">
                      ({selectedSensor.lastReading.timestamp.toLocaleTimeString()})
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedInsight && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900">Insight #{selectedInsight.id}</h4>
                <StatusIndicator status={selectedInsight.status.toLowerCase() as any} />
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>Severity: Level {selectedInsight.severity}</div>
                <div>Description: {selectedInsight.description}</div>
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="mt-3 w-full"
            onClick={() => {
              setSelectedSensor(null);
              setSelectedInsight(null);
            }}
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export { InteractiveMapContainer };
export type { SensorData, InsightOverlay, MapLayer };
