import { NextResponse } from 'next/server';

// Mock data generators
const municipalities = [
  'Naga City', 'Iriga City', 'Libmanan', 'Pili', 'Nabua', 'Bula', 'Balatan', 'Bato', 'Bombon', 'Buhi',
  'Calabanga', 'Camaligan', 'Canaman', 'Caramoan', 'Del Gallego', 'Gainza', 'Garchitorena', 'Goa',
  'Lagonoy', 'Magarao', 'Milaor', 'Minalabac', 'Naga City', 'Ocampo', 'Pamplona', 'Pasacao',
  'Pili', 'Presentacion', 'Ragay', 'Sagñay', 'San Fernando', 'San Jose', 'Sipocot', 'Siruma',
  'Tigaon', 'Tinambac'
];

const barangays = [
  'San Roque', 'San Antonio', 'San Jose', 'San Miguel', 'San Rafael', 'San Vicente', 'Santa Cruz',
  'Santa Elena', 'Santa Rosa', 'Santo Domingo', 'Poblacion', 'Centro', 'San Isidro', 'Sta. Cruz',
  'Sta. Elena', 'Sta. Maria', 'Sta. Rosa', 'Sto. Domingo', 'Sto. Niño', 'Sto. Tomas'
];

const insightTypes = [
  'Barangay Flood Watch', 'Landslide Warning', 'Critical Facility Impact', 'Route Vulnerability',
  'Hotspot Escalation Score', 'Storm Surge Alert', 'Quake Rapid Impact', 'Community Report Alert',
  'Sensor Malfunction', 'Weather Pattern Change'
];

const statuses = ['Draft', 'Pending Review', 'Approved', 'Disseminated'];

const generateRandomDate = (daysBack: number = 7) => {
  const now = new Date();
  const randomDays = Math.floor(Math.random() * daysBack);
  return new Date(now.getTime() - randomDays * 24 * 60 * 60 * 1000);
};

const generateEvidence = (id: string, type: string) => {
  const evidenceTypes = ['sensor', 'satellite', 'weather', 'social', 'facility', 'traffic'];
  const sources = ['PAGASA', 'PHIVOLCS', 'MAXAR', 'Community Reports', 'River Sensor', 'CCTV Camera'];

  return {
    id: `ev${id}`,
    type: evidenceTypes[Math.floor(Math.random() * evidenceTypes.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    description: `Generated evidence for ${type} insight.`,
    confidence: Math.floor(Math.random() * 20) + 80, // 80-99
    timestamp: generateRandomDate(),
  };
};

const generateRecommendation = (id: string, priority: string) => {
  const types = ['sms', 'radio', 'alert'];
  const contents = [
    'Flood warning issued. Prepare for possible evacuation.',
    'Landslide risk detected. Residents advised to stay alert.',
    'Critical facility at risk. Contingency plans activated.',
    'Route vulnerability detected. Consider alternative paths.',
    'Hotspot escalation detected. Monitor situation closely.'
  ];

  return {
    id: `rec${id}`,
    type: types[Math.floor(Math.random() * types.length)],
    priority,
    content: contents[Math.floor(Math.random() * contents.length)],
  };
};

const generateInsights = (count: number = 100) => {
  const insights = [];

  for (let i = 1; i <= count; i++) {
    const municipality = municipalities[Math.floor(Math.random() * municipalities.length)];
    const barangay = barangays[Math.floor(Math.random() * barangays.length)];
    const insightType = insightTypes[Math.floor(Math.random() * insightTypes.length)];
    const severity = Math.floor(Math.random() * 5) + 1; // 1-5
    const confidence = Math.floor(Math.random() * 20) + 80; // 80-99
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const hotspotScore = Math.floor(Math.random() * 30) + 70; // 70-99

    const evidenceCount = Math.floor(Math.random() * 3) + 1; // 1-3 pieces of evidence
    const evidence = [];
    for (let j = 0; j < evidenceCount; j++) {
      evidence.push(generateEvidence(`${i}-${j}`, insightType));
    }

    const recommendationCount = Math.floor(Math.random() * 2) + 1; // 1-2 recommendations
    const recommendations = [];
    for (let j = 0; j < recommendationCount; j++) {
      const priority = severity >= 4 ? 'high' : severity >= 3 ? 'medium' : 'low';
      recommendations.push(generateRecommendation(`${i}-${j}`, priority));
    }

    insights.push({
      id: i.toString(),
      insightType,
      affectedArea: `Brgy. ${barangay}, ${municipality}`,
      severity,
      confidence,
      timestamp: generateRandomDate(),
      status,
      hotspotScore,
      lgu: 'Camarines Sur',
      municipality,
      barangay,
      evidence,
      recommendations,
    });
  }

  return insights;
};

export async function GET() {
  const insights = generateInsights(120); // Generate 120 insights for comprehensive testing

  return NextResponse.json(insights);
}
