describe('Loading the App', function() {
  it('visits the home page', function() {
    cy.visit('http://localhost:3000');
    cy.contains('Thomas Mery');
  })
})