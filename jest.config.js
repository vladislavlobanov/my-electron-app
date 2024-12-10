module.exports = {
  // Specify the test environment
  testEnvironment: "node",

  // Define the test file patterns
  testMatch: ["**/tests/**/*.test.js"],

  // Enable ESM support if using ES Modules
  transform: {},

  // Specify modules that should not be transformed
  transformIgnorePatterns: [],

  // Enable verbose test results
  verbose: true
};