const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://app-dev.ostock.id",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

// module.exports = {
//   e2e: {
//     defaultCommandTimeout: 10000,
//     supportFile: 'cypress/support/e2e.js',
//     viewportWidth: 1280,
//     viewportHeight: 720,
//     // Abaikan error JavaScript dari aplikasi
//     failOnStatusCode: false,
//   },
// };


