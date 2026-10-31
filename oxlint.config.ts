import { defineHopeConfig } from "./packages/oxc-config-hope/src/oxlint/index.ts";

const oxlintConfig = defineHopeConfig(
  {},
  {
    files: ["packages/stylelint-config-hope/src/**"],
    rules: {
      "jsdoc/check-tag-names": ["warn", { definedTags: ["experimental"] }],
    },
  },
  {
    files: ["packages/stylelint-config-hope/src/paths.ts"],
    rules: {
      // `__filename` is required to resolve dependencies in the CJS build
      "unicorn/prefer-module": "off",
      // node builtins are required for ESM resolution in a node-only package
      "import/no-nodejs-modules": "off",
    },
  },
  {
    // The vue preset is a long list of rules, splitting it would only hurt readability.
    files: ["packages/eslint-config-mister-hope/src/vue.ts"],
    rules: {
      "max-lines-per-function": "off",
    },
  },
  {
    // This package is a CLI: writing to the console and reading the file system is its whole purpose.
    files: ["packages/verify-commit-message/src/**"],
    rules: {
      "import/no-nodejs-modules": "off",
      "no-console": "off",
    },
  },
  {
    // The verifier is a single cohesive module and its tests need shared fixtures, so the
    // size/hook rules are disabled for this package only.
    files: ["packages/verify-commit-message/**"],
    rules: {
      "max-lines": "off",
      "max-lines-per-function": "off",
    },
  },
  {
    files: ["packages/verify-commit-message/__tests__/**"],
    plugins: ["vitest"],
    rules: {
      "vitest/no-hooks": "off",
      "vitest/prefer-hooks-in-order": "off",
      "vitest/require-top-level-describe": "off",
    },
  },
);

export default oxlintConfig;
