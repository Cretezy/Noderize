const { resolveApp } = require("./utils");
const path = require("path");
const webpack = require("webpack");
const createBabelConfig = require("./createBabelConfig");

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
			options.globals && new webpack.ProvidePlugin(options.globals)
		].filter(Boolean),
		devtool: options.sourcemap,
		target: "node",
		node: false
	};
	return webpack(config);
}

module.exports = {
	getCompiler
};