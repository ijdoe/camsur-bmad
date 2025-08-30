import { Controller, Get, Post, Put, Param, Body, Logger } from '@nestjs/common';
import { AlertManagementService } from './alert-management.service';
import { SystemAlert } from '../entities/system-alert.entity';
import { UpdateAlertDto } from './dto/update-alert.dto'; // DTO for updating alerts

@Controller('alerts')
export class AlertManagementController {
  private readonly logger = new Logger(AlertManagementController.name);

  constructor(private readonly alertManagementService: AlertManagementService) {}

  // Story 7.3.1: Real-time Alert List Display
  @Get()
  async findAll(): Promise<SystemAlert[]> {
    this.logger.log('Fetching all system alerts.');
    return this.alertManagementService.findAllAlerts();
  }

  // Story 7.3.2: View Alert Details with Evidence Panel
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SystemAlert> {
    this.logger.log(`Fetching alert with ID: ${id}`);
    return this.alertManagementService.findAlertById(id);
  }

  // Story 7.3.3: Approve/Rescind Alerts
  @Post(':id/approve')
  async approveAlert(@Param('id') id: string, @Body('approvedByUserId') approvedByUserId: string): Promise<SystemAlert> {
    this.logger.log(`Approving alert with ID: ${id} by user ${approvedByUserId}`);
    return this.alertManagementService.approveAlert(id, approvedByUserId);
  }

  @Post(':id/rescind')
  async rescindAlert(@Param('id') id: string, @Body('rescindedByUserId') rescindedByUserId: string): Promise<SystemAlert> {
    this.logger.log(`Rescinding alert with ID: ${id} by user ${rescindedByUserId}`);
    return this.alertManagementService.rescindAlert(id, rescindedByUserId);
  }

  // Story 7.3.4: Edit Alert Geometry and Add Notes
  @Put(':id')
  async updateAlert(@Param('id') id: string, @Body() updateAlertDto: UpdateAlertDto): Promise<SystemAlert> {
    this.logger.log(`Updating alert with ID: ${id}`);
    return this.alertManagementService.updateAlert(id, updateAlertDto);
  }
}
