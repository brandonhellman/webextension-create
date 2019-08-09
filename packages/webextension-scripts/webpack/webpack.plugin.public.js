const CopyWebpackPlugin = require('copy-webpack-plugin');

const paths = require('../utils/paths');

module.exports = new CopyWebpackPlugin([
  {
    from: paths.extPublic,
    to: paths.extUnpacked,
  },
]);
