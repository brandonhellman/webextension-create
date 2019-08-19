import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import { webextension } from './webextension';
import * as ext from '../utils/ext';

export function config() {
  const webext = webextension();

  const config = {
    entry: webext.entry,

    output: {
      path: ext.pathToUnpacked,
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx|mjs)$/,
          exclude: /node_modules/,
          include: ext.pathToSrc,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                require.resolve('@babel/preset-env'),
                require.resolve('@babel/preset-react'),
                require.resolve('@babel/preset-typescript'),
              ],
              plugins: [require.resolve('@babel/plugin-transform-runtime')],
            },
          },
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
        {
          test: /\.(gif|jpe?g|mp4|png|wav)$/,
          use: [require.resolve('file-loader')],
        },
      ],
    },
  };

  return {
    development: {
      ...config,
      mode: 'development',
      devtool: 'source-map',
      plugins: [...webext.plugins, webext.reloader],
    },
    production: {
      ...config,
      mode: 'production',
      plugins: [new CleanWebpackPlugin(), ...webext.plugins],
    },
  };
}
