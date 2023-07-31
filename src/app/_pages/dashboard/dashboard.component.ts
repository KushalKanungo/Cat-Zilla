import { Component } from '@angular/core'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  query = ''
  onSearch (): void {
    console.log(this.query)
  }
}
