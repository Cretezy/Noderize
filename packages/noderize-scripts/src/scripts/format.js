const path = require("path");
const { appDirectory } = require("../utils");
const chalk = require("chalk");
const { fork } = require("child_process");

async function run(args = []) {
	console.log(`${chalk.yellowBright("[INFO]")} Formatting...`);
	const prettierPath = path.resolve(
		__dirname,
		"..",
		"..",
		"node_modules",
		".bin",
		"prettier"
	);

	fork(prettierPath, ["--write", "src/**/*.js", ...args], {
		cwd: appDirectory
	});
}

module.exports = { run };
