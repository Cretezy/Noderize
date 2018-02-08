const { getOptions } = require("../options");
const chalk = require("chalk");
const parseArgs = require("minimist");
const supportsColor = require("supports-color");
const { getCompiler } = require("../webpack");

async function run(args) {
	console.log(`${chalk.yellowBright("[INFO]")} Building...`);

	const compiler = getCompiler(getOptions(args));

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
