import { NextResponse } from 'next/server';

export async function GET() {
  const sensors = [
    {
      id: '1',
      name: 'Naga River - AWLG',
      type: 'AWLG',
      value: 2.5,
      unit: 'm',
      status: 'normal',
      location: 'Naga City',
      lastUpdate: new Date(),
      trend: 'stable',
    },
    {
        id: '2',
        name: 'Mt. Isarog - ARG',
        type: 'ARG',
        value: 0,
        unit: 'mm',
        status: 'normal',
        location: 'Tigaon',
        lastUpdate: new Date(),
        trend: 'stable',
      },
      {
        id: '3',
        name: 'Iriga City - AWS',
        type: 'AWS',
        value: 32,
        unit: '°C',
        status: 'warning',
        location: 'Iriga City',
        lastUpdate: new Date(),
        trend: 'up',
      },
  ];

  return NextResponse.json(sensors);
}
