const path = require("path");
const { appDirectory } = require("../appPathsUtils");
const { getOptions } = require("../options");
const { fork } = require("child_process");
const {printInfo, printWarn, printDone} = require("../printUtils");

async function run(args) {
	printInfo(`Formatting...`);

	// Althought not required, I'm parsing the args for consistency
	const options = await getOptions(args);

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
		["--write", "src/**/*.ts", "src/**/*.js", ...options.args._],
		{
			cwd: appDirectory
		}
	);

	child.on("exit", code => {
		if (code === 0) {
			printDone("Done!")
		} else {
			printWarn("Done!")
		}
	});
}

module.exports = { run };
