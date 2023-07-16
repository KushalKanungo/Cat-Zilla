import { Component, EventEmitter, Input, Output } from '@angular/core'
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
  @Input() userResponse: number | undefined

  onOptionSelect (event: any): void {
    console.log(this.userResponse)
    this.setQuestionStatus.emit(Status.ANSWERED)
    this.setUserResponse.emit(event.target.value)
    this.options[event.target.value].userResponse = true
  }
};
