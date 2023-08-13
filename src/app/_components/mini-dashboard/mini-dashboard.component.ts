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
  attempts: any[]
  filter: Filter = { per: 8, page: 1 }
  total: number
  attemptId = ''

  ngOnInit (): void {
    console.log('minidashboardInit')

    this.resultService.getAllResults(this.filter).subscribe(
      {
        next: (data) => {
          this.attempts = data.attempts
          this.total = data.total
        }
      })
    this.route.params.subscribe({ next: ({ id }) => { this.attemptId = id } })
  }

  goToResult (event: MouseEvent, id: string): void {
    void this.router.navigate(['dashboard', id])
  }
}
