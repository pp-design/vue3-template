module.exports = {
  'parser': 'vue-eslint-parser',
  'extends': [
    'eslint-config-tencent', 
    'eslint-config-tencent/ts', 
    'plugin:@typescript-eslint/recommended'
  ],
  'plugins': [
    'vue',
    '@typescript-eslint'
  ],
  'parserOptions': {
    'extraFileExtensions': [
      '.vue'
    ],
    'overrides': [
      {
        'files': ['*.ts', '*.tsx'],
        'parserOptions': {
          'project': ['./tsconfig.json'],
        }
      }
    ],
    'parser': '@typescript-eslint/parser',
    'tsconfigRootDir': __dirname,
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'rules': {
    'no-unused-vars': [
      'error',
      { 'varsIgnorePattern': '.*', 'args': 'none' }
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { 'varsIgnorePattern': '.*', 'args': 'none' }
    ],
    '@typescript-eslint/no-explicit-any': ['off']
  },
  'env': {
    'browser': true,
    'es2021': true
  }
}