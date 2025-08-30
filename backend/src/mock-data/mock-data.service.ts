import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { DataIngestionService } from '../data-ingestion/data-ingestion.service';
import { Point } from 'geojson';

// Define interfaces for mock data
export interface IoTSensorReading {
  station_id: string;
  timestamp: Date;
  sensor_type: 'AWLG' | 'ARG' | 'AWS';
  value_numeric?: number;
  value_json?: any;
  location: Point;
  metadata?: any;
}

export interface CCTVAert {
  alert_id: string;
  timestamp: Date;
  event_type: 'RapidWaterLevelRise' | 'LandslideDetected' | 'TrafficCongestion';
  severity: number;
  source_camera_id: string;
  location: Point;
  raw_data?: any;
}

export interface SatelliteImagery {
  capture_date: Date;
  provider: string;
  image_url: string;
  analysis_results: any;
  coverage_area: any; // GeoJSON Polygon
}

interface ScenarioConfig {
  region: 'CamSur' | 'Metro Manila';
  hazard: 'normal' | 'typhoon' | 'flood' | 'urban_flood';
  iot_stations: { id: string; location: Point; type: 'river' | 'urban' }[];
  cctv_cameras: { id: string; location: Point; type: 'bridge' | 'road' }[];
  satellite_areas: { id: string; coverage: any }[];
}

@Injectable()
export class MockDataService {
  private readonly logger = new Logger(MockDataService.name);
  private currentScenario: ScenarioConfig;
  private intervalActive: boolean = false;

  // Example static scenario data (can be loaded from config later)
  private staticScenarios: { [key: string]: ScenarioConfig } = {
    'camsur_flash_flood': {
      region: 'CamSur',
      hazard: 'flood',
      iot_stations: [
        { id: 'CS-AWLG-001', location: { type: 'Point', coordinates: [123.18, 13.62] }, type: 'river' },
        { id: 'CS-ARG-001', location: { type: 'Point', coordinates: [123.19, 13.63] }, type: 'river' },
      ],
      cctv_cameras: [
        { id: 'CS-CCTV-BR-001', location: { type: 'Point', coordinates: [123.185, 13.625] }, type: 'bridge' },
      ],
      satellite_areas: [
        { id: 'CS-SAT-001', coverage: { type: 'Polygon', coordinates: [[[123.17, 13.61], [123.20, 13.61], [123.20, 13.64], [123.17, 13.64], [123.17, 13.61]]]} },
      ],
    },
    'metro_manila_urban_flood': {
      region: 'Metro Manila',
      hazard: 'urban_flood',
      iot_stations: [
        { id: 'MM-AWLG-001', location: { type: 'Point', coordinates: [121.00, 14.58] }, type: 'urban' },
        { id: 'MM-ARG-001', location: { type: 'Point', coordinates: [121.01, 14.59] }, type: 'urban' },
      ],
      cctv_cameras: [
        { id: 'MM-CCTV-RD-001', location: { type: 'Point', coordinates: [121.005, 14.585] }, type: 'road' },
      ],
      satellite_areas: [
        { id: 'MM-SAT-001', coverage: { type: 'Polygon', coordinates: [[[120.99, 14.57], [121.02, 14.57], [121.02, 14.60], [120.99, 14.60], [120.99, 14.57]]]} },
      ],
    },
  };

  constructor(private readonly dataIngestionService: DataIngestionService) {}

  configureScenario(scenarioName: string): boolean {
    const scenario = this.staticScenarios[scenarioName];
    if (scenario) {
      this.currentScenario = scenario;
      this.logger.log(`Scenario configured: ${scenarioName} (${scenario.region}, ${scenario.hazard})`);
      this.startMockDataGeneration();
      return true;
    }
    this.logger.warn(`Scenario '${scenarioName}' not found.`);
    return false;
  }

  startMockDataGeneration() {
    if (!this.currentScenario) {
      this.logger.warn('No scenario configured. Cannot start mock data generation.');
      return;
    }
    if (!this.intervalActive) {
      this.intervalActive = true;
      this.logger.log('Started mock data generation interval.');
      // The @Interval decorator will handle the periodic execution
    }
  }

  stopMockDataGeneration() {
    this.intervalActive = false;
    this.logger.log('Stopped mock data generation interval.');
  }

