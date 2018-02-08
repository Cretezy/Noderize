module.exports = ({ modules, targets } = {}) => ({
	presets: [
		[require.resolve("@babel/preset-env"), {
			targets,
		}]
	],
	plugins: [
		require.resolve("@babel/plugin-proposal-object-rest-spread"),
		require.resolve("@babel/plugin-proposal-class-properties"),
	]
});
