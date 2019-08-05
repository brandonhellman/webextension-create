const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const content_scripts = require('./webpack.entry.content_scripts');
const pages = require('./webpack.entry.pages');
const html = require('./webpack.plugin.html');
const manifest = require('./webpack.plugin.manifest');
const public = require('./webpack.plugin.public');

const extPath = require('../utils/getExtPath');

module.exports = {
  entry: {
    ...content_scripts,
    ...pages,
  },

  output: {
    path: extPath + '/build/unpacked',
  },

  mode: 'production',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx|mjs)$/,
        exclude: /node_modules/,
        include: path.join(extPath, 'src'),
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              require.resolve('@babel/preset-env'),
              require.resolve('@babel/preset-react'),
              require.resolve('@babel/preset-typescript'),
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [require.resolve('style-loader'), require.resolve('css-loader')],
      },
    ],
  },

  plugins: [new CleanWebpackPlugin(), ...html, manifest, public],
};
