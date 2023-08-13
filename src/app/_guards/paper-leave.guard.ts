import { CanDeactivateFn } from '@angular/router'
import { QuestionPaperComponent } from '../question-paper/question-paper.component'
import { inject } from '@angular/core'
import { ConfirmationService } from 'primeng/api'
import { QuestionPaperService } from '../_services/question-paper.service'

export const paperLeaveGuard: CanDeactivateFn<QuestionPaperComponent> = (component: QuestionPaperComponent) => {
  const canLeave = !inject(QuestionPaperService).isPaperInProgress()
  if (canLeave) {
    return true
  }
  if (confirm('You have unsaved changes! If you leave, your changes will be lost.')) {
    return true
  } else {
    return false
  }

  // inject(ConfirmationService).confirm({
  //   message: 'Are you sure you want to navigate away?',

  //   accept: () => {
  //     return true // User confirmed, allow navigation
  //   },
  //   reject: () => {
  //     return false // User canceled, prevent navigation
  //   }
  // })
}
