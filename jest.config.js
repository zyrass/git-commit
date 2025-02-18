module.exports = {
  // Le répertoire racine pour la découverte des tests
  roots: ['<rootDir>/src'],

  // Motif de fichiers de test
  testMatch: [
    '**/__tests__/**/*.test.js',
  ],

  // Environnement de test
  testEnvironment: 'node',

  // Couverture de code
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/cli.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },

  // Reporter de couverture
  coverageReporters: ['text', 'lcov'],

  // Affichage des tests
  verbose: true
};
