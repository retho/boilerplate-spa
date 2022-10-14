// https://github.com/okonet/lint-staged
module.exports = {
  'src/**/*.{ts,tsx}': ['eslint --config .eslintrc.prettier.js --fix', 'prettier --write', 'eslint --max-warnings=0'],
  // 'src/**/*': () => 'npm run test:ci',
}
