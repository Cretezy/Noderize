---
id: introduction
title: Introduction
---

Noderize lets you create Node apps in less than 30 seconds.

It aims to get out of your way and not require any [configuration](configuration-index.md) until you need it, while supporting loads of [features](features-index.md).

Try it out for yourself:

```bash
yarn create noderize <path>
# or
npx create-noderize <path>
```

[See more `create-noderize` options](create.md).

## Develop

Once you have created your Noderize project, simply `cd` into it and you can run it for development using the `watch` script:

```bash
yarn watch
# or
npm run watch
```

This will continuously rebuild your app and rerun your app as you code!

## Build

To build your app, use the built-in `build` script:

```bash
yarn build
# or
npm run build
```

This will build your app to `dist/index.js` (this output is optionally [configurable](configuration-noderize.md#output))

You can then run your file using the `start` script (for source map support) or using Node directly:

```bash
yarn start
# or
npm start
# or
node dist/index.js
```

## Additional Features

Check out [all of Noderize's features](features-index.md) such as [modern JavaScript support](features-modern.md) and [TypeScript support](features-typescript.md).
