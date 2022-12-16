import { loadFeature, defineFeature } from 'jest-cucumber'
import { Categories } from '../../enums/QuizCategory'
import { Difficulties } from '../../enums/QuizDifficulty'
const feature = loadFeature('./specs/features/CategoryDifficulty.feature')

export function getCategory(category: string): Categories {
  let value = (<any>Categories)[category] as Categories
  if (value === undefined) {
    throw new Error(`Mahdi's fel`)
  }
  return value
}

defineFeature(feature, (test) => {
  let getResult: Categories

  test('Choose category', ({ given, when, then }) => {
    given(/^c: ([a-zA-Z]+)$/, (c) => {
      getResult = getCategory(c)
    })

    when('Picking a category', () => {
      // getResult = getCategory(category);
    })

    then(/^The picked category should be: ([a-zA-Z]+)$/, (expected) => {
      let result = getCategory(expected)
      console.log(result, getResult)
      expect(getResult).toBe(result)
    })
  })
})

const feature2 = loadFeature('./specs/features/Difficulty.feature')

export function getDifficulty(difficulty: string): Difficulties {
  let value = (<any>Difficulties)[difficulty] as Difficulties
  if (value === undefined) {
    throw new Error(`Adams fel`)
  }
  return value
}

defineFeature(feature2, (test) => {
  let testResult: Difficulties

  test('Choose difficulty', ({ given, when, then }) => {
    given(/^d: ([a-zA-Z]+)$/, (d) => {
      testResult = getDifficulty(d)
    })

    when('hehe', () => {})

    then(/^The picked difficulty should be: ([a-zA-Z]+)$/, (expected) => {
      let result = getDifficulty(expected)
      console.log(result, testResult)
      expect(testResult).toBe(result)
    })
  })
})
