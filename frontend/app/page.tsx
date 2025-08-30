import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the MapComponent to prevent SSR issues with Mapbox GL JS
const DynamicMapComponent = dynamic(() => import('../components/MapComponent'), {
});

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Dashboard Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Active Alerts</h2>
          <p className="text-3xl font-bold text-red-600">5</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Sensors Online</h2>
          <p className="text-3xl font-bold text-green-600">24/30</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Recent Events</h2>
          <p className="text-sm text-gray-600">Flash Flood Warning - CamSur</p>
        </div>
      </div>

      {/* Main Map Area (Story 7.4.1) */}
      <div className="flex-1 bg-white rounded shadow overflow-hidden">
        <DynamicMapComponent />
      </div>

      {/* TODO: Add Real-time Data Feeds (Story 7.4.2) */}
      {/* TODO: Add Alert List/Table (Story 7.3.1) */}
    </div>
  );
}
