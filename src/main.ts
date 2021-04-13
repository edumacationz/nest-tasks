import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';
import { environment } from './config/env.config';

async function bootstrap() {
  const port = environment.port;

  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  if (environment.currentEnv === 'development') {
    app.enableCors();
  }
  await app.listen(3000);

  logger.log(`Application listening on port ${port}`);
}

bootstrap();
