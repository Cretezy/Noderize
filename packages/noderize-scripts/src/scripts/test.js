const path = require("path");
const { appDirectory } = require("../utils");
const chalk = require("chalk");
const { execSync } = require("child_process");
const jest = require("jest");

async function run(args = []) {
	console.log(`${chalk.yellowBright("[INFO]")} Testing...`);

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

	const config = {
		rootDir: appDirectory,
		roots: ["<rootDir>/src"],
		transform: {
			"^.+\\.(ts|js)$": path.resolve(__dirname, "..", "jestBabel.js")
		},
		moduleFileExtensions: ["ts", "js"],
		testRegex: ".*\\.test\\.(ts|js)$"
	};

	args.push("--config", JSON.stringify(config));

	jest.run(args);
}

module.exports = { run };
