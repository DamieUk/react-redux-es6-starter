import path from 'path';
import express from 'express';
import webpack from 'webpack';
import proxy from 'http-proxy-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import commonConfig from './common.config';
import ENV_VARS from './env';

const app = express();
const DIST_DIR = path.join(__dirname, './dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const config = commonConfig(ENV_VARS);
const compiler = webpack(config);

const apiPortvaktProxy = proxy('/portvakt', {
  target: ENV_VARS.API_URL,
  secure: false,
  changeOrigin: true
});
const apiZapisacProxy = proxy('/zapisac', {
  target: ENV_VARS.API_URL,
  secure: false,
  changeOrigin: true
});
const apiBankaProxy = proxy('/banka', {
  target: ENV_VARS.API_URL,
  secure: false,
  changeOrigin: true
});
const apiAftaleProxy = proxy('/aftale', {
  target: ENV_VARS.API_URL,
  secure: false,
  changeOrigin: true
});

app.set('port', ENV_VARS.PORT);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
app.use('/portvakt/*', apiPortvaktProxy);
app.use('/zapisac/*', apiZapisacProxy);
app.use('/banka/*', apiBankaProxy);
app.use('/aftale/*', apiAftaleProxy);

app.get('*', (req, res, next) => {
  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

app.listen(app.get('port'));