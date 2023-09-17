import { trigger, transition, style, animate } from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { ThemeService } from 'src/app/_services/theme.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [
    trigger('inOutPaneAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }), // apply default styles before animation starts
        animate(
          '750ms ease-in-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        )
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }), // apply default styles before animation starts
        animate(
          '600ms ease-in-out',
          style({ opacity: 0, transform: 'translateX(-100%)' })
        )
      ])
    ])
  ]
})
export class SettingsComponent implements OnInit {
  colors!: any[]

  constructor (public readonly themeService: ThemeService) { }

  ngOnInit (): void {
    this.colors = this.themeService.colors
  }

  changeTheme (event: any, id: number): void {
    this.themeService.setTheme(id)
  }
}
