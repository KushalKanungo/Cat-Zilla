import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Filter } from 'src/_models/filter'
import { QuestionPaperService } from 'src/app/_services/question-paper.service'
import { SectionsService } from 'src/app/_services/sections.service'

@Component({
  selector: 'app-paper-listing',
  templateUrl: './paper-listing.component.html',
  styleUrls: ['./paper-listing.component.scss']
})
export class PaperListingComponent implements OnInit {
  filter: Filter = { query: '' }
  questionPapers: any
  sections: Array<{ label: string, id: string }>
  isLoading = true
  isLoadingForStart = false
  timePerSection = 40
  isDialogVisible = false
  selectedPaper: any
  selectedSections: string[] = []

  constructor (
    private readonly questionPaperService: QuestionPaperService,
    private readonly router: Router,
    private readonly sectionsService: SectionsService
  ) {}

  onSearch (): void {
    console.log(this.filter.query)
  }

  ngOnInit (): void {
    this.fetchQuestionPapers()
    this.fetchSections()
  }

  fetchQuestionPapers (): void {
    this.questionPaperService.getAllQuestionPapers(this.filter).subscribe({
      next: (data) => {
        this.questionPapers = data.questionPapers
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
}
