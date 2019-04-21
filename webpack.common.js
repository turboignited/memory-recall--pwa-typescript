const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "public")
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: true,
            template:"src/index.html",
        })
    ]
};