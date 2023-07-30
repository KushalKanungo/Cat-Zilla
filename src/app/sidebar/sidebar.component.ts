import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ConfirmationService } from 'primeng/api'
import { Status } from 'src/_enums/status'
import { type Question } from 'src/_models/questionsModel'
import { type Section } from 'src/_models/section'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [ConfirmationService]
})
export class SidebarComponent {
  @Output() changeToQuestion = new EventEmitter()
  @Output() changeToSection = new EventEmitter()
  @Input() currentQuestionIndex: number
  @Input() currentSectionIndex: number
  @Input() questions: Question[]
  @Input() section: Section
  @Input() isMobile: boolean
  @Input() currentSectionTime: number
  statusEnum = Status

  constructor (private readonly confirmationService: ConfirmationService) {}

  ngOninit (): void {
    // this.config.leftTime = this.currentSectionTime
  }

  confirm (event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.changeToSectionHandeler(this.currentSectionIndex + 1)
      }
    })
  }

  nextQuestionHandeler (): void {
    this.changeToQuestion.emit(this.currentQuestionIndex + 1)
  }

  prevQuestionHandeler (): void {
    this.changeToQuestion.emit(this.currentQuestionIndex - 1)
  }

  changeToQuestionHandeler (idx: number): void {
    this.changeToQuestion.emit(idx)
  }

  changeToSectionHandeler (sectionIdx: number): void {
    this.changeToSection.emit(sectionIdx)
  }

  setQuestionStatus (status: Status): void {
    if (this.questions[this.currentQuestionIndex].status === Status.ANSWERED) {
      this.questions[this.currentQuestionIndex].status = Status.ANSWERED_REVIEW
    } else {
      this.questions[this.currentQuestionIndex].status = status
    }
  }

  toHoursMinutesSeconds = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    let result = `${minutes
      .toString()
      .padStart(1, '0')}:${seconds.toString().padStart(2, '0')}`
    if (hours !== 0) {
      result = `${hours.toString()}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    return result
  }
}
