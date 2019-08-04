const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extPath = require('../utils/getExtPath');

module.exports = new CopyWebpackPlugin([
  {
    from: path.join(extPath, 'src', 'manifest.json'),
    to: path.join(extPath, 'build', 'manifest.json'),
  },
]);
