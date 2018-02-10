const path = require("path");
const { appDirectory } = require("../appPathsUtils");
const { execSync } = require("child_process");
const { fork } = require("child_process");
const { getOptions } = require("../options");
const cosmiconfig = require("cosmiconfig");
const merge = require("lodash.merge");
const { printInfo } = require("../printUtils");

async function run(args) {
	printInfo(`Testing...`);

	const options = await getOptions(args);
	const jestArgs = options.args._;

	// Manually load jest config
	let jestConfig = {};
	try {
		const results = await cosmiconfig("jest").load();
		jestConfig = results.config;
	} catch (error) {
		// Could not load (doesn't exist?)
	}

	let isInGit;
	try {
		execSync("git rev-parse --is-inside-work-tree 2>/dev/null", {
			encoding: "utf8"
		});
		isInGit = true;
	} catch (error) {
		isInGit = false;
	}

	if (
		!(
			process.env.CI ||
			jestArgs.includes("--ci") ||
			jestArgs.includes("--watchAll") ||
			jestArgs.includes("--watch") ||
			jestArgs.includes("--coverage")
		)
	) {
		jestArgs.push(isInGit ? "--watch" : "--watchAll");
	}

	const extensions = [
		"js", // Must use js for Jest itself
		options.languages.typescript && "ts"
	].filter(Boolean);

	const config = merge(
		{
			rootDir: appDirectory,
			roots: ["<rootDir>/src"],
			transform: {
				[`^.+\\.(${extensions.join("|")})$`]: require.resolve(
					"../jestTransformer.js"
				)
			},
			moduleFileExtensions: [...extensions, "json"],
			testRegex: `(.*__tests__.*|.*\\.(test|spec))\\.(${extensions.join("|")})$`
		},
		jestConfig
	);

	jestArgs.push("--config", JSON.stringify(config));

	const jestPath = path.resolve(
		__dirname,
		"..",
		"..",
		"node_modules",
		".bin",
		"jest"
	);

	fork(jestPath, jestArgs, {
		cwd: appDirectory
	});
}

module.exports = { run };
