const commonRules = require("./.eslintrc.common");
const createEslintConfig = require("./.eslintrc.utils");

const restrictedImportsRule = {
  'no-restricted-imports': ['error', {
    paths: [
      {
        name: 'react-router-dom',
        message: 'Import from src/utils/router instead',
      },
      {
        name: 'redux',
        message: 'Import from src/utils/redux instead',
      },
      {
        name: 'react-redux',
        message: 'Import from src/utils/redux instead',
      },
      {
        name: '@reduxjs/toolkit',
        message: 'Import from src/utils/redux instead',
      },
      {
        name: 'src/utils/router',
        importNames: ['useLocation'],
        message: `Url parsing must be handled within 'AppRoute' in src/router/routes`,
      },
      {
        name: 'react-toastify',
        message: 'Import from src/utils/toastify instead',
      },
    ],
  }],
}

const restrictedGlobals = [
  {name: 'location', message: `Url parsing must be handled within 'AppRoute' in src/router/routes`},
  // {name: 'localStorage', message: 'Use utils/localStorage instead'},
];
const restrictedGlobalsRule = {
  'no-restricted-globals': [
    'error',
    ...restrictedGlobals,
  ],
  'no-restricted-properties': [
    'error',
    ...['window', 'global', 'globalThis'].map(
      object => restrictedGlobals.map(x => ({
        object,
        property: x.name,
        message: x.message,
      }))
    ).reduce((acc, curr) => [...acc, ...curr], []),
  ],
}

const projectSpecificRules = {
  ...restrictedImportsRule,
  ...restrictedGlobalsRule,
}

module.exports = createEslintConfig({
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'fp',
  ],
  rules: {
    ...commonRules,
    ...projectSpecificRules,
  },
  overrides: [
    {
      // enable the rule specifically for JavaScript files
      files: ["*.js", "*.jsx"],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      }
    }
  ]
})
