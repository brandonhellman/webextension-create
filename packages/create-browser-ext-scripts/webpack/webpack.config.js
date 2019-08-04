const content_scripts = require('./webpack.entry.content_scripts');
const pages = require('./webpack.entry.pages');
const html = require('./webpack.plugin.html');
const manifest = require('./webpack.plugin.manifest');

const extPath = require('../utils/getExtPath');

module.exports = {
  entry: {
    ...content_scripts,
    ...pages,
  },

  output: {
    path: extPath + '/build',
  },

  mode: 'production',

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [...html, manifest],
};
