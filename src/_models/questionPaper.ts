import { type Section } from './section'

export class QuesPaper {
  public label: string
  public sections: Section[]
  public isAttempting: boolean
  public attemptId: string

  constructor (sections: Section[], attemptId: string, label: string, isAttempting: boolean = true) {
    this.sections = sections
    this.attemptId = attemptId
    this.label = label
    this.isAttempting = isAttempting
  }
}
