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

export const fetchQuestions = async (
  amount: number,
  difficulty: Difficulty
): Promise<QuestionsState[]> => {
  const url = `https://the-trivia-api.com/api/questions?limit=9`
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
