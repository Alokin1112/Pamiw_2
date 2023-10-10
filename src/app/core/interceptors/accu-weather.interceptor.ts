
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AccuWeatherInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clone = req.clone();

    if (clone.url.startsWith(environment.httpBackend)) {
      clone = clone.clone({
        params: clone.params.appendAll(
          { apikey: environment.apiKey, language: environment.language }
        )
      });
    }
    return next.handle(clone);
  }
}