import path from "path";
import { appDirectory, getBinPath } from "../utils/path";
import { execSync } from "child_process";
import spawn from "cross-spawn";
import { getOptions } from "../options";
import cosmiconfig from "cosmiconfig";
import merge from "lodash.merge";
import { printError, printInfo } from "../utils/print";

export default async (args, fullArgs) => {
	printInfo("Testing...");

	const options = getOptions(null, "test");

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

	// Watch by default (when not in CI)
	if (
		!(
			process.env.CI ||
			args.includes("--ci") ||
			args.includes("--watchAll") ||
			args.includes("--watch") ||
			args.includes("--coverage")
		)
	) {
		args.push(isInGit ? "--watch" : "--watchAll");
	}

	const extensions = [
		"js", // Must use js for Jest itself
		options.languages.typescript && "ts"
	].filter(Boolean);

	const config = merge(
		{
			rootDir: appDirectory,
			roots: [`<rootDir>/${options.srcDirectory}`],
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

	args.push("--config", JSON.stringify(config));

	const jestPath = await getBinPath("jest");

	// Run Jest
	spawn(fullArgs[0], [jestPath, ...args], {
		cwd: appDirectory,
		stdio: "inherit"
	});
};
