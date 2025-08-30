import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.databaseHost,
        port: configService.databasePort,
        username: configService.databaseUser,
        password: configService.databasePassword,
        database: configService.databaseName,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Path to your entities
        synchronize: false, // WARNING: set to false in production
        logging: false, // Set to true for SQL query logging
        extra: {
          // For PostGIS
          options: '-c search_path=public,postgis',
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
