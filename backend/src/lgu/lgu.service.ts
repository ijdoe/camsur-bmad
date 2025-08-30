import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lgu } from '../entities/lgu.entity';
import { CreateLguDto } from './dto/create-lgu.dto';

@Injectable()
export class LguService {
  constructor(
    @InjectRepository(Lgu)
    private lgusRepository: Repository<Lgu>,
  ) {}

  async create(createLguDto: CreateLguDto): Promise<Lgu> {
    const newLgu = this.lgusRepository.create(createLguDto);
    return this.lgusRepository.save(newLgu);
  }

  async findAll(): Promise<Lgu[]> {
    return this.lgusRepository.find();
  }
}
