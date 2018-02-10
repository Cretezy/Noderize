const { fork } = require("child_process");
const { getOptions } = require("../options");
const {printInfo, printWarn} = require("../printUtils");

async function run(args) {
	start(await getOptions(args));
}

function start(options) {
	printInfo(`Starting...`);
	console.log(); // Padding

	const child = fork(options.output, options.args._, {
		execArgv: ["-r", "source-map-support/register"]
	});

	child.on("exit", (code, signal) => {
		if (code !== null) {
			console.log(); // Padding
			if (code === 0) {
				printInfo(`Existed gracefully!`);
			} else {
				printWarn(`Exited with code ${code} ${
					signal ? `and signal ${signal}` : ""
					}`);
			}
		}
	});

	return child;
}

module.exports = { run, start };
