---
id: configuration-jest
title: Configuration: Jest
sidebar_label: Jest
---

You may configure [Jest](https://facebook.github.io/jest) as you [normally would](https://facebook.github.io/jest/docs/en/configuration.html).

You may also use a `.jestrc` file (with optional `.json`/`.yml`/`.yaml`/`.js` extension) for configuring using JSON/YAML/JS.

To pass arguments to Jest when using the `test` script, simply add them after `-- --` like so:

```bash
yarn test -- -- --showConfig
# or
npm test -- -- --showConfig
```
