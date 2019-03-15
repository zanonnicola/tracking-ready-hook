module.exports = {
	presets: [
		['@babel/env', {loose: true, modules: false, targets: {browsers: ['ie >= 11']}}],
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
