describe('Product Search and Detail Test', () => {
  it('Searches for a product and views its details', () => {
    // 1. Kunjungi halaman utama
    cy.visit('/');

    // 2. Login ke aplikasi
    cy.get('a[href="/login"] > button > span.auth-label')
      .contains('Masuk').click();

    cy.get('input[type="email"]')
      .should('be.visible')
      .type('lubismarlina5@gmail.com');

    cy.get('input[type="password"]')
      .should('be.visible')
      .type('marlina30');

    cy.get('button.btn-submit')
      .contains('Sign in').click();

    // 3. Tutup modal popup jika ada
    cy.get('.modal-mask.modal-overlay.modal-custom.modal-type-popup', { timeout: 10000 })
      .should('be.visible');
    cy.get('i.modal-close').click({ force: true });
    cy.get('.modal-mask.modal-overlay.modal-custom.modal-type-popup')
      .should('not.exist');

    // 4. Navigasi ke halaman "Wholesale Order"
    cy.get('a[href="/wholesale-order"]').click();
    cy.url().should('contain', '/wholesale-order');

    // 5. Pilih filter "Termurah"
    cy.get('.catalog-filter .multiselect').click();
    cy.get('.multiselect__content-wrapper').should('be.visible');
    cy.get('.multiselect__content .multiselect__option')
      .contains('Termurah').click();
    cy.get('.catalog-filter .multiselect__single')
      .should('contain', 'Termurah');

    // 6. Cari produk berdasarkan keyword
    const searchKeyword = 'Sepatu Sneakers';
    const productTitle = 'Sepatu Sneakers';

    cy.get('.banner-search-wrapper ._private-order-search-input')
      .should('be.visible')
      .type(searchKeyword);

    cy.get('.banner-search-wrapper .icon-wrapper i.bi-search').click();

    // 7. Verifikasi hasil pencarian
    cy.get('.private-order-catalog .catalog-body', { timeout: 10000 })
      .should('be.visible')
      .should('contain', productTitle);

    // 8. Klik produk yang sesuai dengan keyword
    cy.get('.catalog-card')
      .contains(productTitle)
      .click();

    // 9. Verifikasi URL detail produk dan nama produk di detail page
    cy.url().should('contain', '/wholesale-order/');
    cy.get('.private-order-detail-title .title-text')
      .should('contain', productTitle);

    // 10. Interaksi dengan gambar produk
    cy.get('.main-picture-wrapper .main-picture').click();
    cy.get('.modal-mask.modal-type-popup').should('be.visible');
    cy.get('i.modal-close').click({ force: true });
    cy.get('.modal-mask.modal-type-popup').should('not.exist');
  });


  //Skenatio negative test cases
  it('Searches for a product and handles empty state if no product is found', () => {
    // 1. Kunjungi halaman utama
    cy.visit('/');
  
    // 2. Login ke aplikasi
    cy.get('a[href="/login"] > button > span.auth-label')
      .contains('Masuk').click();
  
    cy.get('input[type="email"]')
      .should('be.visible')
      .type('lubismarlina5@gmail.com');
  
    cy.get('input[type="password"]')
      .should('be.visible')
      .type('marlina30');
  
    cy.get('button.btn-submit')
      .contains('Sign in').click();
  
    // 3. Tutup modal popup jika ada
    cy.get('.modal-mask.modal-overlay.modal-custom.modal-type-popup', { timeout: 10000 })
      .should('be.visible');
    cy.get('i.modal-close').click({ force: true });
    cy.get('.modal-mask.modal-overlay.modal-custom.modal-type-popup')
      .should('not.exist');
  
    // 4. Navigasi ke halaman "Wholesale Order"
    cy.get('a[href="/wholesale-order"]').click();
    cy.url().should('contain', '/wholesale-order');
  
    // 5. Pilih filter "Termurah"
    cy.get('.catalog-filter .multiselect').click();
    cy.get('.multiselect__content-wrapper').should('be.visible');
    cy.get('.multiselect__content .multiselect__option')
      .contains('Termurah').click();
    cy.get('.catalog-filter .multiselect__single')
      .should('contain', 'Termurah');
  
    // 6. Cari produk berdasarkan keyword
    const searchKeyword = 'Buku Tulis';
    const emptyStateMessage = 'Oops! Produk Tidak Ditemukan';  // Sesuaikan dengan teks yang benar
  
    cy.get('.banner-search-wrapper ._private-order-search-input')
      .should('be.visible')
      .type(searchKeyword);
  
    cy.get('.banner-search-wrapper .icon-wrapper i.bi-search').click();
  
    // 7. Verifikasi jika tidak ada produk ditemukan dan elemen empty state muncul
    cy.wait(500); // Tunggu sejenak jika perlu untuk memastikan elemen muncul
    cy.get('.empty-state-wrapper', { timeout: 20000 }) // Perpanjang waktu tunggu
      .should('be.visible')
      .and('contain', emptyStateMessage);  // Gunakan pesan yang benar
  });  
});
