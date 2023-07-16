import { Component, EventEmitter, Input, Output } from '@angular/core'
import { type Question } from 'src/_models/questionsModel'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() changeToQuestion = new EventEmitter()
  @Input() currentQuestionIndex: number
  @Input() questions: Question[]

  changeToQuestionHandeler (idx: number): void {
    this.changeToQuestion.emit(idx)
  }
}
