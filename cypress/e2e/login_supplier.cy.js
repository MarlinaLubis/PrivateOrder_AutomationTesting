describe('template spec', () => {
  it('passes', () => {
    cy.visit('/');
    cy.get('a[href="/login"] > button > span.auth-label').contains('Masuk').click()
    cy.get('input[type="email"]').should('be.visible').type('ridwan105@bangban.uk');
    cy.get('input[type="password"]').should('be.visible').type('12345678');
    cy.get('button.btn-submit').contains('Sign in').click();

    cy.get('.modal-mask.modal-overlay.modal-custom.modal-type-popup', {timeout: 10000 }).should('be.visible')
    cy.get('i.modal-close').should('be.visible').click({ force: true })
    cy.get('.modal-mask.modal-overlay.modal-custom.modal-type-popup').should('not.exist')
 
     // Arahkan ke halaman Private Order
     cy.get('a[href="/wholesale-order/list"]').click()
  })
})