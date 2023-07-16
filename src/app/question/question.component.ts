import { Component, Input, type OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
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
  ngOnInit (): void {
    this.formGroup = new FormGroup({
      selectedOption: new FormControl('', [])
    })
  }
}
