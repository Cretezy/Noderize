import createBabelConfig from "./createBabelConfig";
import path from "path";
import supportsColor from "supports-color";
import { resolveApp, appDirectory } from "./utils/path";
import webpack from "webpack";
import webpackUglify from "uglifyjs-webpack-plugin";
import webpackNodeExternals from "webpack-node-externals";
import webpackForkTsChecker from "fork-ts-checker-webpack-plugin";
import webpackHappyPack from "happypack";

export function getCompiler(options) {
	const tsconfig = path.resolve(__dirname, "tsconfig.json");
	const happyThreadPool = webpackHappyPack.ThreadPool({
		size: options.buildThreads
	});

	const { javascript, typescript } = options.languages;

	const bundles = options.bundles.reduce((bundles, bundle) => {
		const entries = bundle.entry.map(entry => {
			if (entry.startsWith("~")) {
				// Get the path of the package

				// Using eval to get require to bypass webpack
				return eval("require").resolve(entry.slice(1));
			} else {
				return resolveApp("src", entry);
			}
		});
		return { ...bundles, [bundle.output]: entries };
	}, {});

	// Create webpack config
	const config = {
		context: appDirectory,
		entry: bundles,
		output: {
			path: resolveApp("dist"),
			filename: "[name]",
			// library: options.name,
			libraryTarget: "umd"
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
					],
					verbose: options.debug
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
					],
					verbose: options.debug
				}),
			typescript &&
				new webpackForkTsChecker({
					checkSyntacticErrors: true,
					tsconfig
				}),
			options.shebang &&
				new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
			options.globals && new webpack.ProvidePlugin(options.globals),
			options.minify && new webpackUglify(),
			options.sourcemap &&
				new webpack.SourceMapDevToolPlugin({
					filename: "[name].map"
				})
		].filter(Boolean),

		target: "node",
		node: false,

		externals: options.includeExternal
			? undefined
			: webpackNodeExternals({ modulesFromFile: true }),

		stats: {
			warnings: options.debug
		}
	};

	return webpack(config);
}

export function printStats(stats, options) {
	console.log(
		stats.toString({ colors: supportsColor.stdout, warnings: options.debug })
	);
}
