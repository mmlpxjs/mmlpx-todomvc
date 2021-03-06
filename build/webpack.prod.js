const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { baseWebpackConfig } = require('./webpack.base');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const config = require('./config');

const env = process.env.NODE_ENV;
const publicPath = config.prod.publicPath;
const buildOutputDir = config.prod.buildOutputPath;

const webpackConfig = merge(baseWebpackConfig, {
	entry: {
		'app': './src/index.tsx',
	},
	devtool: '#source-map',
	stats: {
		chunks: false,
		chunkModules: false,
		modules: false,
		children: true,
	},
	output: {
		path: buildOutputDir,
		filename: '[name]-[chunkhash:8].min.js',
		publicPath,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{ loader: 'css-loader' }]
				})
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(config.prod.buildOutputPath, { root: path.join(__dirname, '..') }),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(env)
		}),
		new UglifyJsPlugin({
			uglifyOptions: {
				compress: {
					warnings: false
				}
			},
			sourceMap: true,
			parallel: true
		}),
		// extract css into its own file
		new ExtractTextPlugin({
			filename: '[name].css',
			// Setting the following option to `false` will not extract CSS from codesplit chunks.
			// Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
			// It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
			// increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
			allChunks: true,
		}),
		// Compress extracted CSS. We are using this plugin so that possible
		// duplicated CSS from different components can be deduped.
		new OptimizeCSSPlugin({
			cssProcessorOptions: { safe: true, map: { inline: false } }
		}),
		new HtmlWebpackInlineSourcePlugin(),
		// generate dist index.html with correct asset hash for caching.
		// you can customize output by editing /index.html
		// see https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './src/index.html',
			inlineSource: /manifest-\w+\.min\.js$/,
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
				// more options:
				// https://github.com/kangax/html-minifier#options-quick-reference
			},
			// necessary to consistently work with multiple chunks via CommonsChunkPlugin
			chunksSortMode: 'dependency'
		}),
		// keep module.id stable when vendor modules does not change
		new webpack.HashedModuleIdsPlugin(),
		// enable scope hoisting
		new webpack.optimize.ModuleConcatenationPlugin(),
		// split vendor js into its own file
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks(module) {
				// any required modules inside node_modules are extracted to vendor
				return (
					module.resource &&
					/\.js$/.test(module.resource) &&
					module.resource.indexOf(
						path.join(__dirname, '../node_modules')
					) === 0
				);
			}
		}),
		// extract webpack runtime and module manifest to its own file in order to
		// prevent vendor hash from being updated whenever app bundle is updated
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			minChunks: Infinity
		}),
		// This instance extracts shared chunks from code splitted chunks and bundles them
		// in a separate chunk, similar to the vendor chunk
		// see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'app',
		// 	async: 'vendor-async',
		// 	children: true,
		// 	minChunks: 3
		// }),
	]
});

// if (config.build.bundleAnalyzerReport) {
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// webpackConfig.plugins.push(new BundleAnalyzerPlugin());
// }

module.exports = webpackConfig;
