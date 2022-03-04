module.exports = {
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  extends: ['huaer', 'plugin:vue/recommended', 'prettier'],
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': 'warn',
    'no-param-reassign': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }]
  }
};
