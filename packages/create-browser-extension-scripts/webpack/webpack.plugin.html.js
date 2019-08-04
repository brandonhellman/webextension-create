const path = require('path');
const recursiveReaddirSync = require('recursive-readdir-sync');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extPath = require('../utils/getExtPath');
const pages = recursiveReaddirSync(path.join(extPath, 'src', 'pages'));

module.exports = pages.reduce((acc, file) => {
  const { base, ext, name } = path.parse(file);

  if (ext && ext.match(/html/)) {
    return [
      ...acc,
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'pages', base),
        filename: name + '.html',
        chunks: [name],
      }),
    ];
  }

  return acc;
}, []);
