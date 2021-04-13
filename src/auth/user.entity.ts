import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  Unique,
  OneToMany,
  BaseEntity,
  BeforeInsert,
  PrimaryGeneratedColumn,
} from 'typeorm';

import * as argon from 'argon2';

import { Task } from '../tasks/task.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ select: false })
  @Exclude()
  password: string;

  @OneToMany(() => Task, (task) => task.user, { eager: true })
  tasks: Task[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon.hash(this.password);
  }

  static async validatePassword(
    candidatePassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return argon.verify(hashedPassword, candidatePassword);
  }
}
