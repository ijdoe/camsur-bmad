import { NextResponse } from 'next/server';

export async function GET() {
  const communityReports = [
    {
      id: '1',
      author: 'Juan Dela Cruz',
      location: 'Brgy. San Felipe, Naga City',
      category: 'flood',
      description: 'Minor flooding in our area due to heavy rains.',
      urgency: 'medium',
      timestamp: new Date(),
      verified: true,
      tags: ['flooding', 'rain'],
    },
    {
        id: '2',
        author: 'Maria Clara',
        location: 'Pili, Camarines Sur',
        category: 'accident',
        description: 'Motorcycle accident near the national highway.',
        urgency: 'high',
        timestamp: new Date(),
        verified: false,
        tags: ['accident', 'traffic'],
      },
  ];

  return NextResponse.json(communityReports);
}
