import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from '@/entities/user.entity';

@Entity('lgus')
export class Lgu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 255 })
  name: string;

  @Column({ nullable: true, length: 255 })
  region: string;

  @Column({ nullable: true, length: 255 })
  province: string;

  @Column({ nullable: true, length: 255 })
  city_municipality: string;

  @Column({ type: 'jsonb', nullable: true })
  configuration: any; // LGU-specific settings, e.g., alert thresholds, communication channels

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @OneToMany(() => User, user => user.lgu)
  users: User[];
}
