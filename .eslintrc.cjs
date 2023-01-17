/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  ignorePatterns: ["components.d.ts", "src/generated"],
  plugins: ["unused-imports"],
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:unicorn/recommended",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  settings: {
    "import/resolver": {
      typescript: {
        // Project references are not yet supported.
        // See https://github.com/import-js/eslint-import-resolver-typescript/issues/94
        project: ["tsconfig.json", "tsconfig.app.json", "tsconfig.node.json"],
      },
    },
  },
  rules: {
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "import/newline-after-import": "warn",
    "import/order": "warn",
    "unicorn/no-null": "off",
    "unicorn/prevent-abbreviations": "off",
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": "warn",
  },
};
