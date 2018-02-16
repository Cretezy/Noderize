import fs from "fs";
import { resolve } from "path";

export const appDirectory = fs.realpathSync(process.cwd());
export const resolveApp = (...relativePath) =>
	resolve(appDirectory, ...relativePath);
