import { getOptions } from "../options";
import { start } from "./start";
import { printInfo } from "../utils/print";
import chokidar from "chokidar";
import { getCompiler, printStats } from "../webpack";
import { resolveApp } from "../utils/path";
import { copyAll, copyFile } from "../copy";
import pathIsInside from "path-is-inside";
import fs from "fs-extra";

export default async args => {
	printInfo("Watching...");

	const options = getOptions(args);
	const compiler = await getCompiler(options);
	let child;

	let errors = false;
	let childRunning = false;

	compiler.watch(
		{
			ignored: /node_modules/
		},
		async (err, stats) => {
			console.log();
			printInfo("Building...");
			console.log();
			printStats(stats, options);
			console.log();

			if (options.runOnWatch) {
				if (child) {
					child.kill();
				}
				child = await start(options);
			}
		}
	);

	// Get real file paths
	const files = Object.keys(options.static).reduce(
		(files, source) => ({
			...files,
			[resolveApp(options.srcDirectory, source)]: {
				source,
				destination: options.static[source]
			}
		}),
		{}
	);

	const fileChange = path => {
		setTimeout(async () => {
			// Wait 100ms before checking if the file still exist.
			// This is because some editors (i.e.: JetBrain editors) create
			// a tmp file while writing, which triggers a "add" event
			// then gets deleted right after, and we don't want to copy that.

			const exists = await fs.exists(path);
			if (exists) {
				let file;
				if (files[path]) {
					// Watching directly the file
					file = files[path];
				} else {
					// File is in subdirectory that is being watched
					file =
						files[
							Object.keys(files).find(fullFilePath =>
								pathIsInside(path, fullFilePath)
							)
						];
				}

				if (file) {
					await copyFile(file.source, file.destination, options);
				}
			}
		}, 100);
	};

	const staticWatcher = chokidar.watch(Object.keys(files), {
		ignoreInitial: true,
		disableGlobbing: true
	});

	staticWatcher.on("ready", async () => {
		// Copy all files at the start
		await copyAll(options.static, options);
	});

	staticWatcher.on("add", fileChange);
	staticWatcher.on("addDir", fileChange);
	staticWatcher.on("change", fileChange);

	process.on("exit", () => {
		if (child) {
			child.kill();
		}
	});
};
