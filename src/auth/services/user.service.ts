import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '../repositories';
import { User } from '../user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) {}

  async findOneById(id: string): Promise<User> {
    return this.userRepo.findOne({ id });
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.userRepo.findOneOrFail({ username }).catch(() => {
      throw new NotFoundException(`User ${username} was not found`);
    });
  }
}
