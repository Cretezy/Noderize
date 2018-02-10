#!/usr/bin/env node

const { printWarn } = require("./printUtils");

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
	printWarn(`Unknown script.`);
	process.exit(1);
	return;
}

commands[script].run(args);
