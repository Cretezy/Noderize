import chalk from "chalk";

export function printInfo(text) {
	console.log(`${chalk.blueBright("[INFO]")} ${text}`);
}

export function printDone(text) {
	console.log(`${chalk.greenBright("[DONE]")} ${text}`);
}

export function printWarn(text) {
	console.warn(`${chalk.yellowBright("[WARN]")} ${text}`);
}

export function printDebug(text) {
	console.log(`${chalk.magentaBright("[DEBUG]")} ${text}`);
}

export function printError(text, error = null) {
	console.error(`${chalk.redBright("[ERROR]")} ${text}`);
	error && console.error(error);
}

export function printLines(printMethod, lines, prefix = "") {
	lines.split("\n").forEach(line => printMethod(`${prefix}${line}`));
}
