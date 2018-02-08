#!/usr/bin/env node

const chalk = require("chalk");

const commands = {
	build: require("./scripts/build"),
	test: require("./scripts/test"),
	watch: require("./scripts/watch"),
	format: require("./scripts/format"),
	start: require("./scripts/start")
};

const args = process.argv.slice(2);

if (args.length === 0) {
	return noScript();
}

const script = args.shift();
if (!Object.keys(commands).includes(script)) {
	return noScript();
}

commands[script].run(args);

function noScript() {
	console.log(`${chalk.red("[INFO]")} Unknown script.`);
}
