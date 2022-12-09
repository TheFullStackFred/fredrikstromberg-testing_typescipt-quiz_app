import { useState } from 'react'
import { useContext } from 'react'
import Context from '../context/Context'
import { QuestionCard } from '../components/QuestionCard'
import {
  fetchQuestions,
  QuestionsState,
  Difficulty,
  Categories
} from '../../src/services/API'
import { difficultiesOptions, categoriesOptions } from '../constants/constants'

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const TOTAL_QUESTIONS = 9

export const Quiz = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionsState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  const [difficulty, setDifficulty] = useState('easy')
  const [category, setCategory] = useState('')

  const shuffledCategories = categoriesOptions.sort(() => Math.random() - 0.5)

  const { userName } = useContext(Context)

  const startQuiz = async () => {
    setLoading(true)
    setGameOver(false)

    const newQuestions = await fetchQuestions(
      category as Categories,
      difficulty as Difficulty
    )

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value

      const correct = questions[number].correctAnswer === answer

      if (correct) {
        setScore((prev) => prev + 1)
      }

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correctAnswer
      }

      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    setNumber((prev) => prev + 1)

    if (number === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber((prev) => prev)
    }
  }

  return (
    <div>
      <h1>REACT QUIZ</h1>
      <h1>Welcome {userName}</h1>
      <p>Select Difficulty</p>

      <select onChange={(e) => setDifficulty(e.target.value)}>
        {difficultiesOptions.map((options, index) => (
          <option value={options.backendName} key={index}>
            {options.displayName}
          </option>
        ))}
      </select>

      <select onChange={(e) => setCategory(e.target.value)}>
        {shuffledCategories.slice(0, 3).map((options, index) => (
          <option value={options.backendName} key={index}>
            {options.displayName}
          </option>
        ))}
      </select>

      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button onClick={startQuiz}>Start Quiz</button>
      ) : null}

      {!gameOver ? <p>Score: {score}</p> : null}
      {loading && <p>Loading...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}

      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button
          onClick={() => {
            nextQuestion()
            startQuiz()
          }}
        >
          Next Question
        </button>
      ) : null}
    </div>
  )
}
