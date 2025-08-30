import { IsString, IsUUID, IsOptional } from 'class-validator';

export class GenerateCommunicationDto {
  @IsUUID()
  alertId: string;

  @IsUUID()
  lguId: string;

  @IsOptional()
  @IsString()
  language?: string; // e.g., 'en', 'fil', 'bcl' (Bikol)
}
