import { Component } from '@angular/core'
import questions from '../assets/question.json'
import { Question } from 'src/_models/question'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CATzilla'
  questions = questions.map(ques => new Question(ques.id, ques.subjectID, ques.options, ques.marks, ques.question, ques.passage, ques.areaName, ques.negativeMarks, ques.quesType as any))
  ques = questions[15]
  first: Question = new Question(this.ques.id, this.ques.subjectID, this.ques.options, this.ques.marks, this.ques.question, this.ques.passage, this.ques.areaName, this.ques.negativeMarks, this.ques.quesType as any)
}
