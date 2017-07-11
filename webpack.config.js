/**
 * Created by WangMing on 15/12/9.
 */
var path = require('path')
var webpack = require("webpack")
// 提取组件样式
var ExtractTextPlugin = require("extract-text-webpack-plugin")
// html模板插入代码
var HtmlWebpackPlugin = require('html-webpack-plugin')
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
var entry = ['./dev/main']
var buildPath = "/www/dist"
// webpck插件
var plugins = [
    // 提公用js到common.js文件中
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new HtmlWebpackPlugin({
        title: "世纪城",
        template: './dev/main.html',
        filename: 'index.html',
        favicon: './favicon.ico',
        hash: true
    }),
    //将样式统一发布到style.css中
    new ExtractTextPlugin("style.css", {
        allChunks: true,
        disable: false
    }),
    // css压缩
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.style\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
    }),
    // // js压缩
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    // 使用 ProvidePlugin 加载使用率高的依赖库
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    })
]

// 编译输出路径
module.exports = {
    debug: true,
    entry: entry,
    output: {
        path: __dirname + buildPath,
        filename: 'build.js',
        publicPath: '/',
        chunkFilename: "[name].chunk.[chunkhash:8].js"
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
                "style-loader", "css-loader?sourceMap!cssnext-loader")
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('css!less-loader')
        }, 

        // {
        //     test: /\.(jpeg|jpg|png|gif)$/,
        //     loader: 'url-loader?limit=4192&name=images/[name].[md5:hash:hex:7].[ext]'
        // }, 
        // {
        //     test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        //     loader: "url-loader?limit=4192&name=fonts/[name].[md5:hash:hex:7].[ext]"
        // }

        { 
            test: /\.(jpeg|jpg|png|gif|eot|svg|ttf|woff|woff2)\??.*$/, 
            loader: 'file-loader?limit=8192&name=images/[hash:8].[name].[ext]'
        }, {
            test: /\.json$/,
            loader: 'json'
        }],
        preLoaders: [{
            test: /\.js$/,
            loader: "require-css-preloader"
        }]
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extension: ['', '.js', '.css'],
        //别名
        alias: {
            bootstrap: path.join(__dirname, "./dev/vendor/bootstrap/js/bootstrap"),
            lazyload: path.join(__dirname, "./dev/vendor/oniui/lazyload/avalon.lazyload"),
            notify: path.join(__dirname, "./dev/vendor/plugins/notify/bootstrap.notify"),
            md5: path.join(__dirname, "./dev/vendor/tools/md5/md5.min"),
            mmPromise: path.join(__dirname, "./dev/vendor/oniui/mmPromise/mmPromise"),
            mmHistory: path.join(__dirname, "./dev/vendor/oniui/mmRouter/mmHistory"),
            mmRouter: path.join(__dirname, "./dev/vendor/oniui/mmRouter/mmRouter"),
            mmState: path.join(__dirname, "./dev/vendor/oniui/mmRouter/mmState"),
            store: path.join(__dirname, "./dev/vendor/oniui/store/avalon.store"),
            datepicker: path.join(__dirname, "./dev/vendor/oniui/datepicker/avalon.datepicker"),
            coupledatepicker: path.join(__dirname, "dev/vendor/oniui/datepicker/avalon.coupledatepicker"),
            pager: path.join(__dirname, "./dev/vendor/oniui/pager/avalon.pager"),
            dialog: path.join(__dirname, "./dev/vendor/oniui/dialog/avalon.dialog"),
            validation: path.join(__dirname, "./dev/vendor/oniui/validation/avalon.validation"),
            progressbar: path.join(__dirname, './dev/vendor/oniui/progressbar/avalon.progressbar'),
            // 在正常情况下我们以CommonJS风格引用avalon,以require('avalon')
            avalon: path.join(__dirname, './dev/vendor/avalon/avalon.shim'),
            // 由于oniui都以是../avalon来引用avalon的，需要在这里进行别名
            '../avalon': path.join(__dirname, './dev/vendor/avalon/avalon.shim')
        }
    },
    plugins: plugins,
    devtool: '#source-map'
}
