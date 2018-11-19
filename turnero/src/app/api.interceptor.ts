import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';

import {Observable, of} from "rxjs";
import {HttpService} from "./http.service";
import { catchError } from 'rxjs/operators';
import {Router} from "@angular/router";



@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private _hs: HttpService,
    private _router: Router,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status == 403){
          this._router.navigateByUrl('/home');
        }
        return of([]);
      })
    );
  }
}
