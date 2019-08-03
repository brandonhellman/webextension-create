const webpack = require('webpack');

const webpackConfig = require('../webpack/webpack.config');

const compiler = webpack(webpackConfig);

compiler.run((err, stats) => {
  console.log(err ? 'error' : stats);
});
