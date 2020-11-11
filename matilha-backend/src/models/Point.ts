import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import User from '../models/User';

@Entity('points')
class Point {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne((type) => User)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  data_ponto: Date;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Point;
