import path from "path";
import { appDirectory } from "../utils/path";
import { fork } from "child_process";
import { printInfo, printWarn, printDone } from "../utils/print";

export default async args => {
	printInfo("Formatting...");

	const files = ["src/**/*.ts", "src/**/*.js", "src/**/*.json", "package.json"];

	const prettierPath = path.resolve(
		__dirname,
		"..",
		"node_modules",
		".bin",
		"prettier"
	);

	const child = fork(prettierPath, ["--write", ...files, ...args], {
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
