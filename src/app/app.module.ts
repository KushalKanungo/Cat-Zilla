import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { SidebarModule } from 'primeng/sidebar'
import { RadioButtonModule } from 'primeng/radiobutton'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ScrollPanelModule } from 'primeng/scrollpanel'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { PanelMenuModule } from 'primeng/panelmenu'
import { CheckboxModule } from 'primeng/checkbox'
import { AppComponent } from './app.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { QuestionComponent } from './question/question.component'
import { OptionsComponent } from './options/options.component'
import { BottomBarComponent } from './bottom-bar/bottom-bar.component'
import { PaperSectionComponent } from './paper-section/paper-section.component'
import { QuestionPaperComponent } from './question-paper/question-paper.component'
import { CountdownModule } from 'ngx-countdown'
import { SplitterModule } from 'primeng/splitter'
import { InputTextModule } from 'primeng/inputtext'
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { LoginComponent } from './_pages/login/login.component'
import { AuthInterceptor } from 'src/_interceptors/auth-interceptor';
import { DashboardComponent } from './_pages/dashboard/dashboard.component';
import { NavigationBarComponent } from './_components/navigation-bar/navigation-bar.component';
import { MiniDashboardComponent } from './_components/mini-dashboard/mini-dashboard.component'
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    QuestionComponent,
    OptionsComponent,
    BottomBarComponent,
    PaperSectionComponent,
    QuestionPaperComponent,
    LoginComponent,
    DashboardComponent,
    NavigationBarComponent,
    MiniDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    BrowserAnimationsModule,
    RadioButtonModule,
    ReactiveFormsModule,
    ScrollPanelModule,
    FormsModule,
    SplitterModule,
    InputTextModule,
    CountdownModule,
    ConfirmPopupModule,
    HttpClientModule,
    CheckboxModule,
    PanelMenuModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
