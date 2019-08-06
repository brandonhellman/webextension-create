const fs = require('fs-extra');
const path = require('path');

const extPackage = require('../utils/getExtPackage');
const extPath = require('../utils/getExtPath');
const templatePath = require('../utils/getTemplatePath');

require('../utils/tsconfigSetup');

extPackage.scripts = {
  start: 'create-web-extension-scripts start',
  build: 'create-web-extension-scripts build',
};

fs.outputJsonSync(path.join(extPath, 'package.json'), extPackage, { spaces: 2 });
fs.copySync(templatePath, extPath);
fs.copySync(path.join(__dirname, '..', 'templates', '.gitignore'), path.join(extPath, '.gitignore'));
fs.copySync(path.join(__dirname, '..', 'templates', 'README.md'), path.join(extPath, 'README.md'));
