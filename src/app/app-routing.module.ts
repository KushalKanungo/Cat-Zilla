import { NgModule, inject } from '@angular/core'
import { RouterModule, type Routes } from '@angular/router'
import { QuestionPaperComponent } from './question-paper/question-paper.component'
import { questionPaperResolver } from './_resolver/question-paper-resolver'
import { LoginComponent } from './_pages/login/login.component'
import { DashboardComponent } from './_pages/dashboard/dashboard.component'
import { PaperListingComponent } from './_pages/paper-listing/paper-listing.component'
import { authGuard } from './_guards/auth.guard'
import { paperLeaveGuard } from './_guards/paper-leave.guard'

const routes: Routes = [{
  path: 'paper',
  component: QuestionPaperComponent,
  resolve: { questionPaper: questionPaperResolver },
  canDeactivate: [paperLeaveGuard]
},
{ path: 'login', component: LoginComponent, canActivate: [authGuard] },
{ path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
{ path: 'dashboard/:id', component: DashboardComponent, canActivate: [authGuard] },
{ path: 'papers', component: PaperListingComponent, canActivate: [authGuard] },
{ path: '**', redirectTo: 'papers', pathMatch: 'full' }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
