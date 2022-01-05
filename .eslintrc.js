module.exports = {
  "parser": "vue-eslint-parser",
  "extends": [
    'plugin:vue/vue3-essential',
    'eslint-config-tencent', 
    'eslint-config-tencent/ts', 
    'plugin:vue/vue3-recommended'
  ],
  "plugins": [
    "vue"
  ],
  "parserOptions": {
    "extraFileExtensions": [
      ".vue"
    ],
    "overrides": [
      {
        "files": ['*.ts', '*.tsx'],
        "parserOptions": {
          "project": ['./tsconfig.json'],
        },
      }
    ],
    "parser": "@typescript-eslint/parser",
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "ignorePatterns": [".*", "public", "*.config.*"],
  "env": {
    "browser": true,
    "es2021": true
  }
}