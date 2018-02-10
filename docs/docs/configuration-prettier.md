---
id: configuration-prettier
title: Configuration: Prettier
sidebar_label: Prettier
---

You may configure [Prettier](https://prettier.io) as you [normally would](https://prettier.io/docs/en/configuration.html).

To pass arguments to Prettier when using the `format` script, simply add them after `-- --` like so:

```bash
yarn format -- -- --use-tabs
# or
npm run format -- -- --use-tabs
```