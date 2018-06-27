/**
 * @author  fang.yang
 * @date on 2018.01.09
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const { baseWebpackConfig, styleLoader } = require('./webpack.base');
const config = require('./config');

const srcCodeDir = path.join(__dirname, '../src');
const publicPath = config.dev.publicPath;

module.exports = merge(baseWebpackConfig, {
	entry: {
		app: './src/index.tsx'
	},
	devServer: {
		clientLogLevel: 'warning',
		// host: "0.0.0.0",
		historyApiFallback: {
			rewrites: [
				{ from: /.*/, to: path.posix.join(publicPath, 'index.html') },
			],
		},
		hot: true,
		contentBase: srcCodeDir,
		compress: true,
		open: true,
		overlay: { warnings: false, errors: true },
	},
	devtool: 'cheap-module-eval-source-map',
	output: {
		filename: '[name].js',
		publicPath,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"development"',
			'process.env.LOGGER_LEVEL': JSON.stringify('info')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
		new webpack.NoEmitOnErrorsPlugin(),
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.html',
			inject: true
		}),
	]
});
