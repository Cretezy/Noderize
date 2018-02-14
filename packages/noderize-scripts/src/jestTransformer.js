import { createTransformer } from "babel-jest";

import createBabelConfig from "./createBabelConfig";
import typescript from "typescript";
import tsConfig from "./tsconfig.json";
import { getOptions } from "./options";

const options = getOptions();

export function process(src, path, ...rest) {
	const isTypeScript = path.endsWith(".ts");
	const isJavaScript = path.endsWith(".js");

	if (isTypeScript) {
		src = typescript.transpile(src, tsConfig.compilerOptions, path, []);
	}

	if (isJavaScript || isTypeScript) {
		const fileName = isJavaScript ? path : "file.js";

		src = createTransformer({
			...createBabelConfig(options)
		}).process(src, fileName, ...rest);
	}

	return src;
}
