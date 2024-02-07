const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 768,
  viewportWidth: 1633,
  e2e: {
    setupNodeEvents(on, config) {},
  },
})