  @Interval(15000) // Generate data every 15 seconds for demo purposes (instead of 15 minutes)
  private async generateAndIngestMockData() {
    if (!this.intervalActive || !this.currentScenario) {
      return;
    }

    const now = new Date();
    this.logger.debug(`Generating mock data for scenario: ${this.currentScenario.hazard}`);

    // Generate IoT Sensor Data (Story 7.1.1)
    for (const station of this.currentScenario.iot_stations) {
      const reading: IoTSensorReading = {
        station_id: station.id,
        timestamp: now,
        sensor_type: station.type === 'river' ? (Math.random() > 0.5 ? 'AWLG' : 'ARG') : 'AWS',
        location: station.location,
      };

      if (reading.sensor_type === 'AWLG') {
        reading.value_numeric = this.generateWaterLevel(this.currentScenario.hazard);
      } else if (reading.sensor_type === 'ARG') {
        reading.value_numeric = this.generateRainfall(this.currentScenario.hazard);
      } else if (reading.sensor_type === 'AWS') {
        reading.value_json = this.generateWeatherData(this.currentScenario.hazard);
      }
      await this.dataIngestionService.ingestIotData(reading);
    }

    // Simulate CCTV Alerts (Story 7.1.2)
    for (const camera of this.currentScenario.cctv_cameras) {
      if (Math.random() < this.getAlertProbability(this.currentScenario.hazard)) { // Probability of alert
        const alert: CCTVAert = {
          alert_id: `CCTV-${camera.id}-${now.getTime()}`,
          timestamp: now,
          event_type: this.generateCCTVEventType(this.currentScenario.hazard),
          severity: this.generateSeverity(this.currentScenario.hazard),
          source_camera_id: camera.id,
          location: camera.location,
        };
        await this.dataIngestionService.ingestCctvAlert(alert);
      }
    }

    // Simulate Satellite Imagery Data (Story 7.1.3)
    for (const area of this.currentScenario.satellite_areas) {
      if (Math.random() < 0.1) { // Less frequent satellite updates
        const imagery: SatelliteImagery = {
          capture_date: now,
          provider: 'SimulatedLabs',
          image_url: `https://mock-satellite.com/image-${now.getTime()}.jpg`,
          analysis_results: this.generateSatelliteAnalysis(this.currentScenario.hazard),
          coverage_area: area.coverage,
        };
        await this.dataIngestionService.ingestSatelliteData(imagery);
      }
    }
  }

  private generateWaterLevel(hazard: string): number {
    switch (hazard) {
      case 'flood': return parseFloat((Math.random() * 2 + 3).toFixed(2)); // 3.00-5.00m
      case 'urban_flood': return parseFloat((Math.random() * 1 + 1.5).toFixed(2)); // 1.50-2.50m
      default: return parseFloat((Math.random() * 0.5 + 0.5).toFixed(2)); // 0.50-1.00m
    }
  }

  private generateRainfall(hazard: string): number {
    switch (hazard) {
      case 'typhoon': return parseFloat((Math.random() * 30 + 40).toFixed(2)); // 40-70mm/hr
      case 'flood': return parseFloat((Math.random() * 15 + 20).toFixed(2)); // 20-35mm/hr
      case 'urban_flood': return parseFloat((Math.random() * 10 + 15).toFixed(2)); // 15-25mm/hr
      default: return parseFloat((Math.random() * 2 + 1).toFixed(2)); // 1-3mm/hr
    }
  }

  private generateWeatherData(hazard: string): any {
    const baseTemp = 28; // Celsius
    const baseHumidity = 80; // %
    const baseWind = 10; // km/h

    let temp = baseTemp + (Math.random() * 4 - 2);
    let humidity = baseHumidity + (Math.random() * 10 - 5);
    let windSpeed = baseWind + (Math.random() * 5 - 2.5);

    if (hazard === 'typhoon') {
      temp -= Math.random() * 3;
      humidity += Math.random() * 10;
      windSpeed += Math.random() * 30 + 20; // Stronger winds
    } else if (hazard === 'flood' || hazard === 'urban_flood') {
      humidity += Math.random() * 5;
      windSpeed += Math.random() * 5;
    }

    return {
      temperature: parseFloat(temp.toFixed(2)),
      humidity: parseFloat(humidity.toFixed(2)),
      windSpeed: parseFloat(windSpeed.toFixed(2)),
      pressure: parseFloat((1000 + Math.random() * 20 - 10).toFixed(2)),
    };
  }

  private getAlertProbability(hazard: string): number {
    switch (hazard) {
      case 'flood': return 0.6;
      case 'urban_flood': return 0.7;
      case 'typhoon': return 0.5;
      default: return 0.05; // Low probability for normal conditions
    }
  }

  private generateCCTVEventType(hazard: string): CCTVAert['event_type'] {
    switch (hazard) {
      case 'flood':
      case 'urban_flood': return Math.random() > 0.5 ? 'RapidWaterLevelRise' : 'TrafficCongestion';
      case 'typhoon': return Math.random() > 0.7 ? 'LandslideDetected' : 'RapidWaterLevelRise';
      default: return 'TrafficCongestion';
    }
  }

  private generateSeverity(hazard: string): number {
    switch (hazard) {
      case 'flood': return Math.floor(Math.random() * 2) + 3; // 3-4
      case 'urban_flood': return Math.floor(Math.random() * 2) + 3; // 3-4
      case 'typhoon': return Math.floor(Math.random() * 2) + 4; // 4-5
      default: return 1;
    }
  }

  private generateSatelliteAnalysis(hazard: string): any {
    const baseSoilMoisture = 0.4; // 0-1
    const baseVegetationIndex = 0.6; // 0-1

    let soilMoisture = baseSoilMoisture + (Math.random() * 0.2 - 0.1);
    let vegetationIndex = baseVegetationIndex + (Math.random() * 0.1 - 0.05);

    if (hazard === 'typhoon' || hazard === 'flood' || hazard === 'urban_flood') {
      soilMoisture += Math.random() * 0.3 + 0.1; // Higher soil moisture
      vegetationIndex -= Math.random() * 0.1; // Slightly lower vegetation
    }

    return {
      soilMoisture: parseFloat(soilMoisture.toFixed(2)),
      vegetationIndex: parseFloat(vegetationIndex.toFixed(2)),
      cloudCover: parseFloat((Math.random() * 0.3 + (hazard === 'normal' ? 0.1 : 0.5)).toFixed(2)),
    };
  }
}
