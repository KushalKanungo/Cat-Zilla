// /* eslint-disable @typescript-eslint/consistent-type-imports */
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { env } from 'env'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  constructor (private readonly http: HttpClient) { }
  BASE_URL = env.BASE_URL
  getResultByAttemptId (attemptId: string): Observable<any> {
    return this.http.get<any>(this.BASE_URL + `/attempts/${attemptId}`)
  }
}
