import { NextResponse } from 'next/server';

export async function GET() {
  const cctvEvents = [
    {
      id: '1',
      cameraId: 'CCTV-001',
      cameraName: 'Naga City Hall - Entrance',
      location: 'Naga City',
      eventType: 'traffic',
      description: 'Heavy traffic congestion detected.',
      timestamp: new Date(),
      confidence: 95,
    },
    {
        id: '2',
        cameraId: 'CCTV-002',
        cameraName: 'Bicol Central Station',
        location: 'Naga City',
        eventType: 'intrusion',
        description: 'Intrusion detected near perimeter fence.',
        timestamp: new Date(),
        confidence: 98,
      },
  ];

  return NextResponse.json(cctvEvents);
}
