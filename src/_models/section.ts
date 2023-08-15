import { type Status } from 'src/_enums/status'
import { type Question } from './questionsModel'

export interface Section {
  id: string
  label: string
  questions: Question[]
  maxTime: number
  timeSpent: number
  status?: Status
}
