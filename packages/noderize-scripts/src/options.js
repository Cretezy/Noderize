const { resolveApp } = require("./utils");
const merge = require("lodash.merge");

const {
	noderize: { dist = {}, ...options } = {},
	...childPackage
} = require(resolveApp("package.json"));

if (undefinedOrNull(options.shebang)) {
	options.shebang = !undefinedOrNull(childPackage.bin);
}

if (undefinedOrNull(options.targets)) {
	options.targets = { node: true };
}

if (undefinedOrNull(options.entry)) {
	options.entry = "src/index.js";
}

if (undefinedOrNull(options.sources)) {
	options.sources = ["src"];
}

if (undefinedOrNull(options.sourcemap)) {
	options.sourcemap = "cheap-module-eval-source-map";
}

if (undefinedOrNull(options.output)) {
	options.output = childPackage.main || "dist/index.js";
}

if (undefinedOrNull(options.runOnWatch)) {
	options.runOnWatch = true;
}

if (undefinedOrNull(options.minify)) {
	options.minify = false;
}

if (undefinedOrNull(options.includeExternal)) {
	options.includeExternal = false;
}

const distOptions = merge(
	{},
	options,
	{ targets: { node: "6" }, minify: true },
	dist
);

module.exports = { options, distOptions, childPackage };

function undefinedOrNull(value) {
	return value === undefined || value === null;
}
