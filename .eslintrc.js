/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },

  plugins: ['@typescript-eslint'],
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-trailing-spaces': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-case-declarations': 'off',
    'eqeqeq': 'error',
    'curly': 'error',
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    'no-extra-parens': ['error', 'functions'],
    'no-useless-catch': 'error',
    'no-console': 'error',
    'space-before-function-paren': ['error', { 'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always' }],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'arrow-parens': ['error', 'as-needed', { 'requireForBlockBody': true }],
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: 'app' }],
    'no-invalid-this': 'off',
    '@typescript-eslint/no-invalid-this': ['error']
  },
};