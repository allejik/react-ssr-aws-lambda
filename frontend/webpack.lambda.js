const path = require("path");

module.exports = {
    entry: "./src/lambda/index.js",
    target: "node",
    externals: [],
    output: {
        path: path.resolve("lambda-build"),
        filename: "index.js",
        library: "index",
        libraryTarget: "umd",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
            },
            {
                test: /\.css$/,
                use: "css-loader",
            },
        ],
    },
};