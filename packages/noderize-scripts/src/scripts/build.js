const { options, distOptions } = require("../options");
const chalk = require("chalk");
const parseArgs = require("minimist");
const supportsColor = require("supports-color");
const { getCompiler } = require("../webpack");

async function run(args) {
	console.log(`${chalk.yellowBright("[INFO]")} Building...`);
	const { dist } = parseArgs(args, { boolean: "dist" });

	const compiler = getCompiler(dist ? distOptions : options);

	try {
		const stats = await new Promise((resolve, reject) => {
			compiler.run((err, stats) => {
				if (err) {
					reject(err);
				} else {
					resolve(stats);
				}
			});
		});

		console.log(stats.toString({ colors: supportsColor.stdout }));
	} catch (error) {
		console.log(`${chalk.redBright("[ERROR]")} Error building.`);
		console.error(error);
		return;
	}

	console.log(`${chalk.greenBright("[INFO]")} Done!`);
}

module.exports = {
	run
};
