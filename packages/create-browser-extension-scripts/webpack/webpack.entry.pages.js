const path = require('path');
const recursiveReaddirSync = require('recursive-readdir-sync');

const extPath = require('../utils/getExtPath');
const pages = recursiveReaddirSync(path.join(extPath, 'src', 'pages'));

module.exports = pages.reduce((acc, filePath) => {
  const { ext, name } = path.parse(filePath);
  console.log(filePath, ext, name);
  if (ext.match(/(js|ts)(x)?/)) {
    return {
      ...acc,
      [name]: filePath,
    };
  }

  return acc;
}, {});
