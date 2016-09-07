const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './src/index',
  ],
  resolve: {
    extensions: ['', '.js', '.json'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.js?$/,
        loaders: ['babel'],
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'src'),
        query: {
          presets: ['es2015', 'react']
        }
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
  ]
};
