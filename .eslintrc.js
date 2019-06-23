module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'arrow-parens': 0,
    'semi': ['error', 'always'],
    'indent': ['error', 4, {
        SwitchCase: 1
    }],
    'vue/script-indent': ['error', 4, {
        baseIndent: 1,
        switchCase: 1
    }],
    'generator-star-spacing': 0,
    'space-before-function-paren': ['error', 'never'],
    'object-curly-spacing': ['error', 'never']
  },
  overrides: [{
    'files': ['*.vue'],
    'rules': {
        'indent': 'off'
    }
  }],
  parserOptions: {
    parser: 'babel-eslint'
  }
}
