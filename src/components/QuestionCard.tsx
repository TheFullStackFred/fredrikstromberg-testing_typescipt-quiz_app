import { AnswerProps } from '../pages/quiz/Quiz'

type Props = {
  question: string
  answers: string[]
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void
  userAnswer: AnswerProps | undefined
  questionNumber: number
  totalQuestions: number
}

export const QuestionCard = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber: questionNum,
  totalQuestions
}: Props) => {
  return (
    <div>
      <p>
        Question: {questionNum} / {totalQuestions}
      </p>
      <p>{question}</p>
      <div>
        {answers?.map((answer) => (
          <div key={answer}>
            <button
              style={{
                backgroundColor:
                  userAnswer?.correctAnswer === answer ? 'springgreen' : ''
              }}
              disabled={!!userAnswer}
              value={answer}
              onClick={callback}
            >
              <p>{answer}</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
