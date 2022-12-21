import { calculateScore } from '../../utilities/calculateScore'

describe('calculateScore function', () => {
  test('Calculate total score', () => {
    //arrange
    const difficulty = 'medium'
    const userAnswers = [{ correct: true, answer: 'correct answer' }]
    const questionCountdown = 10
    //act
    const result = calculateScore(difficulty, userAnswers, questionCountdown)
    //assert
    expect(result).toBe(30)
  })
})
