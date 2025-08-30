import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { IoTSensorReading } from '../entities/iot-sensor-reading.entity';
import { CctvAlert } from '../entities/cctv-alert.entity';
import { SatelliteImagery } from '../entities/satellite-imagery.entity';
import { SystemAlert } from '../entities/system-alert.entity';
import { Lgu } from '../entities/lgu.entity';
import { ConfigService } from '../config/config.service';
import * as turf from '@turf/turf'; // For geospatial operations
import * as yaml from 'js-yaml'; // For parsing YAML rule packs
import { v4 as uuidv4 } from 'uuid'; // For generating alert IDs

// Define a basic interface for a rule
interface Rule {
  id: string;
  name: string;
  description: string;
  severity: number;
  conditions: any; // Logic for rule conditions
  alert_template: string; // Template for alert description
  version: string;
}

@Injectable()
export class ThreatAnalysisService {
  private readonly logger = new Logger(ThreatAnalysisService.name);
  private readonly CORRELATION_TIME_WINDOW_MINUTES = 60; // 1 hour
  private readonly CORRELATION_RADIUS_KM = 5; // 5 kilometers

  // In-memory cache for LGU rule packs
  private lguRulePacks: Map<string, Rule[]> = new Map();

  constructor(
    @InjectRepository(IoTSensorReading)
    private iotSensorReadingRepository: Repository<IoTSensorReading>,
    @InjectRepository(CctvAlert)
    private cctvAlertRepository: Repository<CctvAlert>,
    @InjectRepository(SatelliteImagery)
    private satelliteImageryRepository: Repository<SatelliteImagery>,
    @InjectRepository(SystemAlert)
    private systemAlertRepository: Repository<SystemAlert>,
    @InjectRepository(Lgu)
    private lguRepository: Repository<Lgu>,
    private configService: ConfigService,
  ) {}

  // Story 7.2.1: Implement Data Correlation Logic
  async correlateData(
    timestamp: Date,
    location: { latitude: number; longitude: number },
    lguId: string,
  ): Promise<{
    iotReadings: IoTSensorReading[];
    cctvAlerts: CctvAlert[];
    satelliteImagery: SatelliteImagery[];
  }> {
    this.logger.log(`Correlating data for LGU ${lguId} at ${timestamp} near [${location.longitude}, ${location.latitude}]`);

    const timeWindowStart = new Date(timestamp.getTime() - this.CORRELATION_TIME_WINDOW_MINUTES * 60 * 1000);
    const point = turf.point([location.longitude, location.latitude]);
    const buffered = turf.buffer(point, this.CORRELATION_RADIUS_KM, { units: 'kilometers' });

    if (!buffered) {
      this.logger.error('Failed to create geospatial buffer. Invalid location or radius.');
      return { iotReadings: [], cctvAlerts: [], satelliteImagery: [] };
    }
    const bufferedGeometry = JSON.stringify(buffered.geometry);

    // Fetch IoT Readings within time window and spatial proximity
    const iotReadings = await this.iotSensorReadingRepository
      .createQueryBuilder('reading')
      .where('reading.timestamp BETWEEN :start AND :end', { start: timeWindowStart, end: timestamp })
      .andWhere(`ST_Intersects(reading.location, ST_GeomFromGeoJSON(:bufferedGeometry))`, { bufferedGeometry })
      .getMany();

    // Fetch CCTV Alerts within time window and spatial proximity
    const cctvAlerts = await this.cctvAlertRepository
      .createQueryBuilder('alert')
      .where('alert.timestamp BETWEEN :start AND :end', { start: timeWindowStart, end: timestamp })
      .andWhere(`ST_Intersects(alert.location, ST_GeomFromGeoJSON(:bufferedGeometry))`, { bufferedGeometry })
      .getMany();

    // Fetch Satellite Imagery within time window and spatial proximity
    const satelliteImagery = await this.satelliteImageryRepository
      .createQueryBuilder('imagery')
      .where('imagery.capture_date <= :end', { end: timestamp }) // Satellite data is less real-time
      .andWhere(`ST_Intersects(imagery.coverage_area, ST_GeomFromGeoJSON(:bufferedGeometry))`, { bufferedGeometry })
      .getMany();

    this.logger.debug(`Found ${iotReadings.length} IoT readings, ${cctvAlerts.length} CCTV alerts, ${satelliteImagery.length} satellite images.`);

    return { iotReadings, cctvAlerts, satelliteImagery };
  }

