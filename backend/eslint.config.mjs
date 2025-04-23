import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config} */
const config = {
  files: ['**/*.{js,mjs,cjs,jsx}'],
  languageOptions: {
    globals: { ...globals.browser, ...globals.node },
  },
  plugins: {
    prettier: pluginPrettier,
  },
  extends: [
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    'plugin:prettier/recommended', // Active Prettier
  ],
  rules: {
    'prettier/prettier': 'error',
  },
};

export default config;
