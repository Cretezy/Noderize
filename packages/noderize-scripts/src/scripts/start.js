const chalk = require("chalk");
const { fork } = require("child_process");
const { getOptions } = require("../options");

async function run(args) {
	start(await getOptions(args));
}

function start(options) {
	console.log(`${chalk.blueBright("[INFO]")} Starting...`);
	console.log(); // Padding
	
	const child = fork(options.output, options.args._, {
		execArgv: ["-r", "source-map-support/register"]
	});

	child.on("exit", (code, signal) => {
		if (code !== null) {
			console.log(); // Padding
			if (code === 0) {
				console.log(`${chalk.greenBright("[INFO]")} Exited with code 0!`);
			} else {
				console.warn(
					`${chalk.yellowBright("[INFO]")} Exited with code ${code} ${
						signal ? `and signal ${signal}` : ""
						}`
				);
			}
		}
	});

	return child;
}

module.exports = { run, start };
