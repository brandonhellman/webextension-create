const path = require('path');
const recursiveReaddirSync = require('recursive-readdir-sync');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('../utils/paths');
const pages = recursiveReaddirSync(path.join(paths.extSrc, 'pages'));

module.exports = pages.reduce((acc, file) => {
  const { base, ext, name } = path.parse(file);

  if (ext.match(/html/)) {
    return [
      ...acc,
      new HtmlWebpackPlugin({
        template: path.join(paths.extSrc, 'pages', base),
        filename: 'pages/' + base,
        chunks: ['pages/' + name],
      }),
    ];
  }

  return acc;
}, []);
