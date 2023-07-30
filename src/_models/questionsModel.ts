import { type Status } from 'src/_enums/status'

export interface Question {
  id: string
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
  options: Array<{ id: number, value: string, userResponse?: boolean, isCorrect?: boolean | undefined }>
  userResponse?: number
  timeSpent: number
  status?: Status

}
