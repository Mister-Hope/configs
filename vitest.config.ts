import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["packages/*/__tests__/**/*.spec.ts"],
    env: {
      NO_COLOR: "1",
    },
    coverage: {
      provider: "istanbul",
      include: [
        "packages/oxc-config-hope/src/**/*.ts",
        "packages/verify-commit-message/src/**/*.ts",
      ],
      exclude: ["packages/verify-commit-message/src/cli.ts"],
      reporter: ["text", "html"],
      // The verifier ships with a complete unit test suite, keep it at 100%.
      // `oxc-config-hope` exports rule presets (data tables), only its helpers are unit tested.
      thresholds: {
        "packages/verify-commit-message/src/**/*.ts": {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100,
        },
      },
    },
  },
});
