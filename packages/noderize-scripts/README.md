# Noderize Scrips

## Commands

### `build`

Builds your Noderize app.

### `watch`

Builds and starts your Noderize app as you code. Used for development.

### `test`

Runs tests (Jest).

### `format`

Runs code formatter (Prettier).

### `start`

Start the built file (after running `build` command).

## Configuration

### Noderize

You may configure Noderize by passing options to the `noderize` key in your `package.json`.

> Noderize should be able to infer almost all of these options. If not needed, omit them.

#### `entry`: `string` (default: `src/index.js`)

Used as entry file.

#### `output`: `string` (default: `main` field in `package.json` or `dist/index.js`)

Used as output file.

#### `formats`: `object` (default: use `"cjs"` to `output`).

To enable multi-format mode.

By default, Noderize only builds for CommonJS, and outputs to the path set from the `output` option. To build for other format types (ES modules for instance), use this options.

Object of `format`: `output` pair.

Example:

```json
"noderize": {
    "formats": {
        "cjs": "dist/cjs/index.js",
        "es": "dist/es/index.js"
    }
}
```

Formats: `cjs` (CommonJS), `es` (ES module), `iife` (immediately-invoked function expression), `amd` (Asynchronous Module Definition), `umd` (Universal Module Definition), `system` (SystemJS).

It will use the first one as the one to run for the `watch` command, unless `noderize.output` is set.

#### `name`: `string` (default: `name` field in `package.json`)

When using the `formats` option with `iife` or `umd`, use this as variable name.

> Leave it omitted to use the `name` field in `package.json` (recommended).

#### `shebang`: `bool` (default: if `bin` field in `package.json` is set)

Adds a shebang to top of built file. Useful for building CLI apps.

> You can omit this as it will infer if this is a CLI app by checking if the `bin` field in `package.json` is set.

#### `targets`: `object` (default: `{ node: true }`)

Specific a [Babel target](https://babeljs.io/docs/plugins/preset-env/#targets) to compile to.

#### `externalAuto`: `bool` (default: `true`)

#### `external`: `bool|array` (default: `true`)

Set to `true` for automatic external resolution (recommended).

Alternatively, you can set it as an array of external dependencies (not to be included in bundle).

Can be name of dependencies or path starting with `.` (usually `./`).

#### `builtins`: `string` (default: `node`)

Which built-ins to use.

* `node`: Use Node built-ins.
* `browser`: [Shim Node for browser use](https://www.npmjs.com/package/rollup-plugin-node-builtins).
* `null`: Disables built-ins.

#### `useNodeGlobals`: `bool` (default: if `builtins` is set to `browser`)

Insert Node globals (process, Buffer, etc) into browsers.

[More info](https://www.npmjs.com/package/rollup-plugin-node-globals).

#### `globals`: `object`

Object of `id`: `name` pair, used for `umd`/`iife` formats.

#### `dist`

Objects containing options to be used when building a release. For instance, you probably want to set the Node target.

Example:

```json
"noderize": {
    "globals": {
        "jquery": "$"
    }
}
```

#### `includeJson`: `bool` (default: `true`)

If to resolve `.json` files as JavaScript files.

#### `sourcemap`: `bool` (default: `true`)

If `true`, a separate sourcemap file will be created. If `"inline"`, the sourcemap will be appended to the resulting output file as a data URI.

#### `watch`: `array|string` (default: `src`)

Directories/files to watch.

### `runOnWatch`: `bool` (default: `true`)

Enable running the app while watching. Might be useful to disable if you are working on a CLI app.

### Prettier

You may configure Prettier as you [normally would](https://prettier.io/docs/en/configuration.html).