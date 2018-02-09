---
id: introduction
title: Introduction
---

Noderize lets you create Node apps in less than 30 seconds.

It aims to get out of your way and not require any configuration until you need it, while supporting loads of features.

Try it out for yourself:

```bash
yarn create noderize <path>
# or
npx create-noderize <path>
```

If you wish to save to command globally, you may optionally install using:

```bash
yarn global add create-noderize
# or
npm install -g create-noderize
```

Then run it as `create-noderize <path>`

## Develop

Once you have created your Noderize project, simply `cd` into it and you can run it for development using:

```bash
yarn watch
# or
npm run watch
```

This will continuously rebuild your app and rerun your app as you code!

## Build

To build your app, simply run:

```bash
yarn build
# or
npm run build
```

This will build your app to `dist/index.js` (this output is optionally [configurable](configuration-noderize.md#output))

## Format

Noderize can automatically format your code for you using [Prettier](https://prettier.io/).

```bash
yarn format
# or
npm run format
```

This may be optionally [configurable](configuration-prettier.md).

## Test

[Jest](https://facebook.github.io/jest/) is built-in to Noderize for easy testing.

```bash
yarn format
# or
npm run format
```