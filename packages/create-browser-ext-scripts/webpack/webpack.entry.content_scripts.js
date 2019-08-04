const path = require('path');
const recursiveReaddirSync = require('recursive-readdir-sync');

const extPath = require('../utils/getExtPath');
const content_scripts = recursiveReaddirSync(path.join(extPath, 'src', 'content_scripts'));

module.exports = content_scripts.reduce((acc, filePath) => {
  const { ext, name } = path.parse(filePath);

  if (ext.match(/(js|ts)(x)?/)) {
    return {
      ...acc,
      ['content_scripts/' + name]: filePath,
    };
  }

  return acc;
}, {});
