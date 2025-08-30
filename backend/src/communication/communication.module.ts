import { Module } from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { CommunicationController } from './communication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemAlert } from '../entities/system-alert.entity';
import { Lgu } from '../entities/lgu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SystemAlert, Lgu]),
  ],
  controllers: [CommunicationController],
  providers: [CommunicationService],
  exports: [CommunicationService], // Export if needed by other modules
})
export class CommunicationModule {}
