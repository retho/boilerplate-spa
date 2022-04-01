const namingRules = {
  '@typescript-eslint/consistent-type-definitions': ['error', 'type'], // * https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c
  '@typescript-eslint/naming-convention': [
    // * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
    'warn',
    {
      selector: 'default',
      format: ['camelCase', 'snake_case'],
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
      format: ['PascalCase', 'camelCase', 'snake_case']
    },
    {
      selector: 'variable',
      types: ['function'],
      format: ['PascalCase', 'camelCase', 'snake_case']
    },
    {
      selector: 'typeLike',
      format: ['PascalCase'],
    },
    // {
    //   selector: 'variable',
    //   types: ['boolean'],
    //   format: ['PascalCase'],
    //   prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
    // },
    {
      selector: 'memberLike',
      format: null,
    },
  ]
}

const noCatchReason = 'Throwing errors should acts like panic that can not be catched, except for external libraries. Use algebraic data types (ADT) instead (like Result<E, R> in src/utils/common).';
// * https://eslint.org/docs/rules/no-restricted-syntax
// * https://eslint.org/docs/developer-guide/selectors
// * https://astexplorer.net/
const noRestrictedSyntax = {
  'no-restricted-syntax': [
    'error',
    // { // 'fp/no-class' used instead
    //   selector: 'ClassDeclaration',
    //   message: 'Class declarations are not allowed.'
    // },
    {
      selector: 'TryStatement',
      message: noCatchReason,
    },
    {
      selector: `MemberExpression > Identifier[name='catch']`,
      message: noCatchReason,
    },
    {
      selector: `MemberExpression > Identifier[name='finally']`,
      message: noCatchReason,
    },
  ]
}

const commonRules = {
  ...namingRules,
  ...noRestrictedSyntax,
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
  'no-shadow': 'off',
  '@typescript-eslint/no-shadow': ['error'],
  'no-constant-condition': ['warn', {checkLoops: false}],
  'no-unreachable': 'warn',
  'default-case': 'warn',
  'default-case-last': 'warn',
  'eqeqeq': ['error', 'always', {null: 'ignore'}],
  '@typescript-eslint/array-type': ['warn', {default: 'array', readonly: 'array'}],
  '@typescript-eslint/no-empty-function': 'off',
  'react/destructuring-assignment': ['error', 'always'],
  'no-param-reassign': ['error', {props: true}],
  'fp/no-mutating-methods': ['error', {allowedObjects: ['history']}],
  'fp/no-class': 'error',
}

module.exports = commonRules;
