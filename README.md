# BEG Monorepo

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
![Code Style](https://camo.githubusercontent.com/c83b8df34339bd302b7fd3fbb631f99ba25f87f8/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64655f7374796c652d70726574746965722d6666363962342e737667)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/Yancey-Blog/beg-monorepo/pulls)
[![Node](https://img.shields.io/badge/node-%3E%3D16.18.0-orange.svg)](https://nodejs.org/en/)
[![Gitter](https://badges.gitter.im/yancey-official/community.svg)](https://gitter.im/yancey-official/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Average time to resolve an issue](https://isitmaintained.com/badge/resolution/Yancey-Blog/beg-monorepo.svg)](https://isitmaintained.com/project/Yancey-Blog/beg-monorepo)
[![Percentage of issues still open](https://isitmaintained.com/badge/open/Yancey-Blog/beg-monorepo.svg)](https://isitmaintained.com/project/Yancey-Blog/beg-monorepo)
[![Donate](https://img.shields.io/badge/Donate-PayPal-ff3f59.svg)](https://www.paypal.me/yanceyleo)
[![Twitter](https://img.shields.io/twitter/follow/YanceyOfficial.svg?style=social&label=Follow)](https://twitter.com/YanceyOfficial)

All services for Blog Environment Group. The monorepo system is powered by [rushjs](https://rushjs.io/).

## Ecosystem

| Project               | Version                       | Build Status                       | Description                                             |
| --------------------- | ----------------------------- | ---------------------------------- | ------------------------------------------------------- |
| [blog-cms]            | ![blog-cms-version]           | ![blog-cms-build-status]           | The CMS for Yancey blog with React, Apollo Client, Material-UI and GraphQL. |
| [blog-web]            | ![blog-web-version]           | ![blog-web-build-status]           | The website app for Yancey blog with React, Next.js, styled-components, Apollo Client and GraphQL. |
| [blog-service]        | ![blog-service-version]       | ![blog-service-build-status]       | The backend platform for Yancey Official Blog with Node.js, NestJS, MongoDB, GraphQL, JWT and more. |
| [uploader-service]    | ![uploader-service-version]   | ![uploader-service-build-status]   | The Uploader service powered by Azure Blob. |
| [@shared/components]  | ![@shared/components-version] | ![@shared/components-build-status] | Common components library. |
| [@shared/utils]       | ![@shared/utils-version]      | ![@shared/utils-build-status]      | Common utils library. |

[blog-cms]: ./apps/blog-cms
[blog-web]: ./apps/blog-web
[blog-service]: ./apps/blog-service
[uploader-service]:./apps/uploader-service
[@shared/components]:./libs/components
[@shared/utils]:./libs/utils
[blog-cms-version]: https://img.shields.io/badge/Version-v5.2.7-brightgreen
[blog-web-version]: https://img.shields.io/badge/Version-v4.35.0-brightgreen
[blog-service-version]: https://img.shields.io/badge/Version-v2.5.0-brightgreen
[uploader-service-version]: https://img.shields.io/badge/Version-v1.4.0-brightgreen
[@shared/components-version]: https://img.shields.io/badge/Version-v0.4.0-brightgreen
[@shared/utils-version]: https://img.shields.io/badge/Version-v1.2.2-brightgreen
[blog-cms-build-status]: https://github.com/Yancey-Blog/beg-monorepo/actions/workflows/github-actions-blog-cms.yml/badge.svg
[blog-web-build-status]: https://github.com/Yancey-Blog/beg-monorepo/actions/workflows/github-actions-blog-web.yml/badge.svg
[blog-service-build-status]: https://github.com/Yancey-Blog/beg-monorepo/actions/workflows/github-actions-blog-service.yml/badge.svg
[uploader-service-build-status]: https://github.com/Yancey-Blog/beg-monorepo/actions/workflows/github-actions-uploader-service.yml/badge.svg
[@shared/components-build-status]: https://github.com/Yancey-Blog/beg-monorepo/actions/workflows/github-actions-@shared-components.yml/badge.svg
[@shared/utils-build-status]: https://github.com/Yancey-Blog/beg-monorepo/actions/workflows/github-actions-@shared-utils.yml/badge.svg

## Prerequisite

### Installing Node.js and [PNPM](https://pnpm.io)

We recommend the basic environment is Node.js 14 LTS and PNPM. A better way to manage versions of Node.js is using [nvm](https://github.com/nvm-sh/nvm). And PNPM is a fast, disk space efficient package manager, [rushjs](https://rushjs.io/) default uses PNPM to manage dependencies.

```bash
# Installing NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Installing pnpm
npm install -g pnpm
```

### Installing [rushjs](https://rushjs.io/)

BEG Monorepo uses rushjs to manage monorepo. Please install it globally.

```bash
pnpm install -g @microsoft/rush
```

### Installing [commitizen](https://github.com/commitizen/cz-cli)

BEG Monorepo follows the [Angular Team's Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit), your git commit will be checked by commitlint, please use `git cz` instead of `git commit`. For this reason, please install `commitizen` globally.

## Available Scripts

In the project directory, you can run:

### `rush add -p YOUR_DEPENDENCY`

To install dependencies for sub projects, enters the sub project directory and execute the command. If install `devDependencies`, add `--dev` at the end.

### `rush update`

Executing this command after registering a new sub project or modifying `rush.json`. If throw **ERROR Broken lockfile: no entry for '...' in pnpm-lock.yaml**, please try `rush update --full`.

### [`rush build`](https://rushjs.io/pages/commands/rush_build/)

```bash
# Force all projects to be rebuilt:
rush rebuild

# Incremental build:
rush build
```

If you want to build `specified` project, use `rush build -o YOUR_SUB_PROJECT`.

### `rushx YOUR_SCRIPT`

If you want to execute script of `package.json` in one project, you can use the `rushx` command. You run it under the project folder that you want to operate on. The `rushx` command is analogous to `pnpm run`, but with slightly less typing, slightly better error reporting, and command-line help.

### `rush change`

Note your changes will eventually be published in a changelog.md file in each package. The `publish` or `version` command will consume these files and
perform the proper version bumps.

### `rush version --bump`

Uses this command to bump the version of the package and generate a changelog. Please execute this command after you have made changes to the package and executed `rush change`.

## Recipes

### GitHub Actions workflows template

To generate or update GitHub Actions CI/CD config file easily, you can execute `sh bin/workflows.sh` under the project root folder.

### Bumping versions

You must execute `rush change` and `rush version --bump` before merge reuqest.

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
