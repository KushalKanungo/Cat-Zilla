import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { SidebarModule } from 'primeng/sidebar'
import { RadioButtonModule } from 'primeng/radiobutton'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ScrollPanelModule } from 'primeng/scrollpanel'
import { DropdownModule } from 'primeng/dropdown'
import { OverlayPanelModule } from 'primeng/overlaypanel'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { TagModule } from 'primeng/tag'
import { DialogModule } from 'primeng/dialog'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { ToastModule } from 'primeng/toast'
import { ChartModule } from 'primeng/chart'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { AppRoutingModule } from './app-routing.module'
import { SkeletonModule } from 'primeng/skeleton'
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
import { TableModule } from 'primeng/table'
import { MultiSelectModule } from 'primeng/multiselect'
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { LoginComponent } from './_pages/login/login.component'
import { AuthInterceptor } from 'src/_interceptors/auth-interceptor'
import { DashboardComponent } from './_pages/dashboard/dashboard.component'
import { NavigationBarComponent } from './_components/navigation-bar/navigation-bar.component'
import { MiniDashboardComponent } from './_components/mini-dashboard/mini-dashboard.component'
import { InsightsComponent } from './_components/insights/insights.component'
import { QuestionPreviewComponent } from './_components/question-preview/question-preview.component'
import { PaperListingComponent } from './_pages/paper-listing/paper-listing.component'
import { AddNewPaperComponent } from './_pages/add-new-paper/add-new-paper.component'
import { SettingsComponent } from './_pages/settings/settings.component'
import { BarLoadingComponent } from './_components/bar-loading/bar-loading.component'
import { MessageService } from 'primeng/api'
import { TopBarLoadingComponent } from './_components/top-bar-loading/top-bar-loading.component'
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
    MiniDashboardComponent,
    InsightsComponent,
    QuestionPreviewComponent,
    PaperListingComponent,
    AddNewPaperComponent,
    SettingsComponent,
    BarLoadingComponent,
    TopBarLoadingComponent
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
    PanelMenuModule,
    TableModule,
    MultiSelectModule,
    TagModule,
    DropdownModule,
    OverlayPanelModule,
    DialogModule,
    SkeletonModule,
    ChartModule,
    ConfirmDialogModule,
    InfiniteScrollModule,
    ToastModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
