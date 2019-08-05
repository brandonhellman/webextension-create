const path = require('path');
const ExtensionReloader = require('webpack-extension-reloader');

const extPath = require('../utils/getExtPath');

module.exports = new ExtensionReloader({
  manifest: path.resolve(extPath, 'build', 'manifest.json'),
  port: 1111,
  reloadPage: true,
});
