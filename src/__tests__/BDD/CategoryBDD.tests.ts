import { loadFeature, defineFeature } from 'jest-cucumber'
import { Categories } from '../../enums/QuizCategory'
const feature = loadFeature('./specs/features/Category.feature')

export const getCategory = (category: string): Categories => {
  let value = (<any>Categories)[category] as Categories
  if (value === undefined) throw new Error('Category not found')

  return value
}

defineFeature(feature, (test) => {
  let pickedCategory: Categories

  test('Pick a category', ({ given, when, then }) => {
    given(/^category: ([a-zA-Z]+)$/, (category) => {
      pickedCategory = getCategory(category)
    })

    when('Picking a category', () => {
      // getResult = getCategory(category);
    })

    then(/^The picked category should be: ([a-zA-Z]+)$/, (expected) => {
      let result = getCategory(expected)
      expect(pickedCategory).toBe(result)
    })
  })
})
