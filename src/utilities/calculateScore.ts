import { DIFFICULTY_POINTS } from '../config'
import { AnswerProps } from '../pages/Quiz'

export const calculateScore = (
  difficulty: string,
  userAnswers: AnswerProps[],
  questionCountdown: number
) => {
  let totalScore = 0
  const difficultyPoints = DIFFICULTY_POINTS[difficulty]
  const correctGuesses = userAnswers.filter((answer) => answer.correct).length
  const consecutiveGuesses = userAnswers.reduce((acc, answer) => {
    if (answer.correct) {
      return acc + 1
    } else {
      return 0
    }
  }, 0)

  userAnswers.map((answer) => {
    if (answer.correct) {
      const scores =
        consecutiveGuesses > 2
          ? consecutiveGuesses * correctGuesses +
            questionCountdown * difficultyPoints
          : questionCountdown * difficultyPoints
      totalScore = scores
    } else {
      return 0
    }
  })

  return totalScore
}
