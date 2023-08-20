import { inject } from '@angular/core'
import { ResolveFn } from '@angular/router'
import { ResultService } from '../_services/result.service'

export const attemptPreviewResolver: ResolveFn<boolean> = (route, state) => {
  const attemptId = route.params['id']
  return inject(ResultService).getResultPreviewByAttemptId(attemptId)
}
