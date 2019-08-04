const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extPackage = require('../utils/getExtPackage');
const extPath = require('../utils/getExtPath');

module.exports = new CopyWebpackPlugin([
  {
    from: path.join(extPath, 'src', 'manifest.json'),
    to: path.join(extPath, 'build', 'manifest.json'),
    transform(content) {
      return content.toString().replace('__package.version__', extPackage.version);
    },
  },
]);
