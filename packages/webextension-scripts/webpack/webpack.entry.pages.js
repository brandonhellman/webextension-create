const path = require('path');
const recursiveReaddirSync = require('recursive-readdir-sync');

const paths = require('../utils/paths');
const pages = recursiveReaddirSync(path.join(paths.extSrc, 'pages'));

module.exports = pages.reduce((acc, filePath) => {
  const { ext, name } = path.parse(filePath);

  if (ext.match(/(js|ts)(x)?/)) {
    return {
      ...acc,
      ['pages/' + name]: filePath,
    };
  }

  return acc;
}, {});
