import { inject } from '@angular/core'

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'
import { QuestionPaperService } from '../_services/question-paper.service'
import { type Observable } from 'rxjs'

export const questionPaperResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<any> | Promise<any> | any => {
  return inject(QuestionPaperService).getQuestionPaper('64c0023e82015edd62e9a32f', ['64bec0ad98d1c907d8eaa762', '64bec02d98d1c907d8eaa760', '64bebd76cb46f0330cd31e41'])
}
