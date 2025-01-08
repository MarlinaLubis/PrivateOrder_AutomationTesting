describe('Negative Test Cases for Login Page', () => {
  // it('Should show error when email and password are empty', () => {
  //   cy.visit('/')

  //   cy.get('a[href="/login"] > button > span.auth-label').contains('Masuk').click()

  //   // Klik tombol login tanpa mengisi email dan password
  //   cy.get('button.btn-submit').contains('Sign in').click()

  //   // Tunggu beberapa saat agar pesan error muncul
  //   cy.wait(500)  // Tunggu selama 500ms untuk memastikan pesan error sudah muncul

  //   // Verifikasi pesan error pada field email
  //   cy.get('input[type="email"]').siblings('.error-message')  // Cari error message yang bersaudara dengan input
  //     .should('be.visible').and('contain', 'Please fill this field');

  //   // Verifikasi pesan error pada field password
  //   cy.get('input[type="password"]').siblings('.error-message')  // Cari error message yang bersaudara dengan input
  //     .should('be.visible').and('contain', 'Please fill this field');
  // })

  it('Should show error for invalid email format', () => {
    cy.visit('/')

    cy.get('a[href="/login"] > button > span.auth-label').contains('Masuk').click()
    cy.get('input[type="email"]').should('be.visible').type('lubismarlina5@gmailcom')  // Format email yang salah
    cy.get('input[type="password"]').should('be.visible').type('marlina30')
    cy.get('button.btn-submit').contains('Sign in').click()

    cy.get('.login-error .callout__content')
      .should('be.visible')
      .and('contain', 'Wrong email & password combination')
  })

  it('Should show error for incorrect password', () => {
    cy.visit('/')

    cy.get('a[href="/login"] > button > span.auth-label').contains('Masuk').click()
    cy.get('input[type="email"]').should('be.visible').type('lubismarlina5@gmail.com')
    cy.get('input[type="password"]').should('be.visible').type('12347689')  // Password yang salah
    cy.get('button.btn-submit').contains('Sign in').click()

    cy.get('.login-error .callout__content')
      .should('be.visible')
      .and('contain', 'Wrong email & password combination')
  })

  it('Should show error for unregistered email', () => {
    cy.visit('/')

    cy.get('a[href="/login"] > button > span.auth-label').contains('Masuk').click()
    cy.get('input[type="email"]').should('be.visible').type('lubismarlinaa30@gmail.com')  // Email tidak terdaftar
    cy.get('input[type="password"]').should('be.visible').type('marlina30')
    cy.get('button.btn-submit').contains('Sign in').click()

    cy.get('.login-error .callout__content')
      .should('be.visible')
      .and('contain', 'Wrong email & password combination')
  })

})
