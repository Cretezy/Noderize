---
id: introduction
title: Introduction
---

Noderize lets you create Node apps in less than 30 seconds.

The role of Noderize is to replace your build configuration for a batteries-included experience, focused on features and flexibility.

It aims to get out of your way and not require any [configuration](configuration-index.md) until you need it, making it very simple to get started in a few seconds.

Try it out for yourself:

```bash
yarn create noderize <path>
# or
npx create-noderize <path>
```

[See more `create-noderize` options](create.md).

(Noderize requires Node 8+).

## Develop

Once you have created your Noderize project, simply `cd` into it and you can run it for development using the `watch` script:

```bash
yarn watch
# or
npm run watch
```

This will continuously rebuild your app and rerun your app as you code!

## Build & Start

You can build your app using the `build` script:

```bash
yarn build
# or
npm run build
```

This will build your app to `dist/index.js` (this output is optionally [configurable](configuration-noderize.md#output)).

You can then run your file using the `start` script (for source map support) or using Node directly:

```bash
yarn start
# or
npm start
# or (no source map)
node dist/index.js
```

## Additional Features

Noderize is packed with [features](features-index.md) such as [modern JavaScript support](features-modern.md) and [TypeScript support](features-typescript.md).

[Code formatting](features-formatting.md) ([`format` script](scripts.md#format)) and [testing](features-testing.md) ([`test` script](scripts.md#test)) is built-in and lets you get working on your high-quality code distraction-free.
