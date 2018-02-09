const path = require("path");
const { appDirectory } = require("../utils");
const chalk = require("chalk");
const { execSync } = require("child_process");
const jest = require("jest");
const { getOptions } = require("../options");

async function run(args) {
	console.log(`${chalk.blueBright("[INFO]")} Testing...`);

	const options = getOptions(args);

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
			args.includes("--watchAll") ||
			args.includes("--watch") ||
			args.includes("--coverage")
		)
	) {
		args.push(isInGit ? "--watch" : "--watchAll");
	}

	const extensions = [
		options.languages.babel && ".js",
		options.languages.typescript && ".ts"
	].filter(Boolean);

	const config = {
		rootDir: appDirectory,
		roots: ["<rootDir>/src"],
		transform: {
			[`^.+\\.(${extensions.join("|")})$`]: path.resolve(
				__dirname,
				"..",
				"jestBabel.js"
			)
		},
		moduleFileExtensions: [...extensions, "json"],
		testRegex: `(.*__tests__.*|.*\\.(test|spec))\\.(${extensions.join("|")})$`
	};

	args.push("--config", JSON.stringify(config));

	jest.run(args);
}

module.exports = { run };
