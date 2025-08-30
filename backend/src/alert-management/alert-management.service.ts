import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemAlert } from '../entities/system-alert.entity';
import { User } from '../entities/user.entity';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Injectable()
export class AlertManagementService {
  private readonly logger = new Logger(AlertManagementService.name);

  constructor(
    @InjectRepository(SystemAlert)
    private systemAlertRepository: Repository<SystemAlert>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Story 7.3.1: Real-time Alert List Display
  async findAllAlerts(): Promise<SystemAlert[]> {
    return this.systemAlertRepository.find({
      order: { timestamp: 'DESC' },
    });
  }

  // Story 7.3.2: View Alert Details with Evidence Panel
  async findAlertById(id: string): Promise<SystemAlert> {
    const alert = await this.systemAlertRepository.findOne({
      where: { id },
      relations: ['approver'], // Load approver user details if available
    });
    if (!alert) {
      throw new NotFoundException(`Alert with ID ${id} not found.`);
    }
    return alert;
  }

  // Story 7.3.3: Approve/Rescind Alerts
  async approveAlert(id: string, approvedByUserId: string): Promise<SystemAlert> {
    const alert = await this.findAlertById(id);
    const approver = await this.userRepository.findOne({ where: { id: approvedByUserId } });

    if (!approver) {
      throw new NotFoundException(`Approver user with ID ${approvedByUserId} not found.`);
    }

    alert.status = 'Approved';
    alert.approved_by = approvedByUserId;
    alert.approved_at = new Date();
    // TODO: Simulate dissemination here (Epic 7.5)
    this.logger.log(`Alert ${id} approved by ${approver.username}.`);
    return this.systemAlertRepository.save(alert);
  }

  async rescindAlert(id: string, rescindedByUserId: string): Promise<SystemAlert> {
    const alert = await this.findAlertById(id);
    const rescinder = await this.userRepository.findOne({ where: { id: rescindedByUserId } });

    if (!rescinder) {
      throw new NotFoundException(`Rescinder user with ID ${rescindedByUserId} not found.`);
    }

    alert.status = 'Rescinded';
    alert.operator_notes = alert.operator_notes ? `${alert.operator_notes}\nRescinded by ${rescinder.username} at ${new Date().toISOString()}` : `Rescinded by ${rescinder.username} at ${new Date().toISOString()}`;
    // No need to clear approved_by/at, as it's part of audit trail
    this.logger.log(`Alert ${id} rescinded by ${rescinder.username}.`);
    return this.systemAlertRepository.save(alert);
  }

  // Story 7.3.4: Edit Alert Geometry and Add Notes
  async updateAlert(id: string, updateAlertDto: UpdateAlertDto): Promise<SystemAlert> {
    const alert = await this.findAlertById(id);

    // Apply updates from DTO
    Object.assign(alert, updateAlertDto);

    // Handle geometry update if provided
    if (updateAlertDto.geometry) {
      // TypeORM's save will handle GeoJSON object to PostGIS geometry conversion
      alert.geometry = updateAlertDto.geometry;
    }

    // TODO: Record operator who updated and timestamp for audit trail
    this.logger.log(`Alert ${id} updated.`);
    return this.systemAlertRepository.save(alert);
  }
}
