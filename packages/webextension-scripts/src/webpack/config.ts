import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import * as paths from '../utils/paths';
import * as webextension from './webextension';

const config = {
  entry: webextension.entry,

  output: {
    path: paths.extUnpacked,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx|mjs)$/,
        exclude: /node_modules/,
        include: paths.extSrc,
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

export const development = {
  ...config,
  mode: 'development',
  devtool: 'source-map',
  plugins: [...webextension.plugins, webextension.reloader],
};

export const production = {
  ...config,
  mode: 'production',
  plugins: [new CleanWebpackPlugin(), ...webextension.plugins],
};
