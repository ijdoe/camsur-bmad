import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private nestConfigService: NestConfigService) {}

  get databaseHost(): string {
    return this.nestConfigService.get('DATABASE_HOST', 'localhost') as string;
  }

  get databasePort(): number {
    return this.nestConfigService.get('DATABASE_PORT', 5432) as number;
  }

  get databaseUser(): string {
    return this.nestConfigService.get('DATABASE_USERNAME', 'postgres') as string;
  }

  get databasePassword(): string {
    return this.nestConfigService.get('DATABASE_PASSWORD', 'postgres') as string;
  }

  get databaseName(): string {
    return this.nestConfigService.get('DATABASE_NAME', 'lingkod_db') as string;
  }

  get jwtSecret(): string {
    return this.nestConfigService.get('JWT_SECRET', 'supersecretjwtkey') as string;
  }

  // Add other configuration getters as needed
}
