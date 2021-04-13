import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import { TaskStatus } from './task-status.enum';
import { Transform } from 'class-transformer';
import { User } from '../auth/user.entity';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: false, default: TaskStatus.Open })
  status: TaskStatus;

  @Column()
  userId: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Transform(({ password, tasks, ...u }) => u)
  @ManyToOne(() => User, (user) => user.tasks, { eager: false })
  user: User;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: string;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt: string;
}
