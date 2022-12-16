import { render, screen } from '@testing-library/react'
import { Greeting } from './Greeting'

describe('Greeting componenet', () => {
  test('renders Trivia Quiz as a text', () => {
    // Arrange
    render(<Greeting />)

    // Act
    // ...nothing

    // Assert
    const triviaQuizElement = screen.getByText('Trivia Quiz')
    expect(triviaQuizElement).toBeInTheDocument()
  })
})
