import { render, screen } from '@testing-library/react'
import { MouseEvent } from 'react'
import { QuestionCard } from './QuestionCard'

describe('QuestionCard component', () => {
  test('check if element is in document', async () => {
    render(
      <QuestionCard
        question={''}
        answers={[]}
        callback={function (
          e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
        ): void {
          throw new Error('Function not implemented.')
        }}
        userAnswer={undefined}
        questionNumber={0}
        totalQuestions={0}
      />
    )

    const questionElement = await screen.findByTestId('question')
    expect(questionElement).toBeInTheDocument()
  })
})
