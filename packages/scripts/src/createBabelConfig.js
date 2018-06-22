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
    ["@babel/preset-stage-2", { decoratorsLegacy: true }],
    "@babel/preset-flow",
    ...presets
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    (runtime === "noderize" || runtime === "include") &&
      "@babel/plugin-transform-runtime",
    ...plugins
  ].filter(Boolean)
});
