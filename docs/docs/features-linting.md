---
id: features-linting
title: Feature: Linting
sidebar_label: Linting
---

To start using linting in Noderize, you can configure it using:

```bash
yarn lint --init
# or
npm run lint --init
```

Then use it with:

```bash
yarn lint
# or
npm run lint
```

> If running a version lower than v0.5.0, please upgrade, and add the `lint` script in your `package.json`:
>
> `"lint": "noderize-scripts lint"`

Code liting is done using [ESlint](https://eslint.org).
