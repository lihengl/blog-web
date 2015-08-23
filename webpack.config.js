var webpack = require('webpack');

var pkg = require('./package.json');

module.exports = {
    context: __dirname,
    entry: {
        app: [
            'webpack-dev-server/client?http://0.0.0.0:8080',
            'webpack/hot/only-dev-server',
            './client.js'
        ]
    },
    externals: {
        'bluebird': 'Promise',
        'react/addons': 'React'
    },
    module: {
        loaders: [{
            loader: 'json',
            test: /\.json$/
        }, {
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel-loader'],
            test: /\.jsx$/
        }]
    },
    output: {
        filename: pkg.name + '.min.js',
        path: [__dirname, 'static_assets', pkg.version].join('/'),
        publicPath: ['http://localhost:8080/static_assets', pkg.version].join('/')
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
        new webpack.NoErrorsPlugin()
    ]
};
