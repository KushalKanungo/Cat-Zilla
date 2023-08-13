import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import ENV from 'env'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SectionsService {
  BASE_URL = ENV.BASE_URL + '/sections'
  constructor (private readonly http: HttpClient) { }

  getAllSections (): Observable<Array<{ id: string, label: string }>> {
    return this.http.get<Array<{ id: string, label: string }>>(this.BASE_URL)
  }
}
