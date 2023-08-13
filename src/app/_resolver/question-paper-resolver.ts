import { inject } from '@angular/core'

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router'
import { QuestionPaperService } from '../_services/question-paper.service'
import { type Observable } from 'rxjs'

export const questionPaperResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<any> | Promise<any> | any => {
  const data = inject(Router).getCurrentNavigation()
  const id = data?.extras.state?.['id']
  const sections = data?.extras.state?.['sections']
  const maxTime = data?.extras.state?.['maxTime']
  return inject(QuestionPaperService).getQuestionPaper(id, sections, maxTime * 60)
}
