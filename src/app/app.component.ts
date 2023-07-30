
import { Component, type OnInit } from '@angular/core'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CATzilla'
  ngOnInit (): void {
    console.log('loaded')
  }
}
