---
id: features-typescript
title: Feature: TypeScript
sidebar_label: TypeScript
---

TypeScript support is built in to Noderize.

Simply set/add `typescript` to the [`languages`](configuration-noderize.md#languages) option.

If you are not using JavaScript, you may want to remove the `javascript` languages for better build times.

[See example](https://github.com/Cretezy/noderize/tree/master/examples/basic-typescript).

## Entry

When only using the `typescript` [`language`](configuration-noderize.md#languages) option, the [`bundles`](configuration-noderize.md#bundles) option is automatically set to enter at `src/index.ts`.

If you are also using other languages but want your entry file to be a TypeScript file, simply set the [`bundles`](configuration-noderize.md#bundles) option to enter `src/index.ts`.

## Features

* Decorators
