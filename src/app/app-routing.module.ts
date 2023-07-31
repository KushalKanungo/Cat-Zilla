import { NgModule } from '@angular/core'
import { RouterModule, type Routes } from '@angular/router'
import { QuestionPaperComponent } from './question-paper/question-paper.component'
import { questionPaperResolver } from './_resolver/question-paper-resolver'
import { LoginComponent } from './_pages/login/login.component'
import { DashboardComponent } from './_pages/dashboard/dashboard.component'

const routes: Routes = [{
  path: 'paper',
  component: QuestionPaperComponent,
  resolve: { questionPaper: questionPaperResolver }
},
{ path: 'login', component: LoginComponent },
{ path: 'dashboard', component: DashboardComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
