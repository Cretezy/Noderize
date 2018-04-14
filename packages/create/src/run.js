import chalk from "chalk";
import { resolve } from "path";
import fs from "fs-extra";
import { execSync } from "child_process";
import log from "consola";

export async function run(
	name = null,
	{ typescript = false, forceNpm = false, forceYarn = false } = {}
) {
	if (!name) {
		log.warn(`No path given!`);
		process.exit(1);
		return;
	}

	// Get absolute path
	const path = resolve(await fs.realpath(process.cwd()), name);

	// Check if exist
	if (await fs.exists(path)) {
		log.warn(`Path exists!`);
		process.exit(1);
		return;
	}

	log.start(`Copying...`);

	// Copy from template
	try {
		await fs.copy(resolve(__dirname, "..", "template"), path);
	} catch (error) {
		error(`Error copying.`, error);
		process.exit(1);
		return;
	}

	log.info(`Setting up...`);

	// Set the "name" field in package.json
	try {
		const childPackagePath = resolve(path, "package.json");
		// Read
		const childPackage = await fs.readJson(childPackagePath);
		const newChildPackage = { name, ...childPackage }; // Hack to put name at front
		if (typescript) {
			newChildPackage.noderize = { languages: "typescript" };
		}
		// Write
		await fs.writeJson(childPackagePath, newChildPackage, { spaces: "\t" });
	} catch (error) {
		log.error(`Error saving package.json.`);
		log.error(error);
		process.exit(1);
		return;
	}

	// Move "gitignore" to ".gitignore"
	try {
		await fs.rename(resolve(path, "gitignore"), resolve(path, ".gitignore"));
	} catch (error) {
		log.error(`Error moving .gitignore.`);
		log.error(error);
		process.exit(1);
		return;
	}

	if (typescript) {
		// Setup TypeScript
		try {
			await fs.rename(
				resolve(path, "src", "index.js"),
				resolve(path, "src", "index.ts")
			);
		} catch (error) {
			log.error(`Error moving src/index.js to src/index.ts.`);
			log.error(error);
			process.exit(1);
			return;
		}
	}

	log.info(`Installing packages...`);
	console.log();

	const useYarn = forceYarn ? true : forceNpm ? false : shouldUseYarn();
	try {
		// Install latest
		if (useYarn) {
			execSync("yarn add -D @noderize/scripts", {
				cwd: path,
				stdio: "inherit"
			});
		} else {
			execSync("npm install -D @noderize/scripts", {
				cwd: path,
				stdio: "inherit"
			});
		}
		if (useYarn) {
			execSync("yarn add @noderize/runtime", { cwd: path, stdio: "inherit" });
		} else {
			execSync("npm install @noderize/runtime", {
				cwd: path,
				stdio: "inherit"
			});
		}
	} catch (error) {
		log.error(`Error installing packages.`);
		log.error(error);
		process.exit(1);
		return;
	}

	const runCommand = useYarn ? "yarn" : "npm run";

	console.log();
	log.success(`Done! Your Noderize app is ready!`);
	log.success(`You may visit your app with ${chalk.cyan(`cd ${name}`)}`);
	log.success(`Develop by using ${chalk.cyan(`${runCommand} watch`)}`);
	log.success(
		`Build a production version using ${chalk.cyan(`${runCommand} build`)}`
	);
	log.success(
		`Visit documentation at ${chalk.cyan(`https://noderize.js.org`)}`
	);
}

function shouldUseYarn() {
	try {
		execSync("yarn --version", { stdio: "ignore" });
		return true;
	} catch (error) {
		return false;
	}
}
