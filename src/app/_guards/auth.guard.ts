import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../_services/auth.service'

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = inject(AuthService).isAuthorized()
  if (route.url[0].path === 'login') {
    if (isLoggedIn) {
      void inject(Router).navigate(['dashboard'])
    }
    return !isLoggedIn
  }
  if (!isLoggedIn) {
    void inject(Router).navigate(['login'])
  }
  return isLoggedIn
}
