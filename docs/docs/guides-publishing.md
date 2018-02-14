---
id: guides-publishing
title: Guide: Publishing
sidebar_label: Publishing
---

Noderize allows you to publish your module on npm with no additional step.

Make sure to remove `"private": true` from your `package.json`.

You simply have to build then publish to the registry:

```bash
yarn build --env production
yarn publish
# or
npm run build --env production
npm publish
```

When publishing to npm, you want to:

* `clean`: Clean the output directory of any leftover files that you don't wish to publish.
* `build`: Build your app/library. Prefer using the production [`env`](configuration-noderize.md#env) for cleaner publishing code.
* `publish`: Use npm or Yarn to publish to the registry.

If you want to preview what your package will look like instead, use the `pack` command (`yarn pack` or `npm pack`). This will create a `.tgz` file which is identical to what is published.

## Files

By default, npm/Yarn will include these [files](https://docs.npmjs.com/files/package.json#files):

* package.json
* README
* CHANGES / CHANGELOG / HISTORY
* LICENSE / LICENCE
* NOTICE
* The file in the "main" field

When using multiple bundles and/or static files, we must indicate to publish the whole `dist` folder (and optionally include `src` for human-readable code). Add to your `package.json`:

```json
"files": ["src", "dist"],
```

## Automatic Cleaning & Building

To automate cleaning and building before publishing, you want to add the `prepack` script to your `package.json` like so:

```json
"scripts": {
    "...": "...",
    "prepack": "noderize-scripts clean && noderize-scripts build --env production"
}
```

When using `yarn publish` or `npm publish`, it will first clean, then build, then publish.

## Fat bundle

To generate a "fat bundle" with all your code and dependencies included, set [`includeExternal`](configuration-noderize.md#includeexternal) to `true`.

This will add all the code in your output bundle, resulting in a large size, but making it portable.

This is not recommended, should never be used when publishing to npm.
