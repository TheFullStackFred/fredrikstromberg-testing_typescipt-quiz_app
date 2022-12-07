import { useState } from 'react'
import { useContext } from 'react'
import Context from '../context/Context'
import { QuestionCard } from '../components/QuestionCard'
import {
  fetchQuestions,
  Difficulty,
  QuestionsState
} from '../../src/services/API'

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

  const { userName } = useContext(Context)

  console.log(questions)

  const startGame = async () => {
    setLoading(true)
    setGameOver(false)

    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.Easy)

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

      if (correct) setScore((prev) => prev + 1)

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
    const nextQuestion = number + 1

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }

  return (
    <div className='App'>
      <h1>REACT QUIZ</h1>
      <h1>{userName}</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className='start' onClick={startGame}>
          Start Quiz
        </button>
      ) : null}

      {!gameOver ? <p className='score'>Score:{score}</p> : null}
      {loading && <p>Loading...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
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
        <button className='next' onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </div>
  )
}
