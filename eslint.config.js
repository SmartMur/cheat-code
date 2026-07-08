import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteConfig from './svelte.config.js';

export default [
  {
    ignores: [
      '.DS_Store',
      'node_modules/**',
      'build/**',
      '.svelte-kit/**',
      '.netlify/**',
      '.vercel/**',
      'package/**',
      'test-results/**',
      'playwright-report/**',
      'blob-report/**',
      '.env',
      '.env.*',
      '!/.env.example',
      'pnpm-lock.yaml',
      'package-lock.json',
      'yarn.lock',
    ],
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2017,
      },
    },
  },
  {
    files: ['**/*.{js,cjs,ts}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },
  ...svelte.configs.recommended,
  ...svelte.configs.prettier,
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        svelteConfig,
      },
    },
  },
];
