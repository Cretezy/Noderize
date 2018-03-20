import path from "path";
import { getOptions } from "../options";
import { appDirectory } from "../utils/path";
import spawn from "cross-spawn";
import { printInfo, printWarn, printDone } from "../utils/print";

export default async (args, fullArgs) => {
	printInfo("Formatting...");

	const options = getOptions(null);

	const srcPrefixed = ["**/*.ts", "**/*.js", "**/*.json"].map(file =>
		path.join(options.srcDirectory, file)
	);
	const files = [...srcPrefixed, "package.json"];

	const prettierPath = path.resolve(
		__dirname,
		"..",
		"node_modules",
		".bin",
		"prettier"
	);

	const child = spawn(
		fullArgs[0],
		[prettierPath, "--write", ...files, ...args],
		{
			cwd: appDirectory,
			stdio: "inherit"
		}
	);

	child.on("exit", code => {
		const message = "Done formatting!";
		if (code === 0) {
			printDone(message);
		} else {
			printWarn(message);
		}
	});
};
