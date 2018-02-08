# Configuration

## Self

You may configure Noderize by passing options to the `noderize` key in your `package.json`.

> Noderize should be able to infer almost all of these options. If not needed, omit them.

Every configuration options can be passed as argumentsto the `build` or `watch` (and `start`) command. For instance: `yarn build --minify`

When passing objects as argument, provide a JSON string. For instance: `yarn build --targets '{"node": true}'`.

When passing arrays as argument, simply pass it multiple times. For instance: `yarn build --sources src --sources src2`

### `entry`: `string` (default: `src/index.js`)

Used as entry file.

### `output`: `string` (default: `main` field in `package.json` or `dist/index.js`)

Used as output file.

### `shebang`: `bool` (default: if `bin` field in `package.json` is set)

Adds a shebang to top of built file. Useful for building CLI apps.

> You can omit this as it will infer if this is a CLI app by checking if the `bin` field in `package.json` is set.

### `targets`: `object` (default: `{ node: true }`)

Specific a [Babel target](https://babeljs.io/docs/plugins/preset-env/#targets) to compile to.

### `globals`: `object`

Set a globals.

Example:
```json
"globals": {
    "$": "jquery"
}
```

### `sourcemap`: `bool` (default: `cheap-module-eval-source-map`)

[See source map types](https://webpack.js.org/configuration/devtool).

### `runOnWatch`: `bool` (default: `true`)

Enable running the app while watching. Might be useful to disable if you are working on a CLI app.

### `sources`: `array[string]` (default: `["src"]`)

Array of paths to not include in build.

> Unless if using `includeExternal`.

### `includeExternal`: `bool` (default: `false`)

Include all your dependencies in your bundle. This will make your file size a lot larger.

### `minify`: `bool` (default: `false`)

Minifies (compress) your app.

This is automatically enabled when using `--dist` to build.

### `env`: `object`

Provide environment-specific variables that can be used with the `--env` flag

By default, the `production` environment does:
* Sets `targets.node` to the oldest active Node LTS release.
* Set `minify` to `true`.

Example:
```json
"env": {
    "production": {
        "minify": false
    }
}
```

Can be used with `yarn build --env production`.

## Prettier

You may configure Prettier as you [normally would](https://prettier.io/docs/en/configuration.html).