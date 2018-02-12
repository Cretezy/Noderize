import { getOptions } from "../options";
import { printInfo, printError, printDone } from "../utils/print";
import { getCompiler, printStats } from "../webpack";
import { copyAll } from "../copy";

export default async args => {
	printInfo(`Building...`);

	const options = await getOptions(args);

	const compiler = getCompiler(options);

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
	} catch (error) {
		printError("Error building.", error);
		return;
	}

	console.log();

	// Copy
	await copyAll(options.static);

	printDone("Done!");
};
