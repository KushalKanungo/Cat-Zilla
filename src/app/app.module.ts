import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { SidebarModule } from 'primeng/sidebar'
import { RadioButtonModule } from 'primeng/radiobutton'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ScrollPanelModule } from 'primeng/scrollpanel'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { QuestionComponent } from './question/question.component'
import { OptionsComponent } from './options/options.component'
import { BottomBarComponent } from './bottom-bar/bottom-bar.component'
import { PaperSectionComponent } from './paper-section/paper-section.component'
import { QuestionPaperComponent } from './question-paper/question-paper.component'
import { CountdownModule } from 'ngx-countdown'
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    QuestionComponent,
    OptionsComponent,
    BottomBarComponent,
    PaperSectionComponent,
    QuestionPaperComponent
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
    CountdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
