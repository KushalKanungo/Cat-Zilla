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
import { filter, fromEvent } from 'rxjs'

@Component({
  selector: 'app-question-paper',
  templateUrl: './question-paper.component.html',
  styleUrls: ['./question-paper.component.scss']
})
export class QuestionPaperComponent implements OnInit, OnDestroy {
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
  result: any
  isInPreviewMode: boolean = false

  scrollToTop () {
    document.querySelectorAll('.p-scrollpanel')?.forEach((ele) => {
      ele.scroll({ top: 0 })
    })
  }

  reloadEvent (event: any) {
    event.preventDefault()
    console.log('Trying to exit')
    event.returnValue = ''
  }

  reloadYesEvent (event: any) {
    console.log('reloading')
    this.submitPaper()
    window.location.replace('http://localhost:4200/dashboard')
  }

  ngOnInit (): void {
    const nextKeyPress$ = fromEvent(document, 'keydown').pipe(
      filter((event: any) => this.isInPreviewMode && ['ArrowLeft', 'ArrowRight', 'Space', '1', '2', '3'].includes(event.key))
    )

    nextKeyPress$.subscribe(({ key }) => {
      if (key === 'ArrowRight') {
        this.changeToQuestion(this.currentQuestionIndex + 1)
      } else if (key === 'ArrowLeft') {
        this.changeToQuestion(this.currentQuestionIndex - 1)
      } else if (key === 'Space' && this.isInPreviewMode) {
        this.changeToQuestion(this.currentQuestionIndex - 1)
      } else if (['1', '2', '3'].includes(key) && this.isInPreviewMode) {
        this.changeToSection(Number(key) - 1)
      }
    })

    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((state) => {
        this.isMobile = state.matches
      })
    this.initializeQuestionPaper()
    if (!this.isInPreviewMode) {
      this.startTimer()
      this.openFullscreen()
      window.addEventListener('beforeunload', this.reloadEvent)
      // window.addEventListener('unload', this.reloadYesEvent)
    }
  }

  ngOnDestroy (): void {
    console.log('destroy ran')
    if (!this.questionPaperService.isPaperInProgress()) {
      window.removeEventListener('beforeunload', this.reloadEvent)
    }
    if (!this.isInPreviewMode) {
      clearInterval(this.timeTrackingInterval)
      if (this.questionPaperService.isPaperInProgress()) {
        this.submitPaper()
      }
    }
  }

  /**
   * Initialize questionpaper variables
   */
  initializeQuestionPaper (): void {
    this.questionPaper =
        this.activateRoute.snapshot.data['questionPaper'].sections
    this.attemptId = this.activateRoute.snapshot.data['questionPaper'].attemptId
    this.isInPreviewMode = this.activateRoute.snapshot.data['isInPreviewMode']
    this.result = this.activateRoute.snapshot.data['result']

    this.questionPaperService.setCurrectPaperStatusOnLocal(this.attemptId)
    if (!this.isInPreviewMode) {
      this.questionPaper[this.currentSectionIndex].status = Status.IN_PROGRESS
    }
    this.allSections = this.questionPaper.map((sec: Section, idx) => ({
      label: sec.label,
      index: idx
    }))
    if (this.isInPreviewMode) {
      this.mergeQuestionWithResult()
      this.allSections = this.result.sections.map((sec: any, idx: number) => ({
        label: sec.sectionName,
        index: idx,
        marks: sec.marks
      }))
    }
  }

  /**
   * Merge result with question
   */
  mergeQuestionWithResult (): void {
    this.result.questions = this.result.questions.map((ques: any) => {
      const { id, ...data } = ques
      return [id, data]
    })
    const mappedQuestion = new Map<string, { timeSpent: number, isCorrect: boolean, userResponse: any }>(this.result.questions)
    this.questionPaper.forEach((sec: Section) => {
      sec.questions.forEach(que => {
        // delete que.timeSpent
        // delete que.marks
        que.timeSpent = (mappedQuestion.get(que.id) ?? { timeSpent: 0 }).timeSpent
        que.userResponse = (mappedQuestion.get(que.id) ?? { userResponse: null }).userResponse
        que.status = mappedQuestion.get(que.id)?.isCorrect === true ? Status.ANSWERED : (mappedQuestion.get(que.id)?.isCorrect === false ? Status.NOT_ANSWERED : Status.REVIEW)

        const newObj = { ...que, ...mappedQuestion.get(que.id) }
        return newObj
      })
    })
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
        if (this.currentSectionIndex === this.questionPaper.length - 1) {
          localStorage.removeItem('attempt')
          this.submitPaper()
        }
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
      this.postQuestionResponse(currentQuestion, this.attemptId)
    }
    this.scrollToTop()
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
      this.postSectionResponse(this.questionPaper[this.currentSectionIndex], this.attemptId)
    }
    this.changeToQuestion(0)
    this.currentSectionIndex = idx
    if (!this.isInPreviewMode) {
      this.questionPaper[this.currentSectionIndex].status = Status.IN_PROGRESS
    }
  }

  /**
   * Posts the currect sections to backend
   * Also change the status to done
   * @param sectionIds
   * @param timesSpent
   */
  postSectionResponse ({ id, timeSpent }: { id: string, timeSpent: number }, attemptId: string): void {
    this.questionPaper[this.currentSectionIndex].status = Status.DONE
    this.questionPaperService
      .postUserResponse(
        'section',
        attemptId,
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
  postQuestionResponse (currentQuestion: any, attemptId: string): void {
    this.questionPaperService
      .postUserResponse(
        'question',
        attemptId,
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
                if (!this.isInPreviewMode) {
                  clearInterval(this.timeTrackingInterval)
                  this.questionPaperService.paperSubmitted()
                  this.attemptId = ''
                }
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
