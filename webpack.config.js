const webpack = require('webpack');
const path = require('path');
const meta = require('fs').readFileSync('./meta.js', 'utf-8');
const name = require('./package.json').name;

const ZipPlugin = require('zip-webpack-plugin');

module.exports = env => {
	const plugins = [
		new webpack.BannerPlugin({
			banner: meta,
			raw: true,
			entryOnly: true
		})
	];

	if(env.production) {
		plugins.unshift(
			new webpack.optimize.UglifyJsPlugin({
				cache: true
			})
		);

		plugins.push(
			new ZipPlugin({
				include: [/\.js$/]
			})
		);
	}

	return {
		entry: ['./src/main'],
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: `${name}.user.js`
		},

		module: {
			loaders: [
				{
					loader: 'babel-loader',

					include: [
						path.resolve(__dirname, 'src'),
					],

					test: /\.js$/,

					query: {
						plugins: ['transform-runtime'],
						presets: [
							[
								'env',
								{
									targets: { browsers: 'Chrome >= 34' }
								}
							]
						],
					}
				},
			]
		},

		plugins: plugins
	}
};
