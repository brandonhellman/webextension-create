const webpack = require('webpack');

const webpackConfig = require('../webpack/webpack.config');

require('../utils/tsconfigSetup');

const compiler = webpack(webpackConfig);

compiler.run((err, stats) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Building finished in ${stats.endTime - stats.startTime}ms.`);
  }
});
