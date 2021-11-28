
# Blog Service

The backend platform for Yancey Official Blog with Node.js, NestJS, MongoDB, GraphQL, JWT and more...

## Menu

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Blog Service](#blog-service)
  - [Menu](#menu)
  - [Available Scripts](#available-scripts)
    - [pnpm run build](#pnpm-run-build)
    - [pnpm run watch](#pnpm-run-watch)
    - [pnpm run document](#pnpm-run-document)
    - [pnpm run test](#pnpm-run-test)
  - [TODOs](#todos)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Available Scripts

In the project directory, you can run:

### pnpm run build

Builds the app for production to the `dist` folder.
This script will delete the old `dist` folder before build.

### pnpm run watch

Runs the app in the development mode.
Open [http://localhost:3002](http://localhost:3002) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

### pnpm run document

Via [compodoc](https://github.com/compodoc/compodoc) to generate an awesome document for this app.

### pnpm run test

Runs Jest via pnpm run test.

[⇧ back to top](#Menu)

## Env Files

Creating `production.env`, `development.env` and `test.env` to save specified environment variables. Common parameters cound be filled in `.env`. Both `DATABASE_USER` and `DATABASE_PWD` are optional parameters in `development.env` and `test.env` file. Furthermore, `NEED_SIMULATE_NETWORK_THROTTLE` is only working on the development environment.

```bash
###############################################################################
# Rename this file to development.env and development.env and save to the env file folder.
# Then replace those environment variables with your own.
#
# Both DATABASE_USER and DATABASE_PWD are optional parameters in development.env and test.env file.
# Furthermore, NEED_SIMULATE_NETWORK_THROTTLE is only taken efforts in the development environment.
###############################################################################

NODE_ENV=<YOUR_NODE_ENV>
APP_PORT=<YOUR_APP_PORT>
DATABASE_HOST=<YOUR_DATABASE_HOST>
DATABASE_PORT=<YOUR_DATABASE_PORT>
# `DATABASE_USER` and `DATABASE_PWD` are optional parameters in
# `development.env` and `test.env` file
DATABASE_USER=<YOUR_DATABASE_USER>
DATABASE_PWD=<YOUR_DATABASE_PWD>
DATABASE_COLLECTION=<YOUR_DATABASE_COLLECTION>
BANDWAGON_SECRET_KEY=<YOUR_BANDWAGON_SECRET_KEY>
BANDWAGON_SERVER_ID=<YOUR_BANDWAGON_SERVER_ID>
IP_STACK_ACCESS_KEY=<YOUR_IP_STACK_ACCESS_KEY>
JWT_SECRET_KEY=<YOUR_JWT_SECRET_KEY>
JWT_EXPIRES_TIME=<YOUR_JWT_EXPIRES_TIME>
GOOGLE_RECAPTCHA_KEY=<YOUR_GOOGLE_RECAPTCHA_KEY>
KEY_CLOAK_URL=<YOUR_KEY_CLOAK_URL>
KEY_CLOAK_REALM=<YOUR_KEY_CLOAK_REALM>
KEY_CLOAK_CLIENT_ID=<YOUR_KEY_CLOAK_CLIENT_ID>
KEY_CLOAK_CLIENT_SECRET=<YOUR_KEY_CLOAK_CLIENT_SECRET>
# Only works on the development environment.
NEED_SIMULATE_NETWORK_THROTTLE=<BOOLEAN>
```

### E2E Testing

We use e2e testing for every module and test them at CI stage, you must write related test cases before PR.

[⇧ back to top](#Menu)

## TODOs

- ~~[ ] Full text search for post (We are using Algolia Search)~~

- [ ] Fine-grained type verification system optimization

- [ ] Supports forget password

- [ ] Supports role-based permission system

- [ ] Supports two factor authentication (Both of TOTP and SMS)

- [ ] Dockerize

[⇧ back to top](#Menu)
