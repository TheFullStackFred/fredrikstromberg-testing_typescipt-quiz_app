import { shuffleArray } from '../utilities/utils'

export type Question = {
  category: string
  correctAnswer: string
  incorrectAnswers: string[]
  question: string
  difficulty: string
  type: string
  regions: string[]
}

export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard'
}

export type QuestionsState = Question & { answers: string[] }

export const fetchQuestions = async (): Promise<QuestionsState[]> => {
  const url = `https://the-trivia-api.com/api/questions?limit=9
  `
  const data = await (await fetch(url)).json()
  console.log(data)
  return data.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrectAnswers,
      question.correctAnswer
    ])
  }))
}

export const fetchCategories = async (): Promise<string[]> => {
  const url = 'https://the-trivia-api.com/api/categories'
  const data = await (await fetch(url)).json()
  console.log('category', data)

  return data
}

// `https://the-trivia-api.com/api/questions?categories=${categories}&limit=9&region=SE&difficulty=${difficulty}
//   `
