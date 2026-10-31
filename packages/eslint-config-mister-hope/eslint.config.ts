import type { Config } from "./src/index.js";
import { globals, hope } from "./src/index.js";

/**
 * Explicit annotation keeps the declaration emit portable: the inferred type references internal
 * types of `@eslint/config-helpers`, which cannot be named from this file.
 */
const config: Config[] = hope(
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [".ncurc.js"],
        },
      },
    },
    ts: {
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          selector: "default",
          format: ["camelCase"],
        },
        {
          selector: ["variable"],
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
        },
        {
          selector: ["parameter"],
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: ["property"],
          format: null,
          custom: {
            regex: ".*",
            match: true,
          },
          filter: ".*",
        },
        {
          selector: "import",
          format: ["PascalCase", "camelCase"],
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
      ],
    },
  },
  {
    files: [".ncurc.cjs"],
    languageOptions: {
      globals: globals.node,
    },
  },
);

export default config;
