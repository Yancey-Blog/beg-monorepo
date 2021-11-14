# BEG Monorepo

All services for Blog Environment Group. The monorepo system is powered by [rushjs](https://rushjs.io/).

## Sub Projects

- [blog-cms](./packages/blog-cms)
- [blog-web](./packages/blog-web)
- [blog-service](./packages/blog-service)
- [uploader-service](./packages/uploader-service)

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

This project uses rushjs to manage monorepo. Please install it globally.

```bash
pnpm install -g @microsoft/rush
```

### Installing [commitizen](https://github.com/commitizen/cz-cli)

This app follows the [Angular Team's Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit), your commit will be checked by commitlint, please use `git cz` instead of `git commit`. For this reason, you should install `commitizen` globally.

## Available Scripts

In the project directory, you can run:

### `rush add -p YOUR_DEPENDENCY`

To install dependencies for sub projects, enters the sub project directory and execute the command. If install `devDependencies`, add `--dev` at the end.

### `rush update`

Executing this command after registering a new sub project or modifying `rush.json`.

### [`rush build`](https://rushjs.io/pages/commands/rush_build/)

Building **all** sub project. If you want to build `specified` project, use `rush build -o YOUR_SUB_PROJECT`.

### `rushx YOUR_SCRIPT`

If you want to execute script of `package.json` in one project, you can use the `rushx` command. You run it under the project folder that you want to operate on. The `rushx` command is analogous to `pnpm run`, but with slightly less typing, slightly better error reporting, and command-line help.

## Contributing

The main purpose of this repository is to continue to evolve BEG (Blog Environment Group), making it faster and easier to use. Development of Blog Desktop v2 happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving Blog Desktop v2.

### [Code of Conduct](./CODE_OF_CONDUCT.md)

[BEG](https://github.com/Yancey-Blog) has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](./CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](./CONTRIBUTING.md)

Read our [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to Blog Desktop v2.

### Good Issues

Please make sure to read the [Issue Reporting Checklist](./.github/ISSUE_TEMPLATE/bug_report.md) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## License

BEG Monorepo is licensed under the terms of the [MIT licensed](https://opensource.org/licenses/MIT).
