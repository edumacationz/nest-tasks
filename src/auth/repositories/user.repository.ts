import { Repository, EntityRepository } from 'typeorm';

import { AuthCredentialsDto } from '../dto';
import { User } from '../user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    return this.create(authCredentials)
      .save()
      .then(console.log)
      .catch((error) => {
        if (error.code === '23505') {
          throw new ConflictException(`Username already exists`);
        }

        throw new InternalServerErrorException();
      });
  }
}
