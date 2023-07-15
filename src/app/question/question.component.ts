import { Component, Input, type OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { type Question } from 'src/_models/question'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question
  formGroup: FormGroup
  ngOnInit (): void {
    this.formGroup = new FormGroup({
      selectedOption: new FormControl('', [])
    })
  }
}
