const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const packageJson = require('../utils/packageJson');
const paths = require('../utils/paths');

module.exports = new CopyWebpackPlugin([
  {
    from: path.join(paths.extSrc, 'manifest.json'),
    to: path.join(paths.extUnpacked, 'manifest.json'),
    transform(content) {
      return content
        .toString()
        .replace(/__package\.name__/g, packageJson.name)
        .replace(/__package\.version__/g, packageJson.version);
    },
  },
]);
