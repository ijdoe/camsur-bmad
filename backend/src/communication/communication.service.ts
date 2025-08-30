import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemAlert } from '../entities/system-alert.entity';
import { Lgu } from '../entities/lgu.entity';

@Injectable()
export class CommunicationService {
  private readonly logger = new Logger(CommunicationService.name);

  constructor(
    @InjectRepository(SystemAlert)
    private systemAlertRepository: Repository<SystemAlert>,
    @InjectRepository(Lgu)
    private lguRepository: Repository<Lgu>,
  ) {}

  private async getAlertAndLgu(alertId: string, lguId: string): Promise<{ alert: SystemAlert; lgu: Lgu }> {
    const alert = await this.systemAlertRepository.findOne({ where: { id: alertId } });
    if (!alert) {
      throw new NotFoundException(`Alert with ID ${alertId} not found.`);
    }

    const lgu = await this.lguRepository.findOne({ where: { id: lguId } });
    if (!lgu) {
      throw new NotFoundException(`LGU with ID ${lguId} not found.`);
    }
    return { alert, lgu };
  }

  // Story 7.5.1: Generate Localized SMS Content
  async generateSmsContent(alertId: string, lguId: string, language: string = 'en'): Promise<string> {
    const { alert, lgu } = await this.getAlertAndLgu(alertId, lguId);
    const template = lgu.configuration?.communicationTemplates?.sms?.[language] || this.getDefaultSmsTemplate(language);

    // Simple templating for MVP
    let content = template
      .replace('{alert_description}', alert.description)
      .replace('{alert_severity}', alert.severity.toString())
      .replace('{area_municipality}', alert.area_municipality)
      .replace('{area_barangay}', alert.area_barangay || 'all affected barangays');

    this.logger.log(`Generated SMS for alert ${alertId} (LGU: ${lguId}, Lang: ${language})`);
    return content;
  }

  // Story 7.5.2: Generate Pre-formatted Radio Broadcast Scripts
  async generateRadioScriptContent(alertId: string, lguId: string, language: string = 'en'): Promise<string> {
    const { alert, lgu } = await this.getAlertAndLgu(alertId, lguId);
    const template = lgu.configuration?.communicationTemplates?.radio?.[language] || this.getDefaultRadioTemplate(language);

    let content = template
      .replace('{alert_description}', alert.description)
      .replace('{alert_severity}', alert.severity.toString())
      .replace('{area_municipality}', alert.area_municipality)
      .replace('{area_barangay}', alert.area_barangay || 'all affected barangays');

    this.logger.log(`Generated Radio Script for alert ${alertId} (LGU: ${lguId}, Lang: ${language})`);
    return content;
  }

  // Story 7.5.3: Generate Official Alerts for Barangay Officials
  async generateBarangayAlertContent(alertId: string, lguId: string, language: string = 'en'): Promise<string> {
    const { alert, lgu } = await this.getAlertAndLgu(alertId, lguId);
    const template = lgu.configuration?.communicationTemplates?.barangay?.[language] || this.getDefaultBarangayTemplate(language);

    let content = template
      .replace('{alert_description}', alert.description)
      .replace('{alert_severity}', alert.severity.toString())
      .replace('{area_municipality}', alert.area_municipality)
      .replace('{area_barangay}', alert.area_barangay || 'all affected barangays');

    this.logger.log(`Generated Barangay Alert for alert ${alertId} (LGU: ${lguId}, Lang: ${language})`);
    return content;
  }

  private getDefaultSmsTemplate(language: string): string {
    // Basic default templates for demo
    if (language === 'fil') return 'BABALA: {alert_description} sa {area_municipality}, {area_barangay}. Severity: {alert_severity}.';
    if (language === 'bcl') return 'PAANDAM: {alert_description} sa {area_municipality}, {area_barangay}. Severity: {alert_severity}.';
    return 'ALERT: {alert_description} in {area_municipality}, {area_barangay}. Severity: {alert_severity}.';
  }

  private getDefaultRadioTemplate(language: string): string {
    if (language === 'fil') return 'Ito ay isang mahalagang anunsyo. Mayroong {alert_description} sa {area_municipality}, partikular sa {area_barangay}. Ang antas ng pagbabanta ay {alert_severity}. Mangyaring manatiling alerto.';
    if (language === 'bcl') return 'Ini sarong importanteng patanid. Igwang {alert_description} sa {area_municipality}, partikular sa {area_barangay}. An lebel nin peligro iyo {alert_severity}. Magdanay na alerto.';
    return 'This is an important announcement. There is a {alert_description} in {area_municipality}, specifically in {area_barangay}. The threat level is {alert_severity}. Please remain vigilant.';
  }

  private getDefaultBarangayTemplate(language: string): string {
    if (language === 'fil') return 'OPISYAL NA BABALA SA BARANGAY: Mayroong {alert_description} sa inyong lugar. Ang severity ay {alert_severity}. Mangyaring ipatupad ang mga sumusunod na aksyon: [INSERT ACTIONS HERE].';
    if (language === 'bcl') return 'OPISYAL NA PAANDAM SA BARANGAY: Igwang {alert_description} sa saindong lugar. An severity iyo {alert_severity}. Paki-implementar an mga minasunod na aksyon: [INSERT ACTIONS HERE].';
    return 'OFFICIAL BARANGAY ALERT: There is a {alert_description} in your area. Severity is {alert_severity}. Please implement the following actions: [INSERT ACTIONS HERE].';
  }
}
