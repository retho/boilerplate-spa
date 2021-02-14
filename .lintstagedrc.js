// https://github.com/okonet/lint-staged
module.exports = {
  'src/**/*.{ts,tsx}': ['prettier --write', 'eslint --max-warnings=0', 'git add'],
  'src/**/*': () => 'npm run test:ci',
}
