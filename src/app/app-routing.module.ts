import { NgModule } from '@angular/core'
import { RouterModule, type Routes } from '@angular/router'
import { QuestionPaperComponent } from './question-paper/question-paper.component'

const routes: Routes = [{
  path: 'ques',
  component: QuestionPaperComponent,
  pathMatch: 'full'
}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
