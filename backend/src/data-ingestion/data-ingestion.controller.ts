import { Controller, Post, Get, Body, Logger } from '@nestjs/common';
import { DataIngestionService } from './data-ingestion.service';
import type { IoTSensorReading, CCTVAert, SatelliteImagery } from '../mock-data/mock-data.service';

@Controller('ingest')
export class DataIngestionController {
  private readonly logger = new Logger(DataIngestionController.name);

  constructor(private readonly dataIngestionService: DataIngestionService) {}

  @Post('iot')
  async ingestIotData(@Body() reading: IoTSensorReading) {
    this.logger.log(`Received IoT data for ingestion: ${reading.station_id}`);
    await this.dataIngestionService.ingestIotData(reading);
    return { status: 'success', message: 'IoT data ingested' };
  }

  @Post('cctv')
  async ingestCctvAlert(@Body() alert: CCTVAert) {
    this.logger.log(`Received CCTV alert for ingestion: ${alert.alert_id}`);
    await this.dataIngestionService.ingestCctvAlert(alert);
    return { status: 'success', message: 'CCTV alert ingested' };
  }

  @Get('satellite') // Using GET for simplicity in triggering mock data pull
  async ingestSatelliteData() {
    this.logger.log('Triggered simulated satellite data ingestion.');
    // In a real scenario, this would trigger a pull from a satellite provider.
    // For MVP, MockDataService will handle the generation and direct ingestion.
    // This endpoint might be used by an admin to manually trigger a satellite data "pull" simulation.
    // For now, we'll just log and acknowledge. The actual data generation is interval-based in MockDataService.
    return { status: 'success', message: 'Simulated satellite data ingestion triggered' };
  }
}
