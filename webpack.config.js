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
        loaders: ['babel?presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-runtime'],
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'src'),
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
  ]
};
