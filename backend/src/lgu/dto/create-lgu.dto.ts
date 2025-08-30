import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateLguDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsString()
  province?: string;

  @IsOptional()
  @IsString()
  city_municipality?: string;

  @IsOptional()
  @IsObject()
  configuration?: any;
}
