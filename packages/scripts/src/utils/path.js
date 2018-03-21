import fs from "fs-extra";
import { resolve } from "path";

export const appDirectory = fs.realpathSync(process.cwd());
export const resolveApp = (...relativePath) =>
	resolve(appDirectory, ...relativePath);

export async function getBinPath(bin) {
	const local = resolve(
		__dirname,
		"..", // scripts
		"node_modules",
		".bin",
		bin
	);
	if (await fs.exists(local)) {
		return local;
	}

	const global = resolve(
		__dirname,
		"..", // scripts
		"..", // @noderize
		"..", // node_modules
		".bin",
		bin
	);

	if (await fs.exists(global)) {
		return global;
	}

	return null;
}
