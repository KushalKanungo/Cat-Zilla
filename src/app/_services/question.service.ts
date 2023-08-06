import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }
  BASE_URL = env.BASE_URL
  getQuestionById(questionId: string): Observable<any>{
    return this.http.get(this.BASE_URL+`/question/${questionId}`)
  }
}
