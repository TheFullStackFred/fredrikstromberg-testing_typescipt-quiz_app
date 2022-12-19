import { loadFeature, defineFeature } from 'jest-cucumber'
import { Difficulties } from '../../enums/QuizDifficulty'
const feature = loadFeature('./specs/features/Difficulty.feature')

export const getCategory = (difficulty: string): Difficulties => {
  let value = (<any>Difficulties)[difficulty] as Difficulties
  return value
}

defineFeature(feature, (test) => {
  let pickedDifficulty: Difficulties

  test('Pick a difficulty', ({ given, when, then }) => {
    given(/^difficulty: ([a-zA-Z]+)$/, (difficulty) => {
      pickedDifficulty = getCategory(difficulty)
    })

    when('Picking a difficulty', () => {
      // getResult = getCategory(category);
    })

    then(/^The picked difficulty should be: ([a-zA-Z]+)$/, (expected) => {
      let result = getCategory(expected)
      console.log(result, pickedDifficulty)
      expect(pickedDifficulty).toBe(result)
    })
  })
})
