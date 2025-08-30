import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataIngestionModule } from './data-ingestion/data-ingestion.module';
import { MockDataModule } from './mock-data/mock-data.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ThreatAnalysisModule } from './threat-analysis/threat-analysis.module';
import { AlertManagementModule } from './alert-management/alert-management.module';
import { CommunicationModule } from './communication/communication.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule,
    DatabaseModule,
    DataIngestionModule,
    MockDataModule,
    ThreatAnalysisModule,
    AlertManagementModule,
    CommunicationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
