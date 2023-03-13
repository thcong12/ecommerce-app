import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { LoaderService } from '../service/loader.service';

@Injectable({
  providedIn: 'root',
})
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private loaderSv: LoaderService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    return next.handle(request).pipe(
      
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        switch (error.status) {
          case 401: {
            alert('error 401');
            break;
          }
          case 404: {
            alert('error 404');
            break;
          }
          case 403: {
            alert('error 403');
            break;
          }
          case 500: {
            alert('error 500');
            break;
          }
        }
        return throwError(error);
      }),
      finalize(() =>
      this.loaderSv.hide()

      )
    );
  }
}
