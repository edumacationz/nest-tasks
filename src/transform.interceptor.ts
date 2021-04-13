import { classToPlain } from 'class-transformer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('transforming');

    return next.handle().pipe(map((data) => classToPlain(data)));
  }
}
