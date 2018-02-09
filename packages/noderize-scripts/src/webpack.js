const { resolveApp, appDirectory } = require("./utils");
const path = require("path");
const webpack = require("webpack");
const webpackUglify = require("uglifyjs-webpack-plugin");
const webpackNodeExternals = require('webpack-node-externals');
const createBabelConfig = require("./createBabelConfig");

function getCompiler(options) {
	const output = resolveApp(options.output);

	const config = {
		context: appDirectory,
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
				},
				{
					test: /\.ts$/,
					exclude: /node_modules/,
					use: {
						loader: "ts-loader",
						options: {
							context: appDirectory,
							configFile: path.resolve(__dirname, "tsconfig.json")
						}
					}
				}
			]
		},
		resolve: {
			extensions: [".ts", ".js"]
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

		externals: [webpackNodeExternals({ modulesFromFile: true })]
	};
	return webpack(config);
}

module.exports = {
	getCompiler
};
