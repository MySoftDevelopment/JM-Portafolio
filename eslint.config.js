import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            indent: ['error', 4],
            'react-hooks/exhaustive-deps': 'warn',
            'react/jsx-no-useless-fragment': 'warn',
            'no-console': 'warn',
            'react/jsx-curly-spacing': ['error', { when: 'always', children: true, objectLiterals: 'always' }],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'always'],
            quotes: ['error', 'single', { avoidEscape: true }],
            'jsx-quotes': ['error', 'prefer-single'],
        },
    },
);
