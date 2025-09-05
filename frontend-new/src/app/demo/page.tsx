'use client';

import React, { useState } from 'react';
import {
  MainNavigationSidebar,
  InsightPriorityQueue,
  InteractiveMapContainer,
  InsightDetailPanel,
  RealTimeDataPanels,
  type Insight,
  type SensorData,
  type User,
  type LGU,
  type NavigationItem,
  type InsightOverlay,
  type MapLayer,
  type SensorReading,
  type CCTVEvent,
  type CommunityReport,
} from '@/components';

// Mock Data
const mockUser: User = {
  name: 'John Doe',
  role: 'PDRRMO Operator',
};

const mockLgus: LGU[] = [
  { id: 'camsur', name: 'Camarines Sur' },
  { id: 'albay', name: 'Albay' },
  { id: 'sorsogon', name: 'Sorsogon' },
];

const mockInsights: Insight[] = [
  {
    id: 'INS-001',
    insightType: 'Flash Flood Warning',
    affectedArea: 'Brgy. San Roque, Bato',
    severity: 4,
    confidence: 92,
    timestamp: new Date('2025-09-05T08:15:00'),
    status: 'Pending Review',
    hotspotScore: 9.8,
    lgu: 'camsur',
    description: 'Intense rainfall from a localized thunderstorm is causing the Bato River to swell rapidly. Models predict that water levels will exceed the critical threshold within the next 2-4 hours, potentially flooding low-lying areas in Brgy. San Roque.',
    evidence: [
      { id: 'EV-001', type: 'sensor', source: 'Bato River Sensor (AWLG-BT-01)', description: 'Water level at 3.5m (Critical: 4.0m)', confidence: 98, timestamp: new Date('2025-09-05T08:10:00') },
      { id: 'EV-002', type: 'weather', source: 'PAGASA Doppler Radar', description: 'Red Warning: Intense Rainfall (30-45mm/hr)', confidence: 95, timestamp: new Date('2025-09-05T08:05:00') },
      { id: 'EV-003', type: 'social', source: 'Community Report', description: 'Resident reports river is "chest-deep and rising fast"', confidence: 70, timestamp: new Date('2025-09-05T08:12:00') },
    ],
    recommendations: [
      { id: 'REC-001', type: 'sms', priority: 'critical', content: 'Baha sa Brgy. San Roque, Bato. Agad na lumikas sa mas mataas na lugar. Manatiling updated sa mga anunsyo.' },
      { id: 'REC-002', type: 'radio', priority: 'high', content: 'Attention residents of Barangay San Roque, Bato. A flash flood warning is in effect. Please evacuate to designated centers immediately.' },
    ],
    notes: ['Initial assessment by operator Jane Smith.'],
  },
  {
    id: 'INS-002',
    insightType: 'Landslide Watch',
    affectedArea: 'Sitio Tinago, Lagonoy',
    severity: 3,
    confidence: 85,
    timestamp: new Date('2025-09-05T07:15:00'),
    status: 'Approved',
    hotspotScore: 8.2,
    lgu: 'camsur',
  },
  {
    id: 'INS-003',
    insightType: 'Storm Surge Alert',
    affectedArea: 'Coastal areas of Sagñay',
    severity: 5,
    confidence: 98,
    timestamp: new Date('2025-09-05T06:15:00'),
    status: 'Disseminated',
    hotspotScore: 9.9,
    lgu: 'camsur',
  },
];

const mockSensorReadings: SensorReading[] = [
  { id: 'SR-001', name: 'Bato River Sensor', type: 'AWLG', value: 3.5, unit: 'm', status: 'critical', location: 'Brgy. San Roque', lastUpdate: new Date('2025-09-05T08:18:00'), trend: 'up' },
  { id: 'SR-002', name: 'Lagonoy Rainfall', type: 'ARG', value: 25, unit: 'mm/hr', status: 'warning', location: 'Sitio Tinago', lastUpdate: new Date('2025-09-05T08:17:00'), trend: 'stable' },
  { id: 'SR-003', name: 'Iriga Weather Station', type: 'AWS', value: 32, unit: '°C', status: 'normal', location: 'Iriga City', lastUpdate: new Date('2025-09-05T08:19:00'), trend: 'stable' },
];

const mockCctvEvents: CCTVEvent[] = [
  { id: 'CCTV-001', cameraId: 'CAM-012', cameraName: 'Naga City Bridge Cam', location: 'Naga City', eventType: 'traffic', description: 'Heavy traffic buildup on Magsaysay Avenue', timestamp: new Date('2025-09-05T08:16:00'), confidence: 95 },
];

const mockCommunityReports: CommunityReport[] = [
  { id: 'CR-001', author: 'Juan Dela Cruz', location: 'Brgy. San Roque, Bato', category: 'flood', description: 'River is chest-deep and rising fast!', urgency: 'critical', timestamp: new Date('2025-09-05T08:12:00'), verified: true, tags: ['flood', 'bato', 'urgent'] },
];

const mockInsightOverlays: InsightOverlay[] = mockInsights.map(i => ({
  id: i.id,
  geometry: { type: 'Polygon', coordinates: [[[123.175, 13.615], [123.195, 13.615], [123.195, 13.635], [123.175, 13.635], [123.175, 13.615]]] },
  severity: i.severity,
  status: i.status,
  description: i.insightType,
}));

const mockSensorData: SensorData[] = mockSensorReadings.map(s => ({
  id: s.id,
  name: s.name,
  coordinates: [123.18, 13.62], // Placeholder coordinates
  status: s.status,
  type: s.type,
  lastReading: { value: s.value, unit: s.unit, timestamp: s.lastUpdate },
}));

export default function DemoPage() {
  const [currentLgu, setCurrentLgu] = useState<LGU>(mockLgus[0]);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(mockInsights[0]);

  const handleInsightClick = (insightId: string) => {
    const insight = mockInsights.find(i => i.id === insightId);
    setSelectedInsight(insight || null);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <MainNavigationSidebar
        currentPath="/dashboard"
        user={mockUser}
        lgu={currentLgu}
        lguOptions={mockLgus}
        onNavigate={(path) => console.log(`Navigating to ${path}`)}
        onLGUChange={(lguId) => {
          const lgu = mockLgus.find(l => l.id === lguId);
          if (lgu) setCurrentLgu(lgu);
        }}
        onLogout={() => console.log('Logout')}
      />

      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <InteractiveMapContainer
            sensors={mockSensorData}
            insights={mockInsightOverlays}
            height="50%"
          />
          <div className="flex-1 p-4 overflow-auto">
            <RealTimeDataPanels
              sensorReadings={mockSensorReadings}
              cctvEvents={mockCctvEvents}
              communityReports={mockCommunityReports}
            />
          </div>
        </div>

        <aside className="w-96 border-l border-gray-200 flex flex-col">
          {selectedInsight ? (
            <InsightDetailPanel
              insight={selectedInsight}
              onApprove={(id) => console.log(`Approved ${id}`)}
              onRescind={(id) => console.log(`Rescinded ${id}`)}
              onEditGeometry={(id) => console.log(`Edit Geometry for ${id}`)}
              onAddNote={(id, note) => console.log(`Added note to ${id}: ${note}`)}
              onClose={() => setSelectedInsight(null)}
            />
          ) : (
            <InsightPriorityQueue
              insights={mockInsights}
              onInsightClick={handleInsightClick}
              onInsightAction={(id, action) => console.log(`Action: ${action} on ${id}`)}
            />
          )}
        </aside>
      </main>
    </div>
  );
}
