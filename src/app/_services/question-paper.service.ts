import { Injectable } from '@angular/core'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { HttpClient, HttpHeaders } from '@angular/common/http'
import ENV from '../../../env'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Observable } from 'rxjs'
import { type Question } from 'src/_models/questionsModel'
import { type Filter } from 'src/_models/filter'
import { Status } from 'src/_enums/status'

@Injectable({
  providedIn: 'root'
})
export class QuestionPaperService {
  constructor (private readonly http: HttpClient) { }
  private readonly BASE_URL = ENV.BASE_URL

  /**
   * @param questionPaperId : string
   * @param sectionIds : string
   * @returns : Observable<QuestionPaper>
   */
  getQuestionPaper (questionPaperId: string, sectionIds: string[], maxTime: number): Observable<any> {
    const params = {
      id: questionPaperId,
      sections: sectionIds.map(id => ({ id })),
      maxTime
    }
    return this.http.post<any>(this.BASE_URL + '/question-papers/paper', params)
  }

  postUserResponse (question: Question, attemptId: string = '64c60dd55d0e5b0253e5dcf7'): Observable<any> {
    const { id, status, timeSpent, userResponse } = question
    const params = {
      attemptId, questionId: id, status, timeSpent, userResponse
    }
    return this.http.post<any>(this.BASE_URL + '/question-papers/paper-answer', params)
  }

  getAllQuestionPapers (params: Filter): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        Accept: 'text/html',
        'Content-Type': 'text/plain; charset=utf-8'
      }),
      params,
      responseType: 'json'
    }

    return this.http.get<any>(this.BASE_URL + '/question-papers', httpOptions)
  }

  setCurrectPaperStatusOnLocal (attemptId: string, status: Status = Status.IN_PROGRESS): void {
    const data = {
      attemptId,
      status
    }

    localStorage.removeItem('attempt')
    localStorage.setItem('attempt', JSON.stringify(data))
  }

  isPaperInProgress (): boolean {
    const attempt = localStorage.getItem('attempt')
    return Boolean(attempt !== undefined && attempt !== null && JSON.parse(attempt).status === Status.IN_PROGRESS)
  }
}
