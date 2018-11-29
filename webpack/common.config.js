import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import OpenBrowserPlugin from 'open-browser-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

require('dotenv').config();

// ENTRIES
const entries = [
	'./src/app.jsx',
	'./assets/scss/global.scss',
];

const cssLoaders = (hasHash, isProd) => [{
	loader: 'css-loader',
	options: {
		modules: true,
		importLoaders: 1,
		localIdentName: `[local]${hasHash ? '__[hash:base64:8]' : ''}`,
		discardComments: isProd,
	},
}, {
	loader: 'postcss-loader',
}, {
	loader: 'sass-loader',
	options: {
		outputStyle: 'expanded',
		sourcemaps: !isProd,
		plugins: () => [require('autoprefixer')],
	},
}];

const cssLoaderConfig = (hasHash, prod) => hasHash ? cssLoaders(hasHash, prod) : [ExtractCssChunks.loader, ...cssLoaders(hasHash, prod)];

// PLUGINS
const commonPlugins = env => [
	new CleanWebpackPlugin(__dirname, '..', 'dist', {}),
	new webpack.DefinePlugin({
		NODE_ENV: JSON.stringify(env.NODE_ENV),
		APP_NAME: JSON.stringify(env.APP_NAME),
		API_URL: JSON.stringify(env.API_URL),
		PORT: JSON.stringify(env.PORT),
	}),
	new HtmlWebpackPlugin({
		inject: true,
		template: path.join(__dirname, '..', 'assets', 'index.html'),
		filename: 'index.html',
	}),
	new ExtractCssChunks({
		filename: '[name].[contenthash:8].css',
		allChunks: true,
	}, ),
	new CopyWebpackPlugin([{
		from: path.resolve(__dirname, '..', 'assets', 'images'),
		to: './images',
	}, {
		from: path.resolve(__dirname, '..', 'assets', 'fonts'),
		to: './fonts',
	}]),
	new webpack.NoEmitOnErrorsPlugin(),
];

const devPlugins = port => [
	new WebpackNotifierPlugin(),
	new OpenBrowserPlugin({ url: `http://localhost:${port}` })
];

// RULES
const rules = prod => [{
	test: /\.(js|jsx)$/i,
	use: [{
		loader: 'babel-loader'
	}],
	include: [path.join(__dirname, '..', 'src')],
}, {
	test: /\.(ts|tsx)?$/,
	include: path.resolve(__dirname, '..', 'src'),
	use: [{
		loader: 'ts-loader'
	}],
}, {
	test: /\.(css|scss)$/i,
	use: [{
		loader: 'style-loader'
	}, ...cssLoaderConfig(false, prod)],
	exclude: [path.join(__dirname, '..', 'src')],
}, {
	test: /\.(css|scss)$/i,
	use: [{
		loader: 'style-loader'
	}, ...cssLoaderConfig(true, prod)],
	exclude: [path.join(__dirname, '..', 'assets', 'scss')],
	include: [path.join(__dirname, '..', 'src')],
}, {
	test: /\.html$/,
	use: [{
		loader: 'html-loader'
	}],
}, {
	test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
	use: [{
		loader: 'file-loader'
	}],
}, {
	test: /\.(jpe?g|png|gif|svg)$/i,
	use: [{
		loader: 'file-loader',
		options: {
			name: '[path][name].[ext]'
		}
	}],
}];

module.exports = (env) => {
	const PROD = env.NODE_ENV !== 'development';

	const minimizer = PROD ? [
		new UglifyJsPlugin({
			extractComments: true,
			minify(file) {
				const {
					error,
					map,
					code,
					warnings
				} = require('uglify-js').minify(file, {});
				return {
					error,
					map,
					code,
					warnings,
					extractedComments: {}
				};
			}
		}),
	] : [];

	const plugins = [
		...commonPlugins(env),
		...(PROD ? [
			new webpack.LoaderOptionsPlugin({
				minimize: true,
				debug: false
			}),
			new OptimizeCssAssetsPlugin({
				assetNameRegExp: /\.(css|scss)$/g,
				cssProcessor: require('cssnano'),
				cssProcessorPluginOptions: {
					preset: ['default', {
						discardComments: {
							removeAll: true
						}
					}],
				},
				canPrint: true
			})
		] : devPlugins(env.PORT)),
	];

	return {
		mode: env.NODE_ENV,
		devtool: !PROD ? 'inline-source-map' : false,
		entry: entries,
		plugins,
		resolve: {
			extensions: ['.js', '.jsx', '.scss'],
			modules: [
				'node_modules',
				path.join(__dirname, '..', 'src'),
			],
		},
		optimization: {
			minimizer,
		},
		module: {
			rules: rules(PROD),
		},
		output: {
			path: path.join(__dirname, '..', 'dist'),
			filename: 'bundle.js',
			publicPath: '/',
		},
	};
};