import fs from "fs-extra";
import { resolveApp } from "./utils/path";
import path from "path";
import merge from "lodash.merge";
import parseArgs from "minimist";
import cosmiconfig from "cosmiconfig";
import { printDebug, printError, printLines, printWarn } from "./utils/print";

export function getOptions(rawArgs = []) {
	const childPackage = fs.readJsonSync(resolveApp("package.json"));

	const bools = [
		"shebang",
		"sourcemaps",
		"runOnWatch",
		"minify",
		"includeExternal",
		"debug"
	];
	const strings = ["startFile", "name", "target"];

	const defaults = {
		shebang: childPackage.bin !== undefined,
		sourcemap: true,
		runOnWatch: true,
		minify: false,
		includeExternal: false,
		env: {
			production: {
				sourcemap: false
			}
		},
		buildThreads: 3,
		static: {},
		globals: {},
		targets: {},
		debug: false,
		name: childPackage.name,
		babel: { plugins: [], presets: [] },
		target: "node"
	};

	// Parse args
	const args = parseArgs(rawArgs, {
		boolean: bools,
		string: strings,
		default: bools.reduce((total, bool) => {
			return { ...total, [bool]: null };
		}, {})
	});

	let configOptions = {};
	try {
		// Load from "noderize" key in package.json, .noderizerc, or noderize.config.js
		const results = cosmiconfig("noderize", { sync: true }).load();

		if (results) {
			configOptions = results.config;
		}
	} catch (error) {
		printError("Could not read Noderize configuration.", error);
	}

	// Merge config to defaults
	const options = merge({}, defaults, configOptions);

	// Targets
	if (args.targets !== undefined) {
		try {
			options.targets = JSON.parse(args.targets);
		} catch (error) {
			printWarn(`Could not parse targets argument.`);
		}
	}

	// Static
	if (args.static !== undefined) {
		try {
			options.static = JSON.parse(args.static);
		} catch (error) {
			printWarn(`Could not parse static argument.`);
		}
	}

	// Globals
	if (args.globals !== undefined) {
		try {
			options.globals = JSON.parse(args.globals);
		} catch (error) {
			printWarn(`Could not parse globals argument.`);
		}
	}

	// Build threads
	if (args.buildThreads !== undefined) {
		if (Number.isInteger(args.buildThreads)) {
			options.buildThreads = args.buildThreads;
		} else {
			const buildThreads = parseInt(args.buildThreads);
			if (isNaN(buildThreads)) {
				printWarn(`Argument buildThreads is not an integer.`);
			} else {
				options.buildThreads = buildThreads;
			}
		}
	}

	if (args.babelPlugins !== undefined) {
		if (!Array.isArray(args.babelPlugins)) {
			args.babelPlugins = [args.babelPlugins];
		}
		options.babel.plugins = args.babelPlugins.map(plugin => {
			try {
				return JSON.parse(plugin);
			} catch (error) {
				printWarn(`Could not parse babel plugin.`);
			}
		});
	}

	if (args.babelPlugins !== undefined) {
		if (!Array.isArray(args.babelPlugins)) {
			args.babelPlugins = [args.babelPlugins];
		}
		options.babel.plugins = args.babelPlugins.map(plugin => {
			try {
				return JSON.parse(plugin);
			} catch (error) {
				printWarn(`Could not parse babel plugin.`);
			}
		});
	}

	if (args.babelPresets !== undefined) {
		if (!Array.isArray(args.babelPresets)) {
			args.babelPresets = [args.babelPresets];
		}
		options.babel.presets = args.babelPresets.map(preset => {
			try {
				return JSON.parse(preset);
			} catch (error) {
				printWarn(`Could not parse babel preset.`);
			}
		});
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

	if (args.languages !== undefined) {
		options.languages = args.languages;
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
		} else {
			printWarn(`Unknown language '${language}'`);
		}
	});

	if (args.bundles !== undefined) {
		if (!Array.isArray(args.bundles)) {
			args.bundles = [args.bundles];
		}

		options.bundles = args.bundles
			.map(bundle => {
				try {
					return JSON.parse(bundle);
				} catch (error) {
					printWarn(`Could not parse bundle.`);
					return false;
				}
			})
			.filter(Boolean);

		// If no bundles were found, reset
		if (options.bundles.length === 0) {
			options.bundles = undefined;
		}
	}

	// Bundles
	if (options.bundles === undefined) {
		let entry = "index.js";
		if (languageList.length === 1 && languageList[0] === "typescript") {
			entry = "index.ts";
		}

		options.bundles = [{ entry, output: "index.js" }];
	}

	options.bundles = options.bundles.map(bundle => {
		if (!Array.isArray(bundle.entry)) {
			return { ...bundle, entry: [bundle.entry] };
		} else {
			return bundle;
		}
	});

	// Check if bundle entries exist
	// Iterate bundles
	options.bundles.map(bundle => {
		// Iterate each entry of bundle (excluding externals starting with ~)
		bundle.entry.filter(entry => !entry.startsWith("~")).map(entry => {
			// Check & error
			const exists = fs.existsSync(resolveApp("src", entry));
			if (!exists) {
				printError(`Could not find bundle entry at src/${entry}`);
			}
		});
	});

	if (options.startFile === undefined) {
		if (childPackage.main !== undefined) {
			options.startFile = childPackage.main;
		} else {
			options.startFile = path.join(
				"dist",
				Object.values(options.bundles)[0].output
			);
		}
	}

	// Merge envs
	if (args.env) {
		if (options.env[args.env] === undefined) {
			printWarn(`Could not find specified env.`);
		} else {
			merge(options, options.env[args.env]);
		}
	}

	if (options.debug || args.showConfig) {
		printLines(printDebug, JSON.stringify(options, null, "\t"), "\t");
	}

	if (args.showConfig) {
		process.exit(0);
	}

	return { ...options, args: args };
}
