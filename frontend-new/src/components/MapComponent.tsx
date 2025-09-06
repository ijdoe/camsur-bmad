"use client";

import React, { useState } from 'react';
import Map, { FullscreenControl, NavigationControl, ScaleControl, MapEvent, ViewState } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, IconLayer } from '@deck.gl/layers';
import * as GeoJSON from 'geojson';
import { SensorData, InsightData } from '@/lib/types';

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

if (!MAPBOX_ACCESS_TOKEN) {
  console.error("Mapbox Access Token is not set. Please set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN environment variable.");
}

const initialViewState: ViewState = {
  longitude: 123.18, // Default center for CamSur
  latitude: 13.62,
  zoom: 9,
  pitch: 0,
  bearing: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 }
};

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true, anchorY: 128 },
};

interface InsightOverlay {
  id: string;
  geometry: any; // GeoJSON
  severity: number;
  status: 'Draft' | 'Pending Review' | 'Approved' | 'Disseminated' | 'Rescinded';
  description?: string;
}

interface MapComponentProps {
  sensors: SensorData[];
  insights: InsightOverlay[];
  lguBoundaries?: GeoJSON.FeatureCollection;
  onSensorClick: (sensor: SensorData) => void;
  onInsightClick: (insight: InsightOverlay) => void;
}

export default function MapComponent({
  sensors,
  insights,
  lguBoundaries,
  onSensorClick,
  onInsightClick,
}: MapComponentProps) {
  const [viewState, setViewState] = useState<ViewState>(initialViewState);

  const getIconColor = (status: SensorData['status']): [number, number, number] => {
    switch (status) {
      case 'critical': return [255, 0, 0]; // Red
      case 'warning': return [255, 255, 0]; // Yellow
      case 'normal': return [0, 255, 0]; // Green
      case 'offline': return [128, 128, 128]; // Gray
      default: return [128, 128, 128];
    }
  };

  const layers = [
    lguBoundaries && new GeoJsonLayer({
      id: 'lgu-boundaries',
      data: lguBoundaries,
      stroked: true,
      filled: true,
      lineWidthMinPixels: 2,
      getFillColor: [0, 0, 0, 0],
      getLineColor: [0, 0, 255, 200],
      getLineWidth: 100,
    }),
    new IconLayer<SensorData>({
      id: 'sensor-locations',
      data: sensors,
      pickable: true,
      iconAtlas: 'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
      iconMapping: ICON_MAPPING,
      getIcon: () => 'marker',
      getPosition: (d) => d.coordinates,
      getSize: 30,
      getColor: (d) => getIconColor(d.status),
      onClick: (info) => info.object && onSensorClick(info.object),
    }),
    new GeoJsonLayer({
      id: 'active-alerts',
      data: insights.map((i: InsightOverlay) => ({ type: 'Feature', geometry: i.geometry, properties: i })),
      stroked: true,
      filled: true,
      lineWidthMinPixels: 2,
      getFillColor: [255, 0, 0, 50],
      getLineColor: [255, 0, 0, 200],
      getLineWidth: 100,
      onClick: (info) => info.object && onInsightClick(info.object.properties as InsightOverlay),
    }),
  ].filter(Boolean);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Map
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        initialViewState={initialViewState}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onMove={(evt) => setViewState(evt.viewState)}
      >
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        <DeckGL
          // @ts-ignore
          viewState={viewState}
          layers={layers}
          controller={true}
        />
      </Map>
    </div>
  );
}
