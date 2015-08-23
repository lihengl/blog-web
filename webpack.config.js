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
    plugins: []
};

if (process.env.MODE === 'local') {
    config.entry.unshift('webpack/hot/only-dev-server');
    config.entry.unshift('webpack-dev-server/client?http://0.0.0.0:8080');
    config.module.loaders[1].loaders.unshift('react-hot');
    config.plugins.push(new webpack.NoErrorsPlugin());
} else {
    config.externals['react/addons'] = 'React';
    config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
    config.plugins.push(new webpack.DefinePlugin({
        'process.env': {'NODE_ENV': JSON.stringify('production')}
    }));
}

module.exports = config;
