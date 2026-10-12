# AGENTS.md

`@namesmt/utils` — common JS/TS utils layered on
[@antfu/utils](https://github.com/antfu/utils), whose exports it re-exports wholesale. ESM only,
Node >= 22, `#src/*` import alias, [tsdown](https://github.com/rolldown/tsdown) build,
[Vitest](https://vitest.dev) tests.

## Docs

Where knowledge lives, and when to reach for each:

| tier | what it holds | when you use it |
| --- | --- | --- |
| `AGENTS.md` — this file | orientation and the rules that prevent defects | read every session; write when a rule is learned the hard way |
| `.agentDocs/` | depth: module rationale, traps with their causes, compatibility | read on demand, before touching that area; write when a rule needs its reasoning kept |
| `docs/` | how-to and reference for a person using this package | read when the task is user-facing; write in the same commit as the change |
| `README.md` | the first read, for a person | write alongside `docs/` |

- **One home per fact.** State the rule here, keep the reasoning in `.agentDocs/` and link it — never both.
- **A dead pointer is a bug.** If the target is gone, delete the pointer rather than leave it.
- Move depth behind a pointer once a section outgrows a screen or two; keep the rule inline.

## Commands

```sh
pnpm run lint                 # eslint (@antfu/eslint-config) — also owns formatting
pnpm run test                 # vitest in watch mode (one-shot: `pnpm exec vitest run`)
pnpm run test:types           # tsc --noEmit --skipLibCheck
pnpm run check                # lint + test:types + vitest run --coverage — the release gate
pnpm run build                # tsdown -> dist/index.mjs + dist/index.d.mts
pnpm run release:check 0.6.0  # validate a version against package.json
pnpm run release:preview      # print the next release's changelog (stdout only, writes nothing)
pnpm run start                # run src/index.ts under tsx
pnpm run watch                # tsx watch src/index.ts
pnpm run dev                  # alias of `pnpm run watch`
```

## Structure

- `src/index.ts` — package entry; re-exports every module below plus `@antfu/utils`.
- `src/*.ts` — `array`, `base`, `browser`, `equal`, `object`, `promise`, `string`, `time`, `types`, `uri`.
- `test/index.test.ts` — the only spec; test imports use the alias with a `.js` suffix (`#src/array.js`).
- `playground/` — separate pnpm workspace package (Vite); excluded from `tsconfig.json`.
- `.github/workflows/` — `ci.yml` (push / PR to `main`) and `release.yml` (dispatch-only, manual).

## Conventions

- Conventional commits (`feat:`, `fix:`, `chore:`, …) — changelogen derives the changelog from them.
- ESLint (`@antfu/eslint-config`) owns lint and formatting; `lint-staged` runs `eslint --fix` on commit.
- ESM only, import-only `exports` — do not add a CJS build. `.ts` files are imported with a `.js`
  suffix through the `#src/*` alias.
- Only `dist` is published (`files`); `prepublishOnly` rebuilds it, and `dist` / `coverage` are gitignored.

## How to work here

- **Check the callers before you change anything.** Grep who uses it and which tests name it. If the
  impact is unclear, say so — do not guess.
- **Never overwrite or delete a large section you have not understood.** Read it, or say what you could
  not determine and ask.
- **Do not invent requirements.** Build what was asked; surface what else you notice and let it be
  decided.
- **Fix the class, not the instance.** A copied helper, a rule stated twice, a guard bypassed by a
  second path is one problem: one implementation, one guard. That is the work, not a follow-up to ask
  for. Stay inside the task rather than refactoring the world.
- **Verify before claiming, and say what you checked.** A passing test is not evidence it pins
  anything — **break the thing it guards and watch it fail.** If it still passes, either the test is
  decoration or a different guard is running; find out which. Where a stub cannot answer the question,
  drive the real thing.
- **Never write an identifier from memory.** A commit hash, path, line number or version must be quoted
  from the source; a plausible-looking invented one is worse than none.
- **A stated blocker is a hypothesis, not a fact.** Re-test "cannot install X" / "tool unavailable"
  before inheriting it, and never report a failure your own flag forced.
- **Report the risk with the change** — correctness, security, operational and integration; plus what
  you could not verify and every assumption you made. An unverified claim marked as such beats a
  confident one that is wrong.
- **Missing recall of this repo?** Read this file, `.agentDocs/` and `git log` before acting, then ask
  1–3 focused questions rather than guessing at intent.
- All of this ships as public API, so a rename or changed default reaches every consumer.

## Conciseness

**Prune verbose, keep correctness** — code, comments, docs alike.

- Code: a comment only for non-obvious *intent*, never to restate the line, and never long. A block
  arguing for its own change is a commit message.
- Docs: one idea per sentence. Cut anything that would not change what a reader does.
- Delete history `git log` already holds — keep the *rule* that came out of it, not the story.
- **Never drop a caveat to save a line.** Concise means no filler, not fewer facts.

## User-facing docs

`README.md` is the only one here (no `docs/`) and is for a person, not an agent: keep the first read
concise, put depth behind `<details>` spoilers, and add visuals where they help the point. **Docs
ship with the change**, same commit.

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
- `isDequalLite` comes from `dequal/lite`, which has no `Set`, `Map`, `ArrayBuffer`, `TypedArray` or
  `DataView` support — use `isDequal` when those values are compared.
