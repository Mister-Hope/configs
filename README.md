# @mr-hope/configs

[![Build and Linter Test](https://github.com/Mister-Hope/configs/actions/workflows/linter-test.yml/badge.svg)](https://github.com/Mister-Hope/configs/actions/workflows/linter-test.yml)
[![Unit Test](https://github.com/Mister-Hope/configs/actions/workflows/unit-test.yml/badge.svg)](https://github.com/Mister-Hope/configs/actions/workflows/unit-test.yml)

Unified configuration presets for TypeScript, oxc, ESLint, Stylelint and conventional commit messages.

This repository is a pnpm monorepo that keeps all of Mr.Hope's shareable configs in one place: one
lockfile, one toolchain version, one release pipeline and one set of CI checks.

## Packages

| Package                                                              | Description                                                                                                              |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [`@mr-hope/tsconfig`](./packages/tsconfig)                           | Modern and strict tsconfig presets for Bundler, Node.js and Web environments.                                            |
| [`oxc-config-hope`](./packages/oxc-config-hope)                      | Shareable [oxlint](https://oxc.rs/docs/guide/usage/linter) / [oxfmt](https://oxc.rs/docs/guide/usage/formatter) presets. |
| [`eslint-config-mister-hope`](./packages/eslint-config-mister-hope)  | Shareable ESLint flat config (JavaScript, TypeScript, Vue, Vitest and WeChat mini programs).                             |
| [`stylelint-config-hope`](./packages/stylelint-config-hope)          | Shareable Stylelint config (SCSS, Vue and property ordering).                                                            |
| [`@mr-hope/verify-commit-message`](./packages/verify-commit-message) | Verify conventional commit messages with actionable, agent-friendly error reports.                                       |

## Usage

```jsonc
// tsconfig.json
{
  "extends": "@mr-hope/tsconfig/bundler.json",
}
```

```ts
// oxlint.config.ts
import { defineHopeConfig } from "oxc-config-hope/oxlint";

export default defineHopeConfig();
```

```ts
// eslint.config.ts
import { hope } from "eslint-config-mister-hope";

export default hope();
```

```js
// stylelint.config.js
import { defineHopeConfig } from "stylelint-config-hope";

export default defineHopeConfig({ scss: true, vue: true });
```

```ts
// scripts/verifyCommit.ts (used by a husky `commit-msg` hook)
import { verifyCommitMessage } from "@mr-hope/verify-commit-message";

await verifyCommitMessage({ importMeta: import.meta, process, packages: ["packages/*"] });
```

## Development

Requirements: Node.js `^22.23.4 || ^24.22.1 || ^26.13.0` and pnpm `12.8.1` (managed through
`devEngines`).

```sh
pnpm install
pnpm build
```

| Command               | Description                                                        |
| --------------------- | ------------------------------------------------------------------ |
| `pnpm build`          | Build every package with tsdown.                                   |
| `pnpm clean`          | Remove every package's `dist`.                                     |
| `pnpm lint`           | Run oxlint with autofix and format with oxfmt.                     |
| `pnpm lint:check`     | CI variant of `pnpm lint` (no writes).                             |
| `pnpm lint:eslint`    | Lint `eslint-config-mister-hope` with itself (ESLint dogfood).     |
| `pnpm type-check`     | Type check the repository and every package.                       |
| `pnpm test`           | Run the unit tests with Vitest.                                    |
| `pnpm test:coverage`  | Run the unit tests with coverage (the verifier is gated at 100%).  |
| `pnpm test:stylelint` | Lint `packages/stylelint-config-hope/tests` with the local preset. |

The presets are dogfooded in this repository:

- `@mr-hope/tsconfig` is used by every package and by the root `tsconfig.json`.
- `oxc-config-hope` is imported from source by the root `oxlint.config.ts` / `oxfmt.config.ts`.
- `eslint-config-mister-hope` lints its own sources through `pnpm lint:eslint`.
- `@mr-hope/verify-commit-message` powers the `commit-msg` hook in `.husky/`.

`eslint-config-mister-hope` is the one package that stays on TypeScript 6, because
`typescript-eslint` only supports `>=4.8.4 <6.1.0`. Every other package uses the root TypeScript 7.

## Release

Releases are driven by a manual `workflow_dispatch` run of the **Publish packages** workflow on
`main`. It bumps versions with `lerna version` (independent versions, conventional commits), publishes
with `lerna publish from-package`, creates GitHub releases, and finally syncs every package to
npmmirror.

Required repository setup:

- An npm [trusted publisher](https://docs.npmjs.com/trusted-publishers) for every package, pointing to
  this repository and the `publish.yml` workflow.
- A `release` environment in the repository settings (used for required reviewers).

## License

[MIT](./LICENSE) © Mr.Hope

Published packages may declare their own license (see each `package.json`); `oxc-config-hope` is
licensed under ISC.
