var webpack = require('webpack');

var pkg = require('./package.json');

module.exports = {
    context: __dirname,
    entry: './client.js',
    externals: {
        'bluebird': 'Promise',
        'immutable': 'Immutable',
        'react/addons': 'React'
    },
    module: {
        loaders: [{
            loader: 'json',
            test: /\.json$/
        }, {
            exclude: /node_modules/,
            loader: 'babel-loader',
            test: /\.jsx$/
        }]
    },
    output: {
        filename: pkg.name + '.min.js',
        path: [__dirname, 'static_assets', pkg.version].join('/')
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
    ]
};
