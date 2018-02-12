export default ({ targets = { node: true } } = {}) => ({
	presets: [
		[
			"@babel/preset-env",
			{
				targets
			}
		],
		"@babel/preset-stage-2",
		"@babel/preset-flow"
	],
	plugins: ["@babel/plugin-proposal-decorators"]
});
