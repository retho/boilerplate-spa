const commonRules = require("./.eslintrc.common");

const restrictedImportsRule = {
  'no-restricted-imports': ['error', {
    paths: [
      {
        name: 'react-router-dom',
        message: 'Import from utils/router instead',
      },
      {
        name: 'redux',
        message: 'Import from utils/redux instead',
      },
      {
        name: 'react-redux',
        message: 'Import from utils/redux instead',
      },
      {
        name: '@reduxjs/toolkit',
        message: 'Import from utils/redux instead',
      },
      {
        name: 'utils/router',
        importNames: ['useLocation'],
        message: `Url parsing must be handled within 'AppRoute' in src/router/routes`,
      },
      {
        name: 'react-toastify',
        message: 'Import from utils/toastify instead',
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

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'fp',
  ],
  settings: {
    react: {
      version: 'detect' // * https://github.com/yannickcr/eslint-plugin-react#configuration
    }
  },
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
}
