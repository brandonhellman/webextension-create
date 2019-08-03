const fs = require('fs-extra');
const path = require('path');

const extPackage = require('../utils/getExtPackage');
const extPath = require('../utils/getExtPath');
const templatePath = require('../utils/getTemplatePath');

extPackage.scripts = {
  build: 'create-browser-extension-scripts build',
  dist: 'create-browser-extension-scripts dist',
};

fs.outputJsonSync(path.join(extPath, 'package.json'), extPackage, { spaces: 2 });
fs.copySync(templatePath, extPath);
