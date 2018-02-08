const { resolveApp } = require("./utils");
const path = require("path");
const webpack = require("webpack");
const webpackUglify = require("uglifyjs-webpack-plugin");
const createBabelConfig = require("./createBabelConfig");
const pathIsInside = require("path-is-inside");

function getCompiler(options) {
	const output = resolveApp(options.output);
	const config = {
		entry: resolveApp(options.entry),
		output: {
			path: path.dirname(output),
			filename: path.basename(output)
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: createBabelConfig({ targets: options.targets })
					}
				}
			]
		},
		plugins: [
			options.shebang &&
				new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
			options.globals && new webpack.ProvidePlugin(options.globals),
			options.minify && new webpackUglify()
		].filter(Boolean),
		devtool: options.sourcemap,
		target: "node",
		node: false,
		// Include only app code
		externals: [
			(context, request, callback) => {
				if (
					!options.sources.find(source =>
						pathIsInside(request, resolveApp(source))
					)
				) {
					callback(null, "commonjs " + request);
				} else {
					callback();
				}
			}
		]
	};
	return webpack(config);
}

module.exports = {
	getCompiler
};
