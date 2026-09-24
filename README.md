# @namesmt/utils ![TypeScript heart icon](https://img.shields.io/badge/♡-%23007ACC.svg?logo=typescript&logoColor=white)

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Codecov][codecov-src]][codecov-href]
[![Bundlejs][bundlejs-src]][bundlejs-href]
[![jsDocs.io][jsDocs-src]][jsDocs-href]

**@namesmt/utils** is my opinionated collection of common JavaScript / TypeScript utils on top of [@antfu](https://github.com/antfu)'s opinionated collection

## Features
- [x] TypeScript ready!

## Usage
### Install package:
```sh
# npm
npm install @namesmt/utils

# yarn
yarn add @namesmt/utils

# pnpm (recommended)
pnpm install @namesmt/utils
```

### Import:
```ts
// ESM
import { createLogger, objectGet } from '@namesmt/utils'
```

## Roadmap
- [ ] Become the legendary 10000x developer

## Releasing

Releases are version-first and manual. Dispatch **Actions → Release → Run workflow** with the
version to ship (no leading `v`, e.g. `0.6.0`); the `dry-run` input stops before anything is
pushed or published.

The workflow checks the version is greater than the current one, runs `pnpm run check` (lint,
types and tests with coverage), builds, lets changelogen write `CHANGELOG.md`, bump `package.json`
and tag `v<version>`, pushes the commit and tag, creates the GitHub release from the changelog
section, then publishes to npm with OIDC trusted publishing. **A pushed tag on its own publishes
nothing** — the workflow is dispatch-only on purpose. `pnpm run release:preview` prints the
changelog the next release would get; `pnpm run release:check <version>` validates a version
against `package.json` without touching anything.

One-time setup before the first run: publish the package by hand once (npm only lets you configure
a trusted publisher for a package that already exists), then on npmjs.com → the package →
Settings → Trusted Publisher add this repository with workflow filename `release.yml`.

## License [![License][license-src]][license-href]
[MIT](./LICENSE) License © 2024 [NamesMT](https://github.com/NamesMT)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@namesmt/utils?labelColor=18181B&color=F0DB4F
[npm-version-href]: https://npmjs.com/package/@namesmt/utils
[npm-downloads-src]: https://img.shields.io/npm/dm/@namesmt/utils?labelColor=18181B&color=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/@namesmt/utils
[codecov-src]: https://img.shields.io/codecov/c/gh/namesmt/utils/main?labelColor=18181B&color=F0DB4F
[codecov-href]: https://codecov.io/gh/namesmt/utils
[license-src]: https://img.shields.io/github/license/namesmt/utils.svg?labelColor=18181B&color=F0DB4F
[license-href]: https://github.com/namesmt/utils/blob/main/LICENSE
[bundlejs-src]: https://img.shields.io/bundlejs/size/@namesmt/utils?labelColor=18181B&color=F0DB4F
[bundlejs-href]: https://bundlejs.com/?q=@namesmt/utils
[jsDocs-src]: https://img.shields.io/badge/Check_out-jsDocs.io---?labelColor=18181B&color=F0DB4F
[jsDocs-href]: https://www.jsdocs.io/package/@namesmt/utils
