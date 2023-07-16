import { Component } from '@angular/core'
import questions from '../../assets/question.json'
import { type Question } from 'src/_models/questionsModel'
import { type Section } from 'src/_models/section'
import { Status } from 'src/_enums/status'

@Component({
  selector: 'app-question-paper',
  templateUrl: './question-paper.component.html',
  styleUrls: ['./question-paper.component.scss']
})
export class QuestionPaperComponent {
  verbalQuestions: Question[] = questions.filter(
    (question) => question.sectionId === 0
  )

  reasoningQuestions: Question[] = questions.filter(
    (question) => question.sectionId === 1
  )

  mathsQuestions: Question[] = questions.filter(
    (question) => question.sectionId === 2
  )

  verbalPaperSection: Section = {
    questions: this.verbalQuestions,
    sectionId: 0,
    sectionLabel: 'Verbal & Reading',
    maxTime: 3000,
    status: Status.DONE
  }

  reasoningPaperSection: Section = {
    questions: this.reasoningQuestions,
    sectionId: 1,
    sectionLabel: 'Data Inter. & Logical Res.',
    maxTime: 3000
  }

  mathsPaperSection: Section = {
    questions: this.mathsQuestions,
    sectionId: 2,
    sectionLabel: 'Quantative Analysis',
    maxTime: 3000
  }

  questionPaper: Section[] = [
    this.verbalPaperSection,
    this.reasoningPaperSection,
    this.mathsPaperSection
  ]

  currentSectionIndex: number = 0
  currentQuestionIndex: number = 0

  first = this.mathsPaperSection.questions[23]

  allSections = this.questionPaper.map((sec: Section, idx) => ({ label: sec.sectionLabel, index: idx }))

  nextQuestion (): void {
    if (this.currentQuestionIndex >= this.questionPaper[this.currentSectionIndex].questions.length - 1) return
    this.currentQuestionIndex += 1
  }

  prevQuestion (): void {
    if (this.currentQuestionIndex <= 0) return
    this.currentQuestionIndex -= 1
  }

  changeToQuestion (idx: number): void {
    if (idx < 0 || idx >= this.questionPaper[this.currentSectionIndex].questions.length) return
    this.currentQuestionIndex = idx
  }

  nextSection (): void {
    this.currentSectionIndex += 1
  }

  prevSection (): void {
    this.currentSectionIndex -= 1
  }
}