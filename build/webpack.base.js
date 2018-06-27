const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const createTransformer = require('ts-plugin-mmlpx').default;
const resolve = dir => path.join(__dirname, '..', dir);

exports.baseWebpackConfig = {
	context: path.resolve(__dirname, '..'),
	output: {
		path: resolve('dist')
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
	},
	bail: true,
	module: {
		rules: [
			{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
				include: [resolve('src')],
				// 优化依赖库体积
				options: {
					transpileOnly: true,
					compilerOptions: {
						module: 'es2015'
					},
					getCustomTransformers: () => ({
						before: [
							createTransformer()
						]
					})
				}
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: '[name]-[hash:7].[ext]'
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: '[name]-[hash:7].[ext]'
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: '[name]-[hash:7].[ext]'
				}
			}
		]
	}
};
