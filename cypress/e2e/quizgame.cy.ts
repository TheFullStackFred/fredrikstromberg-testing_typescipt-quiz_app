describe('One round of a quiz game', () => {
  it(' Should test a round of the Quiz Game', () => {
    cy.visit('http://localhost:3000/quiz')
    cy.get('h1').should('contain', 'Trivia Quiz')
    cy.get('h1').should('contain', 'Welcome Anonymous')
    cy.get('p').should('contain', 'Select Difficulty')
    cy.get('[data-testid=select-difficulty]').select('easy')
    cy.get('[data-testid=select-category]').select(0)
    cy.get('button').should('contain', 'Start Quiz')
    cy.get('[data-testid=start-quiz]').click()

    cy.get('p').should('contain', 'Score: 0')
    cy.get('p').should('contain', 'Question: 1 / 9')
    cy.get('[data-testid=question]').click()
  })
})
