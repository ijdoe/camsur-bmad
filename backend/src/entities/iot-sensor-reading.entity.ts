import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import type { Point } from 'geojson'; // Assuming geojson types are available

@Entity('sensor_readings')
@Index(['station_id', 'timestamp', 'sensor_type'], { unique: true })
@Index('idx_sensor_readings_timestamp', ['timestamp'])
@Index('idx_sensor_readings_location', ['location'], { spatial: true }) // For PostGIS GIST index
export class IoTSensorReading {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  station_id: string;

  @Column({ type: 'timestamptz' })
  timestamp: Date;

  @Column({ length: 50 })
  sensor_type: 'AWLG' | 'ARG' | 'AWS';

  @Column({ type: 'numeric', nullable: true })
  value_numeric: number;

  @Column({ type: 'jsonb', nullable: true })
  value_json: any;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: Point;

  @Column({ type: 'jsonb', nullable: true })
  metadata: any;
}
