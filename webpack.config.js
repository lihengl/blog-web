var webpack = require('webpack');

var pkg = require('./package.json');


var config = {
    context: __dirname,
    entry: ['./client.js'],
    externals: {
        'bluebird': 'Promise'
    },
    module: {
        loaders: [{
            loader: 'json',
            test: /\.json$/
        }, {
            exclude: /node_modules/,
            loaders: ['babel-loader'],
            test: /\.jsx$/
        }]
    },
    output: {
        filename: pkg.name + '.min.js',
        path: [__dirname, 'static_assets', pkg.version].join('/'),
        publicPath: ['http://localhost:8080/static_assets', pkg.version].join('/')
    },
    plugins: [new webpack.NoErrorsPlugin()]
};

if (process.env.MODE === 'local') {
    config.entry.unshift('webpack/hot/only-dev-server');
    config.entry.unshift('webpack-dev-server/client?http://0.0.0.0:8080');
    config.module.loaders[1].loaders.unshift('react-hot');
} else {
    config.externals['react/addons'] = 'React';
    config.plugins.unshift(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
