import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lgu } from '../entities/lgu.entity';
import { LguController } from './lgu.controller';
import { LguService } from './lgu.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lgu])],
  controllers: [LguController],
  providers: [LguService],
})
export class LguModule {}
