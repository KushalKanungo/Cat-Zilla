// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core'
import { type Section } from 'src/_models/section'
import { Status } from 'src/_enums/status'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ActivatedRoute } from '@angular/router'
import { QuestionPaperService } from '../_services/question-paper.service'

@Component({
  selector: 'app-question-paper',
  templateUrl: './question-paper.component.html',
  styleUrls: ['./question-paper.component.scss']
})
export class QuestionPaperComponent implements OnInit, OnDestroy {
  constructor (private readonly breakpointObserver: BreakpointObserver, private readonly activateRoute: ActivatedRoute, private readonly questionPaperService: QuestionPaperService) {

  }

  isMobile = false
  timeTaken: any
  questionPaper: Section[]
  allSections: Array<{ label: string, index: any }>
  currentSectionIndex: number = 0
  currentQuestionIndex: number = 0
  attemptId: string

  checkLoad (event: any): void {
    if (this.questionPaperService.isPaperInProgress()) {
      event.preventDefault()
      event.returnValue = 'Are you sure you want to leave?'
      return event
    }
  }

  ngOnInit (): void {
    window.addEventListener('beforeunload', this.checkLoad, false)

    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((state) => {
        console.log(state.matches)
        this.isMobile = state.matches
      })

    this.questionPaper = this.activateRoute.snapshot.data['questionPaper'].sections
    this.attemptId = this.activateRoute.snapshot.data['questionPaper'].attemptId
    this.questionPaperService.setCurrectPaperStatusOnLocal(this.attemptId)

    this.allSections = this.questionPaper.map((sec: Section, idx) => ({ label: sec.label, index: idx }))
    this.questionPaper[this.currentSectionIndex].status = Status.IN_PROGRESS
    this.timeTaken = setInterval(() => {
      this.questionPaper[this.currentSectionIndex].questions[this.currentQuestionIndex].timeSpent += 1
      this.questionPaper[this.currentSection()].timeSpent += 1
      if (this.questionPaper[this.currentSectionIndex].timeSpent === this.questionPaper[this.currentSectionIndex].maxTime) {
        this.changeToSection(this.currentSectionIndex + 1)
      }
    }, 1000)
  }

  ngOnDestroy (): void {
    window.removeEventListener('beforeunload', this.checkLoad, false)
  }

  nextQuestion (): void {
    if (this.currentQuestionIndex >= this.questionPaper[this.currentSectionIndex].questions.length - 1) return
    this.currentQuestionIndex += 1
  }

  prevQuestion (): void {
    if (this.currentQuestionIndex <= 0) return
    this.currentQuestionIndex -= 1
  }

  changeToQuestion (idx: number): void {
    if (idx < 0 || idx >= this.questionPaper[this.currentSection()].questions.length) return
    const currentQuestion = this.questionPaper[this.currentSection()].questions[this.currentQuestionIndex]
    if (currentQuestion.userResponse === undefined && currentQuestion.status !== Status.REVIEW) { currentQuestion.status = Status.NOT_ANSWERED }
    this.questionPaperService.postUserResponse(this.questionPaper[this.currentSection()].questions[this.currentQuestionIndex], this.attemptId).subscribe({ next: () => {} })
    this.currentQuestionIndex = idx
  }

  currentSection (): number {
    return this.questionPaper.findIndex(section => section.status === Status.IN_PROGRESS)
  }

  changeToSection (idx: number): void {
    if (this.questionPaper[idx].status === Status.DONE) { return }
    this.changeToQuestion(0)
    this.questionPaper[this.currentSectionIndex].status = Status.DONE
    // this.currentQuestionIndex = 0
    this.currentSectionIndex = idx
    this.questionPaper[this.currentSectionIndex].status = Status.IN_PROGRESS
  }
}
