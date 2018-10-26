import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { QueServiceProvider } from '../que-service/que-service';

/*
  Generated class for the InterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InterceptorProvider implements HttpInterceptor {

  constructor (private que: QueServiceProvider) {
    console.log('interceptor inside');
  }
  intercept(
      req: HttpRequest<any>,
      next: HttpHandler
  ): Observable<HttpEvent<any>> {

  return fromPromise(this.que.tokenGet()).switchMap(token => {
    if (token) {
    const headers = req.headers
    .set('x-access-token',''+token);
        const reqClone = req.clone({
                                  headers 
        });
      return next.handle(reqClone);
    } else {
      return next.handle(req);
    }
  });
  }
}
