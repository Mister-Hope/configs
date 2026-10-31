# Repository Guidelines

## Layout

- `packages/tsconfig` — JSON-only tsconfig presets (`@mr-hope/tsconfig`), no build step.
- `packages/oxc-config-hope` — oxlint / oxfmt presets, built with tsdown.
- `packages/eslint-config-mister-hope` — ESLint flat config, built with tsdown (TypeScript 6 pinned).
- `packages/stylelint-config-hope` — Stylelint preset, built with tsdown (CJS + ESM).
- `packages/verify-commit-message` — commit message verifier + CLI, built with tsdown.
- Root configs dogfood the packages: `oxlint.config.ts` / `oxfmt.config.ts` import
  `packages/oxc-config-hope/src`, and `tsconfig.json` extends `@mr-hope/tsconfig/bundler.json`.

## Commands

Use pnpm only (never `npm`/`npx`, the `devEngines` will reject npm):

- `pnpm build` — build all packages.
- `pnpm lint:check` / `pnpm lint` — oxlint + oxfmt (check / fix).
- `pnpm lint:eslint` — ESLint dogfood for `eslint-config-mister-hope`.
- `pnpm type-check` — root `tsc` (all files) + every package's own `tsc`.
- `pnpm test` / `pnpm test:coverage` — Vitest at the repository root; `packages/verify-commit-message`
  is gated at 100% coverage.
- `pnpm test:stylelint` — run the stylelint fixture through the local preset (build first).

Always run `pnpm build` before `type-check` (the root `tsconfig.json` resolves
`@mr-hope/verify-commit-message` through its `dist`, which the `prepare` script builds) and before
`test:stylelint` (the fixture imports the built `dist/index.js`). `lint:check` reads the oxc presets
from source, so it does not need a build.

## TypeScript notes

- `oxlint`'s type-aware rules (`oxlint-tsgolint`) use the **nearest** `tsconfig.json`. Every package
  tsconfig must therefore declare `"types": ["node"]`; without it tsgolint cannot resolve Node
  builtins even though the root `tsc` can.
- The root `tsconfig.json` includes every `*.ts` file so type-aware linting sees a single project.
- `typescript-eslint` supports only `<6.1.0`, so `eslint-config-mister-hope` keeps a local TypeScript
  6 devDependency; do not bump it to 7 until typescript-eslint supports it.

## Commits

- Conventional Commits, maximum 50 characters after `: `.
- Scopes are derived from package names: `tsconfig`, `oxc-config-hope`, `eslint-config-mister-hope`,
  `stylelint-config-hope`, `verify-commit-message`, plus `deps` and `release`.
- Omit the scope for repository-wide changes (`chore: update workflow`).
- Hooks: `commit-msg` runs `@mr-hope/verify-commit-message`, `pre-commit` runs nano-staged
  (oxfmt + oxlint). The verifier is built by the root `prepare` script on install.

## Releases

- Never bump versions by hand. Run the **Publish packages** workflow on `main`
  (`workflow_dispatch`: dryrun / prerelease / graduate / publish_only).
- Versions are independent per package; `lerna version` writes each package `CHANGELOG.md` and a
  GitHub release, `lerna publish from-package` publishes only packages whose version is not on npm.
- Publishing requires npm trusted publishing for each package and the `release` environment.
