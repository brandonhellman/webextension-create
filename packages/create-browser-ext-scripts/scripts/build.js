const webpack = require('webpack');

const webpackConfig = require('../webpack/webpack.config');

const compiler = webpack(webpackConfig);

compiler.run((err, stats) => {
  if (err) {
    console.log(err);
  } else {
    console.log(stats);
  }
});
