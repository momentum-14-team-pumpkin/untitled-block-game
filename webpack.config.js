const path = require('path')
const BundleTracker = require('webpack-bundle-tracker')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: {
    game: './game/src/index.js',
    },
    output: {
    path: path.resolve('./game/static/game/'),
    filename: '[name]-[hash].js',
    publicPath: 'static/game/',
    },
    plugins: [
    new CleanWebpackPlugin(),
    new BundleTracker({
        path: __dirname,
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