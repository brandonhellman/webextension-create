module.exports = {
  root: true,

  parser: 'babel-eslint',

  plugins: ['import', 'jsx-a11y', 'react', 'react-hooks'],

  env: {
    browser: true,
    commonjs: true,
    es6: true,
    webextension: true,
  },

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      plugins: ['@typescript-eslint'],
    },
  ],
};
