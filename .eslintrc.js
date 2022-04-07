module.exports = {
  globals: {
    dayjs: 'readonly',
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // 使用 Vue3 的验证规则（最严格校验）
    // 参考：https://eslint.vuejs.org/user-guide/#usage
    'plugin:vue/vue3-strongly-recommended',
    'standard',
  ],
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/no-mutating-props': 'off',
    'vue/no-useless-template-attributes': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'func-call-spacing': 'off',
    'no-unused-vars': 'off',
    'no-tabs': 'off',
  },
  overrides: [
    {
      files: ['src/api/**/*.ts'],
      rules: {
        camelcase: 'off',
      },
    },
  ],
}
