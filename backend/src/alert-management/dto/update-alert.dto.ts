import { IsString, IsOptional, IsNumber, IsEnum, IsUUID, IsObject } from 'class-validator';
import type { Polygon } from 'geojson'; // Assuming geojson types are available

export class UpdateAlertDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  severity?: number;

  @IsOptional()
  @IsEnum(['Draft', 'Pending Review', 'Approved', 'Disseminated', 'Rescinded'])
  status?: 'Draft' | 'Pending Review' | 'Approved' | 'Disseminated' | 'Rescinded';

  @IsOptional()
  @IsString()
  rule_pack_version?: string;

  @IsOptional()
  @IsObject()
  triggered_rules?: any; // Array of rules that fired

  @IsOptional()
  @IsObject()
  contributing_signals?: any; // References to sensor_readings.id, cctv_alerts.id

  @IsOptional()
  @IsString()
  operator_notes?: string;

  @IsOptional()
  @IsUUID()
  approved_by?: string;

  @IsOptional()
  approved_at?: Date;

  @IsOptional()
  @IsObject()
  geometry?: Polygon; // GeoJSON polygon
}
