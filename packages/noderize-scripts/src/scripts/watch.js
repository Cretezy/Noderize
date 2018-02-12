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
	printInfo(`Watching...`);

	const options = await getOptions(args);
	const compiler = getCompiler(options);

	let child;

	compiler.watch(
		{
			ignored: /node_modules/
		},
		(err, stats) => {
			console.log();
			printInfo(`Building...`);
			console.log();
			printStats(stats, options);
			console.log();

			if (child) {
				child.kill();
			}
			if (options.runOnWatch && !stats.hasErrors()) {
				child = start(options);
			}
		}
	);

	// Get real file paths
	const files = Object.keys(options.static).reduce(
		(files, source) => ({
			...files,
			[resolveApp("src", source)]: {
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
					const root = Object.keys(files).find(fullFilePath => {
						if (pathIsInside(path, fullFilePath)) {
							console.log("found inside", path, fullFilePath);
							return true;
						}
					});

					if (root) {
						file = files[root];
					}
				}

				if (file) {
					copyFile(file.source, file.destination);
				}
			}
		}, 100);
	};

	const staticWatcher = chokidar.watch(Object.keys(files), {
		ignoreInitial: true,
		disableGlobbing: true
	});

	staticWatcher.on("ready", () => {
		// Copy all files at the start
		copyAll(options.static);
	});

	staticWatcher.on("add", fileChange);
	staticWatcher.on("addDir", fileChange);
	staticWatcher.on("change", fileChange);
};
