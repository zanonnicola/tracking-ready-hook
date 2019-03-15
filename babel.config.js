module.exports = {
	presets: [
		['@babel/env', {loose: true, modules: false}],
		'@babel/react'
	],
	env: {
		test: {
			presets: [['@babel/env', {
				targets: {
					node: 'current'
				}}], ['@babel/react']]
		}
	}
};
