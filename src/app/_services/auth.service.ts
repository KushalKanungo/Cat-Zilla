/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from '@angular/core'
import { Observable, tap } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { env } from '../../../env'

export interface SignInResponse {
  accessToken: string
  tokenType: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly ACCESS_TOKEN_KEY_NAME = 'accessToken'
  private readonly AUTH_FAILED_REDIRECT_URL = '/'
  private readonly BASE_URL = env.BASE_URL + '/users/'

  constructor (private readonly http: HttpClient, private readonly router: Router) {}

  login (signinDetails: {
    email: string
    password: string
  }): Observable<SignInResponse> {
    return this.http
      .get<SignInResponse>(`${this.BASE_URL}/login`, { params: signinDetails })
      .pipe(
        tap((response) => {
          this.saveAccessToken(response.accessToken)
          void this.router.navigate(['paper'])
        })
      )
  }

  signup (signupDetails: FormData): Observable<unknown> {
    return this.http.post<unknown>(`${this.BASE_URL}/signup`, signupDetails)
  }

  googleAuth (idToken: string): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/google`, { idToken })
  }

  saveAccessToken (accessToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY_NAME, accessToken)
  }

  loadAccessToken (): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY_NAME)
  }

  clearAccessToken (): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY_NAME)
  }

  isAuthorized (): boolean {
    return !!this.loadAccessToken()
  }

  fallBack (): void {
    this.clearAccessToken()
    void this.router.navigate([this.AUTH_FAILED_REDIRECT_URL])
  }

  logOut (): void {
    this.clearAccessToken()
  }
}
