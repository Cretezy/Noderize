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

When only using the `typescript` [`language`](configuration-noderize.md#languages) option, the [`entry`](configuration-noderize.md#entry) option is automatically set to `src/index.ts`.

If you are also using other languages but want your entry file to be a TypeScript file, simply change the [`entry`](configuration-noderize.md#entry) option to `src/index.ts`.


