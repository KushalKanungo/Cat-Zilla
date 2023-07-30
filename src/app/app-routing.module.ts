import { NgModule } from '@angular/core'
import { RouterModule, type Routes } from '@angular/router'
import { QuestionPaperComponent } from './question-paper/question-paper.component'
import { questionPaperResolver } from './_resolver/question-paper-resolver'

const routes: Routes = [{
  path: 'paper',
  component: QuestionPaperComponent,
  resolve: { questionPaper: questionPaperResolver }
}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
