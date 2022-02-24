module.exports = {
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  extends: ['huaer', 'plugin:vue/recommended', 'prettier'],
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': 'warn'
  }
};
