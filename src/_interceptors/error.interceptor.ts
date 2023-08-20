import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs'
import { MessageService } from 'primeng/api'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor (private readonly messageService: MessageService) {}

  intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 500) {
          this.messageService.add({ severity: 'warn', detail: 'Somthing went wrong please try again later.' })
        } else {
          this.messageService.add({ severity: 'warn', detail: err.error?.message })
        }
      }
      return throwError(() => {
        return err
      })
    }))
  }
}
