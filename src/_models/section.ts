import { type Status } from 'src/_enums/status'
import { type Question } from './questionsModel'

export interface Section {
  sectionId: number
  label: string
  questions: Question[]
  maxTime: number
  timeSpent: number
  status?: Status
}
