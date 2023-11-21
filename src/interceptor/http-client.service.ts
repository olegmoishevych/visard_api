import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpClientService {
  constructor(private httpService: HttpService) {}

  post(url: string, body: any) {
    return this.httpService
      .post(url, body)
      .pipe(map((response) => response.data))
      .subscribe(
        (response) => console.log('Logging response:', response),
        (error) => console.error('Logging error:', error),
      );
  }
}
