// module.exports = {
//     "env": {
//         "browser": true,
//         "es2021": true,
//         "node": true
//     },
//     "extends": [
//         "standard"
//     ],
//     "parser": "@typescript-eslint/parser",
//     "parserOptions": {
//         "ecmaVersion": 12,
//         "sourceType": "module"
//     },
//     "plugins": [
//         "@typescript-eslint"
//     ],
//     "rules": {
//     }
// };

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          object: false,
          Object: {
            message: 'Use object instead',
            fixWith: 'object',
          },
          '{}': {
            message: 'Use object instead',
            fixWith: 'object',
          },
        },
      },
    ],
  },
};
