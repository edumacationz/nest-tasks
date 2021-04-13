import { ValidationPipe, Controller, Post, Body } from '@nestjs/common';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  register(@Body(ValidationPipe) authCredentials: AuthCredentialsDto) {
    return this.auth.signUp(authCredentials);
  }

  @Post('login')
  login(@Body() authCredentials: AuthCredentialsDto) {
    return this.auth.signIn(authCredentials);
  }
}
