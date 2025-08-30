import { Controller, Post, Body, Param, Logger } from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { GenerateCommunicationDto } from './dto/generate-communication.dto'; // DTO for communication generation

@Controller('communications')
export class CommunicationController {
  private readonly logger = new Logger(CommunicationController.name);

  constructor(private readonly communicationService: CommunicationService) {}

  // Story 7.5.1: Generate Localized SMS Content
  @Post('generate-sms')
  async generateSms(@Body() generateCommunicationDto: GenerateCommunicationDto): Promise<{ content: string }> {
    this.logger.log(`Generating SMS for alert ${generateCommunicationDto.alertId}`);
    const content = await this.communicationService.generateSmsContent(
      generateCommunicationDto.alertId,
      generateCommunicationDto.lguId,
      generateCommunicationDto.language,
    );
    return { content };
  }

  // Story 7.5.2: Generate Pre-formatted Radio Broadcast Scripts
  @Post('generate-radio')
  async generateRadioScript(@Body() generateCommunicationDto: GenerateCommunicationDto): Promise<{ content: string }> {
    this.logger.log(`Generating radio script for alert ${generateCommunicationDto.alertId}`);
    const content = await this.communicationService.generateRadioScriptContent(
      generateCommunicationDto.alertId,
      generateCommunicationDto.lguId,
      generateCommunicationDto.language,
    );
    return { content };
  }

  // Story 7.5.3: Generate Official Alerts for Barangay Officials
  @Post('generate-barangay')
  async generateBarangayAlert(@Body() generateCommunicationDto: GenerateCommunicationDto): Promise<{ content: string }> {
    this.logger.log(`Generating barangay alert for alert ${generateCommunicationDto.alertId}`);
    const content = await this.communicationService.generateBarangayAlertContent(
      generateCommunicationDto.alertId,
      generateCommunicationDto.lguId,
      generateCommunicationDto.language,
    );
    return { content };
  }
}
