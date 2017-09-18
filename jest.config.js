module.exports = {
  // testMatch: ['**/test/**/*-test.js' ],
  // testMatch: ['**/*-test.js' ],
  collectCoverage: true,
  coverageDirectory: 'coverage',

  modulePaths: ['<rootDir>/lib/'],

  roots: ['<rootDir>/lib/', '<rootDir>/test/'],
  testEnvironment: 'node'
};
