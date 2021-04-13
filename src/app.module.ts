import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { TransformInterceptor } from './transform.interceptor';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config';

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(typeOrmConfig), AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
  exports: [],
})
export class AppModule {}
