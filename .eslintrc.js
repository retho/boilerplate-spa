/* eslint-disable */

const namingRules = {
  '@typescript-eslint/consistent-type-definitions': ['error', 'type'], // * https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c
  "@typescript-eslint/naming-convention": [
    // * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
    'warn',
    {
      selector: 'default',
      format: ['camelCase'],
      leadingUnderscore: 'allow',
      trailingUnderscore: 'allow',
    },
    {
      selector: 'variable',
      format: ['camelCase', 'UPPER_CASE', 'snake_case'],
      leadingUnderscore: 'allow',
      trailingUnderscore: 'allow',
    },
    {
      selector: 'function',
      format: ['PascalCase', 'camelCase']
    },
    {
      selector: 'variable',
      types: ['function'],
      format: ['PascalCase', 'camelCase']
    },
    {
      selector: 'typeLike',
      format: ['PascalCase'],
    },
    // {
    //   selector: 'memberLike',
    //   modifiers: ['requiresQuotes'],
    //   format: null,
    // },
    {
      selector: 'variable',
      types: ['boolean'],
      format: ['PascalCase'],
      prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
    },
  ]
}

const commonRules = {
  ...namingRules,
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  'react/display-name': 'off',
  '@typescript-eslint/no-explicit-any': 'warn',
  'prefer-const': 'warn',
  'react/prop-types': 'off',
  '@typescript-eslint/camelcase': 'off',
  'no-empty': ['warn', {allowEmptyCatch: true}],
  'no-eval': 'error',
  'no-alert': 'error',
  'no-debugger': 'warn',
  'no-console': ['warn', {allow: ['error']}],
  'no-labels': 'error',
  'no-shadow': ['error', {builtinGlobals: false, hoist: 'functions', allow: []}],
  'no-constant-condition': 'warn',
  'no-unreachable': 'warn',
  'default-case': 'warn',
  'default-case-last': 'warn',
  'eqeqeq': ['error', 'always', {null: 'ignore'}],
  '@typescript-eslint/array-type': ['warn', {default: 'array', readonly: 'array'}],
}

const restrictedImportsRule = {
  'no-restricted-imports': ['error', {
    paths: [
      {
        name: '@bem-react/classname',
        message: 'Import from utils/bem instead',
      },
      {
        name: 'react-router-dom',
        message: 'Import from utils/router instead',
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
      "jsx": true
    },
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks'
  ],
  settings: {
    react: {
      version: 'detect' // * https://github.com/yannickcr/eslint-plugin-react#configuration
    }
  },
  rules: {
    ...commonRules,
    ...projectSpecificRules,
  }
}
