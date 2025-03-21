# Blog CMS

The **CMS** for Yancey blog with React, Apollo Client, Material-UI and GraphQL.

![shot](https://edge.yancey.app/beg/Jietu20200103-115157@2x.jpg)

## Available Scripts

In the project directory, you can run:

### `pnpm run start`

Runs the app in the development mode. Open [http://localhost:3001](http://localhost:3001) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

### `pnpm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed! See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `pnpm run lint`

Checks the codes by eslint, we will lint them before commit automatically.

### `pnpm run commit`

An optional way to use `git cz` if you don't want to install `commitizen` globally.

## Modules & Features

### Dashboard

![Dashbord](https://edge.yancey.app/beg/Jietu20200505-043334.jpg)

### Blog Statistics

![blog statistics](https://edge.yancey.app/beg/Jietu20200505-044146.jpg)

### Create or update an item

![Create or Update an item](https://edge.yancey.app/beg/Jietu20200518-225144.jpg)

### Move up / Move down / Move Top

Moves one item's order by weight.

![Move up / Move down / Move Top](https://edge.yancey.app/beg/Jietu20200505-043729.jpg)

### Post list

![Post list](https://edge.yancey.app/beg/Jietu20200518-225154.jpg)

### Post editor

![Post editor](https://edge.yancey.app/beg/Jietu20200518-225230.jpg)

### Agenda

Manages your agenda quickly.

![Agenda](https://edge.yancey.app/beg/Jietu20200505-044045.jpg)

### Profile

Changes your nikename, region, organization, website, Bio, avatar and so on. The drawer on the left will be updated in real time.

![Profile](https://edge.yancey.app/beg/Jietu20200505-044712.jpg)

### Account

The account module allows you to update **username** and **email** or delete your account.

![Account](https://edge.yancey.app/beg/Jietu20200505-044725.jpg)

### Security

The security module allows you to update **password** and supports two-factor authentication base on **TOTP** and **SMS verification code**. You can also apply and use **recovery codes** if you cannot use the above two verification methods.

![change password](https://edge.yancey.app/beg/Jietu20200505-045200.jpg)

![TOTP - choose mobile phone system](https://edge.yancey.app/beg/Jietu20200505-045213.jpg)

![TOTP - scan qrcode](https://edge.yancey.app/beg/Jietu20200505-045226.jpg)

![TOTP - input totp secret code by hand](https://edge.yancey.app/beg/Jietu20200505-045520.jpg)

![TOTP - code verification](https://edge.yancey.app/beg/Jietu20200505-045231.jpg)

![Bind phone number](https://edge.yancey.app/beg/Jietu20200505-045242.jpg)

![Recovery Codes](https://edge.yancey.app/beg/Jietu20200505-045251.jpg)

### Env File

Creates `.env.production` file and fill in the follows environment varibles.

```BASH
# priority
#
# pnpm run start: .env.development.local > .env.development > .env.local > .env
# pnpm run build: .env.production.local > .env.production > .env.local > .env
# pnpm run test: .env.test.local > .env.test > .env

VITE_BEG_SERVICE_DOMAIN=<YOUR_VITE_BEG_SERVICE_DOMAIN>
VITE_UPLOADER_SERVICE_DOMAIN=<YOUR_VITE_UPLOADER_SERVICE_DOMAIN>
VITE_ALGOLIA_APPLICATION_ID=<YOUR_VITE_ALGOLIA_APPLICATION_ID>
VITE_ALGOLIA_ADMIN_API_KEY=<YOUR_VITE_ALGOLIA_ADMIN_API_KEY>
VITE_ALGOLIA_SEARCH_INDEX=<YOUR_VITE_ALGOLIA_SEARCH_INDEX>
VITE_KEY_CLOAK_REALM=<YOUR_VITE_KEY_CLOAK_REALM>
VITE_KEY_CLOAK_URL=<YOUR_VITE_KEY_CLOAK_URL>
VITE_KEY_CLOAK_CLIENT_ID=<YOUR_VITE_KEY_CLOAK_CLIENT_ID>
```

## TODOs

- [ ] Support multi-roles management

- [ ] Support forget password

- [ ] Login with 2FA

- [ ] Support notification and full-site search
