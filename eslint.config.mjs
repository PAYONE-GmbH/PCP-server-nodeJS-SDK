import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    languageOptions: { globals: globals.node },
  },
  {
    ignores: ['node_modules/**', 'dist/**', 'example-app/**', 'coverage/**', 'build/**'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
