import { Controller, Post, Body, Logger, UseGuards } from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { GenerateCommunicationDto } from './dto/generate-communication.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';
import { Permission } from '../auth/roles';

@Controller('communication')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class CommunicationController {
  private readonly logger = new Logger(CommunicationController.name);

  constructor(private readonly communicationService: CommunicationService) {}

  @Post('sms')
  @Permissions(Permission.GenerateCommunications)
  async generateSms(@Body() generateCommunicationDto: GenerateCommunicationDto) {
    this.logger.log(`Generating SMS for alert ID: ${generateCommunicationDto.alertId}`);
    return this.communicationService.generateSmsContent(
      generateCommunicationDto.alertId,
      generateCommunicationDto.lguId,
      generateCommunicationDto.language,
    );
  }

  @Post('radio')
  @Permissions(Permission.GenerateCommunications)
  async generateRadioScript(@Body() generateCommunicationDto: GenerateCommunicationDto) {
    this.logger.log(`Generating radio script for alert ID: ${generateCommunicationDto.alertId}`);
    return this.communicationService.generateRadioScriptContent(
      generateCommunicationDto.alertId,
      generateCommunicationDto.lguId,
      generateCommunicationDto.language,
    );
  }

  @Post('barangay')
  @Permissions(Permission.GenerateCommunications)
  async generateBarangayAlert(@Body() generateCommunicationDto: GenerateCommunicationDto) {
    this.logger.log(`Generating barangay alert for alert ID: ${generateCommunicationDto.alertId}`);
    return this.communicationService.generateBarangayAlertContent(
      generateCommunicationDto.alertId,
      generateCommunicationDto.lguId,
      generateCommunicationDto.language,
    );
  }
}
