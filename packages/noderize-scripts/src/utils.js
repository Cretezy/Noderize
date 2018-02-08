const fs = require("fs");
const path = require("path");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

function splitLines(lines) {
	return lines
		.toString()
		.split("\n")
		.filter(line => line);
}

module.exports = {
	appDirectory,
	resolveApp,
	splitLines
};
