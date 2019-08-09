const fs = require('fs-extra');
const path = require('path');
const ExtensionReloader = require('webpack-extension-reloader');

const paths = require('../utils/paths');
const extManifest = fs.readJsonSync(path.join(paths.extSrc, 'manifest.json'));

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
