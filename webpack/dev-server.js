import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import path from 'path';
import commonConfig from './common.config';
import ENV_VARS from './env';

const config = commonConfig(ENV_VARS);

config.entry.unshift(
	'react-hot-loader/patch',
	`webpack-dev-server/client?http://localhost:${ENV_VARS.PORT}/`,
	'webpack/hot/only-dev-server'
);

config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NamedModulesPlugin());

new WebpackDevServer(webpack(config), {
	port: ENV_VARS.PORT,
	inline: true,
	hot: true,
	compress: true,
	historyApiFallback: true,
	contentBase: path.join(__dirname, '..', 'dist'),
	// proxy: {
	// 	'/api': {
	// 		target: ENV_VARS.API_URL,
	// 		secure: false,
	// 		changeOrigin: true,
	// 	},
	// },
	stats: 'minimal',
}).listen(ENV_VARS.PORT, '0.0.0.0', (err) => {
	if (err) {
		console.log(err);
	}
	console.log(' ');
	console.log('==================>>>>>');
	console.log(`Listening at localhost:${ENV_VARS.PORT}`);
	console.log(`app-name: ${process.env.APP_NAME}`);
	console.log(`apiProxi: ${ENV_VARS.API_URL}`);
	console.log('------------------------>>>>>>>>');
	console.log(' ');
});