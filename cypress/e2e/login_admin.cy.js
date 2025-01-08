describe('Login Admin', () => {
  it('Login admin', () => {
    cy.visit('https://app-dev.ostock.id/admin/login?ref=%2Fadmin');

    // Login dengan email dan password admin
    cy.get('input[type="email"]').should('be.visible').type('ooridwan.content@gmail.com');
    cy.get('input[type="password"]').should('be.visible').type('12345678');
    cy.get('button.btn-submit').contains('Sign in').click();

    // Verifikasi diarahkan ke halaman admin setelah login
    cy.url().should('eq', 'https://app-dev.ostock.id/admin');
  })

  //Sekanrio negative test cases
  it('Should show error for invalid email format', () => {
    cy.visit('https://app-dev.ostock.id/admin/login?ref=%2Fadmin')

    cy.get('input[type="email"]').should('be.visible').type('ooridwan.content@gmailcom')  // Format email yang salah
    cy.get('input[type="password"]').should('be.visible').type('12345678')
    cy.get('button.btn-submit').contains('Sign in').click()

    cy.get('.login-error .callout__content')
      .should('be.visible')
      .and('contain', 'Wrong email & password combination')
  })

  it('Should show error for incorrect password', () => {
    cy.visit('https://app-dev.ostock.id/admin/login?ref=%2Fadmin')

    cy.get('input[type="email"]').should('be.visible').type('ooridwan.content@gmail.com')
    cy.get('input[type="password"]').should('be.visible').type('12345980')  // Password yang salah
    cy.get('button.btn-submit').contains('Sign in').click()

    cy.get('.login-error .callout__content')
      .should('be.visible')
      .and('contain', 'Wrong email & password combination')
  })

  it('Should show error for unregistered email', () => {
    cy.visit('https://app-dev.ostock.id/admin/login?ref=%2Fadmin')

    cy.get('input[type="email"]').should('be.visible').type('ooridwan123.content@gmail.com')  // Email tidak terdaftar
    cy.get('input[type="password"]').should('be.visible').type('marlina30')
    cy.get('button.btn-submit').contains('Sign in').click()

    cy.get('.login-error .callout__content')
      .should('be.visible')
      .and('contain', 'Wrong email & password combination')
  })
})