import { AnswerObject } from '../../src/pages/Quiz'

type Props = {
  question: string
  answers: string[]
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void
  userAnswer: AnswerObject | undefined
  questionNr: number
  totalQuestions: number
}

export const QuestionCard = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions
}: Props) => {
  return (
    <div>
      <p className='number'>
        Question: {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers?.map((answer) => (
          <div key={answer}>
            <button disabled={!!userAnswer} value={answer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export {}
