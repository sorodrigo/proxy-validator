module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    jest: true
  },
  extends: 'airbnb-base',
  rules: {
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'mjs': 'never'
    }],
    'import/no-extraneous-dependencies': ['error'],
    'no-debugger': 2,
    'comma-dangle': ['error', 'never'],
    'no-unused-expressions': ['error', { 'allowShortCircuit': true }],
    'no-console': ['warn', { allow: ['info', 'warn', 'error'] }]
  }
};
