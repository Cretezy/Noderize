import path from "path";
import { appDirectory } from "../utils/path";
import { execSync } from "child_process";
import { fork } from "child_process";
import { getOptions } from "../options";
import cosmiconfig from "cosmiconfig";
import merge from "lodash.merge";
import { printError, printInfo } from "../utils/print";

export default async args => {
	printInfo("Testing...");

	const options =  getOptions(args);
	const jestArgs = options.args._;

	let jestConfig = {};
	try {
		// Load jest config
		const results = await cosmiconfig("jest").load();

		if (results) {
			jestConfig = results.config;
		}
	} catch (error) {
		printError("Could not read Jest configuration.", error);
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
			transform: {},
			setupFiles: [],
			moduleFileExtensions: [...extensions, "json"],
			testRegex: `(.*__tests__.*|.*\\.(test|spec))\\.(${extensions.join("|")})$`
		},
		jestConfig
	);

	// Force add transformer
	config.transform[`^.+\\.(${extensions.join("|")})$`] = path.resolve(
		__dirname,
		"jestTransformer.js"
	);

	jestArgs.push("--config", JSON.stringify(config));

	const jestPath = path.resolve(
		__dirname,
		"..",
		"node_modules",
		".bin",
		"jest"
	);

	fork(jestPath, jestArgs, {
		cwd: appDirectory
	});
};
