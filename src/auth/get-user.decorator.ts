import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { classToPlain } from 'class-transformer';

export const GetUser = createParamDecorator(
  (_data: any, ctx: ExecutionContext): object => {
    const { user } = ctx.switchToHttp().getRequest();

    return classToPlain(user);
  },
);
