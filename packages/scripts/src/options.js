import fs from "fs-extra";
import { resolveApp } from "./utils/path";
import path from "path";
import merge from "lodash.merge";
import parseArgs from "minimist";
import cosmiconfig from "cosmiconfig";
import { printDebug, printError, printLines, printWarn } from "./utils/print";

function run(runners = [], value, extra) {
	if (!Array.isArray(runners)) {
		runners = [runners];
	}

	runners.forEach(runner => {
		value = runner(value, extra);
	});

	return value;
}

export function getOptions(rawArgs, env = null) {
	const childPackage = fs.readJsonSync(resolveApp("package.json"));

	const types = {
		srcDirectory: {
			type: String,
			default: "src"
		},
		distDirectory: {
			type: String,
			default: "dist"
		},
		languages: {
			type: Array,
			subtype: String,
			default: ["javascript"]
		},
		bundles: {
			type: Array,
			subtype: Object,
			default: ({ options: { languages } }) => [
				{
					entry: [
						"index." +
							(languages.length === 1 && languages[0] === "typescript"
								? "ts"
								: "js")
					],
					output: "index.js"
				}
			],
			run: bundles =>
				bundles.map(bundle => ({
					...bundle,
					entry: Array.isArray(bundle.entry) ? bundle.entry : [bundle.entry]
				}))
		},
		startFile: {
			type: String,
			default: ({ options, childPackage }) =>
				resolveApp(
					childPackage.main ? "" : options.distDirectory,
					childPackage.main || options.bundles[0].output
				),
			run: (startFile, { options }) =>
				resolveApp(options.distDirectory, startFile)
		},
		shebang: {
			type: Boolean,
			default: ({ childPackage }) => childPackage.bin !== undefined
		},
		sourcemap: {
			type: Boolean,
			default: true
		},
		runOnWatch: {
			type: Boolean,
			default: true
		},
		minify: {
			type: Boolean,
			default: false
		},
		includeExternal: {
			type: Boolean,
			default: false
		},
		name: {
			type: String,
			default: ({ childPackage }) => childPackage.name
		},
		buildThreads: {
			type: Number,
			integer: true,
			min: 1,
			default: 3
		},
		static: {
			type: Object,
			default: {}
		},
		globals: {
			type: Object,
			default: {}
		},
		targets: {
			type: Object,
			default: {
				node: true
			}
		},
		debug: {
			type: Boolean,
			default: false
		},
		babel: {
			type: Object,
			default: {}
		},
		target: {
			type: String,
			default: "node",
			choices: ["node", "web"]
		},
		runtime: {
			type: String,
			default: ({ childPackage }) =>
				Object.keys(childPackage.dependencies || {}).includes(
					"@noderize/runtime"
				)
					? "noderize"
					: "include",
			choices: ["noderize", "include", "polyfill", "none"]
		},
		env: {
			type: Object,
			default: {
				production: {
					sourcemap: false,
					targets: {}
				},
				test: {},
				development: {}
			},
			merge: true,
			notArg: true
		}
	};

	const boleans = Object.keys(types).filter(
		type => types[type].type === Boolean
	);

	// Parse args
	const args = parseArgs(rawArgs || [], {
		boolean: boleans,
		string: Object.keys(types).filter(
			type => types[type].type === String || types[type].type === Object
		),
		default: boleans.reduce((total, bool) => ({ ...total, [bool]: null }), {})
	});

	let options = {};
	try {
		// Load from "noderize" key in package.json, .noderizerc, or noderize.config.js
		const results = cosmiconfig("noderize", { sync: true }).load();

		if (results) {
			const configOptions = results.config;
			Object.keys(configOptions).forEach(configOptionKey => {
				if (types[configOptionKey] !== undefined) {
					const type = types[configOptionKey];
					let value = configOptions[configOptionKey];
					if (type.type === Array && !Array.isArray(value)) {
						value = [value];
					}
					value = run(type.run, value, { options });
					options[configOptionKey] = value;
				} else {
					printWarn(`Config key '${configOptionKey}' doesn't do anything.`);
				}
			});
		}
	} catch (error) {
		printError("Could not read Noderize configuration.", error);
	}

	function parseArgType(arg, type, value) {
		switch (type.type) {
			case Boolean:
			case String:
				return type.type(value);
			case Number:
				const number = parseFloat(value);
				if (isNaN(number)) {
					printError(`Argument '${arg}' is not a number.`);
					break;
				} else {
					return number;
				}
			case Object:
				try {
					return JSON.parse(value);
				} catch (error) {
					printError(
						`Could not parse JSON for argument '${arg}'.`,
						error.message
					);
					break;
				}
			case Array:
				if (!Array.isArray(value)) {
					value = [value];
				}
				return value.map(value =>
					parseArgType(arg, { type: type.subtype }, value)
				);
		}
	}

	Object.keys(args)
		.filter(arg => Object.keys(types).includes(arg))
		.filter(arg => !types[arg].notArg)
		.forEach(arg => {
			const type = types[arg];
			let argValue = args[arg];
			if (argValue !== null) {
				let value = parseArgType(arg, type, argValue);
				if (value !== undefined) {
					value = run(type.run, value, { options });

					options[arg] = value;
				}
			}
		});

	Object.keys(types).forEach(typeName => {
		const value = options[typeName];
		let type = types[typeName];
		if (value === undefined || type.merge) {
			let defaultValue = type.default;
			if (defaultValue instanceof Function) {
				defaultValue = defaultValue({ options, childPackage });
			}
			if (type.merge) {
				options[typeName] = merge({}, defaultValue, options[typeName]);
			} else {
				options[typeName] = defaultValue;
			}
		}
	});

	// Checks
	Object.keys(options).forEach(option => {
		const value = options[option];
		const type = types[option];
		if (type.type === Number) {
			if (type.integer && !Number.isInteger(value)) {
				printError(`Option '${option}' is not an integer.`);
			}
			if (type.min !== undefined && value < type.min) {
				printError(`Option '${option}' is under minimum (${type.min}).`);
			}
			if (type.max !== undefined && value > type.max) {
				printError(`Option '${option}' is over maximum (${type.max}).`);
			}
		}
		if (type.choices !== undefined) {
			if (!type.choices.includes(value)) {
				printError(`Invalid choice for ${option}: '${value}'.`);
			}
		}
	});

	const languageList = options.languages;

	options.languages = { javascript: false, typescript: false };
	languageList.forEach(language => {
		if (options.languages[language] !== undefined) {
			options.languages[language] = true;
		} else {
			printWarn(`Unknown language '${language}'`);
		}
	});

	//
	//
	// if (args.babelPlugins !== undefined) {
	// 	if (!Array.isArray(args.babelPlugins)) {
	// 		args.babelPlugins = [args.babelPlugins];
	// 	}
	// 	options.babel.plugins = args.babelPlugins.map(plugin => {
	// 		try {
	// 			return JSON.parse(plugin);
	// 		} catch (error) {
	// 			printWarn(`Could not parse babel plugin.`);
	// 		}
	// 	});
	// }
	//
	// if (args.babelPresets !== undefined) {
	// 	if (!Array.isArray(args.babelPresets)) {
	// 		args.babelPresets = [args.babelPresets];
	// 	}
	// 	options.babel.presets = args.babelPresets.map(preset => {
	// 		try {
	// 			return JSON.parse(preset);
	// 		} catch (error) {
	// 			printWarn(`Could not parse babel preset.`);
	// 		}
	// 	});
	// }
	//
	// boleans.forEach(bool => {
	// 	if (args[bool] !== null) {
	// 		options[bool] = !!args[bool];
	// 	}
	// });
	//
	// strings.forEach(string => {
	// 	if (args[string] !== undefined) {
	// 		options[string] = args[string];
	// 	}
	// });
	//
	// if (args.languages !== undefined) {
	// 	options.languages = args.languages;
	// }
	//
	// // Parse languages to list then object
	// if (options.languages === undefined) {
	// 	// No loaders set, use babel
	// 	options.languages = ["javascript"];
	// } else if (!Array.isArray(options.languages)) {
	// 	options.languages = [options.languages]; // Support single string
	// }
	//
	// const languageList = options.languages;
	//
	// options.languages = { javascript: false, typescript: false };
	// languageList.forEach(language => {
	// 	if (options.languages[language] !== undefined) {
	// 		options.languages[language] = true;
	// 	} else {
	// 		printWarn(`Unknown language '${language}'`);
	// 	}
	// });
	//
	// if (args.bundles !== undefined) {
	// 	if (!Array.isArray(args.bundles)) {
	// 		args.bundles = [args.bundles];
	// 	}
	//
	// 	options.bundles = args.bundles
	// 		.map(bundle => {
	// 			try {
	// 				return JSON.parse(bundle);
	// 			} catch (error) {
	// 				printWarn(`Could not parse bundle.`);
	// 				return false;
	// 			}
	// 		})
	// 		.filter(Boolean);
	//
	// 	// If no bundles were found, reset
	// 	if (options.bundles.length === 0) {
	// 		options.bundles = undefined;
	// 	}
	// }
	//
	// // Bundles
	// if (options.bundles === undefined) {
	// 	let entry = "index.js";
	// 	if (languageList.length === 1 && languageList[0] === "typescript") {
	// 		entry = "index.ts";
	// 	}
	//
	// 	options.bundles = [{ entry, output: "index.js" }];
	// }
	//
	// options.bundles = options.bundles.map(bundle => {
	// 	const output = merge({}, bundle);
	// 	if (!Array.isArray(output.entry)) {
	// 		output.entry = [output.entry];
	// 	}
	// 	if (output.polyfill === undefined) {
	// 		output.polyfill = true;
	// 	}
	//
	// 	return output;
	// });
	//
	//
	// // Check if bundle entries exist
	// // Iterate bundles
	// options.bundles.map(bundle => {
	// 	// Iterate each entry of bundle (excluding externals starting with ~)
	// 	bundle.entry.filter(entry => !entry.startsWith("~")).forEach(entry => {
	// 		// Check & error
	// 		const exists = fs.existsSync(resolveApp("src", entry));
	// 		if (!exists) {
	// 			printError(`Could not find bundle entry at src/${entry}`);
	// 		}
	// 	});
	// });
	//
	// if (options.startFile === undefined) {
	// 	if (childPackage.main !== undefined) {
	// 		options.startFile = childPackage.main;
	// 	} else {
	// 		options.startFile = path.join(
	// 			"dist",
	// 			Object.values(options.bundles)[0].output
	// 		);
	// 	}
	// }
	//

	options.currentEnv = env || args.env || process.env.NODE_ENV || "development";

	// Replace with env value
	if (options.currentEnv) {
		const envConfig = options.env[options.currentEnv];
		if (envConfig === undefined) {
			printWarn(`Could not find '${options.currentEnv}' environment.`);
		} else {
			Object.keys(envConfig).forEach(envKey => {
				options[envKey] = envConfig[envKey];
			});
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
