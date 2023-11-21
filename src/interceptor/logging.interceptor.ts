import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClientService } from './http-client.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private httpClientService: HttpClientService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap((response) => {
        const duration = Date.now() - now;
        this.httpClientService.post('http://localhost:8765/logging', {
          requestDuration: duration,
          requestData: request.body,
          responseData: response,
          httpStatus: context.switchToHttp().getResponse().statusCode,
        });
      }),
    );
  }
}
