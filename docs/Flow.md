# Flow

[Flow](https://flow.org/) is a static type checker that adds types to JavaScript.

Adding Flow is extremely easy, since it it built-in.

You simply have to add the `flow-bin` command to your project:

```bash
yarn add -D flow-bin
```

or

```bash
npm install -D flow-bin
```

Then add a `scripts.flow` to `package.json` set to `flow` (optional if using Yarn, but nonetheless recommended):

```json
"scripts": {
    "flow": "flow"
}
```

Then initialize Flow with:

```bash
yarn flow init
```

or

```bash
npm run flow init
```

Done!