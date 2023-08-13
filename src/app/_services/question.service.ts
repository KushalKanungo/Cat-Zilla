import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ENV from 'env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }
  BASE_URL = ENV.BASE_URL
  getQuestionById(questionId: string): Observable<any>{
    return this.http.get(this.BASE_URL+`/question/${questionId}`)
  }
}
