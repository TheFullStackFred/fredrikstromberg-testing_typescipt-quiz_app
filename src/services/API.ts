import { shuffleArray } from '../utilities/utils'

export interface Question {
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

export enum Categories {
  ArtsLiterature = 'Arts & Literature',
  FilmTV = 'Film & TV',
  FoodDrink = 'Food & Drink',
  GeneralKnowledge = 'General Knowledge',
  Geography = 'Geography',
  History = 'History',
  Music = 'Music',
  Science = 'Science',
  SocietyCulture = 'Society & Culture',
  SportLeisure = 'Sport & Leisure'
}

export type QuestionsState = Question & { answers: string[] }

export const fetchQuestions = async (
  category: string,
  difficulty: Difficulty
): Promise<QuestionsState[]> => {
  const url = `https://the-trivia-api.com/api/questions?categories=${category}&limit=1&difficulty=${difficulty}
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
