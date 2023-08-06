import { Component } from '@angular/core'
import { Header } from 'primeng/api'
import { QuestionService } from 'src/app/_services/question.service'
import { ResultService } from 'src/app/_services/result.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private readonly resultService: ResultService, private readonly questionService: QuestionService){}

  query = ''
  questions = []
  selectedQuestions: any[] = []
  isPreviewVisible = false
  filter: {
    sections: string[],
    areas: string[],
    topics: string[],
    subjects: string[],
    responses: string[],
  }= {
    sections: [],
    topics: [],
    areas: [],
    subjects: [],
    responses: []
  }
  subjects: Array<{label: string, value: string}> = [] 
  sections: Array<{label: string, value: string}> = [] 
  topics: Array<{label: string, value: string}> = [] 
  areas: Array<{label: string, value: string}> = []
  responses: Array<{label: string, value: string}> = [{label: 'Correct', value: 'Correct'}, {label: 'Wrong', value: 'Wrong'}, {label: 'Skipped', value: 'Skipped'}]
  loading = true
  previewedQuestion: any 
  QUESTION_TABLE_HEADERS = [
      { header: "Ques", key: "questionNo"},
      { header: "Section", key: "sectionName"},
      { header: "TimeSpent", key: "timeSpent", command: (value: unknown)=>  `${value} sec`},
      { header: "Response", key: "isCorrect", command: (value: boolean | null | undefined) => value === null || value === undefined ? "Skipped" : ( value === true ? "Correct" : "Wrong" ) },
      { header: "Topic", key: "topicName"},
      { header: "Area", key: "areaName"},
      { header: "Subject", key: "subjectName"},
    ]
  columns: string[] = []
  selectedColumns: string[] = []
  selectedQuestionTableHeaders:any = []

    ngOnInit(){
      this.columns = this.QUESTION_TABLE_HEADERS.map(({header}) => header)
      this.selectedColumns = [...this.columns]
      this.selectedQuestionTableHeaders = [...this.QUESTION_TABLE_HEADERS]
      this.resultService.getResultByAttemptId("64c60dd55d0e5b0253e5dcf7").subscribe({next: ({questions, sections}) => {
        this.questions = questions
        this.selectedQuestions = questions
        this.fillDropDowns()
        this.loading = false
      }})
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
      rating: 5
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
      rating: 5
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
      rating: 5
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
      rating: 5
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
      rating: 5
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
      rating: 5
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
      rating: 5
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
      rating: 5
    }
  ]

  
  fillDropDowns(){
    this.questions.forEach((question: any) => {
      if (this.sections.every(({value}) => value !== question.sectionId))
        this.sections.push({label: question.sectionName, value: question.sectionId})
      if (this.areas.every(({value}) => value !== question.areaId))
        this.areas.push({label: question.areaName, value: question.areaId})
      if (this.topics.every(({value}) => value !== question.topicId))
        this.topics.push({label: question.topicName, value: question.topicId})
      if (this.subjects.every(({value}) => value !== question.subjectId))
        this.subjects.push({label: question.subjectName, value: question.subjectId})
    })
  }


  onFilterChange(event: any, throughClear = false){
    this.selectedQuestions = this.questions
    if (throughClear){
      this.filter[event as keyof typeof this.filter] = []
    }
    // console.log(event);
    
    if (this.filter.areas?.length > 0)
      this.selectedQuestions = this.selectedQuestions.filter((question: any) => this.filter.areas.includes(question.areaId))
    if (this.filter.sections?.length > 0)
      this.selectedQuestions = this.selectedQuestions.filter((question: any) => this.filter.sections.includes(question.sectionId))
    if (this.filter.topics?.length > 0)
      this.selectedQuestions = this.selectedQuestions.filter((question: any) => this.filter.topics.includes(question.topicId))
    if (this.filter.subjects?.length > 0)
      this.selectedQuestions = this.selectedQuestions.filter((question: any) => this.filter.subjects.includes(question.subjectId))
    if (this.filter.responses?.length > 0)
      this.selectedQuestions = this.selectedQuestions.filter((question: any) => this.QUESTION_TABLE_HEADERS[3].command && this.filter.responses.includes( this.QUESTION_TABLE_HEADERS[3].command(question.isCorrect)))
    this.selectedQuestions = [...this.selectedQuestions]
    console.log(this.selectedQuestions);
    
  }

  onColumnChange(event: any){
    if (event === true)
      this.selectedColumns = []
    this.selectedQuestionTableHeaders = this.QUESTION_TABLE_HEADERS.filter(( { header } ) => this.selectedColumns.includes(header))
    // this.selectedQuestionTableHeaders = [...this.selectedQuestionTableHeaders]
  }

  onPreview(event: any, questionId: string, userResponse: any){
    // console.log(userResponse);
    let correctOption = 0 
    this.questionService.getQuestionById(questionId).subscribe(({next: (data)=>{
      correctOption = data.options.find((opt: any) => opt.isCorrect).index
      this.previewedQuestion = {...data, userResponse: userResponse, correctOption}
      console.log(this.previewedQuestion.userResponse);
      
      this.isPreviewVisible = true
    }}))
  }

  onSearch (): void {
    console.log(this.query)
  }
}
