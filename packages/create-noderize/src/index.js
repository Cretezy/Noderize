import { ncp } from "ncp";
import chalk from "chalk";
import { promisify } from "util";
import { resolve } from "path";
import fs from "fs";
import { execSync } from "child_process";

(async () => {
	// Get name/path from CLI
	const name = process.argv[2];

	if (!name) {
		console.log(`${chalk.red("[INFO]")} No path given!`);
		return;
	}

	// Get absolute path
	const path = resolve(fs.realpathSync(process.cwd()), name);

	if (fs.existsSync(path)) {
		console.log(`${chalk.red("[INFO]")} Path exists!`);
		return;
	}

	console.log(`${chalk.yellowBright("[INFO]")} Copying...`);

	// Copy from template
	try {
		await promisify(ncp)(resolve(__dirname, "..", "template"), path);
	} catch (error) {
		console.error(`${chalk.redBright("[ERROR]")} Error copying.`);
		console.error(error);
		return;
	}

	// Set the "name" field in package.json
	try {
		const childPackagePath = resolve(path, "package.json");
		// Read
		const childPackage = JSON.parse(fs.readFileSync(childPackagePath));
		const newChildPackage = { name, ...childPackage }; // Hack to put name at front
		// Write
		fs.writeFileSync(
			childPackagePath,
			JSON.stringify(newChildPackage, null, "\t")
		);
	} catch (error) {
		console.error(`${chalk.redBright("[ERROR]")} Error setting name.`);
		console.error(error);
	}

	console.log(`${chalk.yellowBright("[INFO]")} Installing packages...`);

	try {
		// Install using yarn/npm
		if (shouldUseYarn()) {
			execSync("yarn", { cwd: path });
		} else {
			execSync("npm install", { cwd: path });
		}
	} catch (error) {
		console.error(`${chalk.redBright("[ERROR]")} Error installing packages.`);
		console.error(error);
	}

	console.log(`${chalk.greenBright("[INFO]")} Done!`);
})();

function shouldUseYarn() {
	try {
		execSync("yarn --version", { stdio: "ignore" });
		return true;
	} catch (e) {
		return false;
	}
}
