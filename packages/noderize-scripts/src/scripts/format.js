const path = require("path");
const { appDirectory } = require("../utils");
const chalk = require("chalk");
const { fork } = require("child_process");

async function run(args = []) {
	console.log(`${chalk.blueBright("[INFO]")} Formatting...`);
	const prettierPath = path.resolve(
		__dirname,
		"..",
		"..",
		"node_modules",
		".bin",
		"prettier"
	);

	const child = fork(
		prettierPath,
		["--write", "src/**/*.ts", "src/**/*.js", ...args],
		{
			cwd: appDirectory
		}
	);
	child.on("exit", code => {
		if (code === 0) {
			console.log(`${chalk.greenBright("[INFO]")} Done!`);
		} else {
			console.log(`${chalk.yellowBright("[INFO]")} Done!`);
		}
	});
}

module.exports = { run };
