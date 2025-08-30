import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: '.env', // Specify the path to your .env file
      isGlobal: true, // Makes ConfigModule available globally
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService], // Export ConfigService to be used in other modules
})
export class ConfigModule {}
