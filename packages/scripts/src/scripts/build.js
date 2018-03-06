import { getOptions } from "../options";
import { printInfo, printError, printDone } from "../utils/print";
import { getCompiler, printStats } from "../webpack";
import { copyAll } from "../copy";

export default async args => {
	printInfo("Building...");
	console.log();

	const options = getOptions(args);

	const compiler = await getCompiler(options);

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

		printStats(stats, options);
		console.log();

		// Copy
		if (Object.keys(options.static).length > 0) {
			await copyAll(options.static, options);
			console.log();
		}

		printDone("Done building!");
	} catch (error) {
		printError("Error building.", error);
	}
};
