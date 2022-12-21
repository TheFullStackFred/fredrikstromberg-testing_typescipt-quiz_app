import { AnswerProps } from '../../pages/Quiz'

// NUMMER 16 30,kebabsås
//BAGAREN + POMMES + KEBABSÅS
// 0303-36 60 60

export type Props = {
  question: string
  answers: string[]
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void
  userAnswer: AnswerProps | undefined
  questionNumber: number
  totalQuestions: number
  questionCountdown: number
}

export const QuestionCard = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber: questionNum,
  totalQuestions,
  questionCountdown
}: Props) => {
  return (
    <div>
      <p>
        Question: {questionNum} / {totalQuestions}
      </p>
      <p data-testid='question'>{question}</p>
      <div>
        {answers?.map((answer) => (
          <div key={answer}>
            <button
              data-testid='answer-button'
              style={{
                backgroundColor:
                  userAnswer?.correctAnswer === answer ? 'springgreen' : ''
              }}
              disabled={!!userAnswer || questionCountdown === 0}
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
