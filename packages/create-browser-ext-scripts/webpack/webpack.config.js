const path = require('path');

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
        test: /\.m?js$/,
        exclude: /node_modules/,
        include: path.join(extPath, 'src'),
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [require.resolve('@babel/preset-env')],
          },
        },
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: require.resolve('ts-loader'),
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: require.resolve('source-map-loader'),
      },
      {
        test: /\.css$/,
        use: [require.resolve('style-loader'), require.resolve('css-loader')],
      },
    ],
  },

  plugins: [...html, manifest],
};
