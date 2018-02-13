import path from "path";
import { appDirectory } from "../utils/path";
import { getOptions } from "../options";
import { fork } from "child_process";
import { printInfo, printWarn, printDone } from "../utils/print";

export default async args => {
	printInfo("Formatting...");

	// Althought not required, parsing the args for consistency
	const options = await getOptions(args);

	const files = ["src/**/*.ts", "src/**/*.js", "src/**/*.json", "package.json"];

	const prettierPath = path.resolve(
		__dirname,
		"..",
		"node_modules",
		".bin",
		"prettier"
	);

	const child = fork(prettierPath, ["--write", ...files, ...options.args._], {
		cwd: appDirectory
	});

	child.on("exit", code => {
		const message = "Done formatting!";
		if (code === 0) {
			printDone(message);
		} else {
			printWarn(message);
		}
	});
};
