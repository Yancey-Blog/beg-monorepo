# blog-web

The **desktop website** for Yancey blog with React, Next.js, styled-components, Apollo Client and GraphQL.

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

### `yarn start`

Runs the app in the production mode.

### `yarn build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed! See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn lint`

Checks the codes by eslint, we will lint them before commit automatically.

### `yarn commit`

An optional way to use `git cz` if you don't want to install `commitizen` globally.

## Pages

### Home page

![Home page](https://edge.yancey.app/beg/Jietu20200518-234148.jpg)

### Blog page

The whole site supports light and dark theme.

![light mode](https://edge.yancey.app/beg/Jietu20200518-234218.jpg)

![dark mode](https://edge.yancey.app/beg/Jietu20200518-234224.jpg)

### Blog detail page

![Blog detail page](https://edge.yancey.app/beg/Jietu20200518-234354.jpg)

### Music page

![Music page](https://edge.yancey.app/beg/Jietu20200518-234240.jpg)

### Privacy Policy page

![Privacy Policy page](https://edge.yancey.app/beg/Jietu20200518-234420.jpg)

## Lighthouse

The performances of lighthouse as follows, we will optimize the a11y next time.

![lighthouse](https://edge.yancey.app/beg/Jietu20200514-122909.jpg)

## Responsive Layout

🔥 We are honored to announce that the blog supports responsive layout. This update will bring an unprecedented experience to the mobile.

![IMG_0456 2.PNG](https://edge.yancey.app/beg/IMG_0456%202.PNG?x-oss-process=image/resize,w_320)

## Progressive Web Apps(PWAs)

You can use Progressive Web Apps (PWAs) for a fast web experience on your computer or mobile device. You can install the PWA for faster access and additional functionality. Please follow the [ariticle](https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DDesktop&oco=1) to install it.

## Contributing

The main purpose of this repository is to continue to evolve BEG (Blog Environment Group), making it faster and easier to use. Development of Blog Desktop v2 happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving Blog Desktop v2.

### [Code of Conduct](./CODE_OF_CONDUCT.md)

[BEG](https://github.com/Yancey-Blog) has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](./CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](./CONTRIBUTING.md)

Read our [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to Blog Desktop v2.

### Good Issues

Please make sure to read the [Issue Reporting Checklist](./.github/ISSUE_TEMPLATE/bug_report.md) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

### Uses Commitizen

This app follows the [Angular Team's Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit), your commit will be checked by commitlint, please use `git cz` instead of `git commit`. For this reason, you should install `commitizen` globally or use `yarn commit` instead.

### Uses Env File

Creates `.env.development.local` file or other env files to cover the default environment varibles.

## TODOs

- [x] Support responsive layout

- [ ] Optimize the a11y

## License

Blog Desktop v2 is licensed under the terms of the [MIT licensed](https://opensource.org/licenses/MIT).
