import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Specify the files to lint
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },

  // Define global variables for the browser environment
  { languageOptions: { globals: globals.browser } },

  // Use recommended rules from @eslint/js
  pluginJs.configs.recommended,

  // Spread in recommended rules from @typescript-eslint
  ...tseslint.configs.recommended,

  // Use recommended rules from eslint-plugin-react
  pluginReact.configs.flat.recommended,

  // Ignore
  {
    ignores: ["renderer/public/bundle.js"]
  },

  // Override specific rules
  {
    rules: {
      // Disable the rule that forbids `require()` style imports
      '@typescript-eslint/no-require-imports': 'off',

      // Disable the `no-undef` rule globally
      "no-undef": "off",
    },
  },
];