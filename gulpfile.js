/**
 * Created by WangMing on 15/12/9.
 */
var gulp = require('gulp')
var smushit = require('gulp-smushit')
var webpack = require('webpack')
var del = require('del')
var minifycss = require('gulp-minify-css')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var webpackconfig = require('./webpack.config')



 





/**
 *  清理生产目录文件
 */
gulp.task('clean', function(cb) {
    del(['./www/dist/*.js', './www/dist/*.css', './www/dist/*.map']).then(paths => {
        cb()
    })
})

/**
 *  执行webpack打包
 */
gulp.task('webpack', ['clean'], function(cb) {
    webpack(webpackconfig, cb)
})

/**
 *  压缩css文件
 */
gulp.task('style', function() {
    gulp.src('./www/dist/*.css')
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('./www/dist/'))
})

/**
 *  压缩js文件
 */
gulp.task('script', function() {
    gulp.src('./www/dist/*.js')
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./www/dist/'))
})

gulp.task('image', function () {
    gulp.src('./images/*.{jpg,png,jpeg,gif}')
        .pipe(smushit({
            verbose: true
        }))
        .pipe(gulp.dest('./www/dist/images/'))
})



gulp.task('default', ['webpack'], function() {
    gulp.start('style', 'script', 'image')
})
