const chalk = require("chalk");
const { getCompiler } = require("../webpack");
const { getOptions } = require("../options");
const { start } = require("./start");
const supportsColor = require("supports-color");
const parseArgs = require("minimist");

function run(args) {
	console.log(`${chalk.yellowBright("[INFO]")} Watching...`);

	const options = getOptions(args);
	const compiler = getCompiler(options);

	let child;
	let first = true;

	compiler.watch(
		{
			ignored: /node_modules/
		},
		(err, stats) => {
			first || console.log(); // Add padding line on rebuilds
			console.log(
				`${chalk.yellowBright("[INFO]")} ${first ? "B" : "Reb"}uilding...`
			);
			first = false;
			console.log(stats.toString({ colors: supportsColor.stdout }));

			if (child) {
				child.kill();
			}
			if (options.runOnWatch && !stats.hasErrors()) {
				child = start(options);
			}
		}
	);
}

module.exports = { run };
