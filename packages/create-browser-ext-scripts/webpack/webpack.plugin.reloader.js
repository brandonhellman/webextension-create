const fs = require('fs-extra');
const path = require('path');
const ExtensionReloader = require('webpack-extension-reloader');

const extPath = require('../utils/getExtPath');
const extManifest = fs.readJsonSync(path.join(extPath, 'src', 'manifest.json'));

const content_scripts = extManifest.content_scripts
  ? extManifest.content_scripts.reduce((acc, script) => {
      const names = script.js.map((file) => 'content_scripts/' + path.parse(file).name);
      return [...acc, ...names];
    }, [])
  : [];

module.exports = new ExtensionReloader({
  entries: {
    background: 'pages/' + path.parse(extManifest.background.scripts[0]).name,
    contentScript: content_scripts,
  },
});
