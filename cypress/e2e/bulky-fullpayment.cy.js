describe('Bulky Test', () => {
  it('Success Login, Close Modal, Navigate to Private Order, and Checkout', () => {
    // Mengunjungi halaman utama
    cy.visit('/')

    // Login
    cy.get('a[href="/login"] > button > span.auth-label').contains('Masuk').click()
    cy.get('input[type="email"]').should('be.visible').type('lubismarlina5@gmail.com')
    cy.get('input[type="password"]').should('be.visible').type('marlina30')
    cy.get('button.btn-submit').contains('Sign in').click()

    // Verifikasi modal muncul dan tutup modal
    cy.get('.modal-mask.modal-overlay.modal-custom.modal-type-popup', { timeout: 10000 }).should('be.visible')
    cy.get('i.modal-close').should('be.visible').click({ force: true })
    cy.get('.modal-mask.modal-overlay.modal-custom.modal-type-popup').should('not.exist')

    // Arahkan ke halaman Private Order
    cy.get('a[href="/wholesale-order"]').click()
    cy.url().should('eq', 'https://app-dev.ostock.id/wholesale-order')

    // Pilih produk pertama di card produk dan buka halaman detail produk
    cy.get('.catalog-body .catalog-card').first().within(() => {
      cy.get('.private-product-image').should('be.visible').click()
    })

    // Verifikasi halaman detail produk terbuka dengan memeriksa elemen spesifik
    cy.url().should('include', '/wholesale-order/')

    // Memastikan input quantity terlihat dan memasukkan jumlah produk
    cy.get('.input-counter-wrapper .quantity-value').clear().type('2', { force: true }) 

    // Verifikasi bahwa subtotal terlihat setelah memasukkan quantity
    cy.get('.amount-wrapper .amount-label').should('contain', 'Subtotal')

    // Klik tombol 'Beli Sekarang' untuk melanjutkan ke halaman checkout
    cy.get('.content-footer .btn-primary').contains('Beli Sekarang').click()
    cy.url().should('include', '/checkout')

    // Tunggu dan pastikan jenis pesanan "Bulky" muncul
    cy.get('input[type="radio"][value="bulky"]', { timeout: 10000 }).should('exist').check({ force: true }) 

    ///Klik Input kode kupon
    cy.get('input[placeholder="Masukan Kode Kupon"]').should('be.visible').type('DISC150K');
    cy.get('button.coupon-apply-button').contains('Apply').click();

    // Klik tombol Bayar pada ringkasan pembayaran
    cy.get('.card-header.text-bold.text-deep-black').first().scrollIntoView().should('be.visible');
    cy.get('.btn.btn-primary.btn-block').contains('Bayar').click();

    // Verifikasi bahwa setelah klik Bayar, URL mengarah ke halaman pembayaran
    cy.url().should('include', '/thanks')
  })

  before(() => {
    // Tambahkan handler untuk mengabaikan error "t is undefined"
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('t is undefined')) {
        return false; 
      }
    });
  });

  it('Login to Admin, Navigate to Monitoring Wholesale Orders, and Process Order', () => {
    // Mengakses halaman login admin
    cy.visit('https://app-dev.ostock.id/admin/login?ref=%2Fadmin');

    // Login dengan email dan password admin
    cy.get('input[type="email"]').should('be.visible').type('ooridwan.content@gmail.com');
    cy.get('input[type="password"]').should('be.visible').type('12345678');
    cy.get('button.btn-submit').contains('Sign in').click();

    // Verifikasi diarahkan ke halaman admin setelah login
    cy.url().should('eq', 'https://app-dev.ostock.id/admin');

    // Klik menu "Monitoring Wholesale Orders" di sidebar menu
    cy.get('li.side-nav-item a.side-nav-link')
      .contains('Monitoring Wholesale Orders')
      .click({ force: true });
    cy.url().should('eq', 'https://app-dev.ostock.id/admin/wholesale-order');

    // Tunggu agar elemen tersedia dengan timeout
    cy.get('table tbody tr', { timeout: 10000 })
      .should('have.length.greaterThan', 0)  
      .first()
      .within(() => {
        cy.get('button').contains('Action').click();  
      });

    // Pilih "Process Orders" dari dropdown
    cy.get('.dropdown-menu').contains('Process Orders').click({ force: true });

    // Verifikasi modal untuk "Process Order" muncul
    cy.get('.modal-container.modal-container-large .modal-header')
      .contains('Process Order')
      .should('be.visible');

    // Autofill Fields dan Pilih "Invoicing"
    cy.get('.modal-body').within(() => {
      cy.get('.multiselect__tags')
        .contains('Bank Transfer')
        .should('be.visible');
      cy.get('.form-group')
        .contains('Payment Type')
        .parents('.form-group')
        .find('.multiselect__select')
        .click();
      cy.get('.multiselect__content')
        .contains('Full Payment')
        .click();
      cy.get('.multiselect__tags')
        .contains('Full Payment')
        .should('be.visible');
    });

    // Isi Detail Pembayaran
    cy.get('input[placeholder="Nominal Pembayaran"]').should('be.disabled');
    cy.get('input[type="date"]').scrollIntoView().should('be.visible');

    // Klik "Simpan" untuk menyimpan proses order
    cy.get('.modal-footer .btn-primary').contains('Simpan').click();

    // Verifikasi modal ditutup setelah menyimpan
    cy.get('.modal-container.modal-container-large').should('not.exist');

    cy.get('.nav-user').click(); 
    cy.get('.dropdown-menu').contains('Logout').click(); 
  });

  it('Login to Admin, Navigate to Monitoring Wholesale Orders, and Process Order', () => {
    // Step 10: Navigate to Billing page
    cy.visit('https://app-dev.ostock.id/login');
    cy.get('input[type="email"]').should('be.visible').type('lubismarlina5@gmail.com')
    cy.get('input[type="password"]').should('be.visible').type('marlina30')
    cy.get('button.btn-submit').contains('Sign in').click()

    // Verifikasi modal muncul dan tutup modal
    cy.get('.modal-mask.modal-overlay.modal-custom.modal-type-popup', { timeout: 10000 }).should('be.visible')
    cy.get('i.modal-close').should('be.visible').click({ force: true })
    cy.get('.modal-mask.modal-overlay.modal-custom.modal-type-popup').should('not.exist') 

    // Navigasi ke halaman Billing
    cy.visit('https://app-dev.ostock.id/billings');
    
    // Verifikasi halaman Billing telah dimuat
    cy.url().should('eq', 'https://app-dev.ostock.id/billings');
    cy.get('table').should('be.visible'); 

    // Klik tombol "Bayar" pada daftar pembayaran
    cy.get('table tbody tr') 
      .first() 
      .within(() => {
        cy.get('button').contains('Pay').click();
      });

    // Verifikasi navigasi ke halaman konfirmasi pembayaran
    cy.url().should('include', '/payment-confirmation');
    cy.get('h3.title').should('be.visible').and('contain.text', 'Konfirmasi Pembayaran');
  
    // Step 2: Isi field "Atas Nama Rekening"
    cy.get('input[placeholder="Nama Pemilik Rekening"]')
      .should('be.visible')
      .type('Marlina');
  
    // Step 3: Verifikasi field "Transfer Ke" auto fill
    cy.get('textarea.form-control[disabled="disabled"]')
      .should('be.visible')
      .invoke('val')
      .should('not.be.empty'); 
  
    // Step 4: Pilih tanggal transfer (tanggal hari ini)
    const today = new Date().toISOString().split('T')[0]; 
    cy.get('input[type="date"]').should('be.visible').type(today);
  
    // Step 5: Verifikasi field "Jumlah Transfer" auto fill
    cy.get('input[placeholder="Jumlah Transfer"][disabled="disabled"]')
      .should('be.visible')
      .invoke('val')
      .should('not.be.empty'); 
  
    // Step 6: Unggah bukti transfer
    cy.fixture('testing.png').then(fileContent => {
      cy.log('Step 6: Unggah bukti transfer');
      cy.get('.upload-area input[type="file"]').invoke('show').attachFile({
        filePath: 'testing.png',
        mimeType: 'image/png',
      });
    });
    
    // Step 7: Verifikasi nama file setelah upload
    cy.log('Step 7: Verifikasi nama file setelah upload');
    cy.get('.d-flex .text-bold', { timeout: 10000 }).within(() => {
      cy.get('span').invoke('text').then((fileName) => {
        expect(fileName).to.match(/\d{16}\.png/);
      });
    });

    // Step 7: Klik tombol "Kirim"
    cy.get('button.btn-primary').contains('Kirim').click();
  
    // Step 8: Verifikasi pengiriman berhasil
    cy.url().should('include', '/payment-success');
    
    // Membuka halaman admin
    cy.visit('https://app-dev.ostock.id/admin/login?ref=%2Fadmin');

    // Login dengan email dan password admin
    cy.get('input[type="email"]').should('be.visible').type('ooridwan.content@gmail.com');
    cy.get('input[type="password"]').should('be.visible').type('12345678');
    cy.get('button.btn-submit').contains('Sign in').click();

    // // Verifikasi diarahkan ke halaman admin setelah login
    cy.url().should('eq', 'https://app-dev.ostock.id/admin');

    // Klik menu "Monitoring Wholesale Orders" di sidebar menu
    cy.get('li.side-nav-item a.side-nav-link')
      .contains('Billings')
      .click({ force: true });
    cy.url().should('eq', 'https://app-dev.ostock.id/admin/billings');

     // Klik tombol "Complete" pada entri pertama dalam tabel
    cy.get('table tbody tr').first().within(() => {
    cy.get('button.btn-sm.btn-primary').contains('Complete').click();
    });

    // Verifikasi modal muncul
    cy.get('.modal-container.modal-container-medium').should('be.visible');
  //  cy.get('.modal-header h3').contains('Complete').should('be.visible');
  //  cy.get('.modal-body p.text-bold')
  //   .should('contain.text', 'Wholesale Order')
  //   .and('contain.text', 'Rp1.200.000'); 

   // Klik tombol "Complete Billing" di dalam modal
   cy.get('.modal-footer button.btn-success')
    .contains('Complete Billing')
    .click();

   // Verifikasi bahwa modal ditutup
   cy.get('.modal-container.modal-container-medium').should('not.exist');

   cy.get('.nav-user').click(); 
   cy.get('.dropdown-menu').contains('Logout').click();

   cy.visit('https://app-dev.ostock.id/');
   cy.get('a[href="/login"] > button > span.auth-label').contains('Masuk').click()

   // Isi email dan password
   cy.get('input[type="email"]').should('be.visible').type('ridwan105@bangban.uk');
   cy.get('input[type="password"]').should('be.visible').type('12345678');

   // Klik tombol "Sign in"
   cy.get('button.btn-submit').contains('Sign in').click();

    // Arahkan ke halaman Private Order
    cy.get('a[href="/wholesale-order/list"]').click()
    cy.url().should('eq', 'https://app-dev.ostock.id/wholesale-order/list')

    // Klik tombol "Actions" di tabel wholesale order
    cy.get('table tbody tr').first().within(() => {
    cy.get('button').contains('Actions').click();
    });

    // Klik opsi "Input Receipt Number" dari dropdown
    cy.get('.dropdown-menu').contains('Input Receipt Number').click({ force: true });

    // Verifikasi modal untuk Input Receipt Number muncul
    cy.get('.modal-container.modal-container-large').should('be.visible');
    cy.get('.modal-header').should('contain.text', 'input receipt number');

    // Input Receipt Number
    cy.get('input[placeholder="Enter Receipt Number"]')
      .should('be.visible')
      .type('REC123456789');

    // Upload file proof of shipping
    cy.fixture('testing.png').then(fileContent => {
      cy.log('Upload file proof of shipping');
      cy.get('.upload-area input[type="file"]').invoke('show').attachFile({
        filePath: 'testing.png', 
        mimeType: 'image/png',
      });
    });
    
    cy.wait(10000); 
    
    cy.log('Verifikasi nama file setelah upload');
    cy.get('.text-bold span', { timeout: 20000 })
      .should('be.visible') 
      .invoke('text') 
      .then((fileName) => {
        cy.log('Text found:', fileName); 
        expect(fileName.trim()).to.match(/\d{16}\.png/); 
      });
    
    // Verifikasi nama file asli ditampilkan dengan benar
    cy.get('.text-break small i')
      .should('contain.text', 'Original Name : testing.png');
    
    // Verifikasi elemen gambar terkait file yang diupload
    cy.get('.mb-2.w-100 img', { timeout: 20000 }) 
      .should('be.visible') 
      .and('have.attr', 'src') 
      .and('include', '.png'); 

    // Klik tombol "Update" untuk menyimpan perubahan
    cy.get('.modal-footer .btn-primary')
      .contains('Update')
      .should('not.be.disabled')
      .click();

    // Verifikasi modal ditutup setelah update berhasil
    cy.get('.modal-container.modal-container-large').should('not.exist');

     // Verifikasi elemen navbar untuk logout tersedia
    cy.get('li.dropdown .btn-outline i.bi-person-fill').click(); 
    cy.get('a.dropdown-item').contains('Sign Out').click({ force: true });

    cy.visit('https://app-dev.ostock.id/login');
    cy.get('a[href="/login"] > button > span.auth-label').contains('Masuk').click()
    cy.get('input[type="email"]').type('lubismarlina5@gmail.com'); 
    cy.get('input[type="password"]').type('marlina30'); 
    cy.get('button.btn-submit').contains('Sign in').click();

    // Verifikasi berhasil login dan diarahkan ke halaman list wholesale order
    cy.get('a[href="/wholesale-order/list"]').click()
    cy.url().should('eq', 'https://app-dev.ostock.id/wholesale-order/list')

    // Klik tombol "Actions" pada produk yang sudah diinputkan receipt number
    cy.get('table tbody tr').first().within(() => {
      cy.get('button.dropdown-toggle')
        .scrollIntoView() 
        .should('be.visible') 
        .click(); 
    });
    
    // Pilih opsi "Mark as Received" dari dropdown
    cy.get('.dropdown-menu.show .dropdown-item')
      .contains('Mark as Received')
      .click({ force: true });
    
    // Verifikasi modal untuk "Mark as Received" muncul
    cy.get('.modal-container.modal-container-large').should('be.visible'); 

    // Verifikasi teks header modal
    cy.get('.modal-header .font-weight-bold')
      .should('contain.text', 'confirm'); 
    
    // Verifikasi teks dalam modal body
    cy.get('.modal-body span')
      .should('contain.text', 'Apakah anda yakin ingin menandai barang sudah di terima dengan OrderId');
    
    // Upload file Proof of Delivery (PoD)
    cy.fixture('testing.png').then(fileContent => {
      cy.get('.upload-area input[type="file"]')
        .invoke('show') 
        .attachFile({
          filePath: 'testing.png',
          mimeType: 'image/png',
        });
    });
    
    // Klik tombol "Update" setelah upload file berhasil
    cy.get('.modal-footer .btn-primary')
      .should('not.be.disabled') 
      .click();
    
    // Verifikasi modal ditutup setelah update berhasil
    cy.get('.modal-container.modal-container-large').should('not.exist');

  });
});
