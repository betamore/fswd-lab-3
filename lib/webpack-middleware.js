var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("../webpack.config");

var compiler = webpack(webpackConfig);

module.exports = webpackDevMiddleware(compiler, {
    publicPath: "/", // Same as `output.publicPath` in most cases.
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
    }
});
