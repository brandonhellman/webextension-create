const path = require('path');

module.exports = function getTemplatePath(packageJson) {
  const dependencies = packageJson.dependencies || {};
  const templatesPath = [__dirname, '..', '..', 'templates'];

  if (dependencies.react && dependencies.typescript) {
    return path.join(...templatesPath, 'react-typescript');
  }

  if (dependencies.react) {
    return path.join(...templatesPath, 'react');
  }

  if (dependencies.typescript) {
    return path.join(...templatesPath, 'typescript');
  }

  return path.join(...templatesPath, 'js');
};
