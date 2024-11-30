# BEG Monorepo

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Code Style](https://img.shields.io/badge/code%20style-prettier-green)](https://prettier.io/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/Yancey-Blog/beg-monorepo/pulls)
[![Node](https://img.shields.io/badge/node-%3E%3D20.18.0-orange.svg)](https://nodejs.org/en/)
[![Gitter](https://badges.gitter.im/yancey-official/community.svg)](https://gitter.im/yancey-official/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Average time to resolve an issue](https://isitmaintained.com/badge/resolution/Yancey-Blog/beg-monorepo.svg)](https://isitmaintained.com/project/Yancey-Blog/beg-monorepo)
[![Percentage of issues still open](https://isitmaintained.com/badge/open/Yancey-Blog/beg-monorepo.svg)](https://isitmaintained.com/project/Yancey-Blog/beg-monorepo)
[![Donate](https://img.shields.io/badge/Donate-PayPal-ff3f59.svg)](https://www.paypal.me/yanceyleo)
[![Twitter](https://img.shields.io/twitter/follow/YanceyOfficial.svg?style=social&label=Follow)](https://twitter.com/YanceyOfficial)

All services for Blog Environment Group. The monorepo system is powered by [Turborepo](https://turbo.build/repo/docs).

## Ecosystem

| Project                   | Version                            | Build Status                            | Description                                                                                         |
| ------------------------- | ---------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [cms]                     | ![cms-version]                     | ![cms-build-status]                     | The CMS for Yancey blog with React, Apollo Client, Material-UI and GraphQL.                         |
| [frontend]                | ![frontend-version]                | ![frontend-build-status]                | The website app for Yancey blog with React, Next.js, styled-components, Apollo Client and GraphQL.  |
| [backend]                 | ![backend-version]                 | ![backend-build-status]                 | The backend platform for Yancey Official Blog with Node.js, NestJS, MongoDB, GraphQL, JWT and more. |
| [uploader]                | ![uploader-version]                | ![uploader-build-status]                | The Uploader backend powered by Azure Blob.                                                         |
| [@repo/utils]             | ![@repo/utils-version]             | ![@repo/utils-build-status]             | Common utils library.                                                                               |
| [@repo/eslint-config]     | ![@repo/eslint-config-version]     | ![@repo/eslint-config-build-status]     | Common Eslint Config library.                                                                       |
| [@repo/typescript-config] | ![@repo/typescript-config-version] | ![@repo/typescript-config-build-status] | Common TypeScript Config library.                                                                   |
| [@repo/graphql-types]     | ![@repo/graphql-types-version]     | ![@repo/graphql-types-build-status]     | Graphql types of backend.                                                                           |

[cms]: ./apps/cms
[frontend]: ./apps/frontend
[backend]: ./apps/backend
[uploader]: ./apps/uploader
[@repo/utils]: ./packages/utils
[@repo/eslint-config]: ./packages/eslint-config
[@repo/typescript-config]: ./packages/typescript-config
[@repo/graphql-types]: ./packages/graphql-types
[cms-version]: https://img.shields.io/badge/Version-v6.1.0-brightgreen
[frontend-version]: https://img.shields.io/badge/Version-v5.2.0-brightgreen
[backend-version]: https://img.shields.io/badge/Version-v3.1.0-brightgreen
[uploader-version]: https://img.shields.io/badge/Version-v2.0.1-brightgreen
[@repo/utils-version]: https://img.shields.io/badge/Version-v2.0.0-brightgreen
[@repo/eslint-config-version]: https://img.shields.io/badge/Version-v1.0.0-brightgreen
[@repo/typescript-config-version]: https://img.shields.io/badge/Version-v1.0.0-brightgreen
[@repo/graphql-types-version]: https://img.shields.io/badge/Version-v1.0.0-brightgreen
[cms-build-status]: https://github.com/Yancey-Blog/beg-monorepo/actions/workflows/github-actions-cms.yml/badge.svg
[frontend-build-status]: https://github.com/Yancey-Blog/beg-monorepo/actions/workflows/github-actions-frontend.yml/badge.svg
[backend-build-status]: https://github.com/Yancey-Blog/beg-monorepo/actions/workflows/github-actions-backend.yml/badge.svg
[uploader-build-status]: https://github.com/Yancey-Blog/beg-monorepo/actions/workflows/github-actions-uploader.yml/badge.svg
[@repo/utils-build-status]: https://github.com/Yancey-Blog/beg-monorepo/actions/workflows/github-actions-@repo-utils.yml/badge.svg
[@repo/eslint-config-build-status]: https://github.com/Yancey-Blog/beg-monorepo/actions/workflows/github-actions-@repo-eslint-config.yml/badge.svg
[@repo/typescript-config-build-status]: https://github.com/Yancey-Blog/beg-monorepo/actions/workflows/github-actions-@repo-typescript-config.yml/badge.svg
[@repo/graphql-types-build-status]: https://github.com/Yancey-Blog/beg-monorepo/actions/workflows/github-actions-@repo-graphql-types.yml/badge.svg

## Prerequisite

### Installing Node.js and [PNPM](https://pnpm.io)

We recommend the basic environment is Node.js 20 LTS and PNPM. A better way to manage versions of Node.js is using [nvm](https://github.com/nvm-sh/nvm).

```bash
# Installing NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Installing pnpm
npm install -g pnpm
```

### Installing [commitizen](https://github.com/commitizen/cz-cli)

BEG Monorepo follows the [Angular Team's Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit), your git commit will be checked by commitlint, please use `git cz` instead of `git commit`. For this reason, please install `commitizen` globally.

## Available Scripts

To install global dependencies, you can run this command under the project root folder:

```bash
pnpm i YOUR_DEPENDENCY -w
```

To install dependencies for sub projects, enters the sub project directory and execute the command. If install `devDependencies`, add `-D` at the end.

```bash
pnpm i YOUR_DEPENDENCY
```

To build all **apps** and **packages**, you can run this command under the project root folder:

```bash
pnpm run build
```

To build a specific **app**, you can runthis command under the project root folder:

```bash
pnpm run build --filter YOU_APP_NAME
```

To build a specific **package**, you can run this command under the project root folder:

```bash
pnpm run build --filter @repo/YOU_PACKAGE_NAME
```

If you want to execute script of `package.json` in one project, run `pnpm run YOUR_SCRIPT_NAME` under the project folder that you want to operate on.

## Recipes

### GitHub Actions workflows template

To generate or update GitHub Actions CI/CD config file easily, you can execute `sh bin/workflows.sh` under the project root folder.

### Changeset

BEG Monorepo adopts [changesets](https://github.com/changesets/changesets) to manage the version and CHANGELOG.md. If you want to launch a version, execute `pnpm run changeset:collection` and follow its instruction. Then execute `pnpm run changeset:version` to update `package.json` and `CHANGELOG.md`.

## Contributing

The main purpose of this repository is to continue to evolve BEG (Blog Environment Group), making it faster and easier to use. Development of BEG happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving BEG.

### [Code of Conduct](./CODE_OF_CONDUCT.md)

[BEG](https://github.com/Yancey-Blog) has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](./CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](./CONTRIBUTING.md)

Read our [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to BEG.

### Good Issues

Please make sure to read the [Issue Reporting Checklist](./.github/ISSUE_TEMPLATE/bug_report.md) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## License

BEG Monorepo is licensed under the terms of the [MIT licensed](https://opensource.org/licenses/MIT).
