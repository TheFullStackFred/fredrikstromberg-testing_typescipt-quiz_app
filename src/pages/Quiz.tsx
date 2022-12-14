import { useEffect, useState } from 'react'
import { useContext } from 'react'
import Context from '../context/Context'
import { QuestionCard } from '../components/QuestionCard'
import {
  fetchQuestions,
  QuestionsState,
  Difficulty,
  Categories
} from '../services/API'
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
  const [questionTimer, setQuestionTimer] = useState<number>(Time)
  const [questionTime, setQuestionTime] = useState<boolean>(false)
  const [delayTimer, setDelayTimer] = useState<number>(3)
  const [delayTime, setDelayTime] = useState<boolean>(false)
  const shuffledCategories = categoriesOptions.sort(() => Math.random() - 0.5)

  const { userName } = useContext(Context)

  useEffect(() => {
    if (questionTime) {
      const elapsedTime: number = 0
      if (questionTimer > elapsedTime) {
        setTimeout(() => {
          setQuestionTimer(questionTimer - 1)
        }, 1000)
      }
    }
  }, [questionTime, questionTimer])

  useEffect(() => {
    if (delayTime) {
      const elapsedTime: number = 0
      if (delayTimer > elapsedTime) {
        setTimeout(() => {
          setDelayTimer(delayTimer - 1)
        }, 1000)
      }

      if (delayTimer === elapsedTime) {
        setDelayTime(false)
        setDelayTimer(3)
      }
    }
  }, [delayTime, delayTimer])

  const startQuiz = async () => {
    setDelayTime(true)
    setNumber(0)
    setLoading(true)
    setGameOver(false)
    setQuestionTime(true)
    setQuestionTimer(Time)

    if (!difficulty) {
      setDifficulty('easy')
    }

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

      setQuestionTime(false)

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
    setDelayTime(true)
    setNumber((prev) => prev + 1)
    setQuestionTime(true)
    setQuestionTimer(Time)

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
    <div className='container'>
      {delayTime ? (
        <h3>{delayTimer} </h3>
      ) : (
        <>
          {!gameOver ? <p>Score: {score}</p> : null}

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
          {!gameOver && <p>Time left: {questionTimer}</p>}
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
            <button
              onClick={() => {
                startQuiz()
              }}
            >
              Start Quiz
            </button>
          ) : null}
          {!gameOver ? <p>Score: {score}</p> : null}
          {loading && <p>Trying to fetch data...</p>}
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
        </>
      )}
    </div>
  )
}
