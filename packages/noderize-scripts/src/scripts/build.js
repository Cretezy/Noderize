const { getOptions } = require("../options");
const supportsColor = require("supports-color");
const { printInfo, printError, printDone } = require("../printUtils");
const { resolveApp, appDirectory } = require("../appPathsUtils");
const path = require("path");
const webpack = require("webpack");
const webpackUglify = require("uglifyjs-webpack-plugin");
const webpackNodeExternals = require("webpack-node-externals");
const webpackForkTsChecker = require("fork-ts-checker-webpack-plugin");
const webpackHappyPack = require("happypack");
const createBabelConfig = require("../createBabelConfig");

async function run(args) {
	printInfo(`Building...`);

	const compiler = getCompiler(await getOptions(args));

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
		printError("Error building.", error);
		return;
	}

	printDone("Done!");
}

function getCompiler(options) {
	const tsconfig = path.resolve(__dirname, "tsconfig.json");
	const happyThreadPool = webpackHappyPack.ThreadPool({
		size: options.buildThreads
	});
	const output = resolveApp(options.output);

	const { javascript, typescript } = options.languages;

	// Create webpack config
	const config = {
		context: appDirectory,
		entry: resolveApp(options.entry),
		output: {
			path: path.dirname(output),
			filename: path.basename(output),
			library: options.name,
			libraryTarget: 'umd',
		},

		module: {
			rules: [
				javascript && {
					test: /\.js$/,
					exclude: /node_modules/,
					use: "happypack/loader?id=javascript"
				},
				typescript && {
					test: /\.ts$/,
					exclude: /node_modules/,
					use: "happypack/loader?id=typescript"
				}
			].filter(Boolean)
		},

		resolve: {
			extensions: [javascript && ".js", typescript && ".ts"].filter(Boolean)
		},

		plugins: [
			javascript &&
			new webpackHappyPack({
				id: "javascript",
				threadPool: happyThreadPool,
				loaders: [
					{
						loader: "babel-loader",
						options: createBabelConfig({ targets: options.targets })
					}
				]
			}),
			typescript &&
			new webpackHappyPack({
				id: "typescript",
				threadPool: happyThreadPool,
				loaders: [
					{
						loader: "ts-loader",
						options: {
							context: appDirectory,
							configFile: tsconfig,
							happyPackMode: true
						}
					}
				]
			}),
			typescript &&
			new webpackForkTsChecker({
				checkSyntacticErrors: true,
				tsconfig
			}),
			options.shebang &&
			new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
			options.globals && new webpack.ProvidePlugin(options.globals),
			options.minify && new webpackUglify()
		].filter(Boolean),

		devtool: options.sourcemap,
		target: "node",
		node: false,

		externals: options.includeExternal ? undefined : webpackNodeExternals({ modulesFromFile: true })
	};

	return webpack(config);
};

module.exports = {
	run,
	getCompiler
};