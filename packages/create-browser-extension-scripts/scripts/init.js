const fs = require('fs-extra');
const path = require('path');

const getTemplatePath = require('./utils/getTemplatePath');

const projectRoot = process.cwd();
const packageJson = fs.readJsonSync(path.join(projectRoot, 'package.json'));
const templatePath = getTemplatePath(packageJson);

packageJson.scripts = {
  build: 'create-browser-extension-scripts build',
  dist: 'create-browser-extension-scripts dist',
};

fs.outputJsonSync(path.join(projectRoot, 'package.json'), packageJson, { spaces: 2 });
fs.copySync(templatePath, projectRoot);
