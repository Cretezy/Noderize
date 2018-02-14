export default ({
	targets = { node: true },
	babel: { presets, plugins }
} = {}) => ({
	presets: [
		[
			"@babel/preset-env",
			{
				targets
			}
		],
		"@babel/preset-stage-2",
		"@babel/preset-flow",
		...presets
	],
	plugins: ["@babel/plugin-proposal-decorators", ...plugins]
});
