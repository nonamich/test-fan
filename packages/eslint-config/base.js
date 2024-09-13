/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ['.eslintrc.js'],
  extends: [
    'plugin:prettier/recommended',
  ],
  plugins: [
    'perfectionist',
  ],
  rules: {
    'perfectionist/sort-imports': 'error',
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }]
  },
};
