// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Component, OnInit } from '@angular/core'
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
  constructor (
    private readonly breakpointObserver: BreakpointObserver,
    private readonly activateRoute: ActivatedRoute,
    private readonly questionPaperService: QuestionPaperService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {}

  isMobile = false
  timeTrackingInterval: any
  questionPaper: Section[]
  allSections: Array<{ label: string, index: any }>
  currentSectionIndex: number = 0
  currentQuestionIndex: number = 0
  attemptId: string
  isInPreviewMode: boolean = false

  ngOnInit (): void {
    this.openFullscreen()
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((state) => {
        this.isMobile = state.matches
      })
    this.initializeQuestionPaper()
    if (!this.isInPreviewMode) { this.startTimer() }
  }

  /**
   * Initialize questionpaper variables
   */
  initializeQuestionPaper (): void {
    this.questionPaper =
        this.activateRoute.snapshot.data['questionPaper'].sections
    this.attemptId = this.activateRoute.snapshot.data['questionPaper'].attemptId
    this.isInPreviewMode = this.activateRoute.snapshot.data['isInPreviewMode']
    debugger
    this.questionPaperService.setCurrectPaperStatusOnLocal(this.attemptId)
    if (!this.isInPreviewMode) {
      this.questionPaper[this.currentSectionIndex].status = Status.IN_PROGRESS
    }
    this.allSections = this.questionPaper.map((sec: Section, idx) => ({
      label: sec.label,
      index: idx
    }))
  }

  /**
   * Prevent user to exit the quespaper when time is not finished
   * @param event
   * @returns
   */
  checkLoad (event: any): void {
    if (this.questionPaperService.isPaperInProgress()) {
      event.preventDefault()
      event.returnValue = 'Are you sure you want to leave?'
      return event
    }
  }

  /**
   * Starts the timer for the question paper.
   */
  startTimer (): void {
    this.timeTrackingInterval = setInterval(() => {
      this.questionPaper[this.currentSectionIndex].questions[
        this.currentQuestionIndex
      ].timeSpent += 1
      this.questionPaper[this.currentSectionIndex].timeSpent += 1
      if (
        this.questionPaper[this.currentSectionIndex].timeSpent ===
        this.questionPaper[this.currentSectionIndex].maxTime
      ) {
        this.changeToSection(this.currentSectionIndex + 1)
      }
    }, 1000)
  }

  /**
   *
   * @returns current section index
   */
  currentSection (): number {
    return this.questionPaper.findIndex(
      (section) => section.status === Status.IN_PROGRESS
    )
  }

  /**
   * Set the status of the changing from question
   * Change to the given question of the same section
   *
   * @param idx
   * @returns
   */
  changeToQuestion (idx: number): void {
    if (
      idx < 0 ||
      idx >= this.questionPaper[this.currentSectionIndex].questions.length
    ) { return }
    const currentQuestion = this.getCurrentQuestion()
    if (!this.isInPreviewMode) {
      if (
        currentQuestion.userResponse === undefined &&
        currentQuestion.status !== Status.REVIEW
      ) {
        currentQuestion.status = Status.NOT_ANSWERED
      }
      this.postQuestionResponse(currentQuestion)
    }
    this.currentQuestionIndex = idx
  }

  /**
   * Change the currect section to the given section
   * Also set the current question no to 0 of the next section
   * @param idx
   * @returns void
   */
  changeToSection (idx: number): void {
    if (!this.isInPreviewMode) {
      if (this.questionPaper[idx].status === Status.DONE) { return }
      this.postSectionResponse(this.questionPaper[this.currentSectionIndex])
    }
    this.changeToQuestion(0)
    this.currentSectionIndex = idx
    this.questionPaper[this.currentSectionIndex].status = Status.IN_PROGRESS
  }

  /**
   * Posts the currect sections to backend
   * Also change the status to done
   * @param sectionIds
   * @param timesSpent
   */
  postSectionResponse ({ id, timeSpent }: { id: string, timeSpent: number }): void {
    this.questionPaper[this.currentSectionIndex].status = Status.DONE
    this.questionPaperService
      .postUserResponse(
        'section',
        this.attemptId,
        null,
        id,
        timeSpent
      )
      .subscribe({ next: () => {} })
  }

  /**
   * Post the current question response
   *
   * @param currentQuestion
   */
  postQuestionResponse (currentQuestion: any): void {
    this.questionPaperService
      .postUserResponse(
        'question',
        this.attemptId,
        currentQuestion
      )
      .subscribe({ next: () => {} })
  }

  submitPaper (): void {
    // HACK: Submit the last section before submitting paper
    this.questionPaperService
      .postUserResponse(
        'section',
        this.attemptId,
        null,
        this.questionPaper[this.currentSectionIndex].id,
        this.questionPaper[this.currentSectionIndex].timeSpent
      )
      .subscribe({
        next: () => {
          this.questionPaperService
            .postUserResponse('questionPaper', this.attemptId)
            .subscribe({
              next: () => {
                // window.removeEventListener('beforeunload', this.checkLoad, false)
                void this.router.navigate(['papers'])
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Paper Submitted Successfully'
                })
              }
            })
        }
      })
  }

  getCurrentQuestion (): any {
    return this.questionPaper[this.currentSectionIndex].questions[
      this.currentQuestionIndex
    ]
  }

  private readonly elem = document.documentElement

  /* View in fullscreen */
  private openFullscreen (): void {
    if (this.elem.requestFullscreen !== undefined) {
      void this.elem.requestFullscreen()
    }
  }

  /* Close fullscreen */
  private closeFullscreen (): void {
    if (document.exitFullscreen !== undefined) {
      void document.exitFullscreen()
    }
  }
}
