import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  Inject,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';

import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { UserRepository } from '../repositories';
import { UserService } from './user.service';
import { User } from '../user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    @Inject(UserService) private userService: UserService,
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentials: AuthCredentialsDto) {
    return this.userRepo.signUp(authCredentials);
  }

  async signIn(authCredentials: AuthCredentialsDto) {
    const { username, password } = authCredentials;

    return this.userService
      .findOneByUsername(username)
      .then((user) =>
        User.validatePassword(password, user.password).then(async (isValid) => {
          if (!isValid) {
            throw new Error();
          }

          const { username, id } = user;

          const payload: JwtPayload = {
            user: {
              username,
              id,
            },
          };

          const accessToken = await this.jwtService.signAsync(payload);

          this.logger.debug(
            `Generated JWT Token with payload ${JSON.stringify(payload)}`,
          );

          return { accessToken };
        }),
      )
      .catch(() => {
        throw new UnauthorizedException(`Username/password combo not found`);
      });
  }
}
