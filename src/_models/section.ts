import { type Question } from './question'

export class Section {
  public questions: Question[]
  public maxTime: number = 30
  constructor (questions: Question[], maxTime: number = 30) {
    this.questions = questions
    this.maxTime = maxTime
  }
}
