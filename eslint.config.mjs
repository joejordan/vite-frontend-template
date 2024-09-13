import antfu from '@antfu/eslint-config';
import { FlatCompat } from '@eslint/eslintrc';

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

export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: true,
    trailingComma: 'all',
    arrowParens: 'always',
    // more specific stylistic customizations are added in the global rules section below
  },
  unicorn: {
    allRecommended: true,
  },
  rules: {
    /**
     * style rule customizations
     */
    'style/arrow-parens': ['error', 'always'],
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'style/quote-props': 'off',
    /**
     * unicorn rule customizations
     */
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/consistent-function-scoping': 'off',
    // ignore react hook-based filenames, LICENSE, and README
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
        ignore: [
          // This regex matches files that start with 'use' followed by an uppercase letter
          // and then any sequence of characters, ending with '.ts'. Useful for React hooks.
          String.raw`^use[A-Z].*\.ts$`,
          'LICENSE',
          'README',
          'CHANGELOG',
        ],
      },
    ],
    /**
     * jsonc rule customizations
     */
    'jsonc/sort-keys': 'off',
    /**
     * import rule customizations
     */
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
    'unused-imports/no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: 'res|next|^err|^_',
        varsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    /**
     * node rule customizations
     */
    'node/prefer-global/process': 'off',
    /**
     * javascript rule customizations
     */
    'no-console': 'off',
    'no-unused-vars': 'off',
  },

  /**
   * TypeScript rule customizations
   * Note: Typescript overrides must be put here rather than in the global rules scope.
   * Reason unknown, but discussed here: https://github.com/antfu/eslint-config/issues/570
   */
  typescript: {
    overrides: {
      'ts/consistent-type-definitions': 'off',
      'ts/no-misused-promises': 'off',
    // disabling this rule customization for now, issue: https://github.com/antfu/eslint-config/issues/570#issuecomment-2349192906
    //   'ts/no-misused-promises': [
    //     'error',
    //     {
    //       'checksVoidReturn': false,
    //     },
    //   ],
    },
  },
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
}, ...customTailwindConfig);
