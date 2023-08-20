// /* eslint-disable @typescript-eslint/consistent-type-imports */
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import ENV from 'env'
import { Observable, shareReplay } from 'rxjs'
import { Filter } from 'src/_models/filter'

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  constructor (private readonly http: HttpClient) { }
  BASE_URL = ENV.BASE_URL + '/attempts'
  getResultByAttemptId (attemptId: string = ''): Observable<any> {
    return this.http.get<any>(this.BASE_URL + `/${attemptId}`).pipe(shareReplay({ bufferSize: 1, refCount: true }))
  }

  getResultPreviewByAttemptId (attemptId: string = ''): Observable<any> {
    return this.http.get<any>(this.BASE_URL + `/preview/${attemptId}`).pipe(shareReplay({ bufferSize: 1, refCount: true }))
  }

  deleteResultByAttemptId (attemptId: string = ''): Observable<any> {
    return this.http.delete<any>(this.BASE_URL + `/${attemptId}`)
  }

  getAllResults (filter: Filter): Observable<any> {
    return this.http.get(this.BASE_URL, { params: { ...filter } }).pipe(shareReplay(1))
  }
}
