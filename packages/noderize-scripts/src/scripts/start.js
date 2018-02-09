const chalk = require("chalk");
const { fork } = require("child_process");
const { getOptions } = require("../options");

async function run(args) {
	start(await getOptions(args));
}

function start(options) {
	console.log(`${chalk.yellowBright("[INFO]")} Starting...\n`);

	const child = fork(options.output, options.args._, {
		execArgv: ["-r", "source-map-support/register"]
	});

	child.on("exit", (code, signal) => {
		console.error(
			`\n${chalk.yellowBright("[INFO]")} Exited with code ${code} ${
				signal ? `and signal ${signal}` : ""
			}`
		);
	});

	return child;
}

module.exports = { run, start };
