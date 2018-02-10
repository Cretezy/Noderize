---
id: features-flow
title: Feature: Flow
sidebar_label: Flow
---

[Flow](https://flow.org/) is a static type checker that adds types to JavaScript.

Flow is built-in to Noderize, you simply have to add the `flow-bin` command to your project to start using it:

```bash
yarn add -D flow-bin
# or
npm install -D flow-bin
```

Then add a `scripts.flow` to `package.json` set to `flow` (optional if using Yarn, but nonetheless recommended):

```json
"scripts": {
    "...": "...",
    "flow": "flow"
}
```

Then initialize Flow with:

```bash
yarn flow init
# or
npm run flow init
```

You may now start using Flow!