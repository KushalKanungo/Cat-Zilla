import { Component } from '@angular/core'
import { Header } from 'primeng/api'
import { QuestionService } from 'src/app/_services/question.service'
import { ResultService } from 'src/app/_services/result.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(
    private readonly resultService: ResultService,
    private readonly questionService: QuestionService
  ) {}

  query = ''
  questions = []
  sectionsData = []
  barChartData:any = []
  selectedQuestions: any[] = []
  resultCardData: Array<{label: string, data: any}> 
  result: any
  isPreviewVisible = false
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
    responses: [],
  }

  options = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        },
      },
    },
  }

  barChartOptions: any 

  data: any

  subjects: Array<{ label: string; value: string }> = []
  sections: Array<{ label: string; value: string }> = []
  topics: Array<{ label: string; value: string }> = []
  areas: Array<{ label: string; value: string }> = []
  responses: Array<{ label: string; value: string }> = [
    { label: 'Correct', value: 'Correct' },
    { label: 'Wrong', value: 'Wrong' },
    { label: 'Skipped', value: 'Skipped' },
  ]
  loading = true
  previewedQuestion: any
  QUESTION_TABLE_HEADERS = [
    { header: 'Ques', key: 'questionNo' },
    { header: 'Section', key: 'sectionName' },
    {
      header: 'TimeSpent',
      key: 'timeSpent',
      command: (value: unknown) => `${value} sec`,
    },
    {
      header: 'Response',
      key: 'isCorrect',
      command: (value: boolean | null | undefined) =>
        value === null || value === undefined
          ? 'Skipped'
          : value === true
          ? 'Correct'
          : 'Wrong',
    },
    { header: 'Topic', key: 'topicName' },
    { header: 'Area', key: 'areaName' },
    { header: 'Subject', key: 'subjectName' },
  ]
  columns: string[] = []
  selectedColumns: string[] = []
  selectedQuestionTableHeaders: any = []

  ngOnInit() {
    this.columns = this.QUESTION_TABLE_HEADERS.map(({ header }) => header)
    this.selectedColumns = [...this.columns]
    this.selectedQuestionTableHeaders = [...this.QUESTION_TABLE_HEADERS]
    this.resultService
      .getResultByAttemptId('64c60dd55d0e5b0253e5dcf7')
      .subscribe({
        next: ({ questions, sections, ...result }) => {
          this.questions = questions
          this.selectedQuestions = questions
          this.fillDropDowns()
          this.loading = false
          this.data = this.createDataForPieChart(sections)
          console.log(result);
          
          // this.data = this.createDataForBarChart([result])
          this.barChartData = this.createDataForBarChart(sections)
          this.resultCardData = this.createResultCardData(result, sections, questions)
          this.sectionsData = sections
          this.result = result
        },
      })
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      this.barChartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            tooltips: {
                mode: 'index',
                intersect: false
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
    };
  }
  products = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
  ]

  fillDropDowns() {
    this.questions.forEach((question: any) => {
      if (this.sections.every(({ value }) => value !== question.sectionId))
        this.sections.push({
          label: question.sectionName,
          value: question.sectionId,
        })
      if (this.areas.every(({ value }) => value !== question.areaId))
        this.areas.push({ label: question.areaName, value: question.areaId })
      if (this.topics.every(({ value }) => value !== question.topicId))
        this.topics.push({ label: question.topicName, value: question.topicId })
      if (this.subjects.every(({ value }) => value !== question.subjectId))
        this.subjects.push({
          label: question.subjectName,
          value: question.subjectId,
        })
    })
  }

  onFilterChange(event: any, throughClear = false) {
    this.selectedQuestions = this.questions
    if (throughClear) {
      this.filter[event as keyof typeof this.filter] = []
    }
    // console.log(event);

    if (this.filter.areas?.length > 0)
      this.selectedQuestions = this.selectedQuestions.filter((question: any) =>
        this.filter.areas.includes(question.areaId)
      )
    if (this.filter.sections?.length > 0)
      this.selectedQuestions = this.selectedQuestions.filter((question: any) =>
        this.filter.sections.includes(question.sectionId)
      )
    if (this.filter.topics?.length > 0)
      this.selectedQuestions = this.selectedQuestions.filter((question: any) =>
        this.filter.topics.includes(question.topicId)
      )
    if (this.filter.subjects?.length > 0)
      this.selectedQuestions = this.selectedQuestions.filter((question: any) =>
        this.filter.subjects.includes(question.subjectId)
      )
    if (this.filter.responses?.length > 0)
      this.selectedQuestions = this.selectedQuestions.filter(
        (question: any) =>
          this.QUESTION_TABLE_HEADERS[3].command &&
          this.filter.responses.includes(
            this.QUESTION_TABLE_HEADERS[3].command(question.isCorrect)
          )
      )
    this.selectedQuestions = [...this.selectedQuestions]
    console.log(this.selectedQuestions)
  }

  onColumnChange(event: any) {
    if (event === true) this.selectedColumns = []
    this.selectedQuestionTableHeaders = this.QUESTION_TABLE_HEADERS.filter(
      ({ header }) => this.selectedColumns.includes(header)
    )
    // this.selectedQuestionTableHeaders = [...this.selectedQuestionTableHeaders]
  }

  onPreview(event: any, questionId: string, userResponse: any) {
    // console.log(userResponse);
    let correctOption = 0
    this.questionService.getQuestionById(questionId).subscribe({
      next: (data) => {
        correctOption = data.options.find((opt: any) => opt.isCorrect).index
        this.previewedQuestion = {
          ...data,
          userResponse: userResponse,
          correctOption,
        }
        console.log(this.previewedQuestion.userResponse)

        this.isPreviewVisible = true
      },
    })
  }

  onSearch(): void {
    console.log(this.query)
  }

  createDataForPieChart(sectionsArray: any[]) {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--text-color')
    const totalQuestions = sectionsArray.reduce(
      (sum, sec) => sum + sec.total,
      0
    )
    const correctQuestions = sectionsArray.reduce(
      (sum, sec) => sum + sec.correct,
      0
    )
    const wrongQuestions = sectionsArray.reduce(
      (sum, sec) => sum + sec.wrong,
      0
    )
    const unansweredQuestions = sectionsArray.reduce(
      (sum, sec) => sum + sec.unanswered,
      0
    )
    const tempData = {
      labels: ['Skipped', 'Correct', 'Wrong'],
      datasets: [
        {
          data: [unansweredQuestions, correctQuestions, wrongQuestions],
          backgroundColor: [
            documentStyle.getPropertyValue('--warning'),
            documentStyle.getPropertyValue('--success'),
            documentStyle.getPropertyValue('--danger'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--warning-lite'),
            documentStyle.getPropertyValue('--success-lite'),
            documentStyle.getPropertyValue('--danger-lite'),
          ],
        },
      ],
    }
    return tempData
  }

  createDataForBarChart(sectionsArray: any[]){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        labels: sectionsArray.map((sec)=> sec.sectionName),
        datasets: [
            {
                type: 'bar',
                label: 'Correct',
                backgroundColor: documentStyle.getPropertyValue('--success'),
                data: sectionsArray.map(sec => sec.correct)
            },
            {
                type: 'bar',
                label: 'Wrong',
                backgroundColor: documentStyle.getPropertyValue('--danger'),
                data: sectionsArray.map(sec => sec.wrong)
            },
            {
                type: 'bar',
                label: 'Unanswered',
                backgroundColor: documentStyle.getPropertyValue('--warning'),
                data: sectionsArray.map(sec => sec.unanswered)
            }
        ]
    };
  }

  createResultCardData(result: any, sectionsData: any, questions: any): Array<{label: string, data: any}>{
    const avgCorrect = Math.round(questions.reduce((sum: any,ques: any) => {
      if (ques.isCorrect){
        console.log(ques.timeSpent);
        return sum + ques.timeSpent
      }
      return sum
    }, 0)/result.correct).toFixed(0)

    const avgWrong = Math.round(questions.reduce((sum: any,ques: any) => {
      if (ques.isCorrect === false){
        console.log(ques.timeSpent);
        return sum + ques.timeSpent
      }
      return sum
    }, 0)/result.wrong).toFixed(0)

    const avgUnanswered = Math.round(questions.reduce((sum: any,ques: any) => {
      if (ques.userResponse === null){
        console.log(ques.timeSpent);
        return sum + ques.timeSpent
      }
      return sum
    }, 0)/result.unanswered).toFixed(0)

    const tempdata = [
      {label: 'Marks', data: result.marks},
      {label: 'Avg. Correct', data: `${avgCorrect}s` },
      {label: 'Wrong', data: `${avgWrong}s`},
      {label: 'Unanswered', data: `${avgUnanswered}s`},
      {label: 'Percentage', data: (Math.round(result.marks) * 100 / result.maximumMarks).toFixed(2) },
      {label: 'Attempted %', data: (Math.round(result.correct + result.wrong) * 100 / result.total).toFixed(2)}
    ]
    return tempdata
  }
}
