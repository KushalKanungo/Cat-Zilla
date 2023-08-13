
import { Component, type OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CATzilla'
  currentPath = ''
  constructor (private readonly route: ActivatedRoute, private readonly location: Location) {}
  isQuestionPaperUi = false
  ngOnInit (): void {
    this.location.onUrlChange(url => {
      this.currentPath = url.split('/')?.[1]
    })
  }
}
