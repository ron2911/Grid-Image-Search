const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './src/index',
  ],
  resolve: {
    extensions: ['', '.js', '.json'],
    modulesDirectories: ["./node_modules", "./node_modules/babel"]
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
        loaders: ['./babel'],
        include: path.join(__dirname, 'src'),
        exclude: './node_modules',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
  ]
};
