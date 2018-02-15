import { fork } from "child_process";
import { getOptions } from "../options";
import { printInfo, printWarn } from "../utils/print";

export default async args => {
	start(getOptions(args));
};

export function start(options) {
	printInfo("Starting...");
	console.log(); // Padding

	const child = fork(options.startFile, options.args._, {
		execArgv: ["-r", "source-map-support/register"]
	});

	child.on("exit", (code, signal) => {
		if (code !== null) {
			console.log(); // Padding
			if (code === 0) {
				printInfo("Exited gracefully!");
			} else {
				printWarn(
					`Exited with code ${code} ${signal ? `and signal ${signal}` : ""}`
				);
			}
		}
	});

	return child;
}
