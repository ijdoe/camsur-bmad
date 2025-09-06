import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log(`Validating user: ${username}`);
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      console.log('User not found');
      return null;
    }
    console.log(`User found: ${user.username}`);
    console.log(`Stored hash: ${user.password_hash}`);
    const isMatch = await bcrypt.compare(pass, user.password_hash);
    console.log(`Password match: ${isMatch}`);
    if (isMatch) {
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, password_hash: string, email: string, role: string, lgu_id: string): Promise<User> {
    console.log(`Registering user: ${username} with password: ${password_hash}`);
    const hashedPassword = await bcrypt.hash(password_hash, 10);
    console.log(`Hashed password for ${username}: ${hashedPassword}`);
    const newUser = this.usersRepository.create({ username, password_hash: hashedPassword, email, role, lgu_id });
    return this.usersRepository.save(newUser);
  }

  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findUserById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async updateUser(id: string, updateUserDto: { username?: string; email?: string; role?: string; lgu_id?: string }): Promise<User | null> {
    await this.usersRepository.update(id, updateUserDto);
    return this.findUserById(id);
  }

  async removeUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
