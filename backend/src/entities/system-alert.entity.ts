import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import type { Polygon } from 'geojson';
import { User } from './user.entity';

@Entity('system_alerts')
@Index(['timestamp'])
@Index('idx_system_alerts_geometry', ['geometry'], { spatial: true }) // For PostGIS GIST index
@Index('idx_system_alerts_status', ['status'])
export class SystemAlert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 255 })
  alert_id: string; // Internal system ID

  @Column({ type: 'timestamptz' })
  timestamp: Date;

  @Column({ length: 255 })
  area_municipality: string;

  @Column({ nullable: true, length: 255 })
  area_barangay: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Polygon',
    srid: 4326,
  })
  geometry: Polygon; // GeoJSON polygon

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  severity: number; // 1-5

  @Column({ length: 50, default: 'Draft' })
  status: 'Draft' | 'Pending Review' | 'Approved' | 'Disseminated' | 'Rescinded';

  @Column({ length: 50 })
  rule_pack_version: string;

  @Column({ type: 'jsonb', nullable: true })
  triggered_rules: any; // Array of rules that fired

  @Column({ type: 'jsonb', nullable: true })
  contributing_signals: any; // References to sensor_readings.id, cctv_alerts.id

  @Column({ type: 'text', nullable: true })
  operator_notes: string;

  @Column({ type: 'uuid', nullable: true })
  approved_by: string;

  @ManyToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'approved_by' })
  approver: User;

  @Column({ type: 'timestamptz', nullable: true })
  approved_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
