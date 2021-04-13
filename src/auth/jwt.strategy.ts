import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { environment } from '../config/env.config';
import { JwtPayload } from './jwt-payload.interface';
import { UserService } from './services/user.service';
import { UnauthorizedException, Injectable } from '@nestjs/common';

const {
  jwtOptions: { secret: secretOrKey },
} = environment;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey,
    });
  }

  async validate(payload: JwtPayload) {
    return this.userService.findOneById(payload?.user?.id).catch(() => {
      throw new UnauthorizedException();
    });
  }
}
