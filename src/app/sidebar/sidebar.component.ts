import { Component, Input } from '@angular/core'
import { Question } from 'src/_models/question'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() questions: Question[]
}