  // Story 7.2.2: Define and Load Configurable Rule Packs
  private async loadLguRulePack(lguId: string): Promise<Rule[]> {
    const cachedRules = this.lguRulePacks.get(lguId);
    if (cachedRules) {
      return cachedRules;
    }

    const lgu = await this.lguRepository.findOne({ where: { id: lguId } });
    if (!lgu || !lgu.configuration || !lgu.configuration.rulePack) {
      this.logger.warn(`No rule pack found for LGU ${lguId}. Using default.`);
      // TODO: Implement a default rule pack
      return [];
    }

    try {
      // Assuming rulePack is stored as YAML string in LGU configuration
      const rules = yaml.load(lgu.configuration.rulePack) as Rule[];
      this.lguRulePacks.set(lguId, rules);
      this.logger.log(`Loaded rule pack for LGU ${lguId}, version: ${rules[0]?.version || 'N/A'}`);
      return rules;
    } catch (error) {
      this.logger.error(`Failed to parse rule pack for LGU ${lguId}: ${error.message}`);
      return [];
    }
  }

  // Story 7.2.3: Generate System Alerts
  // Story 7.2.4: Support Rule Pack Versioning and Traceability
  async evaluateThreatsAndGenerateAlerts(
    timestamp: Date,
    location: { latitude: number; longitude: number },
    lguId: string,
    areaMunicipality: string,
    areaBarangay?: string,
  ): Promise<SystemAlert[]> {
    const { iotReadings, cctvAlerts, satelliteImagery } = await this.correlateData(timestamp, location, lguId);
    const rules = await this.loadLguRulePack(lguId);
    const generatedAlerts: SystemAlert[] = [];

    for (const rule of rules) {
      const ruleTriggered = this.evaluateRuleConditions(rule.conditions, { iotReadings, cctvAlerts, satelliteImagery });

      if (ruleTriggered) {
        this.logger.log(`Rule '${rule.name}' triggered for LGU ${lguId}.`);

        // For MVP, simplify geometry to a buffered point for now
        const alertPoint = turf.point([location.longitude, location.latitude]);
        const alertGeometry = turf.buffer(alertPoint, 1, { units: 'kilometers' }); // 1km radius for alert area

        if (!alertGeometry) {
          this.logger.error(`Failed to create alert geometry for rule '${rule.name}'.`);
          continue;
        }

        const newAlert = this.systemAlertRepository.create({
          alert_id: uuidv4(),
          timestamp: new Date(),
          area_municipality: areaMunicipality,
          area_barangay: areaBarangay,
          geometry: alertGeometry.geometry as any, // TypeORM expects GeoJSON object
          description: rule.alert_template.replace('{hazard}', rule.name), // Simple template for now
          severity: rule.severity,
          status: 'Draft',
          rule_pack_version: rule.version,
          triggered_rules: [{ id: rule.id, name: rule.name, version: rule.version }],
          contributing_signals: {
            iot: iotReadings.map(r => r.id),
            cctv: cctvAlerts.map(a => a.id),
            satellite: satelliteImagery.map(i => i.id),
          },
        });
        await this.systemAlertRepository.save(newAlert);
        generatedAlerts.push(newAlert);
        this.logger.debug(`Generated and saved alert: ${newAlert.alert_id}`);
      }
    }
    return generatedAlerts;
  }

  // Placeholder for rule evaluation logic
  private evaluateRuleConditions(conditions: any, data: { iotReadings: IoTSensorReading[]; cctvAlerts: CctvAlert[]; satelliteImagery: SatelliteImagery[] }): boolean {
    // This is a simplified placeholder. Real rule evaluation would be complex.
    // Example: Check if any IoT AWLG reading is above a threshold
    if (conditions.minWaterLevel && data.iotReadings.some(r => r.sensor_type === 'AWLG' && r.value_numeric > conditions.minWaterLevel)) {
      return true;
    }
    // Example: Check for specific CCTV event types
    if (conditions.cctvEventType && data.cctvAlerts.some(a => a.event_type === conditions.cctvEventType)) {
      return true;
    }
    // Example: Check for high soil moisture from satellite
    if (conditions.minSoilMoisture && data.satelliteImagery.some(i => i.analysis_results?.soilMoisture > conditions.minSoilMoisture)) {
      return true;
    }
    return false;
  }
}
