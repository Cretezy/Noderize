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

const script = args.shift();
if (!Object.keys(commands).includes(script)) {
	console.log(`${chalk.red("[WARN]")} Unknown script.`);
	return;
}

commands[script].run(args);
