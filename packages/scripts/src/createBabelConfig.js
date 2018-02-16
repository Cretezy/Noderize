export default ({
	targets,
	babel: { presets = [], plugins = [] },
	runtime = "include"
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
	plugins: [
		"@babel/plugin-proposal-decorators",
		(runtime === "noderize" || runtime === "include") &&
			"@babel/plugin-transform-runtime",
		...plugins
	].filter(Boolean)
});
