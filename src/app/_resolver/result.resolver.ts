import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router'
import { ResultService } from '../_services/result.service'
import { inject } from '@angular/core'

export const resultResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot, state) => {
  let attemptId = route.params['id']
  console.log('hello')
  return inject(ResultService).getResultByAttemptId(attemptId)
}
