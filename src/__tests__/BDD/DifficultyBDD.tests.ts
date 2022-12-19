import { loadFeature, defineFeature } from 'jest-cucumber'
import { Difficulties } from '../../enums/QuizDifficulty'
const feature = loadFeature('./specs/features/Difficulty.feature')

export const getDifficulty = (difficulty: string): Difficulties => {
  let value = (<any>Difficulties)[difficulty] as Difficulties
  if (value === undefined) throw new Error('Difficulty not found')
  return value
}

defineFeature(feature, (test) => {
  let pickedDifficulty: Difficulties

  test('Pick a difficulty', ({ given, when, then }) => {
    given(/^difficulty: ([a-zA-Z]+)$/, (difficulty) => {
      pickedDifficulty = getDifficulty(difficulty)
    })

    when('Check if the difficulty is correct', () => {
      if (pickedDifficulty !== Difficulties.Hard)
        throw new Error('Difficulty not found')
    })

    then(/^The picked difficulty should be: ([a-zA-Z]+)$/, (expected) => {
      expect(pickedDifficulty).toBe(expected)
    })
  })
})
