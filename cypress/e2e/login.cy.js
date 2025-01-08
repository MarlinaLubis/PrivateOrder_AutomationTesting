describe('My First Test', () => { 
  it('Success Login, Close Modal, and Navigate to Private Order', () => {
    // Mengunjungi halaman utama
    cy.visit('/')

    cy.get('a[href="/login"] > button > span.auth-label').contains('Masuk').click()
    cy.get('input[type="email"]').should('be.visible').type('lubismarlina5@gmail.com')
    cy.get('input[type="password"]').should('be.visible').type('marlina30')
    cy.get('button.btn-submit').contains('Sign in').click()

    cy.get('.modal-mask.modal-overlay.modal-custom.modal-type-popup', {timeout: 10000 }).should('be.visible')
    cy.get('i.modal-close').should('be.visible').click({ force: true })
    cy.get('.modal-mask.modal-overlay.modal-custom.modal-type-popup').should('not.exist')

    cy.get('a[href="/wholesale-order"]').click()
    cy.url().should('eq', 'https://app-dev.ostock.id/wholesale-order')

  })
})
