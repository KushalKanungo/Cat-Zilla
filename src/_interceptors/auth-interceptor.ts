/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from '@angular/core'

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { AuthService } from '../app/_services/auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor (private readonly authService: AuthService) {}

  intercept (
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.loadAccessToken()
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.authService.fallBack()
          }
        }
        return throwError(() => {
          return err
        })
      })
    )
  }
}
