const path = require('path');
const recursiveReaddirSync = require('recursive-readdir-sync');

const extPath = require('../utils/getExtPath');
console.log(path.join(extPath, 'src', 'content_scripts'));
const content_scripts = recursiveReaddirSync(path.join(extPath, 'src', 'content_scripts'));

module.exports = content_scripts.reduce((acc, filePath) => {
  const { ext, name } = path.parse(filePath);
  console.log(filePath, ext, name);
  if (ext.match(/(js|ts)(x)?/)) {
    return {
      ...acc,
      ['content_scripts/' + name]: filePath,
    };
  }

  return acc;
}, {});
