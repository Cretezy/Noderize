import { createTransformer } from "babel-jest";

import createBabelConfig from "./createBabelConfig";
import typescript from "typescript";
import tsConfig from "./tsconfig.json";
import { getOptions } from "./options";

const options = getOptions(null, "test");

export function process(src, path, ...rest) {
	const isTypeScript = path.endsWith(".ts");
	const isJavaScript = path.endsWith(".js");

	if (isTypeScript && options.languages.typescript) {
		src = typescript.transpile(src, tsConfig.compilerOptions, path, []);
	}

	if (isJavaScript || isTypeScript) {
		// Must use a temporary file name if TypeScript.
		const fileName = isJavaScript ? path : "file.js";

		src = createTransformer({
			...createBabelConfig(options)
		}).process(src, fileName, ...rest);
	}

	return src;
}
