const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
module.exports = merge(common, {
    mode: "production",
    plugins: [
        
        new MinifyPlugin(),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ]
});