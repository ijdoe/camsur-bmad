import { Module } from '@nestjs/common';
import { AlertManagementService } from './alert-management.service';
import { AlertManagementController } from './alert-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemAlert } from '../entities/system-alert.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SystemAlert, User]),
  ],
  controllers: [AlertManagementController],
  providers: [AlertManagementService],
  exports: [AlertManagementService], // Export if needed by other modules
})
export class AlertManagementModule {}
