import { Component, Input, type OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Status } from 'src/_enums/status'
import { type Question } from 'src/_models/questionsModel'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question
  @Input() questionNumber: number
  formGroup: FormGroup
  statusEnum = Status
  ngOnInit (): void {
    this.formGroup = new FormGroup({
      selectedOption: new FormControl('', [])
    })
  }

  setUserResponse (response: number): void {
    this.question.userResponse = response
    console.log(this.question.userResponse)
  }

  setQuestionStatus (status: Status): void {
    this.question.status = status
  }
}
