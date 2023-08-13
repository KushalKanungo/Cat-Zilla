import { Component, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from 'src/app/_services/auth.service'

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  @Input() currentPath: string | null
  constructor (private readonly router: Router, public activeRoute: ActivatedRoute, private readonly authService: AuthService) {}
  navItems = [
    { path: 'papers', label: 'Home', icon: 'bi bi-house', command: () => { void this.router.navigate(['papers']) } },
    { path: 'dashboard', label: 'Results', icon: 'bi bi-graph-up-arrow', command: () => { void this.router.navigate(['dashboard']) } },
    { path: '', label: 'Settings', icon: 'bi bi-gear' },
    { path: '', label: 'Feedback', icon: 'bi bi-chat-dots' },
    { path: '', label: 'Add question', icon: 'bi bi-file-earmark-plus' },
    { path: '', label: 'Log out', icon: 'bi bi-box-arrow-left', command: () => { this.authService.logOut() } }
  ]
}
