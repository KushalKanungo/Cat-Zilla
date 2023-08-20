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
  private readonly BASE_URL = ENV.BASE_URL + '/question-papers'

  /**
   * @param questionPaperId : string
   * @param sectionIds : string
   * @returns : Observable<QuestionPaper>
   */
  getQuestionPaper (questionPaperId: string, sectionIds: string[], maxTime: number): Observable<any> {
    const params = {
      id: questionPaperId,
      sections: sectionIds,
      maxTime
    }
    return this.http.post<any>(this.BASE_URL + '/paper', params)
  }

  addQuestionPaper (questionPaper: { label: string, questions: any[], description: string | null }): Observable<any> {
    return this.http.post<any>(this.BASE_URL, questionPaper)
  }

  postUserResponse (type: 'section' | 'question' | 'questionPaper' = 'question', attemptId: string, question: Question | null = null, sectionId: string | null = null, sectionTime: number | null = null): Observable<any> {
    let params: any = { type }
    if (type === 'question' && question != null) {
      const { id, status, timeSpent, userResponse } = question
      params = { ...params, attemptId, questionId: id, status, timeSpent, userResponse }
    } else if (type === 'section' && sectionId !== null) {
      params = { ...params, sectionId, attemptId, timeSpent: sectionTime }
    } else if (type === 'questionPaper') {
      params = { ...params, attemptId }
    }
    console.log(params)
    return this.http.post<any>(this.BASE_URL + '/paper-response', params)
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

    return this.http.get<any>(this.BASE_URL + '', httpOptions)
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
