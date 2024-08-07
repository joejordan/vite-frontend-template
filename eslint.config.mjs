import antfu from '@antfu/eslint-config';

export default antfu({
  ignores: ['dist/', '**/dist/**/', 'coverage/', '**/coverage/**/'],
  formatters: true,
  react: true,
  typescript: {
    tsconfigPath: 'tsconfig.eslint.json',
  },
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: true,
    trailingComma: 'all',
  },
  extends: [
    'plugin:unicorn/recommended',
  ],
  rules: {
    'style/arrow-parens': ['error', 'always'],
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'style/quote-props': 'off',
    'no-console': 'off',
    'import/order': [
      'warn',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          'type',
          'parent',
          'sibling',
          'index',
          'object',
        ],
        'pathGroups': [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react-dom',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react-**',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@*/**',
            group: 'external',
            position: 'before',
          },
        ],
        'pathGroupsExcludedImportTypes': ['react', 'react-dom', 'react-**'],
        'newlines-between': 'ignore',
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'jsonc/sort-keys': 'off',
    'no-unused-vars': 'off',
    'node/prefer-global/process': 'off',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: 'res|next|^err|^_',
        varsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/consistent-function-scoping': 'off',
    // ignore react hook-based filenames
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
        ignore: [
          // This regex matches files that start with 'use' followed by an uppercase letter
          // and then any sequence of characters, ending with '.ts'
          String.raw`^use[A-Z].*\.ts$`,
          'LICENSE',
          'README',
        ],
      },
    ],
  },
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
});
