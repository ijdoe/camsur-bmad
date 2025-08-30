import { Controller, Get, Post, Put, Param, Body, Logger, UseGuards } from '@nestjs/common';
import { AlertManagementService } from './alert-management.service';
import { SystemAlert } from '../entities/system-alert.entity';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';
import { Permission } from '../auth/roles';

@Controller('alerts')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class AlertManagementController {
  private readonly logger = new Logger(AlertManagementController.name);

  constructor(private readonly alertManagementService: AlertManagementService) {}

  @Get()
  @Permissions(Permission.ViewAlerts)
  async findAll(): Promise<SystemAlert[]> {
    this.logger.log('Fetching all system alerts.');
    return this.alertManagementService.findAllAlerts();
  }

  @Get(':id')
  @Permissions(Permission.ViewAlerts)
  async findOne(@Param('id') id: string): Promise<SystemAlert> {
    this.logger.log(`Fetching alert with ID: ${id}`);
    return this.alertManagementService.findAlertById(id);
  }

  @Post(':id/approve')
  @Permissions(Permission.ApproveAlerts)
  async approveAlert(@Param('id') id: string, @Body('approvedByUserId') approvedByUserId: string): Promise<SystemAlert> {
    this.logger.log(`Approving alert with ID: ${id} by user ${approvedByUserId}`);
    return this.alertManagementService.approveAlert(id, approvedByUserId);
  }

  @Post(':id/rescind')
  @Permissions(Permission.ApproveAlerts)
  async rescindAlert(@Param('id') id: string, @Body('rescindedByUserId') rescindedByUserId: string): Promise<SystemAlert> {
    this.logger.log(`Rescinding alert with ID: ${id} by user ${rescindedByUserId}`);
    return this.alertManagementService.rescindAlert(id, rescindedByUserId);
  }

  @Put(':id')
  @Permissions(Permission.ApproveAlerts)
  async updateAlert(@Param('id') id: string, @Body() updateAlertDto: UpdateAlertDto): Promise<SystemAlert> {
    this.logger.log(`Updating alert with ID: ${id}`);
    return this.alertManagementService.updateAlert(id, updateAlertDto);
  }
}
