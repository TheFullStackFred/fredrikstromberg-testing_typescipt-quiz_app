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
import { TOTAL_QUESTIONS, Time, difficultiesPoints } from '../config'

export type AnswerProps = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
  questionDifficulty: difficultiesPoints | string
}

export const Quiz = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionsState[]>([])
  const [number, setNumber] = useState<number>(0)
  const [userAnswers, setUserAnswers] = useState<AnswerProps[]>([])
  const [score, setScore] = useState<number>(0)
  const [gameOver, setGameOver] = useState(true)
  const [difficulty, setDifficulty] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [totalPoints, setTotalPoints] = useState<number>(0)

  const shuffledCategories = categoriesOptions.sort(() => Math.random() - 0.5)

  const { userName } = useContext(Context)

  const questionTimer = () => {
    let elapsedTime = 0
    const interval = setInterval(() => {
      if (elapsedTime === Time) {
        clearInterval(interval)
      }

      if (userAnswers[number]?.correct) {
        let points: number = 0
        switch (userAnswers[number].questionDifficulty) {
          case 'easy':
            points = difficultiesPoints.easy
            break
          case 'medium':
            points = difficultiesPoints.medium
            break
          case 'hard':
            points = difficultiesPoints.hard
            break
        }

        setTotalPoints(totalPoints + (Time - elapsedTime) * points)
        clearInterval(interval)
      }

      if (userAnswers[number]?.correct === false) {
        clearInterval(interval)
      }

      elapsedTime++
    }, 1000)
    return
  }

  const startQuiz = async () => {
    setLoading(true)
    setGameOver(false)

    if (!difficulty) {
      setDifficulty('easy')
    }

    questionTimer()

    const newQuestions = await fetchQuestions(
      category as Categories,
      (difficulty || 'easy') as Difficulty
    )

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value

      const correct = questions[0].correctAnswer === answer

      if (correct) {
        setScore((prev) => prev + 1)
        setCategory('')
      }

      const answerObject = {
        question: questions[0].question,
        answer,
        correct,
        questionDifficulty: difficulty,
        correctAnswer: questions[0].correctAnswer
      }

      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = async () => {
    questionTimer()
    setNumber((prev) => prev + 1)
    const newQuestions = await fetchQuestions(
      category as Categories,
      difficulty as Difficulty
    )

    setQuestions(newQuestions)

    if (number === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber((prev) => prev)
    }
  }

  return (
    <div>
      <h1>Welcome {userName}</h1>
      {!difficulty && (
        <>
          <p>Select Difficulty</p>
          <select onChange={(e) => setDifficulty(e.target.value)}>
            {difficultiesOptions.map((options, index) => (
              <option value={options.backendName} key={index}>
                {options.displayName}
              </option>
            ))}
          </select>
        </>
      )}
      {category}

      {!category && (
        <>
          <p>Select Category</p>
          <select onChange={(e) => setCategory(e.target.value)}>
            {shuffledCategories.slice(0, 3).map((options, index) => (
              <option value={options.backendName} key={index}>
                {options.displayName}
              </option>
            ))}
          </select>
        </>
      )}

      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button onClick={startQuiz}>Start Quiz</button>
      ) : null}
      {!gameOver ? <p>Score: {score}</p> : null}
      {loading && <p>Loading...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[0].question}
          answers={questions[0].answers}
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
          }}
        >
          Next Question
        </button>
      ) : null}
    </div>
  )
}

//TODO KAFFE MED ADAM 08:45
