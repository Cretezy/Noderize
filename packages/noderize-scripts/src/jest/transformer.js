import { createTransformer } from "babel-jest";

import createBabelConfig from "../createBabelConfig";
import typescript from "typescript";
import tsConfig from "../tsconfig.json";

export function process(src, path, ...rest) {
	const isTypeScript = path.endsWith(".ts") || path.endsWith(".tsx");
	const isJavaScript = path.endsWith(".js") || path.endsWith(".jsx");

	if (isTypeScript) {
		src = typescript.transpile(src, tsConfig.compilerOptions, path, []);
	}

	if (isJavaScript || isTypeScript) {
		const fileName = isJavaScript ? path : "file.js";

		src = createTransformer({
			...createBabelConfig()
		}).process(src, fileName, ...rest);
	}

	return src;
}
