import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { IoTSensorReading, CCTVAert, SatelliteImagery } from '../mock-data/mock-data.service';
import { IoTSensorReading as IoTSensorReadingEntity } from '../entities/iot-sensor-reading.entity';
import { CctvAlert as CctvAlertEntity } from '../entities/cctv-alert.entity';
import { SatelliteImagery as SatelliteImageryEntity } from '../entities/satellite-imagery.entity';

@Injectable()
export class DataIngestionService {
  private readonly logger = new Logger(DataIngestionService.name);

  constructor(
    @InjectRepository(IoTSensorReadingEntity)
    private iotSensorReadingRepository: Repository<IoTSensorReadingEntity>,
    @InjectRepository(CctvAlertEntity)
    private cctvAlertRepository: Repository<CctvAlertEntity>,
    @InjectRepository(SatelliteImageryEntity)
    private satelliteImageryRepository: Repository<SatelliteImageryEntity>,
  ) {}

  async ingestIotData(reading: IoTSensorReading) {
    this.logger.log(`Ingesting IoT Data: ${reading.station_id}`);
    const newReading = this.iotSensorReadingRepository.create(reading);
    await this.iotSensorReadingRepository.save(newReading);
    this.logger.debug(`Saved IoT Data: ${newReading.id}`);
    // TODO: Publish to message queue for Threat Analysis Engine
  }

  async ingestCctvAlert(alert: CCTVAert) {
    this.logger.log(`Ingesting CCTV Alert: ${alert.alert_id}`);
    const newAlert = this.cctvAlertRepository.create(alert);
    await this.cctvAlertRepository.save(newAlert);
    this.logger.debug(`Saved CCTV Alert: ${newAlert.id}`);
    // TODO: Publish to message queue for Threat Analysis Engine
  }

  async ingestSatelliteData(imagery: SatelliteImagery) {
    this.logger.log(`Ingesting Satellite Imagery: ${imagery.provider} - ${imagery.capture_date}`);
    const newImagery = this.satelliteImageryRepository.create(imagery);
    await this.satelliteImageryRepository.save(newImagery);
    this.logger.debug(`Saved Satellite Imagery: ${newImagery.id}`);
    // TODO: Publish to message queue for Threat Analysis Engine
  }
}
