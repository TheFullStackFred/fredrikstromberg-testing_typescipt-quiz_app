import { shuffleArray } from '../utilities/shuffleArray'
import { Categories } from '../enums/QuizCategory'
import { Difficulties } from '../enums/QuizDifficulty'
import { Question } from '../interfaces/QuestionInterface'

export const randomDifficulties = (difficulty: string) => {
  const difficulties = ['easy', 'medium', 'hard']
  if (difficulty === 'random') {
    return difficulties[Math.floor(Math.random() * difficulties.length)]
  }
  return difficulty
}

export type QuestionsState = Question & { answers: string[] }

export const fetchQuestions = async (
  category: Categories,
  difficulty: Difficulties
): Promise<QuestionsState[]> => {
  const url = `https://the-trivia-api.com/api/questions?categories=${category}&limit=1&difficulty=${randomDifficulties(
    difficulty
  )}
  `
  const data = await (await fetch(url)).json()

  return data.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrectAnswers,
      question.correctAnswer
    ])
  }))
}
