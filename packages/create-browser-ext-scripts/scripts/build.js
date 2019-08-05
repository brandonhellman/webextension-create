const webpack = require('webpack');
const webpackFormatMessages = require('webpack-format-messages');

const webpackConfig = require('../webpack/webpack.config.production');

require('../utils/tsconfigSetup');

const compiler = webpack(webpackConfig);

compiler.run((err, stats) => {
  if (err) {
    console.log(err);
  } else {
    const messages = webpackFormatMessages(stats);

    if (!messages.errors.length && !messages.warnings.length) {
      console.log(`Compiled successfully in ${stats.endTime - stats.startTime}ms!`);
      require('../utils/zipUnpacked');
    } else if (messages.errors.length) {
      console.log('Failed to compile.');
      messages.errors.forEach((e) => console.log(e));
    } else if (messages.warnings.length) {
      console.log(`Compiled with warnings in ${stats.endTime - stats.startTime}ms,`);
      messages.warnings.forEach((w) => console.log(w));
    }
  }
});
