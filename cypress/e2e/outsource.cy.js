describe('Outsource Test', () => {
  // before(() => {
  //   // Tambahkan handler untuk mengabaikan error "t is undefined"
  //   Cypress.on('uncaught:exception', (err) => {
  //     if (err.message.includes('t is undefined')) {
  //       return false; 
  //     }
  //   });
  // });

  // it('Upload File dengan Elemen Tersembunyi dan Verifikasi', () => {
  //   // Step 1: Kunjungi Halaman
  //   cy.visit('/');

  //   // Step 2: Login
  //   cy.log('Step 2: Login');
  //   cy.get('a[href="/login"] > button > span.auth-label').contains('Masuk').click();
  //   cy.get('input[type="email"]').should('be.visible').type('lubismarlina5@gmail.com');
  //   cy.get('input[type="password"]').should('be.visible').type('marlina30');
  //   cy.get('button.btn-submit').contains('Sign in').click();

  //   // Step 3: Tutup Modal
  //   cy.log('Step 3: Tutup Modal');
  //   cy.get('.modal-mask.modal-overlay.modal-custom.modal-type-popup', { timeout: 10000 }).should('be.visible');
  //   cy.get('i.modal-close').click({ force: true });
  //   cy.get('.modal-mask.modal-overlay.modal-custom.modal-type-popup').should('not.exist');

  //   // Step 4: Navigasi ke Private Order
  //   cy.log('Step 4: Navigasi ke Private Order');
  //   cy.get('a[href="/wholesale-order"]').click();
  //   cy.url().should('eq', 'https://app-dev.ostock.id/wholesale-order');

  //   // Step 5: Buka Produk Pertama
  //   cy.log('Step 5: Buka Produk Pertama');
  //   cy.get('.catalog-body .catalog-card').first().within(() => {
  //     cy.get('.private-product-image').click();
  //   });
  //   cy.url().should('include', '/wholesale-order/');

  //   // Step 6: Tambahkan ke Keranjang
  //   cy.log('Step 6: Tambahkan ke Keranjang');
  //   cy.get('.input-counter-wrapper .quantity-value').clear().type('1', { force: true });
  //   cy.get('.content-footer .btn-primary').contains('Beli Sekarang').click();
  //   cy.url().should('include', '/checkout');

  //   // Step 7: Pilih Outsource
  //   cy.log('Step 7: Pilih Outsource');
  //   cy.get('input[type="radio"][value="outsource"]').check({ force: true });

  //   // Step 8: Upload File
  //   cy.log('Step 8: Upload File');
  //   cy.fixture('test.pdf').then((fileContent) => {
  //     cy.get('.upload-area input[type="file"]')
  //       .invoke('show')
  //       .attachFile({
  //         fileContent,
  //         fileName: 'test.pdf',
  //         mimeType: 'application/pdf',
  //       });
  //   });

  //   // Step 9: Tunggu dan Verifikasi Nama File Berubah
  //   cy.log('Step 9: Verifikasi Nama File');
  //   cy.get('#app > div.main > main > div > div.container > div > div.row > div.col-md-8.col-xs-12.mb-4 > div:nth-child(3) > div.card-body > div:nth-child(4) > div > div > div.text-bold', { timeout: 15000 })
  //   .should('be.visible')
  //   .then(($element) => {
  //     cy.wrap($element)
  //       .find('span', { timeout: 5000 })
  //       .should('contain.text', 'Sepatu_Sneakers_Nike_Dunk_Low_Retro_Panda_Black_White');
  //   });

  //   //Step 10: Klik Tombol Bayar
  //   cy.log('Step 10: Input Kode Kupon dan Klik Apply');
  //   cy.get('input[placeholder="Masukan Kode Kupon"]').should('be.visible').type('DISC150K');
  //   cy.get('button.coupon-apply-button').contains('Apply').click();

  //   // Step 11: Tunggu Tombol Bayar Aktif
  //   cy.log('Step 11: Verifikasi Tombol Bayar');
  //   cy.get('.btn.btn-primary.btn-block').should('not.be.disabled');

  //   // Step 12: Klik Tombol Bayar
  //   cy.log('Step 12: Klik Tombol Bayar');
  //   cy.get('.card-header.text-bold.text-deep-black').first().scrollIntoView().should('be.visible');
  //   cy.get('.btn.btn-primary.btn-block').contains('Bayar').click();

  //   // Step 13: Verifikasi Redirect ke Halaman Terima Kasih
  //   cy.log('Step 13: Verifikasi Redirect');
  //   cy.url({ timeout: 15000 }).should('include', '/thanks');

  //   cy.log('Step 14: Klik Konfirmasi Pembayaran');
  //   cy.get('.text-bold.text-primary.cursor-pointer').contains('Konfirmasi Pembayaran').click();

  //   cy.get('input[placeholder="Nama Pemilik Rekening"]')
  //     .should('be.visible')
  //     .type('Marlina');
  
  //   // Step 3: Verifikasi field "Transfer Ke" auto fill
  //   cy.get('textarea.form-control[disabled="disabled"]')
  //     .should('be.visible')
  //     .invoke('val')
  //     .should('not.be.empty'); 
  
  //   // Step 4: Pilih tanggal transfer (tanggal hari ini)
  //   const today = new Date().toISOString().split('T')[0]; 
  //   cy.get('input[type="date"]').should('be.visible').type(today);
  
  //   // Step 5: Verifikasi field "Jumlah Transfer" auto fill
  //   cy.get('input[placeholder="Jumlah Transfer"][disabled="disabled"]')
  //     .should('be.visible')
  //     .invoke('val')
  //     .should('not.be.empty'); 
  
  //   // Step 6: Unggah bukti transfer
  //   cy.fixture('testing.png').then(fileContent => {
  //     cy.log('Step 6: Unggah bukti transfer');
  //     cy.get('.upload-area input[type="file"]').invoke('show').attachFile({
  //       filePath: 'testing.png', 
  //       mimeType: 'image/png',
  //     });
  //   });
    
  //   // Step 7: Verifikasi nama file setelah upload
  //   cy.log('Step 7: Verifikasi nama file setelah upload');
  //   cy.get('.d-flex .text-bold', { timeout: 10000 }).within(() => {
  //     cy.get('span').invoke('text').then((fileName) => {
  //       expect(fileName).to.match(/\d{16}\.png/); 
  //     });
  //   });

  //   // Step 7: Klik tombol "Kirim"
  //   cy.get('button.btn-primary').contains('Kirim').click();
  
  //   // Step 8: Verifikasi pengiriman berhasil
  //   cy.url().should('include', '/payment-success');

  //    // Membuka halaman admin
  //    cy.visit('https://app-dev.ostock.id/admin/login?ref=%2Fadmin');

  //    // Login dengan email dan password admin
  //    cy.get('input[type="email"]').should('be.visible').type('ooridwan.content@gmail.com');
  //    cy.get('input[type="password"]').should('be.visible').type('12345678');
  //    cy.get('button.btn-submit').contains('Sign in').click();
 
  //    // // Verifikasi diarahkan ke halaman admin setelah login
  //    cy.url().should('eq', 'https://app-dev.ostock.id/admin');
 
  //    // Klik menu "Monitoring Wholesale Orders" di sidebar menu
  //    cy.get('li.side-nav-item a.side-nav-link')
  //      .contains('Billings')
  //      .click({ force: true });
  //    cy.url().should('eq', 'https://app-dev.ostock.id/admin/billings');
 
  //     // Klik tombol "Complete" pada entri pertama dalam tabel
  //    cy.get('table tbody tr').first().within(() => {
  //    cy.get('button.btn-sm.btn-primary').contains('Complete').click();
  //    });
 
  //    // Verifikasi modal muncul
  //   cy.get('.modal-container.modal-container-medium').should('be.visible');
  //   // cy.get('.modal-header h3').contains('Complete').should('be.visible');
  //   // cy.get('.modal-body p.text-bold')
  //   //  .should('contain.text', 'Wholesale Order')
  //   //  .and('contain.text', 'Rp1.200.000'); 
 
  //   // Klik tombol "Complete Billing" di dalam modal
  //   cy.get('.modal-footer button.btn-success')
  //    .contains('Complete Billing')
  //    .click();
 
  //   // Verifikasi bahwa modal ditutup
  //   cy.get('.modal-container.modal-container-medium').should('not.exist');
 
  //   cy.get('.nav-user').click(); 
  //   cy.get('.dropdown-menu').contains('Logout').click();
 
  //   cy.visit('https://app-dev.ostock.id/');
  //   cy.get('a[href="/login"] > button > span.auth-label').contains('Masuk').click()
 
  //   // Isi email dan password
  //   cy.get('input[type="email"]').should('be.visible').type('ridwan105@bangban.uk');
  //   cy.get('input[type="password"]').should('be.visible').type('12345678');
 
  //   // Klik tombol "Sign in"
  //   cy.get('button.btn-submit').contains('Sign in').click();
 
  //    // Arahkan ke halaman Private Order
  //    cy.get('a[href="/wholesale-order/list"]').click()
  //    cy.url().should('eq', 'https://app-dev.ostock.id/wholesale-order/list')
 
  //    // Klik tombol "Actions" di tabel wholesale order
  //    cy.get('table tbody tr').first().within(() => {
  //    cy.get('button').contains('Actions').click();
  //    });
 
  //    // Klik opsi "Input Receipt Number" dari dropdown
  //    cy.get('.dropdown-menu').contains('Mark as delivery').click({ force: true });
 
  //    // Verifikasi modal untuk Input Receipt Number muncul
  //    cy.get('.modal-container.modal-container-large').should('be.visible');
  //    cy.get('.modal-header').should('contain.text', 'confirm');
 
  //    // Input Receipt Number
  //    cy.get('.modal-body span')
  //      .should('contain.text', 'Apakah anda yakin ingin menandai barang sudah terkirim dengan OrderId');
 
  //    // Upload file proof of shipping
  //    cy.fixture('testing.png').then(fileContent => {
  //      cy.log('Upload file proof of shipping');
  //      cy.get('.upload-area input[type="file"]').invoke('show').attachFile({
  //        filePath: 'testing.png', 
  //        mimeType: 'image/png',
  //      });
  //    });
     
  //    cy.wait(10000); 
     
  //    cy.log('Verifikasi nama file setelah upload');
  //    cy.get('.text-bold span', { timeout: 20000 })
  //      .should('be.visible') 
  //      .invoke('text') 
  //      .then((fileName) => {
  //        cy.log('Text found:', fileName); 
  //        expect(fileName.trim()).to.match(/\d{16}\.png/); 
  //      });
     
  //    // Verifikasi nama file asli ditampilkan dengan benar
  //    cy.get('.text-break small i')
  //      .should('contain.text', 'Original Name : testing.png');
     
  //    // Verifikasi elemen gambar terkait file yang diupload
  //    cy.get('.mb-2.w-100 img', { timeout: 20000 }) 
  //      .should('be.visible') 
  //      .and('have.attr', 'src') 
  //      .and('include', '.png'); 
 
  //    // Klik tombol "Update" untuk menyimpan perubahan
  //    cy.get('.modal-footer .btn-primary')
  //      .contains('Update')
  //      .should('not.be.disabled')
  //      .click();
 
  //    // Verifikasi modal ditutup setelah update berhasil
  //    cy.get('.modal-container.modal-container-large').should('not.exist');
 
  //     // Verifikasi elemen navbar untuk logout tersedia
  //    cy.get('li.dropdown .btn-outline i.bi-person-fill').click(); 
  //    cy.get('a.dropdown-item').contains('Sign Out').click({ force: true });
 
  //    cy.visit('https://app-dev.ostock.id/');
  //    cy.get('a[href="/login"] > button > span.auth-label').contains('Masuk').click()
  //    cy.get('input[type="email"]').type('lubismarlina5@gmail.com'); 
  //    cy.get('input[type="password"]').type('marlina30'); 
  //    cy.get('button.btn-submit').contains('Sign in').click();
 
  //    // Verifikasi berhasil login dan diarahkan ke halaman list wholesale order
  //    cy.get('a[href="/wholesale-order/list"]').click()
  //    cy.url().should('eq', 'https://app-dev.ostock.id/wholesale-order/list')
 
  //    // Klik tombol "Actions" pada produk yang sudah diinputkan receipt number
  //    cy.get('table tbody tr').first().within(() => {
  //      cy.get('button.dropdown-toggle')
  //        .scrollIntoView() 
  //        .should('be.visible') 
  //        .click(); 
  //    });
     
  //    // Pilih opsi "Mark as Received" dari dropdown
  //    cy.get('.dropdown-menu.show .dropdown-item')
  //      .contains('Mark as Received')
  //      .click({ force: true });
     
  //    // Verifikasi modal untuk "Mark as Received" muncul
  //    cy.get('.modal-container.modal-container-large').should('be.visible'); 
 
  //    // Verifikasi teks header modal
  //    cy.get('.modal-header .font-weight-bold')
  //      .should('contain.text', 'confirm'); 
     
  //    // Verifikasi teks dalam modal body
  //    cy.get('.modal-body span')
  //      .should('contain.text', 'Apakah anda yakin ingin menandai barang sudah di terima dengan OrderId');
     
  //    // Upload file Proof of Delivery (PoD)
  //    cy.fixture('testing.png').then(fileContent => {
  //      cy.get('.upload-area input[type="file"]')
  //        .invoke('show') 
  //        .attachFile({
  //          filePath: 'testing.png',
  //          mimeType: 'image/png',
  //        });
  //    });
     
  //    // Klik tombol "Update" setelah upload file berhasil
  //    cy.get('.modal-footer .btn-primary')
  //      .should('not.be.disabled') 
  //      .click();
     
  //    // Verifikasi modal ditutup setelah update berhasil
  //    cy.get('.modal-container.modal-container-large').should('not.exist');
  // });


  // Scenario negative test case
  // it('Upload File dengan Format file tidak valid', () => {
  //   // Step 1: Kunjungi Halaman
  //   cy.visit('/');

  //   // Step 2: Login
  //   cy.log('Step 2: Login');
  //   cy.get('a[href="/login"] > button > span.auth-label').contains('Masuk').click();
  //   cy.get('input[type="email"]').should('be.visible').type('lubismarlina5@gmail.com');
  //   cy.get('input[type="password"]').should('be.visible').type('marlina30');
  //   cy.get('button.btn-submit').contains('Sign in').click();

  //   // Step 3: Tutup Modal
  //   cy.log('Step 3: Tutup Modal');
  //   cy.get('.modal-mask.modal-overlay.modal-custom.modal-type-popup', { timeout: 10000 }).should('be.visible');
  //   cy.get('i.modal-close').click({ force: true });
  //   cy.get('.modal-mask.modal-overlay.modal-custom.modal-type-popup').should('not.exist');

  //   // Step 4: Navigasi ke Private Order
  //   cy.log('Step 4: Navigasi ke Private Order');
  //   cy.get('a[href="/wholesale-order"]').click();
  //   cy.url().should('eq', 'https://app-dev.ostock.id/wholesale-order');

  //   // Step 5: Buka Produk Pertama
  //   cy.log('Step 5: Buka Produk Pertama');
  //   cy.get('.catalog-body .catalog-card').first().within(() => {
  //     cy.get('.private-product-image').click();
  //   });
  //   cy.url().should('include', '/wholesale-order/');

  //   // Step 6: Tambahkan ke Keranjang
  //   cy.log('Step 6: Tambahkan ke Keranjang');
  //   cy.get('.input-counter-wrapper .quantity-value').clear().type('1', { force: true });
  //   cy.get('.content-footer .btn-primary').contains('Beli Sekarang').click();
  //   cy.url().should('include', '/checkout');

  //   // Step 7: Pilih Outsource
  //   cy.log('Step 7: Pilih Outsource');
  //   cy.get('input[type="radio"][value="outsource"]').check({ force: true });

  //   // Step 8: Upload File
  //   cy.fixture('testing.png').then((fileContent) => {
  //     cy.get('.upload-area input[type="file"]')
  //         .invoke('show')
  //         .attachFile({
  //             fileContent,
  //             fileName: 'testing.png',
  //             mimeType: 'image/png',
  //         });
  //    });

  //   // Step 9: Verifikasi Error untuk Format File Salah
  //   cy.log('Step 9: Verifikasi Error untuk Format File Salah');
  //   cy.get('.upload-area').should('have.class', 'is-error');
  //   cy.get('.upload-area .text-danger.text-bold').should('contain.text', 'Jenis File harus PDF');
  // });

  it('Upload File dengan Ukuran Melebihi Maksimum', () => {
    // Step 1: Kunjungi Halaman
    cy.visit('/');
  
    // Step 2: Login
    cy.log('Step 2: Login');
    cy.get('a[href="/login"] > button > span.auth-label').contains('Masuk').click();
    cy.get('input[type="email"]').should('be.visible').type('lubismarlina5@gmail.com');
    cy.get('input[type="password"]').should('be.visible').type('marlina30');
    cy.get('button.btn-submit').contains('Sign in').click();
  
    // Step 3: Tutup Modal
    cy.log('Step 3: Tutup Modal');
    cy.get('.modal-mask.modal-overlay.modal-custom.modal-type-popup', { timeout: 10000 }).should('be.visible');
    cy.get('i.modal-close').click({ force: true });
    cy.get('.modal-mask.modal-overlay.modal-custom.modal-type-popup').should('not.exist');
  
    // Step 4: Navigasi ke Private Order
    cy.log('Step 4: Navigasi ke Private Order');
    cy.get('a[href="/wholesale-order"]').click();
    cy.url().should('eq', 'https://app-dev.ostock.id/wholesale-order');
  
    // Step 5: Buka Produk Pertama
    cy.log('Step 5: Buka Produk Pertama');
    cy.get('.catalog-body .catalog-card').should('exist').first().within(() => {  // Periksa apakah elemen ada
      cy.get('.private-product-image').click();
    });
    cy.url().should('include', '/wholesale-order/');
  
    // Step 6: Tambahkan ke Keranjang
    cy.log('Step 6: Tambahkan ke Keranjang');
    cy.get('.input-counter-wrapper .quantity-value').clear().type('1', { force: true });
    cy.get('.content-footer .btn-primary').contains('Beli Sekarang').click();
    cy.url().should('include', '/checkout');
  
    // Step 7: Pilih Outsource
    cy.log('Step 7: Pilih Outsource');
    cy.get('input[type="radio"][value="outsource"]').check({ force: true });
  
    // Step 8: Upload File dengan Ukuran Berlebih
    cy.fixture('test1.pdf').then((fileContent) => {
      cy.get('.upload-area input[type="file"]')
          .invoke('show')
          .attachFile({
              fileContent,
              fileName: 'test1.pdf',
              mimeType: 'application/pdf',
          });
    });
  
    // Step 9: Verifikasi Error untuk Ukuran File Berlebih
    cy.log('Step 9: Verifikasi Error untuk Ukuran File Berlebih');
    cy.get('.upload-area').should('have.class', 'is-error');
    cy.get('.upload-area .info-text').should('contain.text', 'Maximum file 15MB dengan format file PDF');
  });

  // it('Upload File Kosong dan Verifikasi Error Shipping Label', () => {
  //   // Step 1: Kunjungi Halaman
  //   cy.visit('/');
  
  //   // Step 2: Login
  //   cy.log('Step 2: Login');
  //   cy.get('a[href="/login"] > button > span.auth-label').contains('Masuk').click();
  //   cy.get('input[type="email"]').should('be.visible').type('lubismarlina5@gmail.com');
  //   cy.get('input[type="password"]').should('be.visible').type('marlina30');
  //   cy.get('button.btn-submit').contains('Sign in').click();
  
  //   // Step 3: Tutup Modal
  //   cy.log('Step 3: Tutup Modal');
  //   cy.get('.modal-mask.modal-overlay.modal-custom.modal-type-popup', { timeout: 10000 }).should('be.visible');
  //   cy.get('i.modal-close').click({ force: true });
  //   cy.get('.modal-mask.modal-overlay.modal-custom.modal-type-popup').should('not.exist');
  
  //   // Step 4: Navigasi ke Private Order
  //   cy.log('Step 4: Navigasi ke Private Order');
  //   cy.get('a[href="/wholesale-order"]').click();
  //   cy.url().should('eq', 'https://app-dev.ostock.id/wholesale-order');
  
  //   // Step 5: Buka Produk Pertama
  //   cy.log('Step 5: Buka Produk Pertama');
  //   cy.get('.catalog-body .catalog-card').should('exist').first().within(() => {  // Periksa apakah elemen ada
  //     cy.get('.private-product-image').click();
  //   });
  //   cy.url().should('include', '/wholesale-order/');
  
  //   // Step 6: Tambahkan ke Keranjang
  //   cy.log('Step 6: Tambahkan ke Keranjang');
  //   cy.get('.input-counter-wrapper .quantity-value').clear().type('1', { force: true });
  //   cy.get('.content-footer .btn-primary').contains('Beli Sekarang').click();
  //   cy.url().should('include', '/checkout');
  
  //   // Step 7: Pilih Outsource
  //   cy.log('Step 7: Pilih Outsource');
  //   cy.get('input[type="radio"][value="outsource"]').check({ force: true });
  
  //   // Step 9: Klik Bayar Tanpa Menunggu Upload
  //   cy.log('Step 9: Klik Bayar Tanpa Menunggu Upload');
  //   cy.get('.btn.btn-primary.btn-block').should('not.be.disabled');

  //   cy.log('Step 12: Klik Tombol Bayar');
  //   cy.get('.card-header.text-bold.text-deep-black').first().scrollIntoView().should('be.visible');
  //   cy.get('.btn.btn-primary.btn-block').contains('Bayar').click();
  
  //   // Step 10: Verifikasi Error Upload
  //   cy.log('Step 10: Verifikasi Error Upload');
  //   cy.get('.upload-area').should('have.class', 'is-error'); // Pastikan ada error pada upload area
  //   cy.get('.upload-area .info-text').should('contain.text', 'Maximum file 15MB dengan format file PDF'); // Pastikan pesan error yang sesuai muncul
  
  //   // Step 11: Verifikasi Pesan Error "Shipping Label Wajib Diupload"
  //   cy.log('Step 11: Verifikasi Pesan Error "Shipping Label Wajib Diupload"');
  //   cy.get('small.text-danger').should('contain.text', 'Shipping Label wajib diupload'); // Pastikan error tentang file kosong muncul
  // });  
  
});
