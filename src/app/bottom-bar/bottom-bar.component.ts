import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Status } from 'src/_enums/status'
import { type Section } from 'src/_models/section'

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent {
  @Output() changeToQuestion = new EventEmitter()
  @Output() changeToSection = new EventEmitter()
  @Input() currentQuestionIndex: number
  @Input() currentSectionIndex: number
  @Input() questionPaper: Section[]
  @Input() allSections: Array<{ label: string, index: any }>

  statusEnum = Status

  nextQuestionHandeler (): void {
    this.changeToQuestion.emit(this.currentQuestionIndex + 1)
  }

  prevQuestionHandeler (): void {
    this.changeToQuestion.emit(this.currentQuestionIndex - 1)
  }

  changeToSectionHandeler (idx: number): void {
    this.changeToSection.emit(idx)
  }
}
