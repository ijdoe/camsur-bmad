import { Controller, Post, Body, Logger, UseGuards } from '@nestjs/common';
import { DataIngestionService } from './data-ingestion.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';
import { Permission } from '../auth/roles';

@Controller('data-ingestion')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class DataIngestionController {
  private readonly logger = new Logger(DataIngestionController.name);

  constructor(private readonly dataIngestionService: DataIngestionService) {}

  @Post('iot-sensor')
  @Permissions(Permission.IngestData)
  async ingestIotSensorData(@Body() data: any): Promise<void> {
    this.logger.log('Ingesting IoT sensor data.');
    await this.dataIngestionService.ingestIotData(data);
  }

  @Post('cctv-alert')
  @Permissions(Permission.IngestData)
  async ingestCctvAlertData(@Body() data: any): Promise<void> {
    this.logger.log('Ingesting CCTV alert data.');
    await this.dataIngestionService.ingestCctvAlert(data);
  }

  @Post('satellite-imagery')
  @Permissions(Permission.IngestData)
  async ingestSatelliteImageryData(@Body() data: any): Promise<void> {
    this.logger.log('Ingesting satellite imagery data.');
    await this.dataIngestionService.ingestSatelliteData(data);
  }
}
