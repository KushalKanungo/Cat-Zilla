import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { QuestionService } from 'src/app/_services/question.service'
import { ResultService } from 'src/app/_services/result.service'
import { switchMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Chart } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Question } from 'src/_models/questionsModel'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor (
    private readonly questionService: QuestionService,
    private readonly resultService: ResultService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly http: HttpClient
  ) {
    Chart.register(ChartDataLabels)
  }

  query = ''
  attemptId: string
  questions = []
  sectionsData = []
  currQuestion: string | null = null
  showResultChooseMessage: boolean = true
  barChartData: any
  selectedQuestions: any[] = []
  resultCardData: Array<{ label: string, data: any }>
  result: { maximumMarks: number, marks: number, correct: number, wrong: number, unanswered: number, total: number }
  isPreviewVisible = false
  basicChartOptions: any
  resultById$ = this.resultService.getResultByAttemptId()
  filter: {
    sections: string[]
    areas: string[]
    topics: string[]
    subjects: string[]
    responses: string[]
  } = {
      sections: [],
      topics: [],
      areas: [],
      subjects: [],
      responses: []
    }

  options = {
    plugins: {
      datalabels: {
        color: 'white',
        display: true,
        font: {
          weight: 'bold'
        },
        formatter: Math.round
      },
      legend: {
        labels: {
          usePointStyle: true
        }
      }
    }
  }

  chartBy = ['Count', 'Time Spent(min)', 'Average Time(sec)', 'Section Marks']

  chartByChange (event: any) {
    this.barChartData = this.createDataForBarChart(this.sectionsData, this.questions, event.value)
  }

  barChartOptions: any

  data: any

  subjects: Array<{ label: string, value: string }> = []
  sections: Array<{ label: string, value: string }> = []
  topics: Array<{ label: string, value: string }> = []
  areas: Array<{ label: string, value: string }> = []
  responses: Array<{ label: string, value: string }> = [
    { label: 'Correct', value: 'Correct' },
    { label: 'Wrong', value: 'Wrong' },
    { label: 'Skipped', value: 'Skipped' }
  ]

  loading = true
  previewedQuestion: any
  QUESTION_TABLE_HEADERS = [
    { header: 'Ques', key: 'questionNo' },
    { header: 'Section', key: 'sectionName' },
    {
      header: 'TimeSpent',
      key: 'timeSpent',
      command: (value: unknown) => `${value} sec`
    },
    { header: 'Marks', key: 'marks' },
    {
      header: 'Response',
      key: 'isCorrect',
      command: (value: boolean | null | undefined) =>
        value === null || value === undefined
          ? 'Skipped'
          : value
            ? 'Correct'
            : 'Wrong'
    },
    { header: 'Topic', key: 'topicName' },
    { header: 'Area', key: 'areaName' },
    { header: 'Subject', key: 'subjectName' }
  ]

  columns: string[] = []
  selectedColumns: string[] = []
  selectedQuestionTableHeaders: any = []

  ngOnInit () {
    this.columns = this.QUESTION_TABLE_HEADERS.map(({ header }) => header)
    this.selectedColumns = [...this.columns]
    this.selectedQuestionTableHeaders = [...this.QUESTION_TABLE_HEADERS]

    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')
        if (id === null) {
          this.showResultChooseMessage = true
          return of(null)
        }
        this.loading = true
        this.selectedQuestions = []
        this.showResultChooseMessage = false
        return this.resultService.getResultByAttemptId(id)
      })
    ).subscribe({
      next: (data: any) => {
        if (data === null) {
          return
        }
        this.initialDataFill(data)
        this.attemptId = data.attempt
        this.loading = false
        this.showResultChooseMessage = false
      },
      error: () => {
        this.showResultChooseMessage = true
        this.loading = false
      }
    })

    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--text-color')
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border')
    this.basicChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        datalabels: {
          color: 'white',
          align: 'center',
          anchor: 'center',
          display: function (context: any): boolean {
            return context.dataset.data[context.dataIndex] > 0
          },
          font: {
            weight: 'bold',
            size: '18px',
            family: 'Montserrat'

          },
          formatter: Math.round
        },
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    }
    this.barChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        datalabels: {
          color: 'white',
          align: 'center',
          anchor: 'center',
          display: function (context: any): boolean {
            return context.dataset.data[context.dataIndex] > 0
          },
          font: {
            weight: 'bold',
            size: '18px',
            family: 'Montserrat'

          },
          formatter: Math.round
        },
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          stacked: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    }
  }

  initialDataFill ({ questions, sections, ...result }: { questions: any, sections: any }): void {
    this.questions = questions
    this.selectedQuestions = questions
    this.fillDropDowns()
    this.loading = false
    this.data = this.createDataForBasicChart(sections)
    this.result = result as unknown as any

    // this.data = this.createDataForBarChart([result])
    this.resultCardData = this.createResultCardData(result, sections, questions)
    this.sectionsData = sections
    this.barChartData = this.createDataForBarChart(sections, questions)
  }

  fillDropDowns () {
    this.questions.forEach((question: any) => {
      if (this.sections.every(({ value }) => value !== question.sectionId)) { this.sections.push({ label: question.sectionName, value: question.sectionId }) }
      if (this.areas.every(({ value }) => value !== question.areaId)) { this.areas.push({ label: question.areaName, value: question.areaId }) }
      if (this.topics.every(({ value }) => value !== question.topicId)) { this.topics.push({ label: question.topicName, value: question.topicId }) }
      if (this.subjects.every(({ value }) => value !== question.subjectId)) {
        this.subjects.push({
          label: question.subjectName,
          value: question.subjectId
        })
      }
    })
  }

  onFilterChange (event: any, throughClear = false) {
    this.selectedQuestions = this.questions
    if (throughClear) {
      this.filter[event as keyof typeof this.filter] = []
    }
    // ;

    if (this.filter.areas?.length > 0) {
      this.selectedQuestions = this.selectedQuestions.filter((question: any) =>
        this.filter.areas.includes(question.areaId)
      )
    }
    if (this.filter.sections?.length > 0) {
      this.selectedQuestions = this.selectedQuestions.filter((question: any) =>
        this.filter.sections.includes(question.sectionId)
      )
    }
    if (this.filter.topics?.length > 0) {
      this.selectedQuestions = this.selectedQuestions.filter((question: any) =>
        this.filter.topics.includes(question.topicId)
      )
    }
    if (this.filter.subjects?.length > 0) {
      this.selectedQuestions = this.selectedQuestions.filter((question: any) =>
        this.filter.subjects.includes(question.subjectId)
      )
    }
    if (this.filter.responses?.length > 0) {
      this.selectedQuestions = this.selectedQuestions.filter(
        (question: any) =>
          (this.QUESTION_TABLE_HEADERS[4].command != null) &&
          this.filter.responses.includes(
            this.QUESTION_TABLE_HEADERS[4].command(question.isCorrect)
          )
      )
    }
    this.selectedQuestions = [...this.selectedQuestions]
  }

  onColumnChange (event: any) {
    if (event === true) this.selectedColumns = []
    this.selectedQuestionTableHeaders = this.QUESTION_TABLE_HEADERS.filter(
      ({ header }) => this.selectedColumns.includes(header)
    )
    // this.selectedQuestionTableHeaders = [...this.selectedQuestionTableHeaders]
  }

  onPreview (event: any, questionId: string, userResponse: any, isCorrect: boolean): void {
    // ;
    this.currQuestion = questionId
    let correctOption = 0
    this.questionService.getQuestionById(questionId).subscribe({
      next: (data) => {
        correctOption = data.options.find((opt: any) => opt.isCorrect).index
        this.previewedQuestion = {
          ...data,
          userResponse,
          correctOption,
          isCorrect
        }
        this.currQuestion = null

        this.isPreviewVisible = true
      }
    })
  }

  onSearch (): void {

  }

  createDataForBasicChart (sectionsArray: any[]) {
    const documentStyle = getComputedStyle(document.documentElement)
    const correctQuestions = sectionsArray.reduce(
      (sum: number, sec: { correct: number }) => sum + sec.correct,
      0
    )
    const wrongQuestions = sectionsArray.reduce(
      (sum: number, sec: { wrong: number }) => sum + sec.wrong,
      0
    )
    const unansweredQuestions = sectionsArray.reduce(
      (sum: number, sec: { unanswered: number }) => sum + sec.unanswered,
      0
    )
    const tempData = {
      labels: ['Skipped', 'Correct', 'Wrong'],
      datasets: [
        {
          label: 'Result',
          data: [unansweredQuestions, correctQuestions, wrongQuestions],
          backgroundColor: [
            documentStyle.getPropertyValue('--warning-graph'),
            documentStyle.getPropertyValue('--success'),
            documentStyle.getPropertyValue('--danger-graph')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--warning-lite'),
            documentStyle.getPropertyValue('--success-lite'),
            documentStyle.getPropertyValue('--danger-lite')
          ]
        }
      ]
    }
    return tempData
  }

  createDataForBarChart (sectionsArray: any[], questions: any[] = [], groupBy: string = 'Count') {
    const documentStyle = getComputedStyle(document.documentElement)

    const [correctData, wrongData, unansweredData] = this.calculateChartData(sectionsArray, questions, groupBy)
    return {
      labels: sectionsArray.map((sec) => sec.sectionName),
      datasets: [
        {
          type: 'bar',
          label: 'Correct',
          backgroundColor: documentStyle.getPropertyValue('--success'),
          data: correctData
          // data: sectionsArray.map(sec => sec.correct)
        },
        {
          type: 'bar',
          label: 'Wrong',
          backgroundColor: documentStyle.getPropertyValue('--danger-graph'),
          data: wrongData
          // data: sectionsArray.map(sec => sec.wrong)
        },
        {
          type: 'bar',
          label: 'Unanswered',
          backgroundColor: documentStyle.getPropertyValue('--warning-graph'),
          data: unansweredData
          // data: sectionsArray.map(sec => sec.unanswered)
        }
      ]
    }
  }

  createResultCardData (result: any, sectionsData: any, questions: any): Array<{ label: string, data: any }> {
    const avgCorrect = Math.round(questions.reduce((sum: number, ques: Question) => {
      if (ques.isCorrect ?? false) {
        return sum + ques.timeSpent
      }
      return sum
    }, 0) / result.correct).toFixed(0)

    const avgWrong = Math.round(questions.reduce((sum: number, ques: Question) => {
      if (ques.isCorrect === false && ques.userResponse !== null) {
        return sum + ques.timeSpent
      }
      return sum
    }, 0) / result.wrong).toFixed(0)

    const avgUnanswered = Math.round(questions.reduce((sum: number, ques: Question) => {
      if (ques.userResponse === null) {
        return sum + ques.timeSpent
      }
      return sum
    }, 0) / result.unanswered).toFixed(0)

    const tempdata = [
      { label: 'Marks', data: `${result.marks} / ${this.result.maximumMarks}` },
      { label: 'Avg. Correct', data: `${avgCorrect}s` },
      { label: 'Avg. Wrong', data: `${avgWrong}s` },
      { label: 'Avg. Unanswered', data: `${avgUnanswered}s` },
      { label: 'Percentage', data: `${(Math.round(result.marks) * 100 / result.maximumMarks).toFixed(1)} %` },
      { label: 'Attempted %', data: `${(Math.round(result.correct + result.wrong) * 100 / result.total).toFixed(1)} %` }
    ]
    return tempdata
  }

  calculateChartData (sections: any[], questions: any[], groupBy: string = 'Count'): number[][] {
    // If group by is Time Spent
    let correctData: number[] = sections.map(({ correct }) => correct)
    let wrongData: number[] = sections.map(({ wrong }) => wrong)
    let unansweredData: number[] = sections.map(({ unanswered }) => unanswered)
    // const labels = ['Correct', 'Wrong', 'Unanswered']
    // this.barChartData.datasets.map((set: any, idx: number) => {
    //   set.label = labels[idx]
    //   return set
    // })
    if (groupBy === 'Section Marks') {
      wrongData = []
      correctData = sections.map(({ marks }) => marks)
      unansweredData = []
    }
    if (groupBy === 'Time Spent(min)' || groupBy === 'Average Time(sec)') {
      correctData = sections.map(({ sectionId }) => questions.reduce((sum: number, ques: Question) => {
        return ((ques.isCorrect ?? false) && ques.sectionId === sectionId) ? sum + ques.timeSpent : sum
      }, 0))

      wrongData = sections.map(({ sectionId }) => questions.reduce((sum: number, ques: Question) => {
        return (!(ques.isCorrect ?? false) && ques.userResponse !== null && ques.sectionId === sectionId) ? sum + ques.timeSpent : sum
      }, 0))

      unansweredData = sections.map(({ sectionId }) => questions.reduce((sum: number, ques: Question) => {
        return ((ques.isCorrect === undefined || ques.isCorrect === null) && ques.sectionId === sectionId) ? sum + ques.timeSpent : sum
      }, 0))

      if (groupBy === 'Time Spent(min)') {
        correctData = correctData.map(val => Number((val / 60).toFixed(0)))
        wrongData = wrongData.map(val => Number((val / 60).toFixed(0)))
        unansweredData = unansweredData.map(val => Number((val / 60).toFixed(0)))
      }
    }
    if (groupBy === 'Average Time(sec)') {
      sections.forEach(({ correct, wrong, unanswered }, idx) => {
        correctData[idx] = Math.round(correctData[idx] / correct).toFixed(0) as unknown as number
        wrongData[idx] = Math.round(wrongData[idx] / wrong).toFixed(0) as unknown as number
        unansweredData[idx] = Math.round(unansweredData[idx] / unanswered).toFixed(0) as unknown as number
      })
    }
    return [correctData, wrongData, unansweredData]
  }

  fixImages (): void {
    document.querySelectorAll('img').forEach((ele) => {
      const base = 'https://imsclick2cert.blob.core.windows.net/imsitemimages/'
      const link = ele.src.split('/')
      const newLink = base + link[link.length - 1]
      ele.src = newLink
    })
  }

  navigateToPaperMode (): void {
    void this.router.navigateByUrl(`results/preview/${this.attemptId}`)
  }
}
