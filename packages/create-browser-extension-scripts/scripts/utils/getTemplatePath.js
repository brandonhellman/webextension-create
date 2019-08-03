const path = require('path');

module.exports = function getTemplatePath(packageJson) {
  const dependencies = packageJson.dependencies || {};

  if (dependencies.react && dependencies.typescript) {
    return path.join(__dirname, '..', 'templates', 'react-typescript');
  }

  if (dependencies.react) {
    return path.join(__dirname, '..', 'templates', 'react');
  }

  if (dependencies.typescript) {
    return path.join(__dirname, '..', 'templates', 'typescript');
  }

  return path.join(__dirname, '..', 'templates', 'js');
};
