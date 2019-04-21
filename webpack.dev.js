const merge = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "public"),

        // host: "192.168.1.76",
        // port: 80
    }
});