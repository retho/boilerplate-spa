// https://github.com/okonet/lint-staged
module.exports = {
  'src/**/*.{ts,tsx}': ['prettier --write', 'eslint --max-warnings=0'],
  'src/**/*': () => 'npm run test:ci',
}
