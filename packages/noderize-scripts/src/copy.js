import { printError, printInfo } from "./utils/print";
import { resolveApp } from "./utils/path";
import fs from "fs-extra";

export async function copyAll(files) {
	await Promise.all(
		Object.keys(files).map(async source => {
			const destination = files[source];

			await copyFile(source, destination);
		})
	);
}

export async function copyFile(source, destination) {
	try {
		await fs.copy(resolveApp("src", source), resolveApp("dist", destination));

		printInfo(`Copied src/${source} to dist/${destination}!`);
	} catch (error) {
		if (error.code === "ENOENT") {
			printError(`Could not find src/${source}.`);
		} else {
			printError(`Error copying src/${source} to dist/${destination}.`, error);
		}
	}
}
