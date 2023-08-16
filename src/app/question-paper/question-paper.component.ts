// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Component, OnDestroy, OnInit } from '@angular/core'
import { type Section } from 'src/_models/section'
import { Status } from 'src/_enums/status'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ActivatedRoute, Router } from '@angular/router'
import { QuestionPaperService } from '../_services/question-paper.service'
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-question-paper',
  templateUrl: './question-paper.component.html',
  styleUrls: ['./question-paper.component.scss']
})
export class QuestionPaperComponent implements OnInit {
  constructor (private readonly breakpointObserver: BreakpointObserver, private readonly activateRoute: ActivatedRoute, private readonly questionPaperService: QuestionPaperService, private readonly messageService: MessageService, private readonly router: Router) {

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
    this.openFullscreen()
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((state) => {
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
    this.questionPaperService.postUserResponse('question', this.attemptId, this.questionPaper[this.currentSection()].questions[this.currentQuestionIndex]).subscribe({ next: () => {} })
    this.currentQuestionIndex = idx
  }

  currentSection (): number {
    return this.questionPaper.findIndex(section => section.status === Status.IN_PROGRESS)
  }

  changeToSection (idx: number): void {
    if (this.questionPaper[idx].status === Status.DONE) { return }
    this.changeToQuestion(0)
    this.questionPaper[this.currentSectionIndex].status = Status.DONE
    this.questionPaperService.postUserResponse('section', this.attemptId, null, this.questionPaper[this.currentSectionIndex].id, this.questionPaper[this.currentSectionIndex].timeSpent).subscribe({ next: () => {} })
    // this.currentQuestionIndex = 0
    this.currentSectionIndex = idx
    this.questionPaper[this.currentSectionIndex].status = Status.IN_PROGRESS
  }

  submitPaper (): void {
    // HACK: Submit the last section before submitting paper
    this.questionPaperService.postUserResponse('section', this.attemptId, null, this.questionPaper[this.currentSectionIndex].id, this.questionPaper[this.currentSectionIndex].timeSpent).subscribe({
      next: () => {
        this.questionPaperService.postUserResponse('questionPaper', this.attemptId).subscribe({
          next: () => {
            window.removeEventListener('beforeunload', this.checkLoad, false)
            void this.router.navigate(['papers'])
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Paper Submitted Successfully' })
          }
        })
      }
    })
  }

  elem = document.documentElement

  /* View in fullscreen */
  openFullscreen (): void {
    if (this.elem.requestFullscreen !== undefined) {
      void this.elem.requestFullscreen()
    }
  }

  /* Close fullscreen */
  closeFullscreen (): void {
    if (document.exitFullscreen !== undefined) {
      void document.exitFullscreen()
    }
  }
}
