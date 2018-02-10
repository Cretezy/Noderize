const { getOptions } = require("../options");
const { getCompiler } = require("./build");
const { start } = require("./start");
const supportsColor = require("supports-color");
const { printInfo } = require("../printUtils");

async function run(args) {
	printInfo(`Watching...`);

	const options = await getOptions(args);
	const compiler = getCompiler(options);

	let child;
	let first = true;

	compiler.watch(
		{
			ignored: /node_modules/
		},
		(err, stats) => {
			first || console.log(); // Add padding line on rebuilds
			printInfo(`${first ? "B" : "Reb"}uilding...`);
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
