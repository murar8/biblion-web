/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  ignorePatterns: ["components.d.ts"],
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:unicorn/recommended",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  settings: {
    "import/resolver": { typescript: true },
  },
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/no-useless-undefined": "off",
    "unicorn/no-null": "off",
    "@tanstack/query/prefer-query-object-syntax": "off",
  },
};
