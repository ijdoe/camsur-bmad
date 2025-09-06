import * as GeoJSON from 'geojson';

export interface SensorData {
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

export interface InsightData {
  id: string;
  insightType: string;
  affectedArea: string;
  severity: number;
  confidence: number;
  timestamp: Date;
  status: 'Draft' | 'Pending Review' | 'Approved' | 'Disseminated' | 'Rescinded';
  geometry: GeoJSON.Geometry;
  hotspotScore?: number;
  lgu?: string;
  municipality?: string;
  description?: string;
  evidence?: any[];
  recommendations?: any[];
  notes?: string[];
}
