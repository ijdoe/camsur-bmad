import { NextResponse } from 'next/server';

export async function GET() {
  const insights = [
    {
      id: '1',
      insightType: 'Barangay Flood Watch',
      affectedArea: 'Brgy. San Roque, Nabua',
      severity: 4,
      confidence: 85,
      timestamp: new Date(),
      status: 'Pending Review',
      hotspotScore: 92,
      evidence: [
        {
          id: 'ev1',
          type: 'sensor',
          source: 'River Sensor 1',
          description: 'Water level reached critical point.',
          confidence: 90,
          timestamp: new Date(),
        },
        {
          id: 'ev2',
          type: 'weather',
          source: 'PAGASA',
          description: 'Heavy rainfall warning issued for the area.',
          confidence: 95,
          timestamp: new Date(),
        },
      ],
      recommendations: [
        {
          id: 'rec1',
          type: 'sms',
          priority: 'high',
          content: 'Baha sa Brgy. San Roque. Mag-andam sa posibleng pag-evacuate. Gibuhayan an mga residente na mag-monitor sa mga anunsyo.',
        },
        {
          id: 'rec2',
          type: 'radio',
          priority: 'medium',
          content: 'Flood warning for Barangay San Roque. Residents are advised to prepare for possible evacuation and monitor official announcements.',
        },
      ],
    },
    {
        id: '2',
        insightType: 'Landslide Warning',
        affectedArea: 'Brgy. Sta. Elena, Iriga City',
        severity: 5,
        confidence: 95,
        timestamp: new Date(),
        status: 'Approved',
        hotspotScore: 98,
        evidence: [
          {
            id: 'ev3',
            type: 'satellite',
            source: 'MAXAR',
            description: 'Soil saturation levels indicate high risk of landslide.',
            confidence: 88,
            timestamp: new Date(),
          },
        ],
        recommendations: [
          {
            id: 'rec3',
            type: 'alert',
            priority: 'critical',
            content: 'Immediate evacuation order for residents in the high-risk zone of Brgy. Sta. Elena due to imminent landslide threat.',
          },
        ],
      },
  ];

  return NextResponse.json(insights);
}
