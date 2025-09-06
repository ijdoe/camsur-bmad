import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PermissionsGuard } from './permissions.guard';
import { Permissions } from './permissions.decorator';
import { AuthService } from './auth.service';
import { Permission } from './roles';

@Controller('users')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UsersController {
  constructor(private authService: AuthService) {}

  @Get()
  @Permissions(Permission.ManageUsers)
  async findAll() {
    return this.authService.findAllUsers();
  }

  @Get(':id')
  @Permissions(Permission.ManageUsers)
  async findOne(@Param('id') id: string) {
    return this.authService.findUserById(id);
  }

  @Post()
  @Permissions(Permission.ManageUsers)
  async create(@Body() createUserDto: { username: string; password: string; email: string; role: string; lgu_id: string }) {
    return this.authService.register(
      createUserDto.username,
      createUserDto.password,
      createUserDto.email,
      createUserDto.role,
      createUserDto.lgu_id
    );
  }

  @Put(':id')
  @Permissions(Permission.ManageUsers)
  async update(@Param('id') id: string, @Body() updateUserDto: { username?: string; email?: string; role?: string; lgu_id?: string }) {
    return this.authService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @Permissions(Permission.ManageUsers)
  async remove(@Param('id') id: string) {
    return this.authService.removeUser(id);
  }
}
