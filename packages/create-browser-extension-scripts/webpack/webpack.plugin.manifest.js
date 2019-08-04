const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extPath = require('../utils/getExtPath');

// Copies the manifest.json file and merges properties from the package.json file.
module.exports = new CopyWebpackPlugin([
  {
    from: path.join(extPath, 'src', 'manifest.json'),
    to: path.join(extPath, 'build', 'manifest.json'),
    transform(content) {
      const manifest = content.toString();
      return JSON.stringify(manifest, null, 2);
    },
  },
]);
