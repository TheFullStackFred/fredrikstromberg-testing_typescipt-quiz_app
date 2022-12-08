import { AnswerObject } from '../../src/pages/Quiz'

type Props = {
  question: string
  answers: string[]
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void
  userAnswer: AnswerObject | undefined
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
      <p className='number'>
        Question: {questionNum} / {totalQuestions}
      </p>
      <p>{question}</p>
      <div>
        {answers?.map((answer) => (
          <div key={answer}>
            <button disabled={!!userAnswer} value={answer} onClick={callback}>
              <p>{answer}</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
