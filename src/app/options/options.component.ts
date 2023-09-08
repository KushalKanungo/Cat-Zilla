import { Component, EventEmitter, Input, Output } from '@angular/core'
import { filter, fromEvent } from 'rxjs'
import { Status } from 'src/_enums/status'
import { type Question } from 'src/_models/questionsModel'

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {
  @Output() setQuestionStatus = new EventEmitter()
  @Output() setUserResponse = new EventEmitter()
  @Input() options: Array<{ value: string, id: number, userResponse?: boolean, isCorrect?: boolean }>
  @Input() questionType: string
  @Input() question: Question
  @Input() optionsType: string
  // @Input() isInPreviewMode: boolean

  @Input() userResponse: number | undefined
  isInPreviewMode: boolean = false
  correctOption: any
  isExplanationVisible = false
  ngOnInit (): void {
    this.isInPreviewMode = (this.options[0].isCorrect === true || this.options[0].isCorrect === false)
    const nextKeyPress$ = fromEvent(document, 'keydown').pipe(
      filter((event: any) => ['e'].includes(event.key))
    )

    nextKeyPress$.subscribe(({ key }) => {
      if (key === 'e' && this.isInPreviewMode) {
        if (this.isExplanationVisible) {
          this.isExplanationVisible = false
        } else {
          this.showExplanation()
        }
      }
    })

    // this.userResponse = this.question.userResponse
  }

  showExplanation (): void {
    this.isExplanationVisible = true
  }

  onOptionSelect (event: any): void {
    console.log(this.userResponse)
    if (!this.isInPreviewMode) {
      this.setUserResponse.emit(event.target.value)
      this.setQuestionStatus.emit(Status.ANSWERED)
      this.options[event.target.value].userResponse = true
    }
  }

  onAnswering (event: Event): void {
    this.question.userResponse !== null ? this.setQuestionStatus.emit(Status.ANSWERED) : this.setQuestionStatus.emit(Status.NOT_ANSWERED)
  }

  onClear (event: any): void {
    this.question.userResponse = undefined
    this.setQuestionStatus.emit(Status.NOT_ANSWERED)
    this.setUserResponse.emit(null)
    this.options.forEach(opt => { opt.userResponse = false })
  }

  onChange (event: any): void {
    if (!this.isInPreviewMode) {
      if (event.target.value !== '') {
        this.setQuestionStatus.emit(Status.ANSWERED)
        this.setUserResponse.emit(event.target.value)
      } else if ((event.target.value === '')) {
        this.setQuestionStatus.emit(Status.NOT_ANSWERED)
        this.setUserResponse.emit(null)
      }
    }
  }
}
