import { animate, style, transition, trigger } from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Filter } from 'src/_models/filter'
import { QuestionPaperService } from 'src/app/_services/question-paper.service'
import { SectionsService } from 'src/app/_services/sections.service'

@Component({
  selector: 'app-paper-listing',
  templateUrl: './paper-listing.component.html',
  styleUrls: ['./paper-listing.component.scss'],
  animations: [
    trigger('inOutPaneAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }), // apply default styles before animation starts
        animate(
          '750ms ease-in-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        )
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }), // apply default styles before animation starts
        animate(
          '600ms ease-in-out',
          style({ opacity: 0, transform: 'translateX(-100%)' })
        )
      ])
    ])
  ]
})
export class PaperListingComponent implements OnInit {
  filter: Filter = { query: '', per: 12, page: 0, includeAttempted: true }
  questionPapers: any = []
  sections: Array<{ label: string, id: string }>
  isLoading = true
  isLoadingForStart = false
  timePerSection = 40
  isDialogVisible = false
  selectedPaper: any
  selectedSections: string[] = []
  throttle = 300
  scrollDistance = 1
  scrollUpDistance = 2
  direction = ''

  constructor (
    private readonly questionPaperService: QuestionPaperService,
    private readonly router: Router,
    private readonly sectionsService: SectionsService
  ) {}

  onSearch (): void {
    console.log(this.filter.query)
    this.isLoading = true
    this.fetchQuestionPapers(0, true)
  }

  ngOnInit (): void {
    this.fetchQuestionPapers()
    this.fetchSections()
  }

  fetchQuestionPapers (page = 0, clearPreviousQuestionPapers = false): void {
    this.filter.page = this.filter.page !== undefined ? page + 1 : page
    this.questionPaperService.getAllQuestionPapers(this.filter).subscribe({
      next: (data) => {
        if (clearPreviousQuestionPapers) { this.questionPapers = [] }
        this.questionPapers.push(...data.questionPapers)
        // this.questionPapers = data.questionPapers

        this.isLoading = false
        console.log(typeof data)
      }
    })
  }

  fetchSections (): void {
    this.sectionsService.getAllSections().subscribe({
      next: (sections) => {
        this.sections = sections
        this.selectedSections = sections.map(({ id }) => id)
      }
    })
  }

  onLike (event: MouseEvent): void {
    document.getElementById('like')?.classList.toggle('is-active')
  }

  showDialog (event: MouseEvent, paper: any): void {
    this.selectedPaper = paper
    this.isDialogVisible = true
  }

  onSectionSelect (event: any): void {
    console.log(this.selectedSections)
  }

  startPaper (): void {
    this.isLoadingForStart = true
    void this.router.navigateByUrl('/paper', { state: { id: this.selectedPaper.id, sections: this.selectedSections, maxTime: this.timePerSection } })
  }

  onScrollDown (ev: any): void {
    console.log('scrolled down!!', ev)
    this.fetchQuestionPapers(this.filter.page)
    this.direction = 'down'
  }
}
