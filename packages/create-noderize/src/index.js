import { ncp } from "ncp";
import chalk from "chalk";
import { promisify } from "util";
import { resolve } from "path";
import fs from "fs";
import { execSync } from "child_process";
import parseArgs from "minimist";

export async function run(
	name,
	{ typescript = false, forceNpm = false, forceYarn = false } = {}
) {
	if (!name) {
		printWarn(`No path given!`);
		return;
	}

	// Get absolute path
	const path = resolve(fs.realpathSync(process.cwd()), name);

	// Check if exist
	if (fs.existsSync(path)) {
		printWarn(`Path exists!`);
		return;
	}

	printInfo(`Copying...`);

	// Copy from template
	try {
		await promisify(ncp)(resolve(__dirname, "..", "template"), path);
	} catch (error) {
		error(`Error copying.`, error);
		return;
	}

	printInfo(`Setting up...`);

	// Set the "name" field in package.json
	try {
		const childPackagePath = resolve(path, "package.json");
		// Read
		const childPackage = JSON.parse(fs.readFileSync(childPackagePath));
		const newChildPackage = { name, ...childPackage }; // Hack to put name at front
		if (typescript) {
			newChildPackage.noderize = { languages: "typescript" };
		}
		// Write
		fs.writeFileSync(
			childPackagePath,
			JSON.stringify(newChildPackage, null, "\t")
		);
	} catch (error) {
		printError(`Error saving package.json.`, error);
	}

	// Move "gitignore" to ".gitignore"
	try {
		fs.renameSync(resolve(path, "gitignore"), resolve(path, ".gitignore"));
	} catch (err) {
		printError(`Error moving .gitignore.`, error);
	}

	if (typescript) {
		// Setup TypeScript
		try {
			fs.renameSync(
				resolve(path, "src", "index.js"),
				resolve(path, "src", "index.ts")
			);
		} catch (error) {
			printError(`Error moving src/index.js to src/index.ts.`, error);
		}
	}

	printInfo(`Installing packages...`);
	console.log();

	const useYarn = forceYarn ? true : forceNpm ? false : shouldUseYarn();
	try {
		// Install latest
		if (useYarn) {
			execSync("yarn add -D noderize-scripts", { cwd: path, stdio: "inherit" });
		} else {
			execSync("npm install -D noderize-scripts", { cwd: path, stdio: "inherit" });
		}
	} catch (error) {
		printError(`Error installing packages.`, error);
	}

	const runCommand = useYarn ? "yarn" : "npm run";

	console.log();
	printDone(`Done! Your Noderize app is ready!`);
	printDone(`You may visit your app with ${chalk.cyan(`cd ${name}`)}`);
	printDone(`Develop by using ${chalk.cyan(`${runCommand} watch`)}`);
	printDone(
		`Build a production version using ${chalk.cyan(`${runCommand} build`)}`
	);
	printDone(`Visit documentation at ${chalk.cyan(`https://noderize.js.org`)}`);
}

function shouldUseYarn() {
	try {
		execSync("yarn --version", { stdio: "ignore" });
		return true;
	} catch (e) {
		return false;
	}
}

// Parse args
const args = parseArgs(process.argv.slice(2));
const name = args._.length > 0 ? args._[0] : null;

run(name, args);

function printInfo(text) {
	console.log(`${chalk.blueBright("[INFO]")} ${text}`);
}

function printDone(text) {
	console.log(`${chalk.greenBright("[DONE]")} ${text}`);
}

function printWarn(text) {
	console.warn(`${chalk.yellowBright("[WARN]")} ${text}`);
}

function printError(text, error) {
	console.error(`${chalk.redBright("[ERROR]")} ${text}`);
	console.error(error);
}
