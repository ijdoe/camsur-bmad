import { Module } from '@nestjs/common';
import { MockDataService } from './mock-data.service';
import { ScheduleModule } from '@nestjs/schedule';
import { DataIngestionModule } from '../data-ingestion/data-ingestion.module';

@Module({
  imports: [ScheduleModule, DataIngestionModule],
  providers: [MockDataService],
  exports: [MockDataService], // Export if needed by other modules
})
export class MockDataModule {}
