import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import Context from '../context/Context'
import { QuestionCard } from '../components/QuestionCard/QuestionCard'
import { fetchQuestions, QuestionsState } from '../services/API'
import { difficultiesOptions, categoriesOptions } from '../constants/constants'
import {
  QUESTION_COUNTDOWN,
  TOTAL_QUESTIONS,
  DIFFICULTY_POINTS
} from '../config'
import { Categories } from '../enums/QuizCategory'
import { Difficulties } from '../enums/QuizDifficulty'

export type AnswerProps = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
  questionDifficulty: string
}

export const Quiz = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionsState[]>([])
  const [number, setNumber] = useState<number>(0)
  const [userAnswers, setUserAnswers] = useState<AnswerProps[]>([])
  const [gameOver, setGameOver] = useState(true)
  const [difficulty, setDifficulty] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [delayTime, setDelayTime] = useState<boolean>(false)
  const [delayCountDown, setDelayCountdown] = useState<number>(3)
  const [questionTime, setQuestionTime] = useState<boolean>(false)
  const [questionCountdown, setQuestionCountdown] =
    useState<number>(QUESTION_COUNTDOWN)
  const [totalScore, setTotalScore] = useState<number>(0)
  const navigate = useNavigate()

  const shuffledCategories = categoriesOptions.sort(() => Math.random() - 0.5)

  const { userName } = useContext(Context)

  useEffect(() => {
    if (questionTime) {
      const elapsedTime: number = 0
      if (questionCountdown > elapsedTime) {
        setTimeout(() => {
          setQuestionCountdown(questionCountdown - 1)
        }, 1000)
      }
    }
  }, [questionTime, questionCountdown])

  useEffect(() => {
    if (delayTime) {
      const elapsedTime: number = 0
      if (delayCountDown > elapsedTime) {
        setTimeout(() => {
          setDelayCountdown(delayCountDown - 1)
        }, 1000)
      }

      if (delayCountDown === elapsedTime) {
        setDelayTime(false)
        setDelayCountdown(3)
      }
    }
  }, [delayTime, delayCountDown])

  const startQuiz = async () => {
    setDelayTime(true)
    setNumber(0)
    setLoading(true)
    setGameOver(false)
    setQuestionTime(true)
    setQuestionCountdown(QUESTION_COUNTDOWN + delayCountDown)

    if (!difficulty) {
      setDifficulty('easy')
    }

    const newQuestions = await fetchQuestions(
      category as Categories,
      (difficulty || 'easy') as Difficulties
    )

    setQuestions(newQuestions)
    setUserAnswers([])
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value

      const correct = questions[0].correctAnswer === answer

      setQuestionTime(false)

      if (correct) {
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
    setQuestionCountdown(QUESTION_COUNTDOWN + delayCountDown)

    const newQuestions = await fetchQuestions(
      category as Categories,
      difficulty as Difficulties
    )

    setQuestions(newQuestions)

    if (number === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber((prev) => prev)
    }
  }

  const playAgain = () => navigate('/')

  useEffect(() => {
    calculateScore()
  }, [userAnswers])

  const calculateScore = () => {
    const difficultyPoints = DIFFICULTY_POINTS[difficulty]
    const correctGuesses = userAnswers.filter((answer) => answer.correct).length
    const consecutiveGuesses = userAnswers.reduce((acc, answer) => {
      if (answer.correct) {
        return acc + 1
      } else {
        return 0
      }
    }, 0)

    userAnswers.map((answer) => {
      if (answer.correct) {
        const scores =
          consecutiveGuesses > 2
            ? consecutiveGuesses * correctGuesses +
              questionCountdown * difficultyPoints
            : questionCountdown * difficultyPoints

        setTotalScore(totalScore + scores)

        return scores
      } else {
        return 0
      }
    })
  }

  return (
    <div className='container'>
      {userAnswers.length === TOTAL_QUESTIONS && (
        <h1>Your total score: {totalScore}</h1>
      )}

      {delayTime ? (
        <h3>{delayCountDown} </h3>
      ) : (
        <>
          {gameOver && <h1>Welcome {userName}</h1>}

          {!difficulty && (
            <>
              <p>Select Difficulty</p>
              <select
                data-testid='select-difficulty'
                onChange={(e) => setDifficulty(e.target.value)}
              >
                {difficultiesOptions.map((options, index) => (
                  <option value={options.backendName} key={index}>
                    {options.displayName}
                  </option>
                ))}
              </select>
            </>
          )}

          {!category && (
            <>
              <p>Select Category</p>
              <select
                data-testid='select-category'
                onChange={(e) => setCategory(e.target.value)}
              >
                {shuffledCategories.slice(0, 3).map((options, index) => (
                  <option value={options.backendName} key={index}>
                    {options.displayName}
                  </option>
                ))}
              </select>
            </>
          )}

          {!gameOver && <h3>Time left: {questionCountdown}</h3>}

          {gameOver && (
            <button
              disabled={!category}
              data-testid='start-quiz'
              onClick={() => {
                startQuiz()
              }}
            >
              Start Quiz
            </button>
          )}

          {loading && <p>Trying to fetch data...</p>}
          {!loading && !gameOver && (
            <QuestionCard
              questionNumber={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[0].question}
              answers={questions[0].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
              questionCountdown={questionCountdown}
            />
          )}

          {(!gameOver &&
            !loading &&
            userAnswers.length === number + 1 &&
            number !== TOTAL_QUESTIONS - 1) ||
          questionCountdown === 0 ? (
            <button
              disabled={!category}
              data-testid='next-question'
              onClick={() => {
                nextQuestion()
              }}
            >
              Next Question
            </button>
          ) : null}
          {gameOver ||
            (userAnswers.length === TOTAL_QUESTIONS && (
              <button onClick={playAgain}>Play Again</button>
            ))}
        </>
      )}
    </div>
  )
}
