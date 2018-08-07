export default ({
  targets,
  babel: { presets = [], plugins = [] },
  runtime = "include"
} = {}) => ({
  presets: [
    [
      "@babel/preset-env",
      {
        targets
      }
    ],

    "@babel/preset-flow",
    ...presets
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    ["@babel/plugin-proposal-class-properties", { loose: false }],
    "@babel/plugin-proposal-json-strings",
    (runtime === "noderize" || runtime === "include") && [
      "@babel/plugin-transform-runtime",
      { corejs: 2 }
    ],
    ...plugins
  ].filter(Boolean)
});
