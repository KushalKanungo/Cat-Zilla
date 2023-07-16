import { type Status } from 'src/_enums/status'

export interface Question {
  id: number
  sectionId: number
  sectionName: string
  sectionLabel: string
  subjectId: number
  subjectName: string
  areaId: number
  areaName: string
  topicId: number
  topicName: string
  question: string
  quesType: string
  passage: string | null
  marks: number
  negativeMarks: number
  options: Array<{ id: number, value: string, isCorrect?: boolean | undefined }>
  timeSpent?: number
  status?: Status

}
