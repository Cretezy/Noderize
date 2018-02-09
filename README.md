# Noderize

Create Node apps with no configuration (until you need to).

Noderize takes care of compiling your code with you, making Webpack and Babel hidden from you (while still allowing you configure extra settings).
The goal is to have any Node app running in less than 30 seconds.

> Inspired by [`create-react-app`](https://github.com/facebook/create-react-app)

* [Usage](docs/Usage.md)
* [Configuration](docs/Configuration.md)

To start off in less than 30 seconds, create a Noderize app:

```bash
yarn create noderize <path>
```

or

```bash
npx create-noderize <path>
```

## Features

* Only configure what you need. Sane defaults
* Use modern JavaScript features with Babel
    * ES6 & ES7.
    * Stage 3: Object rest/spread, async-generator-functions
    * Stage 2: Dynamic import, class properties
    * Decorators (stage 2)
* TypeScript support
* Formatting (Prettier) & testing (Jest) built-in