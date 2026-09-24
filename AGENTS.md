# AGENTS.md

`@namesmt/utils` — common JS/TS utils layered on
[@antfu/utils](https://github.com/antfu/utils), whose exports it re-exports wholesale. ESM only,
Node >= 22, `#src/*` import alias, [tsdown](https://github.com/rolldown/tsdown) build,
[Vitest](https://vitest.dev) tests.

## Commands

```sh
pnpm run lint                 # eslint (@antfu/eslint-config) — also owns formatting
pnpm run test                 # vitest in watch mode (one-shot: `pnpm exec vitest run`)
pnpm run test:types           # tsc --noEmit --skipLibCheck
pnpm run check                # lint + test:types + vitest run --coverage — the release gate
pnpm run build                # tsdown -> dist/index.mjs + dist/index.d.mts
pnpm run release:check 0.6.0  # validate a version against package.json
pnpm run release:preview      # print the next release's changelog (stdout only, writes nothing)
pnpm run start                # run src/index.ts under tsx (`watch` / `dev` = tsx watch)
```

## Structure

- `src/index.ts` — package entry; re-exports every module below plus `@antfu/utils`.
- `src/*.ts` — `array`, `base`, `browser`, `equal`, `object`, `promise`, `string`, `time`, `types`, `uri`.
- `test/index.test.ts` — the only spec; test imports use the alias with a `.js` suffix (`#src/array.js`).
- `tsdown.config.ts` — single entry, `dts: true`. `vitest.config.ts` — coverage config only.
- `playground/` — separate pnpm workspace package (Vite); excluded from `tsconfig.json`.
- `.github/workflows/` — `ci.yml` (push / PR to `main`) and `release.yml` (dispatch-only, manual).

## Conventions

- Conventional commits (`feat:`, `fix:`, `chore:`, …) — changelogen derives the changelog from them.
- ESLint via `@antfu/eslint-config` owns formatting: no Prettier, single quotes, 2-space indent,
  sorted imports. `lint-staged` runs `eslint --fix` on every commit.
- ESM only, import-only `exports` — do not add a CJS build. `.ts` files are imported with a `.js`
  suffix through the `#src/*` alias.
- Only `dist` is published (`files`); `prepublishOnly` rebuilds it, and `dist` / `coverage` are gitignored.
- The relaxed rules in `eslint.config.js` (trailing spaces in comments, up to 2 statements per line)
  are deliberate — do not "fix" them.

## Releasing

Version-first and manual: dispatch **Actions → Release → Run workflow** with the version; the workflow validates
it, runs `pnpm run check`, builds, then changelogen writes `CHANGELOG.md`, bumps `package.json`, commits, tags,
pushes, creates the GitHub release and publishes to npm over OIDC. **A pushed tag publishes nothing** (dispatch-only
by design); `dry-run` still runs changelogen (commit + tag on the runner), stopping only before push/release/publish; setup is in the README.

## Gotchas

- CI runs `pnpm lint && pnpm test:types && pnpm test` on Node 22 (Vitest's CI detection makes the
  watch-mode `test` run once; no coverage); the release gate is `pnpm run check` on Node 24, which
  already runs `vitest run --coverage`.
- changelogen `--clean` fails when `git status --porcelain` is non-empty; ignored files such as
  `dist/` and `coverage/` do not count.
- `release:check` compares against the version in `package.json`; a malformed, equal or lower
  version exits 1.
