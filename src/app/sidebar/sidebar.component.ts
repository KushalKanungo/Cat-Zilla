import { type AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { type CountdownEvent, type CountdownComponent, type CountdownConfig } from 'ngx-countdown'
import { type Question } from 'src/_models/questionsModel'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit {
  @Output() changeToQuestion = new EventEmitter()
  @Output() changeToSection = new EventEmitter()
  @Input() currentQuestionIndex: number
  @Input() currentSectionIndex: number
  @Input() questions: Question[]
  @Input() currentSectionTime: number
  @ViewChild('cd', { static: false }) private readonly countdown: CountdownComponent

  config: CountdownConfig = { demand: true, leftTime: 1800 }

  ngOninit (): void {
    this.config.leftTime = this.currentSectionTime
  }

  ngAfterViewInit (): void {
    this.countdown.left = this.currentSectionTime * 1000
    this.countdown.begin()
  }

  timerFinishHandeler ($event: CountdownEvent): void {
    if ($event.action === 'done') {
      this.changeToSection.emit(this.currentSectionIndex + 1)
      this.countdown.stop()
      this.countdown.restart()
      // this.config.leftTime = this.currentSectionTime
      this.countdown.left = this.currentSectionTime * 1000
      this.countdown.begin()
    }
    console.log($event)
  }

  nextQuestionHandeler (): void {
    this.changeToQuestion.emit(this.currentQuestionIndex + 1)
  }

  prevQuestionHandeler (): void {
    this.changeToQuestion.emit(this.currentQuestionIndex - 1)
  }

  changeToQuestionHandeler (idx: number): void {
    this.changeToQuestion.emit(idx)
  }
}
