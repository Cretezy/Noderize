import { printError, printInfo } from "./utils/print";
import { resolveApp } from "./utils/path";
import fs from "fs-extra";

export async function copyAll(files, options) {
	await Promise.all(
		Object.keys(files).map(async source => {
			const destination = files[source];

			await copyFile(source, destination, options);
		})
	);
}

export async function copyFile(source, destination, options) {
	try {
		await fs.copy(
			resolveApp(options.srcDirectory, source),
			resolveApp(options.distDirectory, destination)
		);

		printInfo(
			`Copied ${options.srcDirectory}/${source} to ${
				options.distDirectory
			}/${destination}!`
		);
	} catch (error) {
		if (error.code === "ENOENT") {
			printError(`Could not find ${options.srcDirectory}/${source}.`);
		} else {
			printError(
				`Error copying ${options.srcDirectory}/${source} to ${
					options.distDirectory
				}/${destination}.`,
				error
			);
		}
	}
}
