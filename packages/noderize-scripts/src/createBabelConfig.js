module.exports = ({ targets } = {}) => ({
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
