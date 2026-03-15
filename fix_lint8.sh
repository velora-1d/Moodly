#!/bin/bash
cat << 'ESLINT_CONFIG' > eslint.config.js
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: ['vendor/**/*', 'public/**/*', 'node_modules/**/*', 'bootstrap/**/*', 'storage/**/*', 'tests/**/*', 'config/**/*', 'database/**/*']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['resources/js/**/*.{ts,tsx,js,jsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        route: 'readonly',
        Ziggy: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-empty': 'off',
      'no-undef': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'no-case-declarations': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/no-explicit-unknown': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    },
  },
);
ESLINT_CONFIG
