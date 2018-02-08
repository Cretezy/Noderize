const { resolveApp } = require("./utils");
const merge = require("lodash.merge");

const { noderize: { dist = {}, ...options } = {}, ...childPackage } = require(resolveApp("package.json"));

if (undefinedOrNull(options.shebang)) {
	options.shebang = !undefinedOrNull(childPackage.bin);
}

if (undefinedOrNull(options.targets)) {
	options.targets = { node: true };
}

// if (!options.name) {
// 	options.name = childPackage.name;
// }

if (undefinedOrNull(options.entry)) {
	options.entry = "src/index.js";
}

if (undefinedOrNull(options.sourcemap)) {
	options.sourcemap = "cheap-module-eval-source-map";
}

if (undefinedOrNull()) {
	options.output = childPackage.main || "dist/index.js";
}

const distOptions = merge({}, options, dist);

module.exports = { options, distOptions, childPackage };

function undefinedOrNull(value) {
	return value === undefined || value === null;
}