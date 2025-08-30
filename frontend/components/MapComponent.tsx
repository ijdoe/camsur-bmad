"use client";

import React, { useState } from 'react';
import Map, { FullscreenControl, NavigationControl, ScaleControl, MapEvent } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, IconLayer } from '@deck.gl/layers';
import mapboxgl from 'mapbox-gl'; // Import mapboxgl itself
import * as GeoJSON from 'geojson'; // Import GeoJSON types

// Placeholder for Mapbox Access Token - REPLACE WITH YOUR OWN
const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'YOUR_MAPBOX_ACCESS_TOKEN';

// Placeholder data for demo
const initialViewState = {
  longitude: 123.18, // Center of CamSur
  latitude: 13.62,
  zoom: 9,
  pitch: 0,
  bearing: 0,
};

const lguBoundaries: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [[123.17, 13.61], [123.20, 13.61], [123.20, 13.64], [123.17, 13.64], [123.17, 13.61]]
        ],
      },
      properties: { name: 'Simulated CamSur LGU', type: 'municipality' },
    },
  ],
};

const sensorLocations = [
  { id: 'CS-AWLG-001', name: 'River Sensor 1', coordinates: [123.18, 13.62], status: 'critical', type: 'AWLG' },
  { id: 'CS-ARG-001', name: 'Rainfall Sensor 1', coordinates: [123.19, 13.63], status: 'warning', type: 'ARG' },
  { id: 'CS-CCTV-BR-001', name: 'Bridge Camera 1', coordinates: [123.185, 13.625], status: 'normal', type: 'CCTV' },
];

const activeAlerts: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [[123.175, 13.615], [123.195, 13.615], [123.195, 13.635], [123.175, 13.635], [123.175, 13.615]]
        ],
      },
      properties: { id: 'ALERT-001', description: 'Flash Flood Warning', severity: 4, status: 'Approved' },
    },
  ],
};

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true, anchorY: 128 },
};

export default function MapComponent() {
  const [viewState, setViewState] = useState(initialViewState);

  // Define types for sensor data
  interface SensorData {
    id: string;
    name: string;
    coordinates: [number, number];
    status: 'critical' | 'warning' | 'normal';
    type: string;
  }

  // Function to get icon color based on status
  const getIconColor = (status: SensorData['status']): [number, number, number] => {
    switch (status) {
      case 'critical': return [255, 0, 0]; // Red
      case 'warning': return [255, 255, 0]; // Yellow
      case 'normal': return [0, 255, 0]; // Green
      default: return [128, 128, 128]; // Gray
    }
  };

  const layers = [
    new GeoJsonLayer({
      id: 'lgu-boundaries',
      data: lguBoundaries,
      stroked: true,
      filled: true,
      lineWidthMinPixels: 2,
      getFillColor: [0, 0, 0, 0], // Transparent fill
      getLineColor: [0, 0, 255, 200], // Blue outline
      getLineWidth: 100,
    }),
    new IconLayer<SensorData>({ // Specify type for IconLayer
      id: 'sensor-locations',
      data: sensorLocations,
      pickable: true,
      iconAtlas: 'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png', // Generic marker
      iconMapping: ICON_MAPPING,
      getIcon: (d) => 'marker',
      getPosition: (d) => d.coordinates,
      getSize: 30,
      getColor: (d) => getIconColor(d.status),
      onClick: (info) => {
        if (info.object) {
          console.log('Sensor clicked:', info.object);
          // TODO: Display sensor details
        }
      },
    }),
    new GeoJsonLayer({
      id: 'active-alerts',
      data: activeAlerts,
      stroked: true,
      filled: true,
      lineWidthMinPixels: 2,
      getFillColor: [255, 0, 0, 50], // Semi-transparent red fill
      getLineColor: [255, 0, 0, 200], // Red outline
      getLineWidth: 100,
      onClick: (info) => {
        if (info.object) {
          console.log('Alert clicked:', info.object.properties);
          // TODO: Display alert details
        }
      },
    }),
  ];

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Map
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        initialViewState={initialViewState}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12" // Or any other style
        onMove={(evt: MapEvent) => setViewState(evt.viewState)}
      >
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        <DeckGL
          viewState={viewState}
          layers={layers}
          controller={true}
        />
      </Map>
    </div>
  );
}
