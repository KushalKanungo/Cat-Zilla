import { Injectable } from '@angular/core'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http'
import { env } from '../../../env'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Observable } from 'rxjs'
import { Status } from 'src/_enums/status'
import { type Question } from 'src/_models/questionsModel'
import { type Filter } from 'src/_models/filter'

@Injectable({
  providedIn: 'root'
})
export class QuestionPaperService {
  constructor (private readonly http: HttpClient) { }
  private readonly BASE_URL = env.BASE_URL

  /**
   * @param questionPaperId : string
   * @param sectionIds : string
   * @returns : Observable<QuestionPaper>
   */
  getQuestionPaper (questionPaperId: string, sectionIds: string[]): Observable<any> {
    const params = {
      id: questionPaperId,
      sections: sectionIds.map(id => ({ id }))
    }
    return this.http.post<any>(this.BASE_URL + '/question-paper/paper', params)
  }

  postUserResponse (question: Question, attemptId: string = '64c60dd55d0e5b0253e5dcf7'): Observable<any> {
    const { id, status, timeSpent, userResponse } = question
    const params = {
      attemptId, questionId: id, status, timeSpent, userResponse
    }
    return this.http.post<any>(this.BASE_URL + '/question-paper/paper-answer', params)
  }

  getAllQuestionPapers (params: Filter): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Accept: 'text/html',
        'Content-Type': 'text/plain; charset=utf-8'
      }),
      params,
      responseType: 'text'
    }

    return this.http.get<any>(this.BASE_URL + '/question_papers', httpOptions)
  }
}
