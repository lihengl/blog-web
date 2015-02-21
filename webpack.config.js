var webpack = require("webpack");
var version = require("./package.json").version;

module.exports = {
    externals: {
        "react": "React"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin([{
            minimize: true
        }])
    ],
    output: {
        filename: ["blog", version, "min.js"].join("."),
        path: __dirname + "/static"
    },
    entry: "./client.js"
};
