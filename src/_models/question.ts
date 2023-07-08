import { Status } from 'src/_enums/status'

export class Question {
  public id: number
  public quesType: 'MCQ' | 'NE'
  public subjectId: number
  public options: Array<{ id: number, value: any, isCorrect: boolean }>
  public marks: number = 1
  public status: Status = Status.NOT_VISITED
  private readonly negativeMarks: number
  private selectedAnswer: number
  constructor (id: number, subjectId: number, options: any[], marks: number, negativeMarks: number = 0, quesType: 'MCQ' | 'NE' = 'MCQ') {
    this.id = id
    this.quesType = quesType
    this.subjectId = subjectId
    this.options = options
    this.negativeMarks = negativeMarks
    this.marks = marks
  }

  public set (selectedAnswerIdx: number): void {
    this.selectedAnswer = selectedAnswerIdx
  }

  /**
   * This function checks users answer with the correct answer.
   * @returns marks
   */
  public evaluate (): number {
    if (this.findCorrectAnswer() === this.selectedAnswer) { return this.marks } else { return this.negativeMarks }
  }

  /**
   * This function finds correct answer from the options of the question.
   * @returns correctAnswer
   */
  private findCorrectAnswer (): number {
    let answer = -1
    this.options.forEach((option) => {
      if (option.isCorrect) {
        if (this.quesType === 'MCQ') {
          answer = option.id
        } else {
          answer = option.value.match(/\d+/g)[0] ?? answer
        }
      }
    })
    return answer
  }
}
