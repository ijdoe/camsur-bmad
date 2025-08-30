import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn } from 'typeorm';
import type { Point } from 'geojson';

@Entity('cctv_alerts')
@Index(['timestamp'])
@Index('idx_cctv_alerts_location', ['location'], { spatial: true }) // For PostGIS GIST index
export class CctvAlert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 255 })
  alert_id: string; // Coram.ai's alert ID

  @Column({ type: 'timestamptz' })
  timestamp: Date;

  @Column({ length: 100 })
  event_type: string; // e.g., 'RapidWaterLevelRise', 'LandslideDetected'

  @Column({ type: 'int' })
  severity: number; // 1-5

  @Column({ length: 255 })
  source_camera_id: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: Point;

  @Column({ type: 'jsonb', nullable: true })
  raw_data: any; // Raw payload from Coram.ai

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
