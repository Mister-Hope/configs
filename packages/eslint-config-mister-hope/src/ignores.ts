import type { Config, IgnoresOptions } from "./helpers.js";

/**
 * Ignores configuration for eslint.
 *
 * @param extraIgnores - Additional patterns to ignore
 * @returns The config that ignores common generated and dependency files
 */
export const ignores = (extraIgnores: IgnoresOptions = []): Config => ({
  name: "hope/ignores",
  ignores: [
    // node_modules & lock files
    "**/node_modules",
    "**/package-lock.json",
    "**/yarn.lock",
    "**/pnpm-lock.yaml",
    "**/bun.lockb",

    // dist & output
    "**/*.min.*",
    "**/.output",
    "**/dist",
    "**/output",

    // temp & cache
    "**/.cache",
    "**/.temp",
    "**/.tmp",
    "**/temp",
    "**/tmp",

    // framework & tools
    "**/.vitepress/cache",

    // test & coverage
    "**/__snapshots__",
    "**/coverage",

    // docs
    "**/CHANGELOG*.md",
    "**/LICENSE*",

    ...extraIgnores,
  ],
});
