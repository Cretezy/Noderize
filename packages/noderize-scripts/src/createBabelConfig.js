module.exports = ({ modules, targets } = {}) => ({
	presets: [
		[
			"@babel/preset-env",
			{
				targets
			}
		],
		"@babel/preset-flow"
	],
	plugins: [
		"@babel/plugin-proposal-object-rest-spread",
		"@babel/plugin-proposal-class-properties"
	]
});
