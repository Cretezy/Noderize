const { resolveApp } = require("./utils");
const merge = require("lodash.merge");
const parseArgs = require("minimist");
const childPackage = require(resolveApp("package.json"));

const bools = ["shebang", "runOnWatch", "minify", "includeExternal"];
const strings = ["entry", "output", "sourcemaps"];
const cosmiconfig = require('cosmiconfig');

const defaults = {
	targets: { node: true },
	entry: "src/index.js",
	output: childPackage.main || "dist/index.js",
	shebang: childPackage.bin !== undefined,
	sources: ["src"],
	sourcemap: "cheap-module-eval-source-map",
	runOnWatch: true,
	minify: false,
	includeExternal: false,
	env: {
		production: {
			targets: { node: "6" },
			sourcemap: false
		}
	}
};

const envDefaults = {};

async function getOptions(rawArgs) {
	// Parse args
	const args = parseArgs(rawArgs, {
		boolean: bools,
		string: strings,
		default: {
			shebang: null,
			runOnWatch: null,
			minify: null,
			includeExternal: null,
			targets: null
		}
	});

	let configOptions;
	try {
		// Load from "noderize" key in package.json, .noderizerc, or noderize.config.js
		const results = await cosmiconfig("noderize").load();

		configOptions = results.config;
	} catch (error) {
		// Could not load (doesn't exist)
		configOptions = {};
	}

	// Merge config to defaults
	const options = merge({}, defaults, configOptions);

	// Merge args to options
	if (args.targets !== null) {
		options.targets = JSON.parse(args.targets);
	}

	if (args.sources != null) {
		options.sources = Array.isArray(args.sources)
			? args.sources
			: [args.sources];
	}

	bools.forEach(bool => {
		if (args[bool] !== null) {
			options[bool] = args[bool];
		}
	});

	strings.forEach(string => {
		if (args[string] !== undefined) {
			options[string] = args[string];
		}
	});

	// Merge envs
	if (args.env) {
		merge(options, options.env[args.env] || {});
	}

	return { ...options, args: args };
}

module.exports = { getOptions, childPackage };
