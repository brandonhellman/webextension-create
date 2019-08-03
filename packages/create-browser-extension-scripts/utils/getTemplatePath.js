const path = require('path');

const extPackage = require('./getExtPackage');
const dependencies = extPackage.dependencies || {};
const templatesPath = [__dirname, '..', '..', 'templates'];

let templatePath = path.join(...templatesPath, 'js');

if (dependencies.react && dependencies.typescript) {
  templatePath = path.join(...templatesPath, 'react-typescript');
} else if (dependencies.react) {
  templatePath = path.join(...templatesPath, 'react');
} else if (dependencies.typescript) {
  templatePath = path.join(...templatesPath, 'typescript');
}

module.exports = templatePath;
