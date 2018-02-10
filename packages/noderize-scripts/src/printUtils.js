const chalk = require("chalk");

function printInfo(text) {
	console.log(`${chalk.blueBright("[INFO]")} ${text}`);
}

function printDone(text) {
	console.log(`${chalk.greenBright("[DONE]")} ${text}`);
}

function printWarn(text) {
	console.warn(`${chalk.yellowBright("[WARN]")} ${text}`);
}

function printError(text, error = null) {
	console.error(`${chalk.redBright("[ERROR]")} ${text}`);
	error && console.error(error);
}

module.exports = {
	printInfo,
	printDone,
	printError,
	printWarn
};
