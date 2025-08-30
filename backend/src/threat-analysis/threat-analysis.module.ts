import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ThreatAnalysisService } from './threat-analysis.service';
import { IoTSensorReading } from '../entities/iot-sensor-reading.entity';
import { CctvAlert } from '../entities/cctv-alert.entity';
import { SatelliteImagery } from '../entities/satellite-imagery.entity';
import { SystemAlert } from '../entities/system-alert.entity';
import { Lgu } from '../entities/lgu.entity';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([IoTSensorReading, CctvAlert, SatelliteImagery, SystemAlert, Lgu]),
    ConfigModule,
  ],
  providers: [ThreatAnalysisService, ConfigService],
  exports: [ThreatAnalysisService, ConfigService],
})
export class ThreatAnalysisModule {}
