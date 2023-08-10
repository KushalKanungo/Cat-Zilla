import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  constructor(private readonly router: Router, public activeRoute: ActivatedRoute){}
  navItems = [
    {path : 'papers' , label: 'Home', icon: 'bi bi-house', command: () => {this.router.navigate(['papers'])} },
    {path : 'dashboard' , label: 'Results', icon: 'bi bi-bar-chart', command: () => {this.router.navigate(['dashboard'])}},
    {path : '' , label: 'Settings', icon: 'bi bi-gear'},
    {path : '' , label: 'Feedback', icon: 'bi bi-chat-dots'},
    {path : '' , label: 'Log out', icon: 'bi bi-box-arrow-left'},
  ]

  ngOnInit(){
    console.log(this.activeRoute.routeConfig?.path)
  }

}
