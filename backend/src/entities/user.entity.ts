import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { Lgu } from './lgu.entity';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 255 })
  username: string;

  @Column({ length: 255 })
  password_hash: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 50 })
  role: string; // e.g., 'Admin', 'Operator', 'Viewer'

  @Column({ type: 'uuid', nullable: true })
  lgu_id: string;

  @ManyToOne(() => Lgu, lgu => lgu.users, { nullable: true })
  @JoinColumn({ name: 'lgu_id' })
  lgu: Lgu;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

}
