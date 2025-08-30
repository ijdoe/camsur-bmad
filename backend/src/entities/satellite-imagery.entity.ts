import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn } from 'typeorm';
import type { Polygon } from 'geojson'; // Assuming geojson types are available

@Entity('satellite_imagery')
@Index(['capture_date'])
@Index('idx_satellite_imagery_coverage_area', ['coverage_area'], { spatial: true }) // For PostGIS GIST index
export class SatelliteImagery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  capture_date: Date;

  @Column({ length: 100 })
  provider: string;

  @Column({ type: 'text' })
  image_url: string; // URL to a simulated image or placeholder

  @Column({ type: 'jsonb', nullable: true })
  analysis_results: any; // e.g., soil moisture, vegetation index

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Polygon',
    srid: 4326,
  })
  coverage_area: Polygon;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
