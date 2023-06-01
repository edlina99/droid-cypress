describe('My First Test', () => {
    it('verify title-twitter', () => {
      //steps

      //launch application
      cy.visit("https://twitter.com/i/flow/login")

      //capture the webpage title and compare
      cy.title().should('eq', 'Log in to Twitter / Twitter')
      
    })
  })