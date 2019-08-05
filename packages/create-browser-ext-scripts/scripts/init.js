const fs = require('fs-extra');
const path = require('path');

const extPackage = require('../utils/getExtPackage');
const extPath = require('../utils/getExtPath');
const templatePath = require('../utils/getTemplatePath');

require('../utils/tsconfigSetup');

extPackage.scripts = {
  start: 'create-browser-ext-scripts start',
  build: 'create-browser-ext-scripts build',
};

fs.outputJsonSync(path.join(extPath, 'package.json'), extPackage, { spaces: 2 });
fs.copySync(templatePath, extPath);
