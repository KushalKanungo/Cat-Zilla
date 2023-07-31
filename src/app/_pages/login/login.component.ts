/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component } from '@angular/core'
import { AuthService } from 'src/app/_services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formdata = {
    email: 'janedow@gmail.com',
    password: '12345'
  }

  constructor (private readonly authService: AuthService) { }

  onSubmit (): void {
    this.authService.login(this.formdata).subscribe({ next: () => {} })
  }
}
