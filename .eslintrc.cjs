module.exports = {
  extends: ['wesbos/typescript', 'plugin:unicorn/recommended'],
  plugins: ['unicorn'],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'unicorn/prevent-abbreviations': 'off',
  },
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
};
