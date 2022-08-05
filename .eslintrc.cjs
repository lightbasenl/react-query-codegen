module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:prettier/recommended'],
  parserOptions: {
    requireConfigFile: false,
  },
  env: {
    jest: true,
    browser: true,
  },
  ignorePatterns: ['**/lib/**'],
  rules: {
    curly: 'warn',
    'eslint-comments/no-unused-disable': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'react-native/no-inline-styles': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        enableDangerousAutofixThisMayCauseInfiniteLoops: true,
        additionalHooks: '(useAnimatedStyle|useAnimatedProps|useDerivedValue|useAnimatedGestureHandler)',
      },
    ],
    'object-shorthand': ['warn', 'always'],
    // 'import/no-duplicates': 'warn',
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
  },
};
