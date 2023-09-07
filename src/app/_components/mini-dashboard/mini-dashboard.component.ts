import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Filter } from 'src/_models/filter'
import { ResultService } from 'src/app/_services/result.service'

@Component({
  selector: 'app-mini-dashboard',
  templateUrl: './mini-dashboard.component.html',
  styleUrls: ['./mini-dashboard.component.scss']
})
export class MiniDashboardComponent implements OnInit {
  constructor (private readonly resultService: ResultService, private readonly router: Router, private readonly route: ActivatedRoute) { }
  attempts: any[] = []
  filter: Filter = { per: 10, page: 1 }
  total: number
  attemptId = ''
  throttle = 250
  scrollDistance = 1
  scrollUpDistance = 2
  isListLoading: boolean = true
  deletedId: string | null = null

  ngOnInit (): void {
    this.fetchResults()
    this.route.params.subscribe({ next: ({ id }) => { this.attemptId = id } })
  }

  onScrollDown (ev: any): void {
    console.log('scrolled')
    this.filter.page = this.filter.page !== undefined ? this.filter.page + 1 : 1
    this.resultService.getAllResults(this.filter).subscribe(
      {
        next: (data) => {
          this.attempts.concat(data.attempts)
          this.total = data.total
        }
      })
  }

  fetchResults (): void {
    this.isListLoading = true
    this.resultService.getAllResults(this.filter).subscribe(
      {
        next: (data) => {
          debugger
          this.attempts = data.attempts
          this.total = data.total
          this.isListLoading = false
        }
      })
  }

  deleteResult (event: MouseEvent, attemptId: string): void {
    this.deletedId = attemptId
    this.resultService.deleteResultByAttemptId(attemptId).subscribe({
      next: () => {
        this.deletedId = null
        this.fetchResults()
      }
    })
  }

  goToResult (event: MouseEvent, id: string): void {
    void this.router.navigate(['dashboard', id])
  }
}
