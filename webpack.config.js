const path = require('path')
const webpack = require('webpack')
const BundleTracker = require('webpack-bundle-tracker')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  context: __dirname,
  entry: './static/js/index.js',
  output: {
    path: path.resolve('./dist/'),
    filename: '[name]-[hash].js',
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new BundleTracker({
      filename: './webpack-stats.json',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
