const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extPath = require('../utils/getExtPath');

module.exports = new CopyWebpackPlugin([
  {
    from: path.join(extPath, 'public'),
    to: path.join(extPath, 'build'),
  },
]);
