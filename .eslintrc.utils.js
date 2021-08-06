
const createEslintConfig = (params) => ({
  env: {
    browser: true,
    es2021: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  settings: {
    react: {
      version: 'detect' // * https://github.com/yannickcr/eslint-plugin-react#configuration
    }
  },
  extends: params.extends,
  plugins: params.plugins,
  rules: params.rules,
  overrides: params.overrides,
})

module.exports = createEslintConfig;
