/**
 * Created by WangMing on 15/12/9.
 */
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')
config.entry.unshift('webpack-dev-server/client?http://localhost:8008', "webpack/hot/dev-server")
config.plugins.push(new webpack.HotModuleReplacementPlugin())
// 启动服务
var app = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
})

app.listen(8008, function(err, result) {
    err && console.log(err)
    console.log('Listening at http://localhost:8008')
})
