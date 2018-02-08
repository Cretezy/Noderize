const { options, distOptions } = require("../options");
const { resolveApp } = require("../utils");
const chalk = require("chalk");
const parseArgs = require("minimist");
const path = require("path");
const webpack = require("webpack");
const createBabelConfig = require("../createBabelConfig");
const supportsColor = require("supports-color");

async function run(args) {
	console.log(`${chalk.yellowBright("[INFO]")} Building...`);
	const { dist } = parseArgs(args, { boolean: "dist" });

	const compiler = getCompiler(dist ? distOptions : options);

	try {
		const stats = await new Promise((resolve, reject) => {
			compiler.run((err, stats) => {
				if (err) {
					reject(err);
				} else {
					resolve(stats);
				}
			});
		});

		console.log(stats.toString({ colors: supportsColor.stdout }));
	} catch (error) {
		console.log(`${chalk.redBright("[ERROR]")} Error building.`);
		console.error(error);
		return;
	}

	console.log(`${chalk.greenBright("[INFO]")} Done!`);
}

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
					test: /\.m?js$/,
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
	run,
	getCompiler
};
