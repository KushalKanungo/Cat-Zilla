
import { Component, type OnInit } from '@angular/core'
import questions from '../assets/question.json'
import { type Question } from 'src/_models/questionsModel'
import { type Section } from 'src/_models/section'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CATzilla'
  verbalQuestions: Question[] = questions.filter(question => question.sectionId === 0)
  reasoningQuestions: Question[] = questions.filter(question => question.sectionId === 1)
  mathsQuestions: Question[] = questions.filter(question => question.sectionId === 2)

  verbalPaperSection: Section = { questions: this.verbalQuestions, sectionId: 0, sectionLabel: 'Verbal & Reading', maxTime: 3000 }
  reasoningPaperSection: Section = { questions: this.reasoningQuestions, sectionId: 1, sectionLabel: 'Verbal & Reading', maxTime: 3000 }
  mathsPaperSection: Section = { questions: this.mathsQuestions, sectionId: 2, sectionLabel: 'Verbal & Reading', maxTime: 3000 }

  questionPaper: Section[] = [this.verbalPaperSection, this.reasoningPaperSection, this.mathsPaperSection]
  first = this.mathsPaperSection.questions[23]
  ngOnInit (): void {
    console.log('loaded')
  }
}
