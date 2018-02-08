const path = require("path");
const babelJest = require("babel-jest");
const createBabelConfig = require("./createBabelConfig");
const typescript = require('typescript');
const tsConfig = path.resolve(__dirname, "tsconfig.json");

module.exports.process = (src, path, ...rest) => {
	const isTypeScript = path.endsWith('.ts') || path.endsWith('.tsx');
	const isJavaScript = path.endsWith('.js') || path.endsWith('.jsx');

	if (isTypeScript) {
		src = typescript.transpile(
			src,
			tsConfig.compilerOptions,
			path,
			[],
		);
	}

	if (isJavaScript || isTypeScript) {
		const fileName = isJavaScript
			? path
			: 'file.js';

		src = babelJest.createTransformer({
			...createBabelConfig(),
			babelrc: false
		}).process(
			src,
			fileName,
			...rest
		);
	}

	return src;
};
