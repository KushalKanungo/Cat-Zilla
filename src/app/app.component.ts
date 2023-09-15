import { Component, type OnInit } from '@angular/core'
import { ActivatedRoute, RouterOutlet } from '@angular/router'
import { Location } from '@angular/common'
import { fadeIn, fader, slider } from './route-animations'
import { ThemeService } from './_services/theme.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slider]
})
export class AppComponent implements OnInit {
  title = 'CATzilla'
  currentPath = ''
  constructor (private readonly route: ActivatedRoute, private readonly location: Location, private readonly themeService: ThemeService) {}
  isQuestionPaperUi = false
  ngOnInit (): void {
    this.location.onUrlChange(url => {
      this.currentPath = url.split('/')?.[1]
    })
    this.themeService.setUserDefinedTheme()
  }

  prepareRoute (outlet: RouterOutlet): any {
    return outlet?.activatedRouteData?.['animation']
  }
}
