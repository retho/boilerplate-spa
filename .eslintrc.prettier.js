const createEslintConfig = require("./.eslintrc.utils");

module.exports = createEslintConfig({
  extends: [],
  plugins: ['simple-import-sort'],
  rules: {
    // * https://remarkablemark.org/blog/2020/01/12/eslint-sort-imports/
    'simple-import-sort/imports': 'error',
  },
})
