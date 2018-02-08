const { resolveApp } = require("./utils");
const merge = require("lodash.merge");
const parseArgs = require("minimist");
const {
	noderize: { env: envOptions, ...childOptions } = {},
	...childPackage
} = require(resolveApp("package.json"));

const bools = ["shebang", "runOnWatch", "minify", "includeExternal"];
const strings = ["entry", "output", "sourcemaps"];

const defaults = {
	targets: { node: true },
	entry: "src/index.js",
	output: childPackage.main || "dist/index.js",
	shebang: childPackage.bin !== undefined,
	sources: ["src"],
	sourcemap: "cheap-module-eval-source-map",
	runOnWatch: true,
	minify: false,
	includeExternal: false
};
const envDefaults = {
	production: {
		targets: { node: "6" },
		sourcemap: false
	}
};

function getOptions(rawArgs) {
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

	// Get options from package.json with defaults
	const options = merge({}, defaults, childOptions);

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
		const envOptions = merge({}, envDefaults, options.env || {});
		merge(options, envOptions[args.env] || {});
	}

	return { ...options, args: args };
}

module.exports = { getOptions, childPackage };
