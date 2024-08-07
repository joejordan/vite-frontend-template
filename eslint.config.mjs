import antfu from '@antfu/eslint-config';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

// workaround for flat config not being supported yet by eslint-plugin-tailwindcss
// https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/280
// how-to from: https://github.com/antfu/eslint-config/issues/431#issuecomment-2014668812
const customTailwindConfig = new FlatCompat().config({
  extends: ['plugin:tailwindcss/recommended'],
  rules: {
    'tailwindcss/no-custom-classname': 'warn',
  },
});

// Add the name property to the config so it displays correctly in the eslint config-inspector (https://github.com/eslint/config-inspector)
// To run the inspector, use `pnpx @eslint/config-inspector` in the root of the project.
customTailwindConfig[0].name = 'tailwindcss/recommended';

// customized unicorn config from the antfu eslint config to include recommended rules.
const customUnicornConfig = {
  ...eslintPluginUnicorn.configs['flat/recommended'],
  rules: {
    ...eslintPluginUnicorn.configs['flat/recommended'].rules,
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/consistent-function-scoping': 'off',
    // ignore react hook-based filenames, LICENSE, and README
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
};

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
  },
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
}, ...customTailwindConfig)
  .replace('antfu/unicorn/rules', customUnicornConfig);
