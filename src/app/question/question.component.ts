import { Component, Input, type OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Status } from 'src/_enums/status'
import { type Question } from 'src/_models/questionsModel'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { QuestionPaperService } from '../_services/question-paper.service'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question
  @Input() questionNumber: number
  @Input() attemptId: string
  @Input() isInPreviewMode: boolean

  formGroup: FormGroup
  statusEnum = Status
  isMobile = false
  constructor (private readonly breakpointObserver: BreakpointObserver, private readonly questionPaperService: QuestionPaperService) {

  }

  ngOnInit (): void {
    this.formGroup = new FormGroup({
      selectedOption: new FormControl('', [])
    })

    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((state) => {
        this.isMobile = state.matches
      })
  }

  setUserResponse (response: number): void {
    this.question.userResponse = response
    this.questionPaperService.postUserResponse('question', this.attemptId, this.question).subscribe({ next: () => {} })
  }

  fixImages (): void {
    document.querySelectorAll('img').forEach((ele) => {
      const base = 'https://imsclick2cert.blob.core.windows.net/imsitemimages/'
      const link = ele.src.split('/')
      const newLink = base + link[link.length - 1]
      ele.src = newLink
    })
  }

  setQuestionStatus (status: Status): void {
    this.question.status = status
  }
}
