import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filter } from 'src/_models/filter';
import { QuestionPaperService } from 'src/app/_services/question-paper.service';

@Component({
  selector: 'app-paper-listing',
  templateUrl: './paper-listing.component.html',
  styleUrls: ['./paper-listing.component.scss']
})
export class PaperListingComponent {

  filter: Filter = { query: '' }
  questionPapers: any
  isLoading = true
  isDialogVisible = false

  constructor(private readonly questionPaperService: QuestionPaperService, private readonly router: Router){}
  onSearch(): void {
    console.log(this.filter.query)
  }

  ngOnInit(){
      this.questionPaperService.getAllQuestionPapers(this.filter).subscribe({next: (data)=>{
        this.questionPapers = data.questionPapers
        this.isLoading = false
        console.log(typeof data);
        
      }})
  }

  onLike(event: MouseEvent){
    document.getElementById('like')?.classList.toggle('is-active')
  }

  showDialog(event: MouseEvent, id: string){
    this.isDialogVisible = true
    console.log(id);
    
  }

}
