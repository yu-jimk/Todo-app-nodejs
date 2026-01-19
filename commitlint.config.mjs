export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-case': [2, 'always', 'lower-case'],
    'scope-case': [2, 'always', 'lower-case'],

    // subject
    'subject-max-length': [2, 'always', 100],

    // 日本語向けに無効化
    'body-case': [0],
    'body-full-stop': [0],

    // 形式チェックは維持
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 72],
    'footer-leading-blank': [2, 'always'],
    'footer-max-line-length': [2, 'always', 72],
  },
};
