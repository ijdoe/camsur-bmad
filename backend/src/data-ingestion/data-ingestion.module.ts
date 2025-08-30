import { Module } from '@nestjs/common';
import { DataIngestionService } from './data-ingestion.service';
import { DataIngestionController } from './data-ingestion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IoTSensorReading } from '../entities/iot-sensor-reading.entity';
import { CctvAlert } from '../entities/cctv-alert.entity';
import { SatelliteImagery } from '../entities/satellite-imagery.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([IoTSensorReading, CctvAlert, SatelliteImagery]),
  ],
  controllers: [DataIngestionController],
  providers: [DataIngestionService],
  exports: [DataIngestionService], // Export if MockDataService needs it
})
export class DataIngestionModule {}
