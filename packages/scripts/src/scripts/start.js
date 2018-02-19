import { fork } from "child_process";
import { getOptions } from "../options";
import { printError, printInfo, printWarn } from "../utils/print";
import fs from "fs-extra";

export default async args => {
	await start(getOptions(args));
};

export async function start(options) {
	printInfo("Starting...");
	console.log(); // Padding

	const startFileExists = await fs.exists(options.startFile);
	if (!startFileExists) {
		printError("Start file does not exists.");
		return;
	}

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
