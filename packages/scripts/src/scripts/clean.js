import { printInfo, printError, printDone } from "../utils/print";
import { resolveApp } from "../utils/path";
import fs from "fs-extra";

export default async args => {
	printInfo("Cleaning...");

	try {
		await fs.remove(resolveApp(options.distDirectory));

		printDone("Done cleaning!");
	} catch (error) {
		printError("Error deleting files.", error);
	}
};
