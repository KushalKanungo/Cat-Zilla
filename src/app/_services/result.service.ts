// /* eslint-disable @typescript-eslint/consistent-type-imports */
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import ENV from 'env'
import { Observable } from 'rxjs'
import { Filter } from 'src/_models/filter'

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  constructor (private readonly http: HttpClient) { }
  BASE_URL = ENV.BASE_URL + '/attempts'
  getResultByAttemptId (attemptId: string | null = ''): Observable<any> {
    return this.http.get<any>(this.BASE_URL + `/${attemptId}`)
  }

  getAllResults (filter: Filter): Observable<any> {
    return this.http.get(this.BASE_URL, { params: { ...filter } })
  }
}
