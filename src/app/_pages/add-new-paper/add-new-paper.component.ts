import { Component } from '@angular/core'
import { MessageService } from 'primeng/api'
import { QuestionPaperService } from 'src/app/_services/question-paper.service'

@Component({
  selector: 'app-add-new-paper',
  templateUrl: './add-new-paper.component.html',
  styleUrls: ['./add-new-paper.component.scss']
})
export class AddNewPaperComponent {
  label = ''
  description: string | null = null
  file: File[]
  questions: any
  fileName: string = ''
  isLoading: boolean = false

  constructor (private readonly questionPaperService: QuestionPaperService, private readonly messageService: MessageService) { }
  onAdd (): void {
    this.isLoading = true
    this.questionPaperService.addQuestionPaper({ label: this.label, description: this.description, questions: this.questions }).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message })
        this.isLoading = false
        this.clearForm()
      },
      error: (err) => {
        this.isLoading = false
        throw err
      }
    })
  }

  onFileChange (event: any): void {
    if (event.target.files.length as number > 0) {
      const reader = new FileReader()
      this.fileName = event.target.files[0].name
      reader.readAsText(event.target.files[0])
      reader.onload = () => {
        this.questions = JSON.parse(reader.result as string)
        if (this.label === '') { this.label = this.fileName.split('.')[0] }
      }
    }
  }

  clearForm (): void {
    this.label = ''
    this.description = null
    this.file = []
    this.questions = null
    this.fileName = ''
  }
}
