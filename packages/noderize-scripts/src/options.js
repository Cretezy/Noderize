const { resolveApp } = require("./utils");
const chalk = require("chalk");
const merge = require("lodash.merge");
const parseArgs = require("minimist");
const childPackage = require(resolveApp("package.json"));
const cosmiconfig = require("cosmiconfig");

const bools = ["shebang", "runOnWatch", "minify", "includeExternal"];
const strings = ["entry", "output", "sourcemaps"];

const defaults = {
	targets: { node: true },
	output: childPackage.main || "dist/index.js",
	shebang: childPackage.bin !== undefined,
	sourcemap: "cheap-module-eval-source-map",
	runOnWatch: true,
	minify: false,
	includeExternal: false,
	env: {
		production: {
			targets: { node: "6" },
			sourcemap: false
		}
	},
	buildThreads: 3,
};

const envDefaults = {};

async function getOptions(rawArgs = []) {
	// Parse args
	const args = parseArgs(rawArgs, {
		boolean: bools,
		string: strings,
		default: bools.reduce((total, bool) => {
			return { ...total, [bool]: null };
		}, {})
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
	if (args.targets !== undefined) {
		try {
			options.targets = JSON.parse(args.targets);
		} catch (error) {
			console.warn(`${chalk.red(`[WARN]`)} Could not parse targets argument.`);
		}
	}

	// BUild threads
	if (args.buildThreads !== undefined) {
		if (Number.isInteger(args.buildThreads)) {
			options.buildThreads = args.buildThreads;
		} else {
			const buildThreads = parseInt(args.buildThreads);
			if (isNaN(buildThreads)) {
				console.warn(
					`${chalk.red(`[WARN]`)} Argument buildThreads is not an integer.`
				);
			} else {
				options.buildThreads = buildThreads;
			}
		}
	}

	bools.forEach(bool => {
		if (args[bool] !== null) {
			options[bool] = !!args[bool];
		}
	});

	strings.forEach(string => {
		if (args[string] !== undefined) {
			options[string] = args[string];
		}
	});

	if(args.languages !== undefined){
		options.languages=args.languages;
	}

	// Parse languages to list then object

	if (options.languages === undefined) {
		// No loaders set, use babel
		options.languages = ["javascript"];
	} else if (!Array.isArray(options.languages)) {
		options.languages = [options.languages]; // Support single string
	}

	const languageList = options.languages;

	options.languages = { javascript: false, typescript: false };
	languageList.forEach(language => {
		if (options.languages[language] !== undefined) {
			options.languages[language] = true;
		}
	});

	// Entry
	if(options.entry === undefined){
		if(languageList.length === 1 && languageList[0] === "typescript"){
			options.entry = "src/index.ts"
		}else{
			options.entry = "src/index.js"
		}
	}

	// Merge envs
	if (args.env) {
		if (options.env[args.env] === undefined) {
			console.warn(`${chalk.red(`[WARN]`)} Could not find env.`);
		} else {
			merge(options, options.env[args.env]);
		}
	}

	return { ...options, args: args };
}

module.exports = { getOptions, childPackage };
