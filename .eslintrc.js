module.exports = {
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['huaer', 'plugin:vue/recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
    'vue/multi-word-component-names': 'off'
  }
};
