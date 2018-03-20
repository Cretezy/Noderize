import spawn from "cross-spawn";
import { getOptions } from "../options";
import { appDirectory } from "../utils/path";
import { printError, printInfo, printWarn } from "../utils/print";
import fs from "fs-extra";

export default async args => {
	await start(getOptions(args));
};

export async function start(options, nodePath = process.argv[0]) {
	printInfo("Starting...");
	console.log(); // Padding

	const startFileExists = await fs.exists(options.startFile);
	if (!startFileExists) {
		printError("Start file does not exists.");
		return;
	}

	const child = spawn(nodePath, [options.startFile, ...options.args._], {
		execArgv: ["-r", "source-map-support/register"],
		cwd: appDirectory,
		stdio: "inherit"
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
