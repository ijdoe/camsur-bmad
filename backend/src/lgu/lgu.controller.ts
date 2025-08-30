import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { LguService } from './lgu.service';
import { CreateLguDto } from './dto/create-lgu.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';
import { Permission } from '../auth/roles';

@Controller('lgus')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class LguController {
  constructor(private readonly lguService: LguService) {}

  @Post()
  @Permissions(Permission.ManageLgus)
  create(@Body() createLguDto: CreateLguDto) {
    return this.lguService.create(createLguDto);
  }

  @Get()
  @Permissions(Permission.ViewAlerts)
  findAll() {
    return this.lguService.findAll();
  }
}
