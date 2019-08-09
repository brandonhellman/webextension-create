const path = require('path');
const recursiveReaddirSync = require('recursive-readdir-sync');

const paths = require('../utils/paths');
const content_scripts = recursiveReaddirSync(path.join(paths.extSrc, 'content_scripts'));

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
