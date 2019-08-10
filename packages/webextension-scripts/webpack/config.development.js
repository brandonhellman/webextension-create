const paths = require('../utils/paths');
const webextension = require('./webextension');

module.exports = {
  entry: webextension.entry,

  output: {
    path: paths.extUnpacked,
  },

  mode: 'development',

  devtool: 'source-map',

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
        test: /\.(gif|jpe?g|mp4|png)$/,
        use: [require.resolve('file-loader')],
      },
    ],
  },

  plugins: [...webextension.plugins, webextension.reloader],
};
