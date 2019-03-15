import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import {terser} from 'rollup-plugin-terser';
import {plugin as analyze} from 'rollup-plugin-analyzer';

export default [
	// Browser-friendly UMD build
	{
		input: 'src/index.js',
		output: {
			file: 'lib/index.umd.js',
			format: 'umd',
			name: 'trackingIsLoaded'
		},
		plugins: [
			peerDepsExternal(),
			babel({
				exclude: ['node_modules/**']
			}),
			terser(),
			analyze()
		]
	},
	{
		input: 'src/index.js',
		external: ['ms'],
		output: {
			file: 'lib/index.cjs.js',
			format: 'cjs'
		},
		plugins: [
			peerDepsExternal(),
			babel({
				exclude: ['node_modules/**']
			}),
			terser(),
			analyze()
		]
	},
	{
		input: 'src/index.js',
		external: ['ms'],
		output: {
			file: 'lib/index.esm.js',
			format: 'es'
		},
		plugins: [
			peerDepsExternal(),
			babel({
				exclude: ['node_modules/**']
			}),
			terser(),
			analyze()
		]
	}
];
