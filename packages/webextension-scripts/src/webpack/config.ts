import * as ext from '../utils/ext';

import { webextension } from './webextension';
import webpack from 'webpack';

export function config() {
  const { entry, plugins } = webextension();

  const config: webpack.Configuration = {
    entry,

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
              plugins: [
                require.resolve('@babel/plugin-transform-runtime'),
                require.resolve(
                  '@babel/plugin-proposal-nullish-coalescing-operator'
                ),
                require.resolve('@babel/plugin-proposal-optional-chaining'),
              ],
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
          loader: require.resolve('file-loader'),
          options: {
            name: '[path][name].[ext]',
            context: 'src',
          },
        },
      ],
    },
  };

  const development: webpack.Configuration = {
    ...config,
    mode: 'development',
    devtool: 'source-map',
    plugins: plugins,
  };

  const production: webpack.Configuration = {
    ...config,
    mode: 'production',
    plugins: plugins,
  };

  return { development, production };
}
