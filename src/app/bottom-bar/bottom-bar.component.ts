import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent {
  @Output() nextQuestion = new EventEmitter<string>()
  @Output() prevQuestion = new EventEmitter<string>()
  @Input() allSections: Array<{ label: string, index: any }>

  nextQuestionHandeler (): void {
    this.nextQuestion.emit()
  }

  prevQuestionHandeler (): void {
    this.prevQuestion.emit()
  }
}
